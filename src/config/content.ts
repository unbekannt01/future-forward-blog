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

let contentCache: ContentData | null = null;
let loadingPromise: Promise<ContentData> | null = null;

async function loadContent(): Promise<ContentData> {
  // ✅ Instant return if already cached
  if (contentCache) {
    return Promise.resolve(contentCache);
  }
  
  // ✅ Avoid duplicate fetch calls
  if (loadingPromise) {
    return loadingPromise;
  }
  
  loadingPromise = (async () => {
    try {
      // 🌐 CDN URL (Production) - Environment variable se load karo
      const CDN_URL = import.meta.env.VITE_CONTENT_CDN_URL;
      
      // Development: Local file
      const isDev = import.meta.env.DEV;
      const contentUrl = isDev ? '/content.json' : CDN_URL;
      
      if (!contentUrl) {
        throw new Error('Content URL not configured');
      }
            
      const response = await fetch(contentUrl, {
        cache: 'force-cache', // Browser cache for speed
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load content`);
      }
      
      contentCache = await response.json();
      return contentCache;
      
    } catch (error) {
      console.error('❌ Error loading content:', error);
      
      // Fallback data
      return {
        siteConfig: {
          name: "NexBlog",
          tagline: "Blog Platform",
          author: "NexBlog Team",
          description: "Tech Blog"
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

// ✅ Export functions with optimized caching
export async function getSiteConfig() {
  const data = await loadContent();
  return data.siteConfig;
}

export async function getCategories() {
  const data = await loadContent();
  return data.categories;
}

export async function getBlogPosts() {
  const data = await loadContent();
  return data.blogPosts;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const data = await loadContent();
  if (category === "All") return data.blogPosts;
  return data.blogPosts.filter(post => post.category === category);
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const data = await loadContent();
  return data.blogPosts.find(post => post.id === id);
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const data = await loadContent();
  const lower = query.toLowerCase();
  return data.blogPosts.filter(
    post =>
      post.title.toLowerCase().includes(lower) ||
      post.excerpt.toLowerCase().includes(lower) ||
      post.tags.some(tag => tag.toLowerCase().includes(lower))
  );
}

// ✅ Preload function - app start pe hi load karo
export function preloadContent() {
  loadContent().catch(console.error);
}