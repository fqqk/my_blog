---
title: "why do not work css?"
created_at: "2023-01-05"
updated_at: "2023-01-05"
categories: ["tailwind"]
---

## 目次

## 急に一部に css が効かなくなった

<!-- https://zenn.dev/elpnt/articles/c17727e9d254ef00ea60 -->

![tagにcssが効かない](http://localhost:3300/public/assets/posts/notcss.png)

## 原因調査

- css が付与された jsx を切り出した関数からは受け取ることができている

  SSR が原因？

  関数に切り出す前の状態に戻したら治った。

  原因はわからず。一度 SSR したことでなにかおかしくなったのかな。
  またおかしくなった。

  tailwind として認識されていないことがあるのかも知れない

## 改善

## 結果
