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
      // Production: Environment variable se load
      const envContent = import.meta.env.VITE_CONTENT_JSON;
      
      if (envContent) {
        console.log('📦 Loading from environment variable...');
        const decoded = atob(envContent);
        contentCache = JSON.parse(decoded);
        return contentCache;
      }
      
      // Development: Local file se load
      console.log('📁 Loading from local file...');
      const response = await fetch('/content.json');
      
      if (!response.ok) {
        throw new Error('Failed to load content.json');
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