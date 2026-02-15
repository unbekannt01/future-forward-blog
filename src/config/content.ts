/**
 * src/config/content.ts  — FIREBASE VERSION (100% FREE)
 *
 * Ye file tumhare existing content.ts ki jagah lega.
 * Firebase Firestore se real-time blogs fetch karta hai.
 * Gemini se generate hue blogs turant yahan show honge!
 */

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

// ─── TYPES ─────────────────────────────────────────────────────────────────

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
  };
}

// ─── FIREBASE CONFIG ───────────────────────────────────────────────────────
// .env file se aata hai (neeche guide mein bataya hai)

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Duplicate init avoid karo
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// ─── SIMPLE CACHE (5 min) ──────────────────────────────────────────────────
let _cache: BlogPost[] | null = null;
let _cacheAt = 0;
const TTL = 5 * 60 * 1000;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPost(data: any, id: string): BlogPost {
  return {
    id:       data.id || id,
    title:    data.title || "",
    excerpt:  data.excerpt || "",
    content:  data.content || "",
    category: data.category || "AI & Technology",
    author:   data.author || "NexBlog Tech Editor",
    date:     data.date || new Date().toISOString().split("T")[0],
    readTime: data.readTime || "5 min read",
    image:    data.image || "https://res.cloudinary.com/ddi8qw8fw/image/upload/v1770737413/nexblog_et3dga.png",
    tags:     data.tags || [],
    seo:      data.seo,
  };
}

// ─── PUBLIC API ────────────────────────────────────────────────────────────

/** Saare published posts — latest first */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (_cache && Date.now() - _cacheAt < TTL) return _cache;

  try {
    const q = query(
      collection(db, "blogPosts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(100)
    );
    const snap = await getDocs(q);
    _cache = snap.docs.map((d) => toPost(d.data(), d.id));
    _cacheAt = Date.now();
    return _cache;
  } catch (e) {
    console.error("Firebase fetch error:", e);
    return _cache || [];
  }
}

/** Category filter */
export async function getPostsByCategory(cat: string): Promise<BlogPost[]> {
  if (cat === "All") return getBlogPosts();
  try {
    const q = query(
      collection(db, "blogPosts"),
      where("published", "==", true),
      where("category", "==", cat),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => toPost(d.data(), d.id));
  } catch {
    const all = await getBlogPosts();
    return all.filter((p) => p.category === cat);
  }
}

/** ID se ek post */
export async function getPostById(id: string): Promise<BlogPost | undefined> {
  if (_cache) {
    const hit = _cache.find((p) => p.id === id);
    if (hit) return hit;
  }
  try {
    const snap = await getDoc(doc(db, "blogPosts", id));
    return snap.exists() ? toPost(snap.data(), snap.id) : undefined;
  } catch {
    return undefined;
  }
}

/** Search */
export async function searchPosts(q: string): Promise<BlogPost[]> {
  if (!q.trim()) return getBlogPosts();
  const lq = q.toLowerCase();
  const all = await getBlogPosts();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(lq) ||
      p.excerpt.toLowerCase().includes(lq) ||
      p.tags.some((t) => t.toLowerCase().includes(lq))
  );
}

/** Categories list */
export function getCategories(): string[] {
  return [
    "All",
    "AI & Technology",
    "Digital Growth",
    "Online Earning",
    "Social Media",
    "Motivation",
    "Future Trends",
    "Current Affairs",
  ];
}

/** Cache clear karo (fresh load ke liye) */
export function clearCache() {
  _cache = null;
  _cacheAt = 0;
}