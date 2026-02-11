// src/hooks/useSEO.ts
// Dynamic SEO meta tag manager for each page

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
    section?: string;
  };
}

const SITE_NAME = "NexBlog";
const SITE_URL = "https://nexblogsite.vercel.app";
const DEFAULT_IMAGE = "https://res.cloudinary.com/ddi8qw8fw/image/upload/v1770737413/nexblog_et3dga.png";
const DEFAULT_DESCRIPTION = "NexBlog covers AI, Technology, Digital Growth, Online Earning & Future Trends. Stay ahead with next-gen insights in easy Hinglish! 🚀";

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setStructuredData(id: string, data: object) {
  let el = document.querySelector(`script[data-schema-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-schema-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = [],
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  article,
}: SEOProps = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} – AI, Technology & Digital Growth Insights`;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullKeywords = [
    "AI blog", "technology blog India", "digital growth", "NexBlog",
    "tech Hinglish", "online earning", "future trends",
    ...keywords
  ].join(", ");

  // Document title
  document.title = fullTitle;

  // Primary SEO
  setMeta("description", description);
  setMeta("keywords", fullKeywords);
  setLink("canonical", fullUrl);

  // Open Graph
  setMeta("og:title", fullTitle, true);
  setMeta("og:description", description, true);
  setMeta("og:image", image, true);
  setMeta("og:url", fullUrl, true);
  setMeta("og:type", type, true);
  setMeta("og:site_name", SITE_NAME, true);
  setMeta("og:locale", "en_IN", true);

  // Twitter / X
  setMeta("twitter:title", fullTitle);
  setMeta("twitter:description", description);
  setMeta("twitter:image", image);
  setMeta("twitter:card", "summary_large_image");

  // Article-specific tags
  if (type === "article" && article) {
    if (article.publishedTime) setMeta("article:published_time", article.publishedTime, true);
    if (article.modifiedTime) setMeta("article:modified_time", article.modifiedTime, true);
    if (article.author) setMeta("article:author", article.author, true);
    if (article.section) setMeta("article:section", article.section, true);
    article.tags?.forEach(tag => setMeta("article:tag", tag, true));
  }

  return { fullTitle, fullUrl };
}

// ✅ Generate Article Structured Data (JSON-LD)
export function injectArticleSchema(post: {
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
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": post.image,
      "width": 1200,
      "height": 630
    },
    "url": `${SITE_URL}/blog/${post.id}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${SITE_URL}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": DEFAULT_IMAGE
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.id}`
    },
    "articleSection": post.category,
    "keywords": post.tags.join(", "),
    "wordCount": post.content.split(" ").length,
    "timeRequired": post.readTime,
    "inLanguage": "en-IN"
  };

  setStructuredData(`article-${post.id}`, schema);
}

// ✅ Breadcrumb Schema
export function injectBreadcrumbSchema(items: { name: string; url: string }[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  };

  setStructuredData("breadcrumb", schema);
}

// ✅ FAQ Schema
export function injectFAQSchema(faqs: { question: string; answer: string }[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  setStructuredData("faq", schema);
}