import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import Newsletter from "@/components/Newsletter";
import { getPostById } from "@/config/content";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id || "");

  if (post?.seo) {
    document.title = post.seo.metaTitle;

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", post.seo.metaDescription);
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 text-center container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Post Not Found 😕</h1>
          <Link to="/blogs" className="text-primary hover:underline">
            ← Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ============================================
  // FIXED: Proper list wrapping + Inline bold + Tables
  // ============================================
  const contentHtml = post.content
    .split("\n")
    .map((line) => {
      // Handle headings
      if (line.startsWith("### "))
        return `<h3 class="text-lg font-bold mt-6 mb-2 text-foreground">${line.slice(4)}</h3>`;
      if (line.startsWith("## "))
        return `<h2 class="text-xl font-bold mt-8 mb-3 gradient-text">${line.slice(3)}</h2>`;
      
      // Handle blockquotes
      if (line.startsWith("> "))
        return `<blockquote class="border-l-2 border-primary pl-4 my-4 text-muted-foreground italic">${line.slice(2)}</blockquote>`;
      
      // Handle standalone bold lines (backward compatibility)
      if (line.startsWith("**") && line.endsWith("**") && !line.includes(" "))
        return `<p class="font-semibold text-foreground mt-4 mb-1">${line.slice(2, -2)}</p>`;
      
      // Handle bullet points (with marker for wrapping)
      if (line.startsWith("- "))
        return `<li data-list="bullet" class="text-muted-foreground ml-6 list-disc leading-relaxed">${line.slice(2)}</li>`;
      
      // Handle numbered lists (with marker for wrapping)
      if (/^\d+\.\s/.test(line))
        return `<li data-list="numbered" class="text-muted-foreground ml-6 list-decimal leading-relaxed">${line.replace(/^\d+\.\s/, '')}</li>`;
      
      // Handle table rows
      if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
        const cells = line
          .trim()
          .slice(1, -1)
          .split("|")
          .map(cell => cell.trim());
        
        // Skip separator line
        if (cells.every(cell => /^-+$/.test(cell))) {
          return "";
        }
        
        // Detect header row
        const isHeader = !line.includes("₹") && !line.includes("⭐") && !line.includes("✅");
        
        if (isHeader) {
          return `<tr class="bg-primary/10">${cells.map(cell => 
            `<th class="border border-border px-4 py-2 text-left font-semibold">${cell}</th>`
          ).join('')}</tr>`;
        } else {
          return `<tr class="hover:bg-muted/50">${cells.map(cell => 
            `<td class="border border-border px-4 py-2">${cell}</td>`
          ).join('')}</tr>`;
        }
      }
      
      // Handle empty lines
      if (line.trim() === "") return "<br/>";
      
      // Handle paragraphs with inline bold
      const processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>');
      
      return `<p class="text-muted-foreground leading-relaxed">${processedLine}</p>`;
    })
    .join("");

  // STEP 1: Wrap table rows in <table>
  let finalHtml = contentHtml.replace(
    /(<tr[^>]*>.*?<\/tr>(?:\s*<tr[^>]*>.*?<\/tr>)*)/gs,
    '<table class="w-full my-6 border-collapse border border-border rounded-lg overflow-hidden">$1</table>'
  );

  // STEP 2: Wrap consecutive bullet list items in <ul>
  finalHtml = finalHtml.replace(
    /(<li data-list="bullet"[^>]*>.*?<\/li>(?:\s*<li data-list="bullet"[^>]*>.*?<\/li>)*)/gs,
    '<ul class="my-4">$1</ul>'
  );

  // STEP 3: Wrap consecutive numbered list items in <ol>
  finalHtml = finalHtml.replace(
    /(<li data-list="numbered"[^>]*>.*?<\/li>(?:\s*<li data-list="numbered"[^>]*>.*?<\/li>)*)/gs,
    '<ol class="my-4">$1</ol>'
  );

  // STEP 4: Clean up data-list attributes (not needed in final HTML)
  finalHtml = finalHtml.replace(/ data-list="(bullet|numbered)"/g, '');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>

          <article className="animate-fade-in">
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-contain"
              />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} read
              </span>
            </div>

            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: finalHtml }}
            />

            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </article>

          <CommentSection />
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BlogPost;