export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    slug: string;
  };
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  email?: string;
}

interface ContentData {
  siteConfig: {
    name: string;
    tagline: string;
    author: string;
    description: string;
  };
  categories: string[];
  blogPosts: BlogPost[];
}

// ------------------------------
// ⚡ High Performance Cache Setup
// ------------------------------

let contentCache: ContentData | null = null;
let cacheTime = 0;

// ⏳ Cache TTL (Best for blogs: 1–5 min)
const CACHE_TTL = 60 * 1000; // 1 minute

let loadingPromise: Promise<ContentData> | null = null;

// ------------------------------
// 🚀 Smart Loader (Fast + Safe)
// ------------------------------

async function loadContent(): Promise<ContentData> {
  const now = Date.now();

  // Serve fast cache if valid
  if (contentCache && now - cacheTime < CACHE_TTL) {
    return contentCache;
  }

  // Avoid duplicate parallel calls
  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      const CDN_URL = import.meta.env.VITE_CONTENT_CDN_URL;
      const isDev = import.meta.env.DEV;

      const contentUrl = isDev
        ? '/content.json'
        : `${CDN_URL}?t=${Date.now()}`; // Cache-bypass

      if (!contentUrl) {
        throw new Error('Content CDN URL missing');
      }

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(contentUrl, {
        cache: 'no-store',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      contentCache = data;
      cacheTime = now;

      return data;

    } catch (err) {
      console.error('❌ CDN Load Failed:', err);

      // Return old cache if available (offline-safe UX)
      if (contentCache) {
        console.warn('⚠️ Serving stale cached data');
        return contentCache;
      }

      // Emergency fallback
      return {
        siteConfig: {
          name: "NexBlog",
          tagline: "Tech Insights",
          author: "NexBlog Team",
          description: "High quality technical blogs"
        },
        categories: ["All"],
        blogPosts: []
      };
    } finally {
      loadingPromise = null;
    }
  })();

  return loadingPromise;
}

// ------------------------------
// 📦 Public APIs (Optimized)
// ------------------------------

export async function getSiteConfig() {
  return (await loadContent()).siteConfig;
}

export async function getCategories() {
  return (await loadContent()).categories;
}

export async function getBlogPosts() {
  return (await loadContent()).blogPosts;
}

export async function getPostsByCategory(category: string) {
  const posts = (await loadContent()).blogPosts;
  if (category === "All") return posts;
  return posts.filter(p => p.category === category);
}

export async function getPostById(id: string) {
  return (await loadContent()).blogPosts.find(p => p.id === id);
}

export async function searchPosts(query: string) {
  const lower = query.toLowerCase();
  return (await loadContent()).blogPosts.filter(p =>
    p.title.toLowerCase().includes(lower) ||
    p.excerpt.toLowerCase().includes(lower) ||
    p.tags.some(tag => tag.toLowerCase().includes(lower))
  );
}

// ------------------------------
// 🚀 Preload for Ultra-fast UX
// ------------------------------

export function preloadContent() {
  loadContent().catch(() => {});
}
