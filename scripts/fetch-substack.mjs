import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { XMLParser } from "fast-xml-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEED_URL = "https://rose270883.substack.com/feed";
const OUT_PATH = path.join(__dirname, "..", "src", "data", "substack-posts.json");

// category id -> hashtags/section names that map to it (matched case-insensitively,
// against the post's Substack tags/categories and, as a fallback, its title+body text)
const CATEGORY_MATCHERS = {
  strategy: ["strategy", "#strategy"],
  finance: ["finance", "#finance"],
  "ai-experiment": ["ai experiment", "aiexperiment", "#aiexperiment", "#ai-experiment"],
  "my-art": ["my art", "myart", "#myart", "#my-art"],
  "free-resources": ["free resources", "freeresources", "#freeresources", "#free-resources"],
};

function normalize(s) {
  return s.toLowerCase().replace(/[\s_-]+/g, "");
}

function firstImage(html) {
  if (!html) return "";
  const match = html.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : "";
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  console.log(`Fetching ${FEED_URL} ...`);
  const res = await fetch(FEED_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch Substack feed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
  const feed = parser.parse(xml);
  const rawItems = feed?.rss?.channel?.item ?? [];
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  const byCategory = Object.fromEntries(Object.keys(CATEGORY_MATCHERS).map((k) => [k, []]));

  for (const item of items) {
    if (!item?.title) continue;

    const contentHtml = item["content:encoded"] ?? item.description ?? "";
    const description = stripHtml(item.description ?? contentHtml).slice(0, 240);
    const image = firstImage(contentHtml) || firstImage(item.description);

    const tags = item.category
      ? (Array.isArray(item.category) ? item.category : [item.category]).map(String)
      : [];
    const haystack = normalize([...tags, item.title, description].join(" "));

    const post = {
      title: String(item.title),
      link: String(item.link ?? ""),
      pubDate: item.pubDate ?? null,
      description,
      image,
      tags,
    };

    for (const [categoryId, matchers] of Object.entries(CATEGORY_MATCHERS)) {
      const isMatch = matchers.some((m) => haystack.includes(normalize(m)));
      if (isMatch) byCategory[categoryId].push(post);
    }
  }

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(byCategory, null, 2));

  const counts = Object.entries(byCategory)
    .map(([k, v]) => `${k}: ${v.length}`)
    .join(", ");
  console.log(`Wrote ${OUT_PATH}`);
  console.log(`Post counts — ${counts}`);
  console.log(`Total items in feed: ${items.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
