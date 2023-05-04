import dotenv from "dotenv";
dotenv.config();
import { Client, LogLevel } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { exit } from "process";
import { Notion, NotionPageData } from "./notion";
import { Git } from "../../services/git/git";
import { Octokit } from "octokit";
import { initConfig } from "../config";

const config = initConfig();

const nClient = new Client({
  auth: config.notion.token,
  logLevel: LogLevel.DEBUG
});

const gClient = new Octokit({ auth: config.github.pat });

const n2m = new NotionToMarkdown({ notionClient: nClient });

(async () => {
  // retrieve blog posts
  const notion = new Notion(
    {
      props: config.property_names
    },
    nClient
  );
  let pages: NotionPageData[] = [];
  try {
    pages = await notion.getByDatabaseID(config.notion.database_id);
  } catch (e) {
    console.error(`failed to get pages by database_id: ${e}`);
    exit(1);
  }

  let git: Git | undefined;
  try {
    git = await Git.build(gClient, config);
    for(const page of pages) {
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdString = n2m.toMarkdownString(mdBlocks);
      await git.process(page, mdString);
    }
  } catch (e) {
    console.error(`error occurred when handling git repository : ${e}`);
  } finally {
    if(git) {
      git.close();
    }
  }
})();
