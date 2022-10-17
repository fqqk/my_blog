---
title: "markdown記法"
excerpt: "testtest"
coverImage: "/assets/blog/hello-world/cover.jpg"
created_at: "2020-03-16"
updated_at: "2020-03-17"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
categories: ["typescript"]
---

## 目次

# 見出し 1

## 見出し 2

### 見出し 3

#### 見出し 4

##### 見出し 5

###### 見出し 6

- リスト 1
  - ネスト リスト 1_1
    - ネスト リスト 1_1_1
    - ネスト リスト 1_1_2
  - ネスト リスト 1_2
- リスト 2
- リスト 3

1. 番号付きリスト 1
   1. 番号付きリスト 1_1
   1. 番号付きリスト 1_2
1. 番号付きリスト 2
1. 番号付きリスト 3

> お世話になります。xxx です。
>
> ご連絡いただいた、バグの件ですが、仕様です。

    # Tab
    class Hoge
        def hoge
            print 'hoge'
        end
    end

---

    # Space
    class Hoge
      def hoge
        print 'hoge'
      end
    end

インストールコマンドは `gem install hoge` です

normal **bold** normal
normal **bold** normal

---

[Google 先生](https://www.google.co.jp/)

[こっちから google][google]
その他の文章
[こっちからも google][google]

[google]: https://www.google.co.jp/

https://www.google.co.jp/

~~取り消し線~~

```ruby
　 class Hoge
　 def hoge
　 print 'hoge'
　 end
　 end
　~~~
```
