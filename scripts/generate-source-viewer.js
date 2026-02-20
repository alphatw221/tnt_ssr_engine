import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.resolve(ROOT, "source-viewer");

// All components from TypeElementSSR.jsx
// scss: array of .module.scss paths relative to project root
const components = [
  { name: "custom_slider", file: "src/components/component-instance/custom-slider/CustomSliderCSR.jsx",
    scss: ["src/components/component-instance/custom-slider/CustomSlider.module.scss"] },
  { name: "customer_login_form", file: "src/components/component-instance/LoginForm.jsx",
    scss: ["src/components/component-instance/LoginForm.module.scss"] },
  { name: "customer_register_form", file: "src/components/component-instance/RegisterForm.jsx",
    scss: ["src/components/component-instance/RegisterForm.module.scss"] },
  { name: "cart_detail", file: "src/components/component-instance/cart/CartDetail.jsx",
    scss: ["src/components/component-instance/cart/CartDetail.module.scss"] },
  { name: "checkout_form", file: "src/components/component-instance/cart/CheckoutForm.jsx",
    scss: ["src/components/component-instance/cart/CheckoutForm.module.scss"] },
  { name: "cart_button", file: "src/components/component-instance/cart/CartButton.jsx",
    scss: ["src/components/component-instance/cart/CartButton.module.scss"] },
  { name: "my_orders", file: "src/components/component-instance/order/MyOrders.jsx",
    scss: ["src/components/component-instance/order/MyOrders.module.scss"] },
  { name: "order_detail", file: "src/components/component-instance/order/OrderDetailSSR.jsx",
    scss: ["src/components/component-instance/order/OrderDetail.module.scss"] },
  { name: "order_payment", file: "src/components/component-instance/order/OrderPaymentSSR.jsx",
    scss: ["src/components/component-instance/order/OrderPayment.module.scss"] },
  { name: "my_account_button", file: "src/components/component-instance/MyAccountButton.jsx",
    scss: ["src/components/component-instance/MyAccountButton.module.scss"] },
  { name: "website_search_bar", file: "src/components/component-instance/WebsiteSearchBar.jsx",
    scss: ["src/components/component-instance/WebsiteSearchBar.module.scss"] },
  { name: "contact_us_form", file: "src/components/component-instance/ContactUsForm.jsx",
    scss: ["src/components/component-instance/ContactUsForm.module.scss"] },
  { name: "shop", file: "src/components/component-instance/shop-product/Shop.jsx",
    scss: ["src/components/component-instance/shop-product/Shop.module.scss"] },
  { name: "ck_editor", file: "src/components/component-instance/my-ckeditor/CKEditorSSR.jsx",
    scss: ["src/components/component-instance/my-ckeditor/CKEditor.module.scss"] },
  { name: "product_detail", file: "src/components/component-instance/product-detail/ProductDetailClient.jsx",
    scss: ["src/components/component-instance/product-detail/ProductDetail.module.scss"] },
  { name: "blog_post_detail", file: "src/components/component-instance/blog-post-detail/BlogPostDetailSSR.jsx",
    scss: ["src/components/component-instance/blog-post-detail/BlogPostDetail.module.scss"] },
  { name: "ResetPasswordForm", file: "src/components/component-instance/ResetPasswordForm.jsx",
    scss: ["src/components/component-instance/ResetPasswordForm.module.scss"] },
  { name: "ComposeProductModal", file: "src/components/product/ComposeProductModal.jsx",
    scss: ["src/components/product/ComposeProductModal.module.scss"] },
  { name: "OrderItemsSummary", file: "src/components/component-instance/order/OrderItemsSummary.jsx",
    scss: ["src/components/component-instance/order/OrderItemsSummary.module.scss"] },


    

];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function readFile(relativePath) {
  try {
    return fs.readFileSync(path.resolve(ROOT, relativePath), "utf-8");
  } catch {
    return null;
  }
}

function buildPage(comp, jsxSource, scssEntries) {
  const scssSections = scssEntries
    .map(({ file, source }) =>
      `<h2>${file}</h2>\n<pre>${escapeHtml(source)}</pre>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>${comp.name}</title>
</head>
<body>
<h1>${comp.name}</h1>
<h2>${comp.file}</h2>
<pre>${escapeHtml(jsxSource)}</pre>
${scssSections}
</body>
</html>`;
}

function buildIndex() {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>Source Viewer</title>
</head>
<body>
<h1>Components</h1>
<ul>
${components.map((c) => `<li><a href="${c.name}.html">${c.name}</a> - ${c.file}</li>`).join("\n")}
</ul>
</body>
</html>`;
}

// Generate
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "index.html"), buildIndex());

for (const comp of components) {
  const jsxSource = readFile(comp.file) || `// File not found: ${comp.file}`;

  const scssEntries = (comp.scss || [])
    .map((scssPath) => ({ file: scssPath, source: readFile(scssPath) }))
    .filter((entry) => entry.source !== null);

  fs.writeFileSync(path.join(OUT_DIR, `${comp.name}.html`), buildPage(comp, jsxSource, scssEntries));
}

console.log(`Generated ${components.length + 1} pages in ${OUT_DIR}`);
