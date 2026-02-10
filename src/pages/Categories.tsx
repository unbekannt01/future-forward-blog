import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCategories, getPostsByCategory } from "@/config/content";
import { Cpu, TrendingUp, DollarSign, Share2, Flame, Rocket, Newspaper } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "AI & Technology": <Cpu className="w-6 h-6" />,
  "Digital Growth": <TrendingUp className="w-6 h-6" />,
  "Online Earning": <DollarSign className="w-6 h-6" />,
  "Social Media": <Share2 className="w-6 h-6" />,
  "Motivation": <Flame className="w-6 h-6" />,
  "Future Trends": <Rocket className="w-6 h-6" />,
  "Current Affairs": <Newspaper className="w-6 h-6" />,
};

const Categories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [postCounts, setPostCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      setLoading(true);
      
      // Load categories
      const allCategories = await getCategories();
      const filteredCategories = allCategories.filter((c) => c !== "All");
      setCategories(filteredCategories);

      // Load post counts for each category
      const counts: Record<string, number> = {};
      for (const cat of filteredCategories) {
        const posts = await getPostsByCategory(cat);
        counts[cat] = posts.length;
      }
      setPostCounts(counts);
      
      setLoading(false);
    }

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 pb-20 flex items-center justify-center">
          <p className="text-muted-foreground">Loading categories...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Browse <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-10">Choose your favourite topic 🎯</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => {
              const count = postCounts[cat] || 0;
              return (
                <Link
                  key={cat}
                  to={`/blogs?category=${encodeURIComponent(cat)}`}
                  className="glass rounded-xl p-6 hover-glow group transition-all hover:border-primary/30 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[cat] || <Rocket className="w-6 h-6" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                    {cat}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {count} article{count !== 1 ? "s" : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;