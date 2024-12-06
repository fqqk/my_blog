---
title: "JavaScriptはプロトタイプベースのOOL(オブジェクト指向言語)"
created_at: "2023-04-09"
updated_at: "2023-04-09"
tags: ["js"]
---

## 目次

## JavaScript がわからない疑惑

業務で Backbone.js というかなり古いフロントエンドフレームワークを使用しているのですが、そもそも JavaScript がわかっていないことによって Backbone.js なんもわからん...となっている気がしてきたので、以前は踏み込めていなかった JavaScript の深いところまで踏み込んでみようかと思いました。

## 先に chatGPT に結論を聞いてみた

質問

> JavaScript がプロトタイプベースのオブジェクト指向言語のようだが、クラス構文とはどのような関係があるのか

chatGPT

> JavaScript はプロトタイプベースのオブジェクト指向言語であり、従来はクラスを定義するためにコンストラクタ関数とプロトタイプオブジェクトを使用していました。しかし、ECMAScript 6 で導入されたクラス構文は、クラスベースのオブジェクト指向言語に似た構文を提供することで、より直感的な書き方ができるようになりました。つまり、クラス構文は従来のプロトタイプベースのオブジェクト指向の書き方に基づいて実装されたシンタックスシュガーとして提供されています。

## JavaScript はプロトタイプベースの OOL

JavaScript にはインスタンス化という概念は存在するが、いわゆるクラスがなく「プロトタイプ(雛形)」という概念だけが存在する。ここが Ruby とかと異なる。
es2015 以降はクラス構文が導入されたので、プロトタイプを意識する場面はほとんどなくなったようだが原点のプロトタイプという概念は変わっていない。
最初の設計が後世に与える影響はやはり大きいようだ。

プロトタイプとは、「あるオブジェクトの元となるオブジェクト、より縛りの弱いクラスのようなものらしい。

とはいっても,JavaScript にもクラスっぽさはあって、JavaScript では関数(Function オブジェクト)にクラスとしての役割を与えている。

クラス定義

```js
var Member = function () {};
```

クラスからインスタンス(実体)を生成

```js
var men = new Member();
```

コンストラクタはクラスとほぼ同義と解釈しているが、コンストラクタはクラスの一部のようなイメージ

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

let person1 = new Person("Alice", 20);
let person2 = new Person("Bob", 25);
```

- this
  - コンストラクタによって生成されるインスタンスを表している。

以下は JavaScript 本格入門に載っていた図である。

![js_prototype](/assets/js_prototype/js_prototype.png)

JavaScript はクラスベースのオブジェクト指向言語とは異なり、動的にメソッドを追加することができる。
上記図はそのことを表しており、コードで表現すると以下のようになる。

```js
var Member = function(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
};

var mem = new Member('hoge', 'fuga');

# 生成したmemというインスタンスに対してのメソッド。インスタンスメソッド
mem.getName = function(){
  return this.lastName + ' ' + this.firstName;
}

var mem2 = new Member("hoge", "fuga");
# men2というインスタンスにはgetNameメソッドを定義していないのでNoMethodErrorが発生
mem2.getName();
```

## コンストラクタの問題点を解決するプロトタイプ

JavaScript においてインスタンス共通のメソッドを定義するには、少なくともコンストラクタ(クラス)でメソッドを定義する必要がある。

しかし、コンストラクタによるメソッド追加は

- メソッド数に比例して「無駄な」メモリを消費する

という問題がある。

![コンストラクタにおける「無駄な」メモリを消費](/assets/js_prototype/constructor_problem.png)

その問題を解決すべく、`prototype`というプロパティが存在する

- prototype
  - デフォルトで空のオブジェクトを参照する
    - この空のオブジェクトにプロパティやメソッドを追加することができる

prototype プロパティに格納されたメンバはインスタンス化された先のオブジェクトに引き継がれる。
つまり、prototype プロパティに対して追加されたメンバはそのクラス(コンストラクタ)をもとに生成されたすべてのインスタンスから利用可能と成る

オブジェクトをインスタンス化した場合、インスタンスは基となるオブジェクトに属する prototype オブジェクトに対して暗黙的な参照を持つことになる。**コピーではない。**

![prototypeによるメモリ節約](/assets/js_prototype/solution_prototype.png)

コード上だと以下のようになる。

```js
var Member = function(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
};

# プロトタイプオブジェクトに追加
Member.prototype.getName = function(){
  return this.lastName + ' ' + this.firstName;
}

# memというインスタンスからも正しく参照される
var mem = new Member('myoji', 'namae');
document.writeln(mem.getName()); // myoji namae
```

上記コードの js 内での処理の流れとしては、

オブジェクトのメンバが呼ばれた

↓

インスタンス側に要求されたメンバが存在しないかどうか確認

↓

存在しなければ、暗黙的参照をたどってプロトタイプオブジェクトを検索

このあたりは、ruby の継承を学んだ際にも同じことをしていたのでなんとなくイメージが湧いた。

プロパティオブジェクトが利用されるのは、あくまで **「値の参照時」** のみ。

すでにプロパティが設定されていたり、追加で設定された場合は参照の必要性がなくなるので、インスタンス固有のプロパティを値として使っていることになる。

ベストプラクティスとしては以下のようだ。

- プロパティの宣言 → コンストラクタで
  - インスタンス単位で値が異なるため
- メソッドの宣言 → プロトタイプで

ここまでプロトタイプについて調べてきたが、静的プロパティ、静的メソッドの定義とプロトタイプではどう異なるのか？

静的プロパティ/メソッドとは、インスタンスを生成しなくてもオブジェクトから直接呼び出せるプロパティ/メソッドのこと。
グローバル定義で名前衝突などが起きてしまう問題を回避できる。

ruby だと、クラスメソッド的な。

```js
object.propaty = value;
object.method = function () {};
```

このような静的系を定義する場合はプロトタイプオブジェクトには登録できない。

プロトタイプはあくまで、インスタンスから暗黙的に参照されることを目的としたオブジェクトである。

- 静的プロパティは読み取り専用
  - クラス単位で保有される情報なので、これを変更してしまうことは影響が大きい
- 静的メソッドの中では this が使えない
  - this はこの場合インスタンスではなくコンストラクタを指す。

インスタンス側でのメンバの追加、削除がプロトタイプオブジェクトにまで影響を及ぼすことはない。

## プロトタイプチェーン

オブジェクトの継承のしくみを JavaScript の世界で実現している考え方のこと。

```js
var Animal = function() {}

Parent.prototype = {
  walk : function() { document.writeln('トコトコ...'); }
};

var Cat = function() {}
Cat.prototype = new Parent();

Child.prototype.nyao = function() { document.writeln('にゃおー'); }

var cat = new Cat();
cat.walk();  # トコトコ...
cat.nyao();  # にゃおー
```

Cat の prototype に Animal のインスタンスをセットしている。

これにより、Cat オブジェクトのインスタンスから Animal オブジェクトで定義した walk メソッドを呼び出すことができる。

JavaScript ではプロトタイプにインスタンスを設定することでインスタンス同士を暗黙の参照でもって連結し、互いに継承関係を
もたせることができる。

このようなプロトタイプの連なりを **プロトタイプチェーン** という。

![プロトタイプチェーン](/assets/js_prototype/prototype_chain.png)

## Backbone.js で少しわかったこと

Backbone.js で書いていると必ず以下の記述がファイルの最上部に書かれている。
以下は coffeescript なので ruby 的構文

これは名前空間の定義をしている。

```js
NameSpace.Admin ||= {};
```

```js
var MyApp = {
  Models: {},
  Views: {},
  Collections: {},
};
```

これも同様。
上記では、MyApp という名前のオブジェクトを作成している。
このオブジェクトは、Models、Views、Collections などの名前を持つオブジェクトを持っている。
このように、オブジェクトを使うことで、名前空間を作成し、同じ名前の変数や関数などをグローバルスコープで定義してしまう問題を回避することができる。
es2015 からはモジュール機能が導入され、名前空間の定義にはモジュール機能を使うことが推奨されている。
es2015 の深堀りに関しては次回行いたい。

## es2015 からクラス構文が導入

冒頭の以下コードについて

```js
var Member = function(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
};

# プロトタイプオブジェクトに追加
Member.prototype.getName = function(){
  return this.lastName + ' ' + this.firstName;
}

# memというインスタンスからも正しく参照される
var mem = new Member('myoji', 'namae');
document.writeln(mem.getName()); // myoji namae
```

これをクラス構文に直すと以下のようになる

```js
class Member {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  getName() {
    return this.lastName + " " + this.firstName;
  }
}

const mem = new Member("myoji", "namae");
console.log(mem.getName()); // myoji namae
```

Member というクラス定義があり、このクラスには、firstName と lastName という 2 つのプロパティがあり、constructor メソッドで初期化している。

さらに、getName というメソッドが定義されています。

クラスという一つの箱に収まった感じがして気持ち良い。

このクラスから mem というインスタンスを作成し、getName メソッドを呼び出しています。この結果、正しく myoji namae という文字列が返されます。

## さいごに

まじで chatGPT が学習する上で欠かせないツールになってきている。

「このコードをクラス構文に直して」と命令したらすぐに返してくれて(解説付きで)課金したい気持ちが強くなった。

## 参考資料

- [書籍]JavaScript 本格入門
