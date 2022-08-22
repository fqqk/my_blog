import { unified } from "unified";
import highlight from "remark-highlight.js";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(highlight)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}
