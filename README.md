# eki-in-scroll-bar  
．  
　　　　　┏━━━━━┓  
　┏━━━┻━━━━━┻━━━┓  
┏┛　　　　┏━━━┓　　　　┗┓  
┃┏━━━┓┃　　　┃┏━━━┓┃  
┃┗━━━┛┗━━━┛┗━━━┛┃  
┃┏━━┳━━┳━━━━━━━┓┃  
┃┃　　┃　　┃　　　　　　　┃┃  
┃┃　　┃　　┃　　　　　　　┃┃  
┃┗━━╋━━╋━━━━━━━┛┃  
┣━━━╋━━╋━━━━━━━━┫  
┃　回　┃　　┃　２０１９　回　┃  
┣━━━╋━━╋━━━━━━━━┫  
┃　口　┃　　┃　　　　　　口　┃  
┗┳━━┻┳━┻━━━┳━━━┳┛  
┏┻━━━┻┓　　　┏┻━━━┻┓  
┗┓　　　　┗━━━┛　　　　┏┛  
　┗━━━━━━━━━━━━━┛  

## 概要
- スクロールバーを持つボックスを生成するjQueryプラグインです。
- data属性を付けることで、サイズ、デザインや機能をカスタマイズすることができます。
- 動作確認済みブラウザ：Google Chrome、FireFox、Safari、Microsoft Edge、Internet Explorer 11
- プラグイン名のeki-inは開発者の趣味であり、機能面での関与はありません。普通のスクロールバーです。

## 機能
- ボックス内右側にスクロールバーを生成する
- スクロールバーを掴んでボックス内のコンテンツを上下にスクロールする
- スクロールバー稼働範囲内の余白をクリックしてPageupとPageddownする
- マウスホイールで上下方向にスクロール
- 上下スクロールボタンをクリックして上下スクロールを連続的に行う(data-scrb-btn="true"を付けてください)

## 使い方
- jQueryを先に読み込み、その後にこのプラグインを読み込んで下さい。
- スクロールするコンテンツににしたい要素(divタグ推奨)に対して、class="scrb-parent"を設定してください。
- 生成されたボックスは、ページの上から順にscrb-box_1,scrb-box_2...のようにidが付与されます。  

## 構造
- div.scrb-parent　大元のボックス。ページ内で上からid="scrb-box_[1から数える番号]"が付与される。  
  - div.scrb-child_v　(縦方向の)スクロールバーの親要素。バーのサイズ。イベント受付のための要素。  
    - div.scrb-child_v_body　バーの本体。親要素と同じサイズ。CSSでの装飾はこちらに行う。  
    - div.scrb-child_v_p.scrb-child_v_b　バーの擬似要素的存在(::before)。バーの上に隣接し、高さはボックスと同じ。押すとpageupする。  
    - div.scrb-child_v_p.scrb-child_v_a　バーの擬似要素的存在(::after)。バーの下に隣接し、高さはボックスと同じ。押すとpagedownする。  
  - div.scrb-child_v_btn.scrb-child_v_btn_b　押すと上へスクロールするボタン。ボックス内右上に配置。非表示時は高さ0となる。  
    - div.scrb-child_v_btn_arrow.scrb-child_v_btn_b_arrow　ボタン内の「▲」の部分。  
  - div.scrb-child_v_btn.scrb-child_v_btn_a　押すと下へスクロールするボタン。ボックス内右下に配置。非表示時は高さ0となる。  
    - div.scrb-child_v_btn_arrow.scrb-child_v_btn_a_arrow　ボタン内の「▼」の部分。  
  - div.scrb-child　ボックス内直下に生成するインナーの要素。元々ボックス内にあった要素は全てこの中に移動、格納される。  

## 属性値でスタイルをカスタマイズ

- ボックスの設定
  - data-scrb-w　ボックスの幅を設定(cssと同じ単位が使用可能、デフォルトは300px)  
  - data-scrb-h　ボックスの高さを設定(cssと同じ単位が使用可能、デフォルトは300px)  
  - data-scrb-trs　スクロール時の動き方(transition)を設定(cssと同じ書き方、デフォルトでは無し)  
  - data-scrb-bd　ボックスのボーダーを設定(cssと同じ書き方、デフォルトは solid 1px \#000)  

- スクロールバーの設定
  - data-scrb-bar-w　スクロールバーの幅を設定(cssと同じ単位が使用可能、デフォルトは15px)  
  - data-scrb-bar-bgc　スクロールバーの背景色を設定(cssと同じ書き方、デフォルトは \#999)  
  - data-scrb-bar-bgc-hover　スクロールバーのhover時の背景色を設定(cssと同じ書き方、デフォルトは \#bbb)  

- スクロールバーの上下余白の設定
  - data-scrb-bar-p-bgc　スクロールバーの上下余白の背景色を指定(cssと同じ書き方、デフォルトは \#ddd)  
  - data-scrb-bar-p-bgc-hover　スクロールバーの上下余白のhover時の背景色を設定(cssと同じ書き方、デフォルトは \#eee)  

- スクロールボタンの設定
  - data-scrb-btn　スクロールバーの上下スクロールボタンを表示するには"true"を設定する(デフォルトでは無し)  
  - data-scrb-btn-bgc　ボタンの背景色を設定(cssと同じ書き方、デフォルトは \#666)  
  - data-scrb-btn-bgc-hover　ボタンのhover時の背景色を設定(cssと同じ書き方、デフォルトは \#aaa)  
  - data-scrb-btn-c　ボタンの文字色を設定(cssと同じ書き方、デフォルトは \#fff)  
  - data-scrb-btn-c-hover　ボタンのhover時の文字色を設定(cssと同じ書き方、デフォルトは \#fff)  
