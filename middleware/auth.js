export function userAuthMiddleware(req, res, next) {
    // 假設用 cookie 或 header 驗證，例如：
    const token = req.cookies?.user_access_token; 
  
    if (!token) {



      const from = encodeURIComponent(req.originalUrl);
      return res.redirect(`/_backend/login?from=${from}`);
    }
  
    // 可以在這裡驗證 token 的有效性，例如 JWT 驗證
  
    // 若驗證通過，進入下一個 middleware 或處理函數
    next();
  }