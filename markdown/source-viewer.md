已產生完畢。source-viewer/ 目錄包含：

index.html — 首頁，列出所有 18 個元件的卡片連結
每個元件各一個 HTML — 含語法高亮的完整原始碼（使用 highlight.js GitHub Dark 主題）
style.css — 左側欄導覽 + 響應式手機版
部署方式
整個 source-viewer/ 是純靜態檔案，直接放到任何 HTTP server 即可：


# 本地預覽
npx serve source-viewer

# 或部署到 Vercel / Netlify / GitHub Pages / Nginx 等
日後更新
元件有變動時重新執行：


node scripts/generate-source-viewer.js
如果需要新增其他檔案（例如 helper、slice 等），只要在腳本的 components 陣列中加入路徑即可。