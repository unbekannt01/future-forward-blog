import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBlogPosts } from "@/config/content";

const Index = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPosts() {
      setLoading(true);
      const posts = await getBlogPosts();
      setFeatured(posts.slice(0, 3));
      setLoading(false);
    }
    loadFeaturedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/ddi8qw8fw/image/upload/v1770737413/nexblog_et3dga.png" 
            alt="" 
            className="w-full h-full object-cover opacity-40" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-primary mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" /> Next Gen Blog Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
            Welcome to the{" "}
            <span className="gradient-text">Next Generation</span>
            <br />
            Blog Platform
          </h1>

          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in" 
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            AI, Technology, Digital Growth and future trends — all in one place.
            Read, learn and grow! 🚀
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" 
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <Link
              to="/blogs"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity glow-cyan"
            >
              Explore Blogs <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/categories"
              className="px-8 py-3.5 rounded-xl border border-border text-foreground font-semibold inline-flex items-center justify-center gap-2 hover:bg-muted transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {[
              { icon: Sparkles, label: "Blog Posts", value: "50+" },
              { icon: Users, label: "Monthly Readers", value: "10K+" },
              { icon: TrendingUp, label: "Categories", value: "6" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Icon className="w-5 h-5 text-primary" />
                <p className="text-3xl font-bold gradient-text">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Latest <span className="gradient-text">Posts</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Fresh content every week</p>
            </div>
            <Link to="/blogs" className="text-sm text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;