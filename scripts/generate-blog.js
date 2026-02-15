/**
 * ╔══════════════════════════════════════════════════════╗
 * ║     NexBlog Auto Generator v3.0 — 100% FREE         ║
 * ║                                                      ║
 * ║  Google Gemini API  →  FREE (no credit card!)        ║
 * ║  Cloudinary Images  →  FREE (25GB/month)             ║
 * ║  Firebase Firestore →  FREE (50k reads/day)          ║
 * ║  GitHub Actions     →  FREE (2000 min/month)         ║
 * ╚══════════════════════════════════════════════════════╝
 */

import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// ─── INIT: GEMINI (FREE) ───────────────────────────────────────────────────
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ─── INIT: CLOUDINARY (FREE) ───────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── INIT: FIREBASE ADMIN (FREE) ──────────────────────────────────────────
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // GitHub mein \n literal hoti hai — fix karo
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});
const db = getFirestore();

// ─── TOPIC POOL ────────────────────────────────────────────────────────────
// Ye topics rotate honge — har run pe ek random topic
const TOPICS = [
  { category: "AI & Technology",   topic: "2026 ke best free AI tools jo har koi use kar sakta hai",         img: "artificial intelligence technology futuristic" },
  { category: "AI & Technology",   topic: "Gemini vs ChatGPT vs Copilot — kaunsa AI student ke liye best hai", img: "AI comparison chatbot digital" },
  { category: "AI & Technology",   topic: "Agentic AI kya hota hai aur ye jobs ko kaise badal raha hai",      img: "AI robots future automation" },
  { category: "Online Earning",    topic: "Ghar baithe paise kamane ke 7 proven tarike 2026 mein",            img: "work from home laptop money earning" },
  { category: "Online Earning",    topic: "Faceless YouTube channel kaise start karein AI se 2026 mein",      img: "YouTube creator content automation" },
  { category: "Online Earning",    topic: "Freelancing mein ₹50,000/month kaise kamayein beginner guide",     img: "freelancing laptop remote work India" },
  { category: "Digital Growth",    topic: "Instagram 2026 mein viral hone ka naya formula kya hai",           img: "Instagram social media viral growth" },
  { category: "Digital Growth",    topic: "AIO kya hai — AI Search Optimization naya SEO kyu hai",           img: "SEO search engine optimization digital" },
  { category: "Digital Growth",    topic: "Personal brand kaise banayein LinkedIn pe 30 din mein",           img: "personal branding LinkedIn professional" },
  { category: "Cyber Security",    topic: "India mein badhte cyber fraud se kaise bachein 2026 guide",        img: "cybersecurity protection India digital safety" },
  { category: "Cyber Security",    topic: "Password manager kyu use karein — complete beginner guide",        img: "password security cyber protection lock" },
  { category: "Future Trends",     topic: "Quantum computing India ke startups ke liye kya matlab rakhta hai",img: "quantum computing technology future India" },
  { category: "Future Trends",     topic: "2030 tak kaunse 10 jobs AI replace karega — kya aapki bhi hai?",   img: "future jobs AI automation technology" },
  { category: "Motivation",        topic: "AI ke daur mein apni skills relevant kaise rakhe — student guide", img: "motivation study learning skills growth" },
  { category: "Current Affairs",   topic: "India ka Digital India mission 2026 — progress aur future plans",  img: "Digital India government technology progress" },
];

// ─── HELPER: SLUG ─────────────────────────────────────────────────────────
function makeSlug(title) {
  return (
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 55) +
    "-" +
    Date.now()
  );
}

// ─── STEP 1: GEMINI SE BLOG GENERATE ──────────────────────────────────────
async function generateWithGemini(topicData) {
  console.log(`\n📝 Gemini se generate ho raha hai...`);
  console.log(`   Topic: "${topicData.topic}"`);

  const prompt = `
Tum NexBlog ke liye ek engaging Indian tech blog writer ho jo Hinglish mein likhte ho (Hindi + English mix).

Is topic pe ek complete blog post likho:
"${topicData.topic}"

Category: ${topicData.category}

Requirements:
- Title: Catchy Hinglish title, 1 relevant emoji end mein
- Content: 600-800 words, Markdown format mein
- ## headings, ### subheadings use karo
- Bullet points - se
- Ek blockquote > zaroor daalo
- Ek comparison table | daalo (agar relevant ho)
- Tone: Friendly, energetic, jaise kisi young Indian professional se baat kar rahe ho
- End: Ek motivational quote ke saath khatam karo

SIRF valid JSON return karo — koi markdown backticks nahi, koi extra text nahi:
{
  "title": "Title with emoji",
  "excerpt": "2-3 line summary in Hinglish, max 150 chars",
  "content": "Full markdown content",
  "author": "NexBlog Tech Editor",
  "readTime": "6 min read",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "seo": {
    "metaTitle": "SEO title max 60 chars",
    "metaDescription": "Meta desc 120-150 chars",
    "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"]
  }
}`;

  // Gemini 2.5 Flash use karo — free tier mein 250 requests/day!
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const raw = response.text.trim();

  // JSON extract karo (model kabhi kabhi extra text deta hai)
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Gemini ne valid JSON nahi diya:\n" + raw.slice(0, 300));
  }

  const blog = JSON.parse(jsonMatch[0]);
  console.log(`   ✅ Blog ready: "${blog.title}"`);
  return blog;
}

// ─── STEP 2: CLOUDINARY IMAGE UPLOAD ──────────────────────────────────────
async function uploadImage(category, imgKeywords) {
  console.log(`\n🖼️  Image upload ho rahi hai...`);

  try {
    // Unsplash source se free high-quality image
    const searchTerm = encodeURIComponent(imgKeywords);
    const imageUrl = `https://source.unsplash.com/800x450/?${searchTerm}`;

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "nexblog-auto",
      public_id: `post-${Date.now()}`,
      transformation: [
        { width: 800, height: 450, crop: "fill", gravity: "auto" },
        { quality: "auto:good" },
        { format: "webp" },
      ],
      tags: ["auto", category.toLowerCase().replace(/\s+/g, "-")],
    });

    console.log(`   ✅ Image uploaded!`);
    return result.secure_url;
  } catch (err) {
    console.warn(`   ⚠️ Image upload failed: ${err.message}`);
    console.warn(`   → Default image use hogi`);
    // Tumhara existing default Cloudinary image
    return "https://res.cloudinary.com/ddi8qw8fw/image/upload/v1770737413/nexblog_et3dga.png";
  }
}

// ─── STEP 3: FIREBASE SAVE ─────────────────────────────────────────────────
async function saveToFirebase(blogData, topicData, imageUrl) {
  console.log(`\n🔥 Firebase mein save ho raha hai...`);

  const slug = makeSlug(blogData.title);
  const today = new Date().toISOString().split("T")[0];

  const post = {
    id: slug,
    title: blogData.title,
    excerpt: blogData.excerpt,
    content: blogData.content,
    category: topicData.category,
    author: blogData.author || "NexBlog Tech Editor",
    date: today,
    readTime: blogData.readTime || "6 min read",
    image: imageUrl,
    tags: blogData.tags || [],
    seo: blogData.seo || {},
    // Firebase meta
    createdAt: Timestamp.now(),
    published: true,
    isAutoGenerated: true,
    generatedBy: "gemini-2.5-flash",
  };

  await db.collection("blogPosts").doc(slug).set(post);

  // Stats update karo
  await db
    .collection("meta")
    .doc("stats")
    .set(
      {
        lastUpdated: Timestamp.now(),
        lastPostTitle: blogData.title,
        lastPostId: slug,
      },
      { merge: true }
    );

  console.log(`   ✅ Saved! ID: ${slug}`);
  return slug;
}

// ─── DUPLICATE CHECK ───────────────────────────────────────────────────────
async function isRecentDuplicate(topic) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 7); // Last 7 din

  const snap = await db
    .collection("blogPosts")
    .where("createdAt", ">=", Timestamp.fromDate(cutoff))
    .get();

  const recentWords = snap.docs.flatMap((d) =>
    d.data().title.toLowerCase().split(" ").slice(0, 4)
  );

  const topicWords = topic.toLowerCase().split(" ").slice(0, 4);
  return topicWords.some((w) => recentWords.includes(w) && w.length > 4);
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║  NexBlog Auto Generator v3.0 (FREE)  ║");
  console.log("╚══════════════════════════════════════╝");
  console.log(
    `⏰ ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST\n`
  );

  try {
    // Random topic select karo (duplicate avoid karte hue)
    let chosen;
    for (let i = 0; i < 5; i++) {
      const pick = TOPICS[Math.floor(Math.random() * TOPICS.length)];
      if (!(await isRecentDuplicate(pick.topic))) {
        chosen = pick;
        break;
      }
    }
    if (!chosen) chosen = TOPICS[Math.floor(Math.random() * TOPICS.length)];

    console.log(`🎯 Topic: "${chosen.topic}"`);
    console.log(`📂 Category: ${chosen.category}`);

    // 3 Steps: Generate → Image → Save
    const blogContent = await generateWithGemini(chosen);
    const imageUrl = await uploadImage(chosen.category, chosen.img);
    const savedId = await saveToFirebase(blogContent, chosen, imageUrl);

    console.log("\n╔══════════════════════════════════════╗");
    console.log("║           🎉 SUCCESS! BLOG LIVE!     ║");
    console.log("╚══════════════════════════════════════╝");
    console.log(`📰 Title    : ${blogContent.title}`);
    console.log(`📂 Category : ${chosen.category}`);
    console.log(`🔗 ID       : ${savedId}`);
    console.log(`🖼️  Image    : ${imageUrl}`);
    console.log(`\n✅ Blog turant website pe live hai!`);
    console.log(`💰 Cost     : ₹0 (ZERO!)`);
  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    process.exit(1);
  }
}

main();