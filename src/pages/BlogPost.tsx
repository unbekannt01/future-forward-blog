// src/pages/BlogPost.tsx  ← REPLACE your existing file with this
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Clock, User, Tag, Home, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import Newsletter from "@/components/Newsletter";
import { getPostById } from "@/config/content";
import { useSEO, injectArticleSchema, injectBreadcrumbSchema } from "@/hooks/useSEO";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!id) return;
      setLoading(true);
      const data = await getPostById(id);
      setPost(data);
      setLoading(false);
    }
    loadPost();
  }, [id]);

  // ✅ Dynamic SEO per blog post
  useEffect(() => {
    if (!post) return;

    // ✅ Article Structured Data (JSON-LD)
    injectArticleSchema(post);

    // ✅ Breadcrumb Structured Data
    injectBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blogs", url: "/blogs" },
      { name: post.category, url: `/blogs?category=${encodeURIComponent(post.category)}` },
      { name: post.title, url: `/blog/${post.id}` },
    ]);

    // Update SEO meta tags
    document.title = post.seo?.metaTitle || post.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', post.seo?.metaDescription || post.excerpt);
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative w-12 h-12 mx-auto mb-3">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 text-center container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Post Not Found 😕</h1>
          <Link to="/blogs" className="text-primary hover:underline">← Back to Blogs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const contentHtml = post.content
    .split("\n")
    .map((line: string) => {
      if (line.startsWith("### "))
        return `<h3 class="text-lg font-bold mt-6 mb-2 text-foreground">${line.slice(4)}</h3>`;
      if (line.startsWith("## "))
        return `<h2 class="text-xl font-bold mt-8 mb-3 gradient-text">${line.slice(3)}</h2>`;
      if (line.startsWith("> "))
        return `<blockquote class="border-l-2 border-primary pl-4 my-4 text-muted-foreground italic">${line.slice(2)}</blockquote>`;
      if (line.startsWith("**") && line.endsWith("**") && !line.includes(" "))
        return `<p class="font-semibold text-foreground mt-4 mb-1">${line.slice(2, -2)}</p>`;
      if (line.startsWith("- "))
        return `<li data-list="bullet" class="text-muted-foreground ml-6 list-disc leading-relaxed">${line.slice(2)}</li>`;
      if (/^\d+\.\s/.test(line))
        return `<li data-list="numbered" class="text-muted-foreground ml-6 list-decimal leading-relaxed">${line.replace(/^\d+\.\s/, "")}</li>`;
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const cells = line.trim().slice(1, -1).split("|").map((cell: string) => cell.trim());
        if (cells.every((cell: string) => /^-+$/.test(cell))) return "";
        const isHeader = !line.includes("₹") && !line.includes("⭐") && !line.includes("✅");
        if (isHeader) {
          return `<tr class="bg-primary/10">${cells.map((cell: string) => `<th class="border border-border px-4 py-2 text-left font-semibold">${cell}</th>`).join("")}</tr>`;
        } else {
          return `<tr class="hover:bg-muted/50">${cells.map((cell: string) => `<td class="border border-border px-4 py-2">${cell}</td>`).join("")}</tr>`;
        }
      }
      if (line.trim() === "") return "<br/>";
      const processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
      return `<p class="text-muted-foreground leading-relaxed">${processedLine}</p>`;
    })
    .join("");

  let finalHtml = contentHtml.replace(
    /(<tr[^>]*>.*?<\/tr>(?:\s*<tr[^>]*>.*?<\/tr>)*)/gs,
    '<table class="w-full my-6 border-collapse border border-border rounded-lg overflow-hidden">$1</table>'
  );
  finalHtml = finalHtml.replace(
    /(<li data-list="bullet"[^>]*>.*?<\/li>(?:\s*<li data-list="bullet"[^>]*>.*?<\/li>)*)/gs,
    '<ul class="my-4">$1</ul>'
  );
  finalHtml = finalHtml.replace(
    /(<li data-list="numbered"[^>]*>.*?<\/li>(?:\s*<li data-list="numbered"[^>]*>.*?<\/li>)*)/gs,
    '<ol class="my-4">$1</ol>'
  );
  finalHtml = finalHtml.replace(/ data-list="(bullet|numbered)"/g, "");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* ✅ Breadcrumb Navigation – SEO + UX */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/blogs?category=${encodeURIComponent(post.category)}`} className="hover:text-primary transition-colors">
              {post.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground line-clamp-1 max-w-[200px]">{post.title}</span>
          </nav>

          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>

          <article className="animate-fade-in" itemScope itemType="https://schema.org/BlogPosting">
            {/* ✅ SEO image with proper alt text */}
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-contain"
                loading="eager"
                fetchPriority="high"
                itemProp="image"
              />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 mb-4" itemProp="articleSection">
              {post.category}
            </span>

            {/* ✅ H1 for article page */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" itemProp="headline">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5" itemProp="author" itemScope itemType="https://schema.org/Person">
                <User className="w-4 h-4" />
                <span itemProp="name">{post.author}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date} itemProp="datePublished">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span itemProp="timeRequired">{post.readTime} read</span>
              </span>
            </div>

            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: finalHtml }}
              itemProp="articleBody"
            />

            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border" aria-label="Article tags">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                  itemProp="keywords"
                >
                  <Tag className="w-3 h-3" aria-hidden="true" /> {tag}
                </span>
              ))}
            </div>
          </article>

          <CommentSection postTitle={post.title} />
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BlogPost;