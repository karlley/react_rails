# README

React、Railsを使ったTODOアプリ作成

[Rails\+React（SPA）TODOアプリチュートリアル【0から学ぶ】](https://zenn.dev/prune/books/0d7d6e3c5f0496)

## 環境

書籍のバージョンとは異なっているが問題無いらしい

```sh
$ pwd
/home/kariya/workspace/study/react_rails
$ ruby -v
ruby 3.1.1p18 (2022-02-18 revision 53f5fc4236) [x86_64-linux]
$ rails -v
Rails 7.0.6
$ rbenv -v
rbenv 1.2.0-70-g4fec76f
$ bundler -v
Bundler version 2.4.17
$ node -v
v18.17.0
$ yarn -v
1.22.19
$ npm -v
9.6.7
```

## 4.【React】React関連パッケージのインストール

以下が必要

* Node.js
* yarn

### Node.js

* JavaScript実行環境
* Node.jsをインストールすると`npm` もインストールされる

### `npm` 

* Node.jsのパッケージ管理ライブラリ
* Node Package Manager
  * Rubyのbundlerのようなもの
* 同じようなものとして`yarn` がある

### `nodebrew`

* Node.jsのバージョン管理ツール
  * Rubyのrbenvみたいなもの
  * Macのみ？(Windowsには入れていない)

### `yarn`

* JavaScriptのパッケージマネージャー
* `npm` みたいなもの
* `npm` よりインストールが早い
* `npm` と互換性があるので並行して使える

##【Rails】5.新規プロジェクト作成

Railsを元にプロジェクトを作成

### APIアプリケーション

* API = Application Programming Interface
* インターフェースはReact、インターフェースからのデータの処理はRails
  * RailsのレスポンスはJSON

### APIモードでアプリケーション作成

* `--api` オプションでapiモードで作成できる

```sh
$ pwd
/home/kariya/workspace/study/react_rails
$ rails -v
Rails 7.0.6
$ rails _7.0.6_ new todo_api --api
$ cd todo_api
$ bundle install
```

### ポート番号設定

* ポート番号を変更しないとReactとポートが被るので変更するらしい
* `3000` から`3010` に変更

```ruby
# config/puma.rb

# port ENV.fetch("PORT") { 3000 }
port ENV.fetch("PORT") { 3010 }
```

### DB作成

```sh
$ rails db:create
```

### CORS設定

CORSとは？

* Cross-Origin Resource Sharing
* React等の別のオリジンからRailsAPIへのアクセス制限を解除する(デフォルトでは制限されている)
* Gemを使って設定できる(`rack-cors` Gem)

```ruby
# Gemfile

gem "rack-cors"
```

アクセス制限を解除する項目を追記する。

* 指定するURLは解除する側(React側)を記述する
* ` credentials: true` でCookieが使えるようになる
* メソッド内の`options` はプリフライトリクエストらしい
  * [CORSがよくわからないので解説してみた＆Rails APIでのCORS設定 \- Qiita](https://qiita.com/mtoyopet/items/326ba62d485e9ef0dacd)
* 設定追加後にサーバを再起動後、`localhost:3010` にアクセスする

```ruby
# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
```

## 6.【React】create-react-appで新規プロジェクトを作成

create-react-appを使ってReactの雛形を作る

```sh
$ pwd
/home/kariya/workspace/study/react_rails
$ npx create-react-app todo-web
$ cd todo-web
$ pwd
/home/kariya/workspace/study/react_rails/todo_api/todo-web
$ yarn start
```

* Railsプロジェクト内でReactプロジェクトを作るイメージ
* コマンド実行後にReactプロジェクトのディレクトリが作成される
* Reactプロジェクト内でサーバーを立ち上げる
* `yarn start` 後に`localhost:3000` にアクセスするとReactの画面が表示される

### `npx`

* Node Package eXecutor
* Node.jsパッケージの実行を一時的に行うためのコマンドラインツール
  * インストール、実行、アンインストールまでの一連の流れを行う
  * 実行後はファイルが残らない(`npm` はファイルが残る)

## 7.【React】Reactの基礎とJSX

## 8.【React】コンポーネントを学んでTaskコンポーネントを作成

### コンポーネント

* UIの部品
* `components/` ディレクトリ内に1コンポーネント1ファイルで作成する

### `props`

* 親から子の向きでpropsは受け渡されていく

### クラスコンポーネント、関数コンポーネント

* 主流は関数コンポーネント
* ReactHooksでクラスコンポーネント限定の機能も使えるようになった
* `this` を使わなくてよい
* [Reactのクラスコンポーネントと関数コンポーネントの違い \- karlley](https://scrapbox.io/karlley/React%E3%81%AE%E3%82%AF%E3%83%A9%E3%82%B9%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A8%E9%96%A2%E6%95%B0%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E9%81%95%E3%81%84)

### `import`、`export`

* `import`：他ファイルでexportされているコンポーネントや定数などを取り込むこと。
* `export`：他ファイルでもコンポーネントを使用できるようにすること

### default export、named export

* エクスポート方法の違いで呼び出し方が異なるので注意
* [Reactでコンポーネントが見つからない時にはimport/exportを確認する \- karlley](https://scrapbox.io/karlley/React%E3%81%A7%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%8C%E8%A6%8B%E3%81%A4%E3%81%8B%E3%82%89%E3%81%AA%E3%81%84%E6%99%82%E3%81%AB%E3%81%AFimport%2Fexport%E3%82%92%E7%A2%BA%E8%AA%8D%E3%81%99%E3%82%8B)

### React Fragment

* JSX内の`<>`や`</>` のような空要素のこと
* Reactは`return` で1つの要素しか返せない
  * 一番上の親要素が1つだけ
  * divタグ等で不必要に囲む必要が無くなる

##【React】ChakraUIを使ってTaskコンポーネントのデザインを整える

## 9.【React】ChakraUIを使ってTaskコンポーネントのデザインを整える

CSSフレームワークの導入

### ChakraUI

* CSSフレームワーク
* ReactのUIコンポーネントライブラリ
* MaterialUIやBootstrap等が同じ

```sh
# Reactプロジェクトに移動
$ cd todo_web
$ pwd
/home/kariya/workspace/study/react_rails/todo_api/todo-web
# Reactプロジェクトにパッケージをインストール
$ yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

### プロバイダー設置

* 親コンポーネントである`App.js` をChakraのProviderで包むこと
* 包むコンポーネントは`ChakraProvider` 

## 10.【React】React Hooksについて学んで、実際に使ってみる

### React Hooks

* クラスコンポーネント限定の機能(State、Lifecycle等)を関数コンポーネントで使えるようになる
* React16.8から使える 

### useState

* 関数コンポーネントでstateを管理するhooks
* `useState` のインポートが必要

```js
const [name, setName] = useState('田中')

const [状態管理する値, 更新する為の関数] = useState(初期値)
```

* `setState()` メソッドでstateの値を更新できる
  * 既存stateを新しいstateで置き換えるので再描画される

### useEffect

* クラスコンポーネントのライフサイクルメソッドと同等の機能が使える
  * `componentWillMount()`
  * `componentDidMount()`
  * `componentWillUnmount()`

* `useEffect` を記述する場所でどのライフサイクルの時に実行されるのか決まる
  * 関数内に記述: 初期化、更新時
  * `return` 内に記述: コンポーネントのアンマウント時
* `userEffect` の第2引数でどのタイミングで実行させるか制御することも可能
* 状態管理する値の変化をトリガーにして処理を実行することも可能

### 状態管理更新時のルール

* stateの値を`setState` メソッド以外で更新するのはNG
  * 更新する値のコピーを使ってstateを更新する

```js
# 元の値のコピーを使ってstateを更新している
const tasksCopy = [...tasks];
const isDone = tasksCopy[index].isDone;
tasksCopy[index].isdone = !isDone;
setTasks(tasksCopy);
```

## 11.【Rails】RailsAPIの基礎

* RailsのAPIモードの場合はレスポンスはJSONで返す
  * `render json: members`

## 12.【Rails+React】タスク一覧機能

* Railsが返すJSONを確認するにはコントローラーのアクションで指定したURLにアクセスすると生データが表示される

### Axios

* HTTPでAPI通信を行うツール
* yarnで導入した
  * `yarn add axios`
  * 導入はReactプロジェクトのディレクトリで行う(Railsプロジェクトだと失敗する)

## 13.【Rails+React】タスク作成機能

* コントローラーの`create` 後にヘッダのレスポンスのみ返す

### Railsの`head` メソッド

* 本文(body)無しのレスポンスをブラウザに返す
* 引数としてHTTPステータスコードをシンボルで指定できる
* [レイアウトとレンダリング \- Railsガイド](https://railsguides.jp/layouts_and_rendering.html#head%E3%81%A7%E3%83%98%E3%83%83%E3%83%80%E3%81%AE%E3%81%BF%E3%81%AE%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B9%E3%82%92%E7%94%9F%E6%88%90%E3%81%99%E3%82%8B)

### Reactの`e.target.value` の意味

[Reactのe\.target\.valueの意味 \- karlley](https://scrapbox.io/karlley/React%E3%81%AEe.target.value%E3%81%AE%E6%84%8F%E5%91%B3)

### Unpermitted parameter エラー

書籍通りに進めたらタスク作成時に`Unpermitted Parameter` エラーが発生する

[Reactから送信したパラメータがRailsでUnpermitted parameter エラー \- karlley](https://scrapbox.io/karlley/React%E3%81%8B%E3%82%89%E9%80%81%E4%BF%A1%E3%81%97%E3%81%9F%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%81%8CRails%E3%81%A7Unpermitted_parameter_%E3%82%A8%E3%83%A9%E3%83%BC)

## 14.【Rails+React】タスク削除機能

### Railsのparams

paramsの中には`:id` 以外のデータも含まれる

* リクエストボディ
* クエリパラメータ
* コントローラの情報
* アクション

`rails s` でのログにparamsに含まれているデータを確認できる

### ChakraUIのアイコンをインストール

```sh
$ yarn add @chakra-ui/icons
```

## 15.【Rails+React】タスク完了機能
