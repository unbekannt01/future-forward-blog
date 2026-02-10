import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommentSection from "@/components/CommentSection";
import Newsletter from "@/components/Newsletter";
import { getPostById } from "@/data/blogData";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = getPostById(id || "");

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
    .map((line) => {
      if (line.startsWith("### ")) return `<h3 class="text-lg font-bold mt-6 mb-2 text-foreground">${line.slice(4)}</h3>`;
      if (line.startsWith("## ")) return `<h2 class="text-xl font-bold mt-8 mb-3 gradient-text">${line.slice(3)}</h2>`;
      if (line.startsWith("> ")) return `<blockquote class="border-l-2 border-primary pl-4 my-4 text-muted-foreground italic">${line.slice(2)}</blockquote>`;
      if (line.startsWith("**") && line.endsWith("**")) return `<p class="font-semibold text-foreground mt-4 mb-1">${line.slice(2, -2)}</p>`;
      if (line.startsWith("- ")) return `<li class="text-muted-foreground ml-4 list-disc">${line.slice(2)}</li>`;
      if (line.trim() === "") return "<br/>";
      return `<p class="text-muted-foreground leading-relaxed">${line}</p>`;
    })
    .join("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>

          <article className="animate-fade-in">
            <div className="rounded-xl overflow-hidden aspect-video mb-8">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime} read</span>
            </div>

            <div className="prose-custom" dangerouslySetInnerHTML={{ __html: contentHtml }} />

            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">
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
