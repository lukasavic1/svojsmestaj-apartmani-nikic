import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const photos = JSON.parse(fs.readFileSync(path.join(root, "_scrape", "photos.json"), "utf8"));
const outRoot = path.join(root, "public", "images");
const mediaFile = path.join(root, "data", "media.ts");

const extra = {
  logo: "https://apartmaninikic.me/wp-content/uploads/2026/06/apartmani-nikic-tivat-logo.png",
  icon: "https://apartmaninikic.me/wp-content/uploads/2026/06/apartmani-nikic-tivat-ikona-300x300.png",
};

const groups = {
  home: photos.home.photos,
  orange: photos.orange.photos,
  beautifulView: photos["beautiful-view"].photos,
  studio: photos.studio.photos,
  green: photos.green.photos,
  grey: photos.grey.photos,
  blue: photos.blue.photos,
  logo: [extra.logo],
  icon: [extra.icon],
};

const folder = {
  home: "home",
  orange: "orange",
  beautifulView: "beautiful-view",
  studio: "studio",
  green: "green",
  grey: "grey",
  blue: "blue",
  logo: "brand",
  icon: "brand",
};

function extOf(url) {
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  return ext && ext.length <= 5 ? ext : ".jpg";
}

function photon(url, dest) {
  const u = new URL(url);
  const ext = path.extname(dest).toLowerCase();
  const fm = ext === ".png" ? "png" : ext === ".jpg" || ext === ".jpeg" ? "jpg" : "";
  return `https://i0.wp.com/${u.hostname}${u.pathname}?ssl=1${fm ? `&fm=${fm}` : ""}`;
}

function looksLikeImage(buf) {
  if (buf.length < 24) return false;
  if (buf[0] === 0xff && buf[1] === 0xd8) return true; // jpeg
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true; // png
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return true; // gif
  if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[8] === 0x57) return true; // webp
  return false;
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 400) {
    const existing = fs.readFileSync(dest);
    const ext = path.extname(dest).toLowerCase();
    const jpeg = existing[0] === 0xff && existing[1] === 0xd8;
    const png = existing[0] === 0x89 && existing[1] === 0x50;
    if ((ext === ".jpg" || ext === ".jpeg") && jpeg) return;
    if (ext === ".png" && png) return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const sources = [photon(url, dest), url];
  let lastErr = null;
  for (const src of sources) {
    try {
      const res = await fetch(src, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          Accept: "image/jpeg,image/png,image/*,*/*;q=0.8",
          Referer: "https://apartmaninikic.me/",
        },
      });
      if (!res.ok) throw new Error(`${res.status} ${src}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (!looksLikeImage(buf) || buf.length < 400) {
        throw new Error(`not an image (${buf.length}b) ${src}`);
      }
      fs.writeFileSync(dest, buf);
      return;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr ?? new Error(url);
}

const local = {};
const jobs = [];

for (const [key, urls] of Object.entries(groups)) {
  local[key] = [];
  const dir = folder[key];
  urls.forEach((url, i) => {
    const name =
      key === "logo" ? "logo.png" : key === "icon" ? "icon.png" : `${String(i + 1).padStart(2, "0")}${extOf(url)}`;
    const rel = `/images/${dir}/${name}`;
    local[key].push(rel);
    jobs.push({ url, dest: path.join(outRoot, dir, name), rel });
  });
}

async function pool(items, limit, fn) {
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const item = items[i++];
      await fn(item);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
}

let done = 0;
await pool(jobs, 5, async (job) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await download(job.url, job.dest);
      done += 1;
      console.log(`${done}/${jobs.length} ${job.rel}`);
      return;
    } catch (err) {
      if (attempt === 2) throw err;
      await new Promise((r) => setTimeout(r, 600 * (attempt + 1)));
    }
  }
});

function asTs(value) {
  if (Array.isArray(value)) {
    return `[\n${value.map((v) => `    "${v}",`).join("\n")}\n  ]`;
  }
  return JSON.stringify(value);
}

const lines = [
  "/** Local copies of photos from apartmaninikic.me — served from /public/images. */",
  "export const media = {",
  `  home: ${asTs(local.home)},`,
  `  orange: ${asTs(local.orange)},`,
  `  beautifulView: ${asTs(local.beautifulView)},`,
  `  studio: ${asTs(local.studio)},`,
  `  green: ${asTs(local.green)},`,
  `  grey: ${asTs(local.grey)},`,
  `  blue: ${asTs(local.blue)},`,
  `  logo: ${JSON.stringify(local.logo[0])},`,
  `  icon: ${JSON.stringify(local.icon[0])},`,
  `  about: ${JSON.stringify(local.home[0])},`,
  "} as const;",
  "",
];

fs.writeFileSync(mediaFile, lines.join("\n"));
console.log("wrote data/media.ts");
