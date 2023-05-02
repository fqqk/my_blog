
    ---
    title: "privateとprivate"
    created_at: "2023-04-22"
    updated_at: "2023-05-03"
    tags: ["ruby,ror"]
    ---
    
# privateが２つ定義されていたのだが…


僕は普段業務ではRubyを扱っていて、最近privateが同一ファイル上に2つあることに気づいた。


> 💡 privateメソッドはクラスの内部からしか呼び出せないメソッド(レシーバがselfに限定されるメソッド)


他のファイルでは、privateの定義は一つしかない。


誰かがファイルの下にあるprivateを間違えて定義してしまったものを放置しているのではないか？と考え安易に削除してPRを出したのだが、これが誤りだった。


指摘をもらったことで救われたので忘れないうちに復習。


# 消してはいけなかった理由


よく目にするものは純粋なprivateメソッド。


privateの下に記述されたメソッドが全てprivateメソッドとなるというやつだ。


それしかないものだと思っていたから今回のようなことになってしまったわけだが、完全に見落としていたのだ。privateなクラスメソッドのことを。


以下が1000行を超えるファイル内に存在して「これミスってるのでは？」と思ってしまった…


こうしてみると明らかに違う。


```ruby
class Apple

　# クラスメソッド
  class << self
    def slice
      '剥く'
    end
    .
    .
    .
    
    private
    
    # クラスメソッドのprivateメソッド(ややこしい...)
    def eat
      '食べる'
    end
    
  end

  .
  .
  .
  .
  # これより下に記述されたものはAppleクラス内部からしか呼び出せない。つまりApple.methodの形を取る必要がある
  # これがよく目にする形式。この書き方でprivateメソッドになるのはインスタンスメソッドのみ
  # クラスメソッドはこの下に記述してもprivateにはならないので上のような書き方をする必要がある。
  private

  def cut
    '切ります'
  end
  
end
```


実際に呼び出してみる


```ruby
apple = Apple.new
apple.cut
# NomethodErrorとなり外からは呼べない。

Apple.cut
# NomethodErrorとなり外からは呼べない。

# クラスメソッドは呼べる
Apple.slice
#=> "剥く"

# クラスメソッドのprivateメソッドは呼べない
Apple.eat
#=> NomethodError
```


# ついでにprivateメソッドについて新しく学んだこと


せっかくなので少し踏み込んで学習してみることにする。


こういう小さな積み重ね。最初はめんどいなとは思うけどやりだすとと歯止めが効かなくなる。


## Ruby2.6系と2.7系以降ではprivateメソッドの呼び出しに変更がある


Ruby2.6までは「privateメソッドは明示的にレシーバを指定できない」というルールがあったので、クラスの内部であってもselfつき呼び出しをすることができなかった。


しかし、Ruby2.7からはselfをつけてprivateメソッドを呼び出すことが許可された。


```ruby
class User
  def hello
    "Hello, I am #{self.name}"
  end

  private

  def name
    'Alice'
  end
end
```


Ruby2.6以前


```ruby
user = User.new
user.hello
#=> NomethodError
```


Ruby2.7以降


```ruby
user.hello
#=> "Hello, I am Alice"
```


## privateメソッドはサブクラスでも呼び出せる


他の言語では、「privateメソッドはそのクラスの内部でのみ呼び出せる」という仕様になっているらしいが、Rubyの場合は「privateメソッドはそのクラスのみならず、サブクラスでも呼び出せる」という仕様になっている。


```ruby
class Product
  private
  
  def name
    'A great movie'
  end
end

class DVD < Product
  def to_s
    # nameはスーパークラスのprivateメソッド
    "name: #{name}"
  end
end

dvd = DVD.new
# 内部でスーパークラスのprivateメソッドを呼んでいるがエラーにならない。
dvd.to_s
#=> "name: A great movie"
```


継承できるということはオーバーライドも可能ということ。


```ruby
class Product
  def to_s
    # nameは常に"A great movie"となるとは限らない
    "name: #{name}"
  end

  private
  
  def name
    'A great movie'
  end
end

class DVD < Product
  private
  
  def name
    'An awesome film'
  end
end

product = Product.new
# Productクラスのnameメソッドが使われる
product.to_s
#=> "name: A great movie"

dvd = DVD.new
# オーバーライドしたDVDクラスのnameメソッドが使われる
dvd.to_s
#=> "name: An awesome film"
```


サブクラスのサブクラス(サブサブクラスとでもするか。)から大元の親クラスのprivateメソッドも継承できるか試してみたのだが、呼び出すことができた。ずっと継承されるみたい。


Rubyでは継承を使う場合はスーパークラスの実装もしっかりと把握する必要があるということだ。意図しない変更とならないよう注意を払いたい。


# さいごに


privateメソッドはクラスメソッドの中に定義されることも全然ある。ということを改めて学んだ。


privateメソッドを自分自身が実装したことはまだないが、いざやるとなった際にすぐ動ける状態になっておきたい。何事においても。

