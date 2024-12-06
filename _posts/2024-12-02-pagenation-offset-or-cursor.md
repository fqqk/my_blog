---
title: "オフセットベースとカーソルベースのページネーションについて"
created_at: "2024-12-02"
updated_at: "2024-12-06"
tags: ["dev"]
---

この記事は [SUPER STUDIO Advent Calendar 2024](https://qiita.com/advent-calendar/2024/super-studio) の9日目の記事になります。


## 目次


## ページネーションについて


ページネーションとは、大量なデータが存在する場合、取得数や取得位置を指定してデータの一部だけを取得する仕組みのことです。


ページネーションを活用することで、データが多い場合でもページの読み込み時間が長くなってしまうような事態を避けられます。


railsで有名なgemとしてはKaminariがありますよね。


今回業務で無限スクロールの実装をすることになり、ページネーションについて改めて調べました。


その過程で、一口にページネーションと言ってもデータの取得方法で異なるものが存在するらしい、ということがわかったので備忘録としてまとめてみました。


## オフセットベース


みなさんもページネーションといえば”オフセット”が真っ先に浮かぶのではないでしょうか？


こちらKaminariでも採用されているデータ取得手法で、クエリで`OFFSET`と`LIMIT`を使用してデータの絞り込みを行います。


```ruby
@users = User.page(2).per(3)
# => SELECT * FROM users LIMIT 3 OFFSET 10;
```


OFFSETは、表示するレコードの開始位置を指定するのに使用されています。


その際の開始位置の決まり方なのですが、**指定された行数分だけ先頭からデータをスキャンしてスキップ**し、最終的にたどり着いた位置が開始位置となります。


LIMITは取得するデータ数を制限しています。


このように、OFFSETを用いて開始位置を決め、決まった位置を起点としてLIMITで指定された件数分のデータが取得されます。


以下取得イメージ図です。


![offset pagenation](/assets/notion/offset_pagination.png)


実装面においてラクというのがオフセットベースの利点です。


ただ、OFFSETの特徴である**「指定された行数分だけ先頭からデータをスキャンしてスキップ」**という側面から、**データ数が膨大な場合かつ指定した開始位置が非常に後方だった場合にパフォーマンスの低下**が起こり得ます。


一つ例を考えてみます。


例えば1万人が並ぶレストランの行列で、お客様の空腹状況を確認する係の人がいるとします。


午前中に800人まで確認を終えて休憩に入った後、午後から再開する際に801番目の人から始めたいと思います。


しかし、その801番目の人を見つけるためには、最初から800人分カウントしながら歩いていかなければなりません。


さらに、もし950人目で再び休憩を取りたくなった場合、951人目から再開するには同じように最初から950人分数え直す必要があります。これでは効率が悪く、休憩を取ることすら躊躇してしまいます。


ではデータが多い場合はどうすればよいのか？という疑問に対するアンサーが次のカーソルベースページネーションです。


## カーソルベース


こちらは**データの取得位置が絶対位置**という点でオフセットベースと異なります。


この絶対位置のことをカーソルと呼び、データ取得時の最後のデータ位置のことを指します。


カーソルは絶対位置ということで一意な値である必要があります。


idを採用することもありますが、データをid以外の項目で並び替えする場合はidを使用してしまうと意図した位置からのデータ取得が行えないため、その場合はid + created_atのように複合キーで対応するようです。


以下idをカーソルとした場合の例


クエリとしては`WHERE` を使用。


以下idをcursorとした場合


```ruby
cursor = 2
@users = User.where('id > ?', cursor).limit(3)
# => SELECT "users".* FROM "users" WHERE (id > 2) LIMIT 3

# 次回カーソルは5となる
```


![cursor pagination](/assets/notion/cursor_pagination.png)


このカーソルベースを先程のレストランの行列待ちの例に適応させます。


係の人は午前中に850人の聞き取りを終えたタイミングで850人目の人に「カーソル」という旗をもたせることにしました。


これで午後の仕事を始める際に、「カーソル」という旗を持っている人のところに直接向かえば良いので、850人分のカウントの手間がなくなるので、休憩も取りやすくなりました。


## 実際どのくらいパフォーマンスに差があるのか


[offset-vs-cursor-based-pagination-choosing-the-best-approach](https://medium.com/@maryam-bit/offset-vs-cursor-based-pagination-choosing-the-best-approach-2e93702a118b)


にてデータ数を0 - 100,000までの間で調節してクエリ実行時間を計測したものを添付します。


![offset と cursor のクエリ実行時間比較](/assets/notion/offset_or_cursor_query_exec_performance.png)


これによるとデータ数1万件の時点からかなり差が出始めています。


カーソルベースの場合データ数が増えても実行時間が一定となっております。


## どのように使い分けるべきか


一見カーソルベースのほうがパフォーマンス的に優秀そうだし、実装面も思ったより複雑にならなさそうだからカーソルベース1択で良いのでは？と思ったのですが、オフセットにはオフセットの良いところがあります。


[offset-vs-cursor-based-pagination-choosing-the-best-approach](https://medium.com/@maryam-bit/offset-vs-cursor-based-pagination-choosing-the-best-approach-2e93702a118b)


こちらの記事が非常にわかりやすくまとめてくれているので、基本的に上記記事を見てもらえれば良いと思います。

- オフセット
  - 並び替えのしやすさ: 柔軟
  - パフォーマンス: データ数が多いと低
  - 位置の指定: 可能
- カーソル
  - 並び替えのしやすさ: 柔軟さと実装の複雑化がトレードオフ
  - パフォーマンス: 高
  - 位置の指定: 不可能


## 実装の違いについてGemを見てみる


### Kaminari /kaminari-core/lib/kaminari/models/page_scope_methods.rb#per


[kaminari-core/lib/kaminari/models/page_scope_methods.rb#L7-L19](https://github.com/kaminari/kaminari/blob/40e8d9cd2bad69940170cab2c9df4b083ba6bd32/kaminari-core/lib/kaminari/models/page_scope_methods.rb#L7-L19)


```ruby
module Kaminari
  module PageScopeMethods
    # Specify the <tt>per_page</tt> value for the preceding <tt>page</tt> scope
    #   Model.page(3).per(10)
    def per(num, max_per_page: nil)
      max_per_page ||= ((defined?(@_max_per_page) && @_max_per_page) || self.max_per_page)
      @_per = (num || default_per_page).to_i
      if (n = num.to_i) < 0 || !(/^\d/ =~ num.to_s)
        self
      elsif n.zero?
        limit(n)
      elsif max_per_page && (max_per_page < n)
        limit(max_per_page).offset(offset_value / limit_value * max_per_page)
      else
        limit(n).offset(offset_value / limit_value * n)
      end
    end

```


limitとoffsetに渡す値によっていくつか分岐がありますが、基本的な構造としてはlimitとoffsetを実行するということが読み取れます。


オフセットベースの特徴である実装の簡潔さは、Kaminariからもうかがえます。


### activerecord_cursor_paginate/lib/activerecord_cursor_paginate/paginator.rb 


カーソルの生成と適用はpaginatorクラスの以下で行っています。


```ruby
if @cursor
  # カーソルに使用する一意の値を生成
  # columns（ソート対象のカラム）と時間が返ってきます。
  decoded_cursor = Cursor.decode(cursor_string: @cursor, columns: @columns)
  
  # ActiveRecordのrelationにカーソルを適用
  relation = apply_cursor(relation, decoded_cursor)
end
```


decoded_cursorの中身はCursorオブジェクトです。


```ruby
new(columns: columns, values: decoded)

# 多分こんな感じ
columns = ["created_at", "id"]
values = ["2024-01-01 00:00:00", 10]
```


ここでcolumnsはソート対象に指定したカラムであり、valuesにはcursor_stringがデコードされた結果であるTimeオブジェクトが入っています。


上記decoded_cursorがカーソルベースでいう**一意な値の役割**を果たしています。


それを元に、カーソルの適応を行っているのがapply_cursor


```ruby
	
module ActiveRecordCursorPaginate
  class Paginator
    def initialize(relation, before: nil, after: nil, limit: nil, order: nil, append_primary_key: true)
      @relation = relation
      @cursor = before || after
      @is_forward_pagination = before.blank?

      # コメント抜粋
	    # @param order [Symbol, String, nil, Array<Symbol, String>, Hash]
	    #   Column(s) to order by, optionally with directions (either `:asc` or `:desc`,
	    #   defaults to `:asc`)
      order = normalize_order(order)
      @columns = order.keys
      @directions = order.values
    end

		private

		def apply_cursor(relation, cursor)
		  operators = @directions.map { |direction| pagination_operator(direction) }
		  cursor_positions = cursor.columns.zip(cursor.values, operators)
		
		  # cursorに基づいてデータのフィルタリング条件を確定する
		  where_clause = nil
		  cursor_positions.reverse_each.with_index do |(column, value, operator), index|
		    where_clause =
		      if index == 0
		        arel_column(column).public_send(operator, value)
		      else
		        arel_column(column).public_send(operator, value).or(
		          arel_column(column).eq(value).and(where_clause)
		        )
		      end
		  end
		
		  relation.where(where_clause)
		end
		
    def arel_column(column)
      if Arel.arel_node?(column)
        column
      elsif column.match?(/\A\w+\.\w+\z/)
        Arel.sql(column)
      else
        @relation.arel_table[column]
      end
    end
		
    def pagination_operator(direction)
      if @is_forward_pagination
        direction == :asc ? :gt : :lt
      else
        direction == :asc ? :lt : :gt
      end
    end
```


ここでcursor_positionsを決めるときのzipメソッドについて📝


[Array#zip](https://docs.ruby-lang.org/ja/latest/method/Array/i/zip.html)


```ruby
columns = ["created_at", "id"]
values = ["2024-01-01 00:00:00", 10]
operators = [:gt, :lt]

result = columns.zip(values, operators)
puts result.inspect
# => [["created_at", "2024-01-01 00:00:00", :gt], ["id", 10, :lt]]
```


where_clauseを算出する箇所は、上記cursor_positions内の配列要素を一つずつ処理して、where句を構築、継ぎ足ししていく感じ。


最終的には多分以下のようになります。


```ruby
WHERE created_at > '2024-01-01 00:00:00' # 1回目のarel_columnの構築分
   OR (created_at = '2024-01-01 00:00:00' AND id > 10) # 2回目のarel_columnの構築分
```


より詳しい内容は以下を参照してみてください。


[activerecord_cursor_paginate/cursor.rb#L15C1-L45C8](https://github.com/healthie/activerecord_cursor_paginate/blob/a8d16e016c15c37de1be731ea606bb780f4f9b23/lib/activerecord_cursor_paginate/cursor.rb#L15C1-L45C8)


業務で実装した際のカーソルの生成と適用のコードを紹介します。


単一カラムソートでの対応なので以下のようになったのかなと今になって思いました。activerecord_cursor_paginationのように複数カラムのソートには対応する必要があったらArray.zipを使えたかも。


今回実際のgemの実装を見たりする中で、実装前に読んでおけばまた違ったコードが書けた気がするなと思いました。


```ruby
def q_cursor(q, cursor, sort_order)
  return q if cursor.blank?

  sort_column = cursor[:sort_column]
  sort_value = cursor[sort_column.to_sym]
  id = cursor[:id]
  operator = sort_order == 'asc' ? '>' : '<'

  q.where(
    "#{sort_column} #{operator} :sort_value OR (#{sort_column} = :sort_value AND id #{operator} :id)",
    sort_value: sort_value,
    id: id
  )
end

def generate_cursor_hash(media, sort_column)
  {
    sort_column: sort_column,
    file_name: media.file_name,
    file_size: media.file_size,
    id: media.id
  }
end
```


## さいごに


いかがでしたでしょうか？


ページネーションはサービスの中でもかなり当たり前のように使用される技術かなと思うのですが、いざ深堀りしてみるとそもそも2種類あったということに驚いたのと、内部の仕組み自体も大枠は意外と単純に感じられました。


今後またページネーションを活用することがあれば、今回の件を思い出してよりより実装ができればなと思います。

