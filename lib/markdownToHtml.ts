import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeReact from "rehype-react";

import PostImage from "../components/post-image";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkToc, {
      heading: "目次",
    })
    .use(remarkRehype,{
      allowDangerousHtml: true
    })
    .use(rehypeReact, {
      Fragment: React.Fragment,
      createElement: React.createElement,
      components: {
        img: PostImage,
      },
    })
    .use(rehypeSlug)
    .use(rehypeStringify,{
      allowDangerousHtml: true
    })
    .process(markdown);
  return result.toString();
}
