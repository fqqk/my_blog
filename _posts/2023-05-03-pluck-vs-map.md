---
title: "🫥pluck vs map"
created_at: "2023-05-03"
updated_at: "2023-05-05"
tags: ["ruby","ror"]
---

## 目次


先日業務で受けたご指摘について改めて整理しようかと思う。


## ありがたいご指摘


当初ぼくはmapを使った実装をしていた。


pluckでいいんじゃないかー？というご指摘をいただいたのでそのまま付け替えるかーと思ったのですが、このままではなんの学びにもならないなと思い、両者を比較することにした。


## map


Rubyのメソッド


ブロック内の処理を実行したレシーバを配列として返す。


mapはレシーバをメモリに読み込むためメモリを浪費するデメリットがある。


一旦Userテーブルから全てのデータを取得してからlast_nameカラムのデータだけ配列に入れ直している。


```ruby
# last_nameだけで十分なのにSELECTは全選択(*)になっている
# レシーバを加工するため、Userモデルが読み込まれることになる

> User.all.map(&:last_name)

  User Load (2.0ms)  SELECT `users`.* FROM `users`
=> ["Cormier", "Reichert", "Hauck",...]
```


## pluck


railsのメソッド


指定したカラムのレコードの配列を取得


デメリットとしては、毎回SQLが発行されてしまうこと


```ruby
# pluckの引数（last_name）のみがSELECTに指定されている。
# last_name以外のカラムはSELECTされないのでメモリを節約できる

> User.all.pluck(:last_name)

  (1.0ms)  SELECT `users`.`last_name` FROM `users`
=> ["Cormier", "Reichert", "Hauck",...]
```


### 使い分け

- 特定のカラムのみ利用する場合
	- **メモリ節約**の観点から`pluck`
- インスタンス化されたActive Recordモデルからカラム取得したい場合
	- **SQL発行回数を抑える**ために`map`
	- pluckだと下記のようにループを回すときにはN+1のようになってしまうため

	```ruby
	> users = User.limit(20)
	
	# pluckでは毎回SQLが実行されている
	> 5.times { users.pluck(:last_name) }
	   (0.7ms)  SELECT `users`.`last_name` FROM `users` LIMIT 20
	   (0.4ms)  SELECT `users`.`last_name` FROM `users` LIMIT 20
	   (0.5ms)  SELECT `users`.`last_name` FROM `users` LIMIT 20
	   (0.5ms)  SELECT `users`.`last_name` FROM `users` LIMIT 20
	   (0.4ms)  SELECT `users`.`last_name` FROM `users` LIMIT 20
	=> 5
	
	# mapでは毎回SQLが実行されない
	> 5.times { users.map(&:last_name) }
	  User Load (0.7ms)  SELECT `users`.* FROM `users` LIMIT 20
	=> 5
	```


## さいごに


改めてSQLとかメモリとかの勉強をちゃんとしたいなと思った。


この間書籍で読んだけども、そのときはわからなかったことが今だとわかる気がするので再度読み直してみたい。


## 参考資料

- [【Rails】メモリや実行時間を意識したpluckとmapの使い分け](https://nishinatoshiharu.com/ruby-map-pluck/)
