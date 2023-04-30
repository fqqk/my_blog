const { NotionToMarkdown } = require("notion-to-md");
const fs = require('fs');
import { fetchBlog } from "services/notion/blogFetcher"
import notionPageType from "types/notionPage";

const notion = fetchBlog()
               .then((result) => {
                console.log(result)
                return result.json
               })
               .catch((err) => {
                console.log(err)
               })

// passing notion client to the option
const n2m = new NotionToMarkdown({ notionClient: notion });

(async () => {
  const mdBlocks = await n2m.pageToMarkdown("target_page_id");
  const mdString = n2m.toMarkdownString(mdBlocks);

  //writing to file

  // fs.writeFile(`${created_time}-${page.title}.md`, mdString, (err) => {
  //   console.log(err);
  // });
})();

// 2023-04-22T23:43:00.000Z → 2023-04-22
function dateFormat(date: string): string {
  const targetIndex = date.indexOf('T')
  const trimmedDate = date.substring(0, targetIndex).trim()
  return trimmedDate
}

function fileName(page: notionPageType): string {
  return page.properties.file_name.rich_text[0].plain_text
}