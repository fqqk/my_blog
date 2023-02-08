---
title: "頑張らない実装を頑張って見つけた話"
created_at: "2023-02-07"
updated_at: "2023-02-07"
categories: ["react"]
---

## 目次

## やりたかったこと
マークダウン内に外部リンクが含まれていた場合、新規タブで開くようにtarget="_blank"を仕込んであげたかった。
markdown記法では、リンクは```[名前](リンク)```という風に書くのだが、この記法ではtarget="_blank"がないaタグが出来上がるため修正を施したかった。
このサイトの回遊性向上のためである(笑)

## せっかくだからremarkとrehypeのお勉強

## 他の人の実装を真似ても再現しないのだが...
<a href="https://kame.blog/entry/markdown-react-component/#h645ce8e7cb" target="_blank">こちら</a>が一番参考になったのだが、同様の実装を施してもなぜか再現しなかった。
おそらく、この方も対処していたように、aタグの親要素になぜかpタグが作成されてしまう現象に対応できなかったからだと思う。
また、'rehype-parse'がめちゃくちゃ重かったので正直入れたくないなと思ってもいた。

## マークダウンに直接```<a href='hoge' target="_blank"><a>```仕込めば良いのでは？
今回の実装は至ってシンプルである。

lib/markdownToHtml.ts
```typescript
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
    +  allowDangerousHtml: true
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
    +  allowDangerousHtml: true
    })
    .process(markdown);
  return result.toString();
}
```

あとはmarkdownファイル内で以下のよう記述すると反映されます。
```html
<a href='hoge' target="_blank">
  hoge
</a>
```