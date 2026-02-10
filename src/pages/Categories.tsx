import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, getPostsByCategory } from "@/data/blogData";
import { Cpu, TrendingUp, DollarSign, Share2, Flame, Rocket } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "AI & Technology": <Cpu className="w-6 h-6" />,
  "Digital Growth": <TrendingUp className="w-6 h-6" />,
  "Online Earning": <DollarSign className="w-6 h-6" />,
  "Social Media": <Share2 className="w-6 h-6" />,
  "Motivation": <Flame className="w-6 h-6" />,
  "Future Trends": <Rocket className="w-6 h-6" />,
};

const Categories = () => {
  const cats = categories.filter((c) => c !== "All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Browse <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-10">Apna favourite topic choose karo 🎯</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.map((cat, i) => {
              const count = getPostsByCategory(cat).length;
              return (
                <Link
                  key={cat}
                  to={`/blogs?category=${encodeURIComponent(cat)}`}
                  className="glass rounded-xl p-6 hover-glow group transition-all hover:border-primary/30 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[cat]}
                  </div>
                  <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{cat}</h3>
                  <p className="text-sm text-muted-foreground">{count} article{count !== 1 ? "s" : ""}</p>
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
