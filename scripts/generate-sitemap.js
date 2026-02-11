import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON
const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../public/content.json"), "utf-8")
);

const posts = data.blogPosts;

const urls = posts
  .map(
    (p) => `
  <url>
    <loc>https://nexblogsite.vercel.app/blog/${p.id}</loc>
    <lastmod>${p.date}</lastmod>
    <priority>0.8</priority>
  </url>`
  )
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(
  path.join(__dirname, "../public/sitemap.xml"),
  sitemap.trim()
);

console.log("✅ sitemap.xml generated successfully");
