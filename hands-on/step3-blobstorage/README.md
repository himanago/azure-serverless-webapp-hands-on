## Azure Blob Storageでの静的Webサイトホスティング

最後に、Azure Blob Storageの静的Webサイトホスティング機能を使ってWebサイトの公開をします。
公開するのは、Vue.jsとVuetifyを使って作った簡易アプリケーションです。

TODOの作成などの機能を持ち、さきほどFunction Appとして作ったTODOのREST APIを呼び出します。

ストレージアカウントを作成し、Blob Storageの静的Webサイトホスティングの設定を行って、本リポジトリの [static-web-vue](../src/static-web-vue) フォルダの中身をアップロードしてください。
その際、[js/script.js](../src/static-web-vue/js/script.js)の一番上にあるURLを、さきほど作ったプロキシのURLに変更してください。
（詳細は後日追記します）



