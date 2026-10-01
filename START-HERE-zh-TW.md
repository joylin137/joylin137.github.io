# 把網站放到免費 GitHub Pages

這份檔案已包含首頁、About Me、三篇案例，以及網站使用的圖片、字型、樣式和影片。網站外觀使用原站的版面與樣式，手機導覽和影片播放器改用獨立程式。

## 先查看網站

1. 解壓縮 ZIP。
2. 打開裡面的 `index.html`，即可先看首頁。

## 發布網站

1. 登入 GitHub，新增 **Public** 儲存庫。
2. 儲存庫名稱填 `你的帳號名稱.github.io`，例如帳號為 `joylin`，就填 `joylin.github.io`。
3. 把解壓縮後的內容上傳到儲存庫最外層。最外層應直接看得到 `index.html`、各頁面、圖片與影片檔案。
4. 前往 **Settings → Pages**。
5. **Source** 選 **Deploy from a branch**。
6. **Branch** 選 **main**，資料夾選 **/(root)**，按 **Save**。
7. 等 GitHub 完成部署後，網站網址就是 `https://你的帳號名稱.github.io/`。

ZIP 是用來傳送整份網站的壓縮檔；上傳到 GitHub 前需先解壓縮。GitHub Pages 不會把 ZIP 自動展開成網站。

GitHub Free 的 Pages 需要公開儲存庫，網站原始碼與素材也會公開。已公開的作品集內容適合這種方式。

## 之後如何修改

- 修改文字：打開對應頁面的 `index.html`，搜尋要修改的句子，改好後重新上傳。
- 修改圖片：替換 網站裡對應的圖片，保留相同檔名即可。
- 修改共用樣式：編輯 `static.css`。

原本 Squarespace 的拖拉編輯器不會搬到 GitHub。這份是保留公開網站內容與版面的靜態版本；若要新增整段內容或大幅調整排版，需修改 HTML/CSS。

確認新網址的所有案例與影片都正常後，再處理 Squarespace 訂閱。

GitHub 官方說明：https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
