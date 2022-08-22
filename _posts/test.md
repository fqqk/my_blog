---
title: "testブログ"
excerpt: "testtest"
coverImage: "/assets/blog/hello-world/cover.jpg"
created_at: "2020-03-16T05:35:07.322Z"
updated_at: "2020-03-17T05:35:07.322Z"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
categories: ["react"]
---

## test

こちらテストです
人と違うところに目をつけ、または本来あるべきものが欠けているということに気づくこと

それができれば好機を掴み、解決方法を発見し、警告に注意を払い、近道を見つけ、現状打開の案をつかみ、勝利をものにすることができる。

```js
import Prism from "prismjs";

const Component = ({ post }) => {
  useEffect(() => {
    Prism.highlightAll();
  });
  return <div dangerouslySetInnerHTML={{ __html: post.content }} />;
};
```
