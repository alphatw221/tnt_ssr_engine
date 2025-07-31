import { remark } from "remark";
import html from "remark-html";
// import prism from "remark-prism";

export async function markdownToHtml(markdown) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}