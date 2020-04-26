# Write Up
## ビルド周り
### Webpack周り
- `NODE_ENV`とWebpackの`mode`をproductionに
- CSSの圧縮(`cssnano`)
- ソースマップの除去
- jsとcssのbrotli圧縮(あとで`heroku`から`Netlify`+`Cloudflare`に移したので使われてない)
- code splitting(`React.lazy`)
  - あとで解除した
    - バンドルサイズが十分小さくなったため
    - 二段のリクエストになって逆に遅くなってたため
- js内のライセンスコメントのファイル分離(`optmization.minimizer.(TerserPlugin).extractComments`)
- 画像を別ファイルに(`url-loader`=>`file-loader`)
- common chunkの分離(`optimization.splitChunks`)
  - あんま効果なかった気がする
- ファイル名にハッシュを付与
  - 単純にデプロイ後にキャッシュ消すのめんどくさいので

### Babel周り
- `core-js`が全件インポートされてたのでそれを除去
  - 代わりに`@babel/preset-env`の`useBuiltIns: usage`をつけた
  - 今回はChrome最新版で動けばいいのでコードの中に新しいのが`optional-chaining`くらいしかなさそうだし、なくても多分動くけど一応
- Webpackのtree-shakingが効くように`@babel/plugin-transform-modules-commonjs`を除去
- babelを利用したreactの最適化(`@babel/plugin-transform-react-constant-elements`/`@babel/plugin-transform-react-inline-elements`/`transform-react-remove-prop-types`)
  - どれだけ効いてるかわかんない

## ライブラリ
- `lodash`
  - `lodash-es`に置き換え
    - これでtree-shakingが効く
  - 最終的には除去
    - `_.map` => `Array::map`
    - `_.filter` => `Array::filter`
    - `_.chunk` => `./src/domains/blog_list/components/BlogCardList/chunk`
    - `_.shuffle` => `./src/pages/entrance/shuffle`
- mockコードの除去
  - `process.env.USE_MOCK_DATA`でビルド先に含まれるかどうかが変わるように書き換え
  - mockが有効でないときは`axios-mock-adapter`が含まれないように(`webpack.IgnorePlugin`)
- `Moment.js`のlocaleとtimezoneの除去
  - 最終的には全部手書きに書き換え
    - `./src/domains/date`
- `jQuery`の除去
  - `document.querySelector`とかの生jsに書き換え
- `race-timeout`の除去
  - こいつが`bluebird`に依存してるため
  - `axios`の`timeout`オプションで書き換え
    - `axios`を除去したため最終的には`Promise.race`で書き換え
- `immutable.js`の除去
  - 大体スプレッド構文でかけるので(deep copyではないけど今回は大丈夫そうなので)
- `axios`の除去
  - `fetch`で書き換え
- `fortawesome`周りの除去
  - ライセンスコメント書いてsvgを挿入

## HTML周り / React周り
- `<script>`タグに`defer`を付与して`<head>`に挿入するように
  - `defer`にしたので`onload`内じゃない場所で実行開始するように(`DOMContentLoaded`と同様のタイミング)
- 初回取得を減らした上で無限スクロールの導入(`react-infinite-scroll-component`)
  - これはIntersectionObserverのPolyfillに依存してるけどChromeには実装されているため、その分岐に入ることはないのでWebpackの`IgnorePlugin`で除去
- APIを直列に叩いてたのを並列に(`Promise.all`)
  - 最終的には並列取得で受け取ったものから描画をするように
- シェアボタンは`requestIdleCallback`でスクリプトタグの挿入を行うように
  - 効果あるのかわからない
- フォント用の`rel="preconnect"`の記述
- フォントをcssでの`@import`ではなく`<link>`で行うように
  - 二段のリクエスト(`HTML` => `CSS` => `CSS`)になってたため
  - ページロード完了時(`onload`)に取得ように
    - 一番最初は必要ってわけではないので
- ヘッダの画像のpriority hintsを付与
  - `importance="high"`をつけた
    - 効果はわからない
- シェアボタン用の`rel="preload"`/`rel="preconnect"`の記述
  - これは`importance="low"`をつけた
    - そもそもシェアボタンは後回しで読み込まれるものなので
- 情報がない場合でもヘッダの幅などは描画するように
  - 白紙のページよりよいので

## CSS周り
- フォントのウェイトを`700`だけに
  - 太字しか使われていなかったため
- 使われていないcssの除去
  - ユーティリティ系のcss(?)が`@import`されてたけどクラス名の接頭辞でソース検索してもどれもヒットしなかった
- 記事内の`<iframe>`のローディング中表示
  - 効果はわからない

## 画像周り
- 画像のlazyloadをするように(`react-simple-img`)
  - `loading=lazy`だとダメなので
  - ヘッダの画像は解除
    - 常に画面内でかつ、どうでもいいものでもないので遅延させる必要がない
- 静的な画像を`webp`に変換
  - コマンドは`./command_memo.txt`(一つは大きさ固定なのでリサイズも行ってる)
- ユーザーなどの画像のキャッシュとリサイズとwebp化
  - `images.weserv.nl`を利用した
  - 収集して手元に持つのはレギュレーションが怪しそうだったので
  - 記事内の画像もこれを通るように
- ヘッダの画像の品質調整(同じく`images.weserv.nl`)
  - 幅が800なので品質50%でもそんなに荒く見えなかったので

## デプロイ環境
- PRで建つ`heroku`
- `Netlify` + `Cloudflare`に移管
  - サーバーがないので`Netlify`の`rewrite`で直接APIを叩くように
  - `Netlify`はbrotliの対応していないけど`Cloudflare`が返してくれる

# やんなかったこと
- `normalize.css`を`postcss-normalize`に置き換え
  - 今回はChromeだけなのでたぶんそこそこサイズ減らせるけど互換性周り調べられなかった
- ソースそのままで`create-react-app`への流し込み
  - Webpackの設定をほぼ何もせずにいい感じにしてくれるだろうけど思いついたのが遅かった
- SSR
  - やり方わかんないけどやったらたぶん速くなる
- node.jsからの`Go`などへの書き換えもしくはリバースプロキシそのままに
  - `Netlify`に移したのでやっているようなものではあるけど書き直したら`TTFB`の短縮が見込めそう
- placeholderの表示
  - 時間なくてやってないからわからないけど「速度インデックス」の改善ができそうな気がする
- クリティカルなもののページ別`rel="preload"`
  - ページによってそれに対応した`rel="preload"`を挿入して応答することで取得時間を短縮できる
