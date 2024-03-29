import * as fs from "fs";
import { Octokit } from "octokit";
import simpleGit, { SimpleGit } from "simple-git";
import { NotionPageData } from "../notion/notion";
import download from "image-downloader";
import { Config } from "../config";

type ImagePair = {
  url: string;
  file_name: string;
}

/**
 * All operations should be executed in try catch block.
 * Don't forget to call close() in finally block.
 */

export class Git {
  private _branch_local_prefix = "auto-generate/";
  private _branch_remote_prefix = `remotes/origin/${this._branch_local_prefix}`;
  private _branches:string[] = [];
  private _blog_asset_dir = ""; // ex.) "../src/assets/"
  private _blog_post_dir = ""; // ex.) "content/posts/"
  private _github_repo_name = "";
  private _github_user = "";

  private constructor(
    private _git: SimpleGit,
    private _github: Octokit,
    private _working_dir: string
  ) {
    this._git = _git;
    this._working_dir = _working_dir;
  }

  // getter
  get branches() {
    return this._branches
  }

  public close() {
    console.log("deleting tmp dir....");
    fs.rmSync(this._working_dir, { recursive: true, force: true });
  }

  public static async build(
    github_client: Octokit,
    config: Config
  ): Promise<Git> {
    const workDir = "./tmp/";

    fs.mkdirSync(workDir);
    console.log(`repository clone on ${workDir}`)

    const git = simpleGit({
      baseDir: `${process.cwd()}/tmp`,
      binary: "git",
      maxConcurrentProcesses: 6,
      trimmed: false,
    })

    const res = new Git(git, github_client, workDir);
    res._blog_asset_dir = config.blog.asset_dir; // public/assets/notion
    res._blog_post_dir = config.blog.post_dir; // _posts
    const github_repo_elems = config.github.repo.split("/");
    res._github_repo_name = github_repo_elems[github_repo_elems.length - 1].replace(".git", "");
    const user = await github_client.rest.users.getAuthenticated();
    res._github_user = user.data.login;

    try {
      await git.clone(config.github.repo, ".");
      const summary = await res._git.branch();
      res._branches = summary.all.filter((v) =>
        v.startsWith(res._branch_remote_prefix)
      );
    } catch (e) {
      throw e;
    }

    return res;
  }

  public async process(page: NotionPageData, md: string) {
    const images = this.getImageURLFromMd(md);
    md = this.replaceImageURLToPath(images, md);
    md = this.addHeaderToMd(page, md);
    let isDownloaded = false;

    if(!this.branchExists(page.file_name)) {
      console.log("branch not exists. create new branch from main branch...");
      await this._git.checkoutLocalBranch(
        `${this._branch_local_prefix}${page.file_name}`
      );
      console.log("checkout branch Done");
    }

    console.log("checking diff...");
    if(!this.hasDiff(page, md, images)) {
      console.log("this page has no diffs. nothing to do.");
      return;
    }

    if(images.length !== 0) {
      fs.mkdirSync(this.getImageDir(), { recursive: true} );
      console.log("image downloading...");
      await this.downloadImages(images);
      console.log("image downloading Done");
      isDownloaded = true;
    }

    // commit and push
    console.log("some diff detected. updating or creating md...");
    fs.mkdirSync(this.getMdDir(), { recursive: true} );
    fs.writeFileSync(this.getMdPath(page), md);
    console.log("mkdir for .md and write file Done");

    console.log("commit and push");
    await this._git.add(this.getMdPathForGit(page));
    console.log(`isDownloaded : ${isDownloaded}`);
    if(isDownloaded) {
      await this._git.add(`${this.getImageDirForGit()}/*`);
    }
    await this._git.remote(["set-url", "origin", `https://fqqk:${process.env.THIS_GITHUB_PAT}@github.com/fqqk/my_blog.git`])
    await this._git.commit(`update post ${page.file_name}`);
    await this._git.push(
      "origin",
      `${this._branch_local_prefix}${page.file_name}`,
      { "--set-upstream": null }
    );
    console.log("commit and push Done");

    // create PR if not exists
    const pr = await this._github.rest.search.issuesAndPullRequests({
      q: `is:pr is:open "${this.getPRTitle(page)}"`,
    });
    if(pr.data.total_count === 0) {
      console.log("PR is not found, creating...");
      await this._github.rest.pulls.create({
        owner: this._github_user,
        repo: this._github_repo_name,
        head: `${this._github_user}:${this._branch_local_prefix}${page.file_name}`,
        base: "main",
        title: this.getPRTitle(page),
      })
      console.log("create PR Done");
      return;
    }
    console.log("PR already exists");
  }

  private branchExists(file_name: string): boolean {
    return (
      this._branches.find(
        (v) => v === `${this._branch_remote_prefix}${file_name}`
      ) !== undefined
    );
  }

  private hasDiff(
    page: NotionPageData,
    md: string,
    images: ImagePair[]
  ): boolean {
    const path = this.getMdPath(page);

    if(!fs.existsSync(path)) return true;

    const image_uuids: string[] = [];
    for(const image of images) {
      image_uuids.push(this.getImageUUID(image.url));
    }
    let cur_md = fs.readFileSync(path).toString();
    md = this.deleteExistingImages(md, image_uuids);
    cur_md = this.deleteExistingImages(cur_md, image_uuids);

    return cur_md !== md
  }

  private deleteExistingImages(md: string, uuids: string[]): string {
    const lines = md.split(/\r?\n/);
    for(let [idx, line] of lines.entries()) {
      line = line.trim();
      if(!line.startsWith("![")) continue;

      let found = false;
      for(const uuid of uuids) {
        if(line.includes(uuid)) {
          found = true;
          break;
        }
      }
      if(found) {
        lines.splice(idx, 1);
      }
    }

    return lines.join("\n");
  }

  private getImageUUID(url: string): string {
    const u = new URL(url);
    const paths = u.pathname.split("/");
    if(paths.length > 2) {
      return paths[paths.length - 2];
    }
    return "";
  }

  private getMdPath(page: NotionPageData): string {
    return `${this.getMdDir()}${page.created_at}-${page.file_name}.md`;
  }

  private getMdDir(): string {
    return `${this._working_dir}${this.getMdDirForGit()}`;
  }

  private getImageDir(): string {
    return `${this._working_dir}${this.getImageDirForGit()}`;
  }

  private getMdPathForGit(page: NotionPageData): string {
    return `${this.getMdDirForGit()}${page.created_at}-${page.file_name}.md`;
  }

  private getImageDirForGit(): string {
    return `${this._blog_asset_dir}/`;
  }

  private getMdDirForGit(): string {
    return `${this._blog_post_dir}/`;
  }

  private getPRTitle(page: NotionPageData): string {
    return `[AUTO-GENERATED] ${page.file_name}`;
  }

  private getImageURLFromMd(md: string): ImagePair[] {
    const regex = /\!\[\]\((.*)\)/g;
    const res: ImagePair[] = [];
    let m: RegExpExecArray | null = null;
    do {
      m = regex.exec(md);
      if(m?.length === 2) {
        const url = new URL(m[1]);
        const elms = url.pathname.split(".");
        const ext = elms[elms.length - 1];
        res.push({
          url: m[1],
          file_name: `${this.getImageUUID(m[1])}.${ext}`,
        });
      }
    } while (m);

    return res;
  }

  private async downloadImages(images: ImagePair[]) {
    for(const image of images) {
      console.log(`downloading image: ${image.url}`);
      await download.image({
        url: image.url,
        dest: `${process.cwd()}/${this.getImageDir()}`,
      });
      console.log("download image OK");
    }
  }

  private addHeaderToMd(page: NotionPageData, md: string): string {
    return `---
title: "${page.title}"
created_at: "${page.created_at}"
updated_at: "${page.updated_at}"
tags: [${page.tags}]
---
${md}`;
  }

  private replaceImageURLToPath(images: ImagePair[], md: string): string {
    for(const image of images) {
      // e.g. image.url => IMG_892A68C4DE21-1.jpeg?xxxxx' 
      const fileName = this.getFileNameFromUrl(image.url);
      md = md.replace(
        `![](${image.url})`,
        `![${fileName}](assets/notion/${fileName})`
      );
    }
    return md;
  }

  private getFileNameFromUrl(url: string): string {
    const regex = /([^/?]+)(\?|$)/; // パスの末尾にあるファイル名を抽出する正規表現パターン
  
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Invalid URL format');
    }
  }
}