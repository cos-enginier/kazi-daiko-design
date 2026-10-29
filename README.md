# 余白｜家事代行サービス トップページ

小規模な家事代行事業を想定した、静的なトップページの制作デモです。HTML・CSS・JavaScriptとローカル画像で構成し、ビルドやパッケージのインストールは不要です。

## プレビュー

デザイン確認用の公開URL: https://cos-enginier.github.io/kazi-daiko-design/

ソース: https://github.com/cos-enginier/kazi-daiko-design

GitHub Pages は `main` ブランチのルートを公開します。変更をコミットして `main` にpushすると公開内容が更新されます。予約ボタンはRESERVAのテスト予約ページに接続済みです。実サービス・決済は行いません。

```sh
npm run dev
```

Python 3 が必要です。起動後、 http://127.0.0.1:4173 を開きます。`index.html` を直接ブラウザで開くこともできます。

## 実装内容

- スマートフォン・PC対応のトップページ
- サービス紹介（掃除・洗濯・片付け・料理）、単発／定期の参考料金、利用の流れ
- スタッフ紹介（架空2名）と、RESERVAのテストスタッフA〜Eを選択して予約を試す導線
- スクロール時のフェードイン（「動きを減らす」設定の端末では無効）、スマホの料金プランスライダー、ハンバーガーメニュー
- 開閉式FAQ、全8か所の予約リンク
- オリジナルのAI生成写真（WebP圧縮）とSVGロゴ・アイコン。外部フォント・画像・解析・ライブラリへの通信なし
- 制作デモ表示と検索エンジン向け noindex

## 公開前に確定すること

「余白」は仮称です。価格、最低利用時間、交通費、サービス内容、対応エリア、営業時間、キャンセル規定はデモの設定で、実事業の条件ではありません。実績・口コミ・資格・保険加入など、未確認の実績や保証は掲載していません。

予約ボタンは `https://reserva.be/yohaku_staff_test/` のスタッフ指名テストメニューへ直接移動します。画面の50円はテスト用の仮表示です。サイトの参考プランとRESERVAのテストメニューは別設定で、スタッフの自動指名やプランの自動引き継ぎは行いません。個人情報はRESERVA側で入力します。正式公開時は実際のメニュー・スタッフ・料金・運営者情報・必要な規約等を整え、noindexを見直してください。

## サービス構成の調査

2026年10月27日に以下の公式情報を参照。日常家事、単発と定期、相談から利用につなげる構成の参考にし、文面・画像は独自に作成しています。掲載価格は競合の価格の転載ではなく、デモ用の仮設定です。

- CaSy 定期サービス: https://casy.co.jp/service/subscription
- CaSy 掃除代行: https://casy.co.jp/service/cleaning
- CaSy 料理代行: https://casy.co.jp/service/cooking/
- ベアーズ スポットサービス: https://www.happy-bears.com/kaji/spot/

## ファイル

- `index.html`: ページ内容
- `styles.css`: レイアウト・レスポンシブ対応
- `script.js`: メニュー・相談案内
- `assets/`: 自作SVG
- `HANDOFF.md`: 2026-10-27以降の作業内容とL Message設定の引き継ぎメモ

## 2026-10-27 デザイン更新

写真中心のファーストビュー、明るいグリーンと白、コーラル色の丸い相談ボタン、円形のサービス案内、料金帯、スマートフォン用固定相談ボタンに更新しました。

参考サイト（デザイン構成を参照し、画像・ロゴ・コピーは転載していません）:
- https://lp.taskaji.jp/lp1
- https://30min.page/lp
- https://user.support.kirari.co.jp/
- https://www.happy-bears.com/kaji/price/

### 写真の出典

`assets/housekeeping-hero.webp` は組み込み image_gen ツールで作成し、WebPに圧縮したオリジナル素材です。実在のスタッフの写真ではありません。使用した最終プロンプト:

> Use case: photorealistic-natural. Asset type: Japanese housekeeping service landing page hero photograph, wide landscape 3:2. A friendly Japanese adult female professional housekeeper in a light sage green apron over white shirt, naturally smiling while wiping a sparkling white kitchen counter with a cloth. Bright realistic Japanese modern family apartment, white cabinetry, soft light oak details, small houseplant. Composition: woman occupies right half, medium waist-up view, realistic hands actively cleaning, left half mostly softly sunlit kitchen with space for web text (do not add text). Warm authentic daylight, airy white and fresh green palette, premium approachable commercial lifestyle photography, not illustration. No words, no logos, no watermark. Fictional model, not a real employee.
