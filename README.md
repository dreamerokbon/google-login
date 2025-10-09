## 🧠 專案簡介（Overview）

這是一個整合 **Google OAuth 2.0 與本地會員登入機制** 的完整網站範例，  
使用者可選擇透過 Google 帳號或自行註冊帳號登入系統。  

登入後系統會保存 Session 狀態，並顯示個人資料頁與貼文功能。  
專案包含完整的：
- 使用者註冊／登入／登出流程  
- 密碼加密與驗證  
- OAuth 第三方登入（Google）  
- 權限保護與中介層驗證  
- EJS 模板渲染與 Bootstrap 前端版面  
---

## ⚙️ 使用技術（Tech Stack）

| 類別 | 技術 |
|------|------|
| 伺服器框架 | Express.js |
| 使用者驗證 | Passport.js |
| OAuth 第三方登入 | Google OAuth 2.0 |
| 資料庫 | MongoDB + Mongoose |
| 模板引擎 | EJS |
| Session 管理 | express-session |
| 密碼加密 | bcrypt |
| 訊息提示 | connect-flash |
| 環境設定 | dotenv |

---

## 🌟 功能特色（Features）

### 🔑 Google OAuth 登入
- 使用者可透過 Google 帳號一鍵登入  
- 若為首次登入，系統會自動建立新使用者  
- 使用者資訊包含 Google ID、名稱、Email、頭像等  

### 👤 本地會員註冊與登入
- 可輸入姓名、Email、密碼進行註冊  
- 密碼使用 bcrypt 進行雜湊加密  
- 登入後建立 Session 狀態保存  

### 🛡️ 權限驗證與導覽列變化
- 未登入者：只能瀏覽首頁／登入／註冊  
- 已登入者：可進入 Profile、Post、Logout  
- 導覽列根據 `req.user` 動態切換  

### 📝 個人檔案與貼文系統
- 登入後可查看個人資料（Google 或本地註冊）  
- 可新增貼文（標題、內容）並儲存於 MongoDB  
- 每位使用者僅能看到自己的貼文  

### 💬 Flash 訊息提示
- 使用 connect-flash 提示登入錯誤、註冊成功、貼文錯誤等狀態  
- Bootstrap alert 友善呈現  

---

## 🧭 學習重點（What I Learned）

- 串接 Passport.js 並整合 Google OAuth + 本地策略

- 設計 Session + Cookie 驗證機制

- 實作 bcrypt 密碼加密與比對流程

- 使用 connect-flash 顯示使用者互動訊息

- 建立可延伸的 Express 架構（MVC 分層 + 模板渲染）
