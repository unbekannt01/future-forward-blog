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

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export const categories = [
  "All",
  "AI & Technology",
  "Digital Growth",
  "Online Earning",
  "Social Media",
  "Motivation",
  "Future Trends",
];

export const blogPosts: BlogPost[] = [
  {
    id: "ai-revolution-2026",
    title: "AI Revolution 2026: Kaise Artificial Intelligence Badal Rahi Hai Duniya 🚀",
    excerpt: "AI ab sirf ek technology nahi rahi — ye ek revolution hai. Jaaniye kaise AI 2026 mein har industry ko transform kar rahi hai aur aapke liye kya opportunities hain.",
    content: `## AI Ka Naya Yug Shuru Ho Chuka Hai

Dosto, 2026 mein AI ne jo growth dikhayi hai, wo literally mind-blowing hai! ChatGPT se lekar autonomous cars tak, AI har jagah apna magic dikha rahi hai.

### Key Trends Jo Aapko Jaanne Chahiye:

**1. Generative AI Ka Boom**
Ab AI sirf answers nahi deti — wo create karti hai. Images, videos, music, code — sab kuch AI generate kar sakti hai. Aur ye sirf beginning hai!

**2. AI in Healthcare**
Imagine karo — AI aapki disease ko detect kar sakti hai doctor se pehle. Early diagnosis, personalized treatment, drug discovery — AI ne healthcare ko next level pe le jaaya hai.

**3. AI Jobs Market**
"AI meri job le legi!" — ye sochna band karo. Actually, AI ne naye jobs create kiye hain. AI Prompt Engineer, AI Trainer, AI Ethics Officer — ye sab roles 2 saal pehle exist nahi karte the.

### Aapke Liye Action Steps:
- AI tools seekhna start karo (ChatGPT, Midjourney, Claude)
- Apne field mein AI ka use explore karo
- AI-related courses join karo

> "Jo log AI ke saath adapt karenge, wahi future mein lead karenge." 💡

AI se daro mat, AI ko apna tool banao. Future unka hai jo technology ke saath chalte hain!`,
    category: "AI & Technology",
    author: "Arjun Verma",
    date: "2026-02-08",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    tags: ["AI", "Technology", "Future", "Innovation"],
  },
  {
    id: "online-earning-guide",
    title: "2026 Mein Online Earning: ₹50,000/Month Kamane Ka Complete Roadmap 💰",
    excerpt: "Ghar baithe paise kamana ab mushkil nahi raha. Ye detailed guide aapko step-by-step batayegi ki kaise aap online earning start kar sakte ho.",
    content: `## Online Earning Ka Golden Era

Bhai log, ab zamaana badal gaya hai. 9-to-5 job sirf ek option hai, but online earning ek ocean hai jisme opportunities hi opportunities hain!

### Top 5 Online Earning Methods in 2026:

**1. Freelancing (₹30K-₹2L/month)**
Fiverr, Upwork pe apni skills becho. Writing, design, coding — kuch bhi chalega. Start chota karo, gradually grow karo.

**2. Content Creation (₹20K-₹5L/month)**
YouTube, Instagram Reels, Blog — content king hai aur rahega. Consistency rakho, niche choose karo, aur value deliver karo.

**3. AI Tools Business (₹50K-₹10L/month)**
AI tools use karke services do — logo design, content writing, video editing. Kam time mein zyada kaam karo.

**4. Affiliate Marketing (₹10K-₹1L/month)**
Products promote karo, commission kamao. Amazon, Flipkart affiliate programs se start karo.

**5. Digital Products (₹20K-₹3L/month)**
E-books, courses, templates bana ke becho. Ek baar banao, baar baar kamao!

### Pro Tips:
- Pehle 3 mahine patience rakho
- Ek skill pe focus karo
- Portfolio banao
- Networking karo

> "Paisa kamana mushkil nahi hai, sahi direction mein kaam karna zaroori hai." 🎯`,
    category: "Online Earning",
    author: "Priya Sharma",
    date: "2026-02-05",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    tags: ["Earning", "Freelancing", "Side Hustle"],
  },
  {
    id: "social-media-growth",
    title: "Instagram & YouTube Growth Hacks 2026: 0 Se 100K Followers Kaise? 📱",
    excerpt: "Social media pe grow karna hai? Ye proven strategies follow karo aur dekho kaise aapke followers exponentially badhte hain.",
    content: `## Social Media Growth Ka Secret Formula

Aaj kal har koi social media pe famous hona chahta hai, but bahut kam log sahi strategy follow karte hain. Chalo main tumhe real talk deta hoon!

### Instagram Growth Strategy:

**1. Content Pillars Define Karo**
3-4 content types choose karo — educational, entertaining, inspirational, behind-the-scenes. Isse aapka content consistent rahega.

**2. Reels Are King 👑**
Short-form video content abhi bhi sabse zyada reach deta hai. Daily 1-2 Reels post karo, trending audio use karo.

**3. Engagement Strategy**
Post karne ke baad 30 minutes engage karo — comments ka reply do, DMs answer karo, similar accounts pe comment karo.

### YouTube Growth Strategy:

**1. SEO Optimize Karo**
Title, description, tags — sab mein keywords use karo. TubeBuddy ya VidIQ tools use karo research ke liye.

**2. Thumbnail Game Strong Rakho**
Click-through rate thumbnail pe depend karta hai. Bold text, expressive face, contrasting colors — ye formula kaam karta hai.

**3. Consistency > Quality (initially)**
Pehle 50 videos mein quality pe zyada focus mat karo. Consistent raho, improve hote jaoge.

> "Algorithm ko mat samjho, audience ko samjho." 🧠`,
    category: "Social Media",
    author: "Rohan Malik",
    date: "2026-02-01",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    tags: ["Social Media", "Instagram", "YouTube", "Growth"],
  },
  {
    id: "motivation-success-mindset",
    title: "Success Mindset: Wo 5 Habits Jo Har Successful Insaan Mein Hoti Hain 🧠",
    excerpt: "Success sirf hard work se nahi aata — sahi mindset se aata hai. Jaaniye wo 5 powerful habits jo aapki life transform kar sakti hain.",
    content: `## Mindset Hi Sab Kuch Hai

Main tumhe ek baat bolu — talent overrated hai. Discipline, consistency aur sahi mindset — ye teen cheezein tumhe kahin bhi le ja sakti hain.

### 5 Habits of Highly Successful People:

**1. Wake Up Early (5 AM Club) ⏰**
Early morning ka time sabse productive hota hai. No distractions, clear mind, focused work. Try karo 21 din — habit ban jaayegi.

**2. Read Daily (30 mins minimum) 📚**
Warren Buffett din mein 5 ghante read karta hai. Tumse sirf 30 min maang raha hoon. Books, articles, research papers — kuch bhi padho but padho zaroor.

**3. Exercise & Health First 💪**
Body fit toh mind fit. Daily 30-45 minutes exercise — gym, yoga, running, kuch bhi. Energy level automatically badh jaayega.

**4. Learn to Say NO ❌**
Har cheez mein haan bolna band karo. Apne goals ke liye time protect karo. "No" bolna ek superpower hai.

**5. Review & Reflect (Journal) 📝**
Raat ko 10 minutes — aaj kya seekha, kya achieve kiya, kal kya karna hai. Self-awareness success ki pehli seedi hai.

### Bonus Tip:
Surround yourself with people who inspire you. Environment matters more than motivation.

> "Motivation tumhe start karwata hai, discipline tumhe finish line tak le jaata hai." 🏆`,
    category: "Motivation",
    author: "Kavya Singh",
    date: "2026-01-28",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800",
    tags: ["Motivation", "Success", "Mindset", "Habits"],
  },
  {
    id: "digital-marketing-trends",
    title: "Digital Marketing 2026: Ye 7 Trends Miss Mat Karna! 📊",
    excerpt: "Digital marketing duniya mein tezi se badal raha hai. 2026 ke sabse important trends yahan hain — in par dhyan do toh business grow hoga guaranteed.",
    content: `## Digital Marketing Ka Future Yahan Hai

Dosto, digital marketing mein jo 2024 mein kaam karta tha, wo 2026 mein outdated ho chuka hai. Let's talk about what's actually working NOW.

### Top 7 Digital Marketing Trends 2026:

**1. AI-Powered Personalization**
Generic ads ab kaam nahi karte. AI se har user ko personalized experience do — emails, ads, website content sab customized hona chahiye.

**2. Short-Form Video Dominance**
Reels, Shorts, TikTok — ye formats ab marketing ka backbone hain. 60 seconds mein apna message deliver karo.

**3. Voice Search Optimization**
"Hey Google, best restaurant near me" — voice search queries badh rahe hain. Apne content ko conversational language mein optimize karo.

**4. Community Building > Followers**
10,000 followers se zyada valuable hai 100 loyal community members. Discord, Telegram, WhatsApp groups banao.

**5. Micro-Influencer Marketing**
Big celebrities se better ROI dete hain micro-influencers (10K-50K followers). Authentic lagta hai, trust zyada hota hai.

**6. Interactive Content**
Quizzes, polls, AR filters, interactive videos — engagement badhane ka sabse acha tarika.

**7. Privacy-First Marketing**
Cookies ja rahe hain, first-party data collect karo. Email lists aur direct relationships build karo.

> "Marketing ka future personal, authentic aur value-driven hai." 🎯`,
    category: "Digital Growth",
    author: "Amit Patel",
    date: "2026-01-25",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    tags: ["Marketing", "Digital", "Growth", "Business"],
  },
  {
    id: "future-tech-predictions",
    title: "2030 Tak Ye 5 Technologies Duniya Badal Dengi 🌍",
    excerpt: "Future mein kya hone wala hai? Ye 5 technologies abhi apne early stage mein hain but 2030 tak ye sab mainstream ho jaayengi.",
    content: `## Future Yahan Hai, Aur Ye Incredible Hai!

Science fiction ab science fact ban raha hai. Jo cheezein hum movies mein dekhte the, wo ab reality ban rahi hain. Let me show you what's coming!

### 5 Technologies That Will Change Everything:

**1. Quantum Computing 🔮**
Normal computers 0 aur 1 mein sochte hain. Quantum computers dono simultaneously process kar sakte hain. Drug discovery, climate modeling, cryptography — sab revolutionize hoga.

**2. Brain-Computer Interface (BCI) 🧠**
Elon Musk ka Neuralink sirf start hai. Imagine karo — apne thoughts se computer control karna. Paralyzed log walk kar payenge, blind log dekh payenge.

**3. Autonomous Everything 🚗**
Self-driving cars toh suna hoga, but self-flying taxis, autonomous delivery drones, robotic warehouses — sab aa raha hai by 2030.

**4. Fusion Energy ☀️**
Unlimited clean energy — ye dream ab reality ke kareebi hai. Multiple companies working hain commercially viable fusion reactors pe.

**5. Spatial Computing (AR/VR) 🥽**
Apple Vision Pro sirf beginning tha. 2030 tak humara computing experience completely spatial hoga — screens ki zaroorat nahi rahegi.

### Kya Karna Chahiye?
- In technologies ke baare mein updated raho
- Related skills seekho
- Invest in future-ready companies

> "Future predict karne ka sabse acha tarika hai — use create karna." 🚀`,
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
