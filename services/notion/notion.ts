import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { format } from "date-fns";

type NotionPropNames = {
  title: string;
  tag: string;
  public: string;
  file_name: string;
};

type NotionConfig = {
  props: NotionPropNames;
};

export type NotionPageData = {
  id: string;
  title: string;
  tags: string[];
  file_name: string;
  created_at: string;
  updated_at: string;
};

export class Notion {
  constructor(private _config: NotionConfig, private client: Client) {
    this._config = _config;
    this.client = client;
  }

  /**
   * getByDatabaseID retrieves list of page data. It throws Error when failed.
   */
  public async getByDatabaseID(database_id: string): Promise<NotionPageData[]> {
    let posts: PageObjectResponse[] = [];
    let cursor: string | undefined = undefined;
    let has_more = false;

    try {
      do {
        const res: QueryDatabaseResponse = await this.client.databases.query({
          database_id: database_id,
          start_cursor: cursor,
          filter: {
            property: this._config.props.public,
            checkbox: {
              equals: true,
            }
          }
        });

        has_more = res.has_more;
        cursor = res.next_cursor !== null ? res.next_cursor : undefined;
        posts = posts.concat(
          res.results.filter((v) =>
            this.isPageObjectResponse(v)
          ) as PageObjectResponse[]
        );
      } while (has_more);
    } catch (e) {
      throw new Error(`failed to fetch the blog posts: ${e}`);
    }

    const result: NotionPageData[] = [];
    for (const post of posts) {
      result.push({
        id: post.id,
        title: this.getTitle(post),
        tags: this.getTags(post),
        file_name: this.getFileName(post),
        created_at: this.getCreatedAt(post),
        updated_at: this.getUpdatedAt(post),
      });
    }

    return result;
  }

  // NOTE:  is https://qiita.com/ryo2132/items/ce9e13899e45dcfaff9b
  // NOTE:  in https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/in
  private isPageObjectResponse(
    res: PageObjectResponse | PartialPageObjectResponse
  ): res is PageObjectResponse {
    return "url" in res;
  }

  private getTitle(page: PageObjectResponse): string {
    const title = page.properties[this._config.props.title];
    return title.type === "title" && title.title.length > 0
      ? title.title[0].plain_text
      : "";
  }

  private getTags(page: PageObjectResponse): string[] {
    const tags = page.properties[this._config.props.tag];
    return tags.type === "multi_select" ? tags.multi_select.map((v) => `"${v.name}"`) : [];
  }

  private getFileName(page: PageObjectResponse): string {
    const fileName = page.properties[this._config.props.file_name];
    return fileName.type === "rich_text" && fileName.rich_text.length > 0
      ? fileName.rich_text[0].plain_text
      : ""
  }

  private getCreatedAt(page: PageObjectResponse): string {
    return format(new Date(page.created_time), "yyyy-MM-dd")
  }

  private getUpdatedAt(page: PageObjectResponse): string {
    return format(new Date(page.last_edited_time), "yyyy-MM-dd")
  }
}
