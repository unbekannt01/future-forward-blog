/**
 * CONTENT MANAGEMENT FILE
 * 
 * Edit this file to update blog posts, categories, site info, etc.
 * No need to touch any other code - changes here reflect everywhere!
 */

export const siteConfig = {
  name: "NexBlog",
  tagline: "Future-Forward Knowledge Hub",
  author: "Arjun Verma",
  description: "Discover insights on AI, Digital Growth, Online Earning, and Future Technologies",
};

export const categories = [
  "All",
  "AI & Technology",
  "Digital Growth",
  "Online Earning",
  "Social Media",
  "Motivation",
  "Future Trends",
];

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
}

/**
 * BLOG POSTS - Edit here to add/update posts
 * Structure:
 * - id: unique identifier (use lowercase with hyphens)
 * - title: blog title
 * - excerpt: short summary
 * - content: full markdown-like content (use \n for new lines, ### for headings)
 * - category: must be from categories list above
 * - author: writer name
 * - date: YYYY-MM-DD format
 * - readTime: estimated reading time (e.g., "5 min")
 * - image: image URL
 * - tags: array of tags for search
 */
export const blogPosts: BlogPost[] = [
  {
    id: "ai-revolution-2026",
    title: "AI Revolution 2026: How Artificial Intelligence Is Changing the World 🚀",
    excerpt: "AI is no longer just a technology — it's a revolution. Discover how AI is transforming every industry in 2026 and what opportunities await you.",
    content: `## The New Era of AI Has Begun

In 2026, the growth AI has shown is literally mind-blowing! From ChatGPT to autonomous cars, AI is working its magic everywhere.

### Key Trends You Need to Know:

**1. The Generative AI Boom**
AI no longer just answers questions — it creates. Images, videos, music, code — AI can generate it all. And this is just the beginning!

**2. AI in Healthcare**
Imagine — AI can detect your disease before a doctor can. Early diagnosis, personalized treatment, drug discovery — AI has taken healthcare to the next level.

**3. AI Jobs Market**
"AI will take my job!" — stop thinking that. AI has actually created new jobs. AI Prompt Engineer, AI Trainer, AI Ethics Officer — these roles didn't exist two years ago.

### Action Steps for You:
- Start learning AI tools (ChatGPT, Midjourney, Claude)
- Explore how AI applies to your field
- Join AI-related courses

> "Those who adapt with AI will lead the future." 💡

Don't fear AI — make it your tool. The future belongs to those who move with technology!`,
    category: "AI & Technology",
    author: "Arjun Verma",
    date: "2026-02-08",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    tags: ["AI", "Technology", "Future", "Innovation"],
  },
  {
    id: "online-earning-guide",
    title: "Online Earning in 2026: A Complete Roadmap to $1,000+/Month 💰",
    excerpt: "Making money from home is no longer difficult. This detailed guide will show you step-by-step how to start earning online.",
    content: `## The Golden Era of Online Earning

The times have changed. A 9-to-5 job is just one option, but online earning is an ocean full of opportunities!

### Top 5 Online Earning Methods in 2026:

**1. Freelancing ($500–$3,000/month)**
Sell your skills on Fiverr and Upwork. Writing, design, coding — anything works. Start small, grow gradually.

**2. Content Creation ($300–$5,000/month)**
YouTube, Instagram Reels, Blogs — content is king and always will be. Stay consistent, choose your niche, and deliver value.

**3. AI Tools Business ($700–$10,000/month)**
Use AI tools to offer services — logo design, content writing, video editing. Do more work in less time.

**4. Affiliate Marketing ($200–$2,000/month)**
Promote products, earn commissions. Start with Amazon and other affiliate programs.

**5. Digital Products ($300–$5,000/month)**
Create and sell e-books, courses, and templates. Build once, earn repeatedly!

### Pro Tips:
- Be patient for the first 3 months
- Focus on one skill at a time
- Build your portfolio
- Network actively

> "Earning money isn't hard — working in the right direction is what matters." 🎯`,
    category: "Online Earning",
    author: "Priya Sharma",
    date: "2026-02-05",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    tags: ["Earning", "Freelancing", "Side Hustle"],
  },
  {
    id: "social-media-growth",
    title: "Instagram & YouTube Growth Hacks 2026: From 0 to 100K Followers 📱",
    excerpt: "Want to grow on social media? Follow these proven strategies and watch your followers increase exponentially.",
    content: `## The Secret Formula for Social Media Growth

Everyone wants to be famous on social media, but very few follow the right strategy. Let me give you the real talk!

### Instagram Growth Strategy:

**1. Define Your Content Pillars**
Choose 3–4 content types — educational, entertaining, inspirational, behind-the-scenes. This keeps your content consistent.

**2. Reels Are King 👑**
Short-form video content still delivers the most reach. Post 1–2 Reels daily and use trending audio.

**3. Engagement Strategy**
Spend 30 minutes engaging after posting — reply to comments, answer DMs, and comment on similar accounts.

### YouTube Growth Strategy:

**1. Optimize for SEO**
Use keywords in your title, description, and tags. Use tools like TubeBuddy or VidIQ for research.

**2. Keep Your Thumbnail Game Strong**
Click-through rate depends on your thumbnail. Bold text, expressive face, contrasting colors — this formula works.

**3. Consistency > Quality (Initially)**
Don't over-focus on quality for your first 50 videos. Stay consistent, and you'll improve over time.

> "Don't try to understand the algorithm — understand your audience." 🧠`,
    category: "Social Media",
    author: "Rohan Malik",
    date: "2026-02-01",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    tags: ["Social Media", "Instagram", "YouTube", "Growth"],
  },
  {
    id: "motivation-success-mindset",
    title: "Success Mindset: 5 Habits Every Successful Person Has 🧠",
    excerpt: "Success doesn't come from hard work alone — it comes from the right mindset. Discover 5 powerful habits that can transform your life.",
    content: `## Mindset Is Everything

Let me tell you something — talent is overrated. Discipline, consistency, and the right mindset — these three things can take you anywhere.

### 5 Habits of Highly Successful People:

**1. Wake Up Early (5 AM Club) ⏰**
Early morning is the most productive time. No distractions, clear mind, focused work. Try it for 21 days — it'll become a habit.

**2. Read Daily (30 Minutes Minimum) 📚**
Warren Buffett reads 5 hours a day. I'm only asking for 30 minutes. Books, articles, research papers — read anything, but read.

**3. Exercise & Health First 💪**
Fit body, fit mind. 30–45 minutes of daily exercise — gym, yoga, running, anything. Your energy levels will automatically increase.

**4. Learn to Say NO ❌**
Stop saying yes to everything. Protect your time for your goals. Saying "no" is a superpower.

**5. Review & Reflect (Journal) 📝**
Spend 10 minutes at night — what did you learn today, what did you achieve, what's the plan for tomorrow. Self-awareness is the first step to success.

### Bonus Tip:
Surround yourself with people who inspire you. Environment matters more than motivation.

> "Motivation gets you started, discipline takes you to the finish line." 🏆`,
    category: "Motivation",
    author: "Kavya Singh",
    date: "2026-01-28",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800",
    tags: ["Motivation", "Success", "Mindset", "Habits"],
  },
  {
    id: "digital-marketing-trends",
    title: "Digital Marketing 2026: 7 Trends You Can't Afford to Miss! 📊",
    excerpt: "Digital marketing is evolving rapidly. Here are the most important trends for 2026 — pay attention to these and your business growth is guaranteed.",
    content: `## The Future of Digital Marketing Is Here

What worked in digital marketing in 2024 is already outdated in 2026. Let's talk about what's actually working NOW.

### Top 7 Digital Marketing Trends 2026:

**1. AI-Powered Personalization**
Generic ads no longer work. Use AI to deliver personalized experiences to every user — emails, ads, and website content should all be customized.

**2. Short-Form Video Dominance**
Reels, Shorts, TikTok — these formats are now the backbone of marketing. Deliver your message in 60 seconds.

**3. Voice Search Optimization**
"Hey Google, best restaurant near me" — voice search queries are increasing. Optimize your content with conversational language.

**4. Community Building > Followers**
100 loyal community members are more valuable than 10,000 followers. Build Discord, Telegram, and WhatsApp groups.

**5. Micro-Influencer Marketing**
Micro-influencers (10K–50K followers) deliver better ROI than big celebrities. They feel authentic and build more trust.

**6. Interactive Content**
Quizzes, polls, AR filters, interactive videos — the best way to boost engagement.

**7. Privacy-First Marketing**
Cookies are going away — collect first-party data. Build email lists and direct relationships.

> "The future of marketing is personal, authentic, and value-driven." 🎯`,
    category: "Digital Growth",
    author: "Amit Patel",
    date: "2026-01-25",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    tags: ["Marketing", "Digital", "Growth", "Business"],
  },
  {
    id: "future-tech-predictions",
    title: "5 Technologies That Will Change the World by 2030 🌍",
    excerpt: "What does the future hold? These 5 technologies are in their early stages now, but by 2030 they'll all be mainstream.",
    content: `## The Future Is Here, and It's Incredible!

Science fiction is becoming science fact. The things we used to see in movies are now becoming reality. Let me show you what's coming!

### 5 Technologies That Will Change Everything:

**1. Quantum Computing 🔮**
Normal computers think in 0s and 1s. Quantum computers can process both simultaneously. Drug discovery, climate modeling, cryptography — everything will be revolutionized.

**2. Brain-Computer Interface (BCI) 🧠**
Elon Musk's Neuralink is just the start. Imagine controlling your computer with your thoughts. Paralyzed people will walk, blind people will see.

**3. Autonomous Everything 🚗**
You've heard of self-driving cars, but self-flying taxis, autonomous delivery drones, and robotic warehouses — all of this is coming by 2030.

**4. Fusion Energy ☀️**
Unlimited clean energy — this dream is closer to reality than ever. Multiple companies are working on commercially viable fusion reactors.

**5. Spatial Computing (AR/VR) 🥽**
Apple Vision Pro was just the beginning. By 2030, our computing experience will be completely spatial — screens won't be needed anymore.

### What Should You Do?
- Stay updated on these technologies
- Learn related skills
- Invest in future-ready companies

> "The best way to predict the future is to create it." 🚀`,
    category: "Future Trends",
    author: "Neha Gupta",
    date: "2026-01-20",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    tags: ["Future", "Technology", "Innovation", "Trends"],
  },
];

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === "All") return blogPosts;
  return blogPosts.filter((post) => post.category === category);
};

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const searchPosts = (query: string): BlogPost[] => {
  const lower = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lower) ||
      post.excerpt.toLowerCase().includes(lower) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lower))
  );
};
