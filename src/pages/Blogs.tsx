/* eslint-disable prefer-const */
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { blogPosts, categories, searchPosts, getPostsByCategory } from "@/config/content";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    let posts = search ? searchPosts(search) : getPostsByCategory(activeCategory);
    return posts;
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              All <span className="gradient-text">Blogs</span>
            </h1>
            <p className="text-muted-foreground text-sm">Explore our latest articles and level up! 🚀</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar value={search} onChange={(v) => { setSearch(v); setActiveCategory("All"); }} />
          </div>

          {!search && (
            <div className="mb-8">
              <CategoryFilter categories={categories} active={activeCategory} onChange={(c) => { setActiveCategory(c); setSearch(""); }} />
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No results found 😕 Try different keywords!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
