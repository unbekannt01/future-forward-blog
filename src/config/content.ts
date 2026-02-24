// src/config/content.ts
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

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
  published?: boolean;
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

// ─────────────────────────────────────────
// Simple in-memory cache (1 min TTL)
// ─────────────────────────────────────────

const cache: {
  posts?: { data: BlogPost[]; time: number };
  categories?: { data: string[]; time: number };
} = {};

const TTL = 60 * 1000; // 1 minute

function isFresh(time: number) {
  return Date.now() - time < TTL;
}

// ─────────────────────────────────────────
// Public Read APIs
// ─────────────────────────────────────────

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (cache.posts && isFresh(cache.posts.time)) return cache.posts.data;

  try {
    // Single field orderBy — no composite index needed
    // published filter JS me ho raha hai
    const snap = await getDocs(
      query(collection(db, "posts"), orderBy("date", "desc"))
    );
    const posts = snap.docs
      .map((d) => ({ id: d.id, ...d.data() } as BlogPost))
      .filter((p) => p.published === true);

    cache.posts = { data: posts, time: Date.now() };
    return posts;
  } catch (err) {
    console.error("getBlogPosts error:", err);
    return cache.posts?.data ?? [];
  }
}

// Admin ke liye — ALL posts (drafts bhi)
export async function getAllPostsForAdmin(): Promise<BlogPost[]> {
  try {
    const snap = await getDocs(
      query(collection(db, "posts"), orderBy("date", "desc"))
    );
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogPost));
  } catch (err) {
    console.error("getAllPostsForAdmin error:", err);
    return [];
  }
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  // Cache check first
  if (cache.posts && isFresh(cache.posts.time)) {
    return cache.posts.data.find((p) => p.id === id);
  }
  try {
    const snap = await getDoc(doc(db, "posts", id));
    if (!snap.exists()) return undefined;
    return { id: snap.id, ...snap.data() } as BlogPost;
  } catch (err) {
    console.error("getPostById error:", err);
    return undefined;
  }
}

export async function getCategories(): Promise<string[]> {
  if (cache.categories && isFresh(cache.categories.time)) return cache.categories.data;

  try {
    const snap = await getDoc(doc(db, "config", "categories"));
    if (snap.exists()) {
      const cats = snap.data().list as string[];
      cache.categories = { data: cats, time: Date.now() };
      return cats;
    }
    return ["All"];
  } catch (err) {
    console.error("getCategories error:", err);
    return cache.categories?.data ?? ["All"];
  }
}

export async function getSiteConfig() {
  try {
    const snap = await getDoc(doc(db, "config", "site"));
    if (snap.exists()) return snap.data();
  } catch (err) {
    console.error("getSiteConfig error:", err);
  }
  return {
    name: "NexBlog",
    tagline: "Tech Insights",
    author: "NexBlog Team",
    description: "High quality technical blogs",
  };
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  if (category === "All") return posts;
  return posts.filter((p) => p.category === category);
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const lower = query.toLowerCase();
  const posts = await getBlogPosts();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.excerpt.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.toLowerCase().includes(lower))
  );
}

// ─────────────────────────────────────────
// Admin Write APIs
// ─────────────────────────────────────────

export async function savePost(post: BlogPost): Promise<void> {
  const { id, ...data } = post;
  await setDoc(doc(db, "posts", id), {
    ...data,
    published: data.published ?? true,
    updatedAt: new Date().toISOString(),
  });
  delete cache.posts;
}

export async function deletePost(id: string): Promise<void> {
  await deleteDoc(doc(db, "posts", id));
  delete cache.posts;
}

export async function saveCategories(categories: string[]): Promise<void> {
  await setDoc(doc(db, "config", "categories"), { list: categories });
  delete cache.categories;
}

// ─────────────────────────────────────────
// Preload
// ─────────────────────────────────────────

export function preloadContent() {
  getBlogPosts().catch(() => {});
  getCategories().catch(() => {});
}