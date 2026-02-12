// src/pages/Blogs.tsx  ← REPLACE your existing file with this
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AdSense from "@/components/AdSense";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import { useDebounce } from "@/hooks/useDebounce";
import {
  getBlogPosts,
  getCategories,
  searchPosts,
  getPostsByCategory,
} from "@/config/content";
import { useSEO } from "@/hooks/useSEO";

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const debouncedSearch = useDebounce(search, 300);

  // Dynamic SEO based on active category
  const categoryForSEO = activeCategory === "All" ? "" : ` – ${activeCategory}`;
  useSEO({
    title: `All Blogs${categoryForSEO} | NexBlog`,
    description:
      activeCategory === "All"
        ? "Browse all blog posts on NexBlog. Explore AI, Technology, Digital Growth, Online Earning, Social Media & Future Trends articles. 🚀"
        : `Read all ${activeCategory} articles on NexBlog. Stay updated with the latest ${activeCategory} insights and tips!`,
    keywords: [
      "blog posts India",
      "tech articles",
      activeCategory !== "All" ? activeCategory : "all blogs",
    ].filter(Boolean),
    url:
      activeCategory === "All"
        ? "/blogs"
        : `/blogs?category=${encodeURIComponent(activeCategory)}`,
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [allPosts, allCategories] = await Promise.all([
        getBlogPosts(),
        getCategories(),
      ]);
      setPosts(allPosts);
      setCategories(allCategories);
      const categoryFromURL = searchParams.get("category");
      if (categoryFromURL && allCategories.includes(categoryFromURL)) {
        setActiveCategory(categoryFromURL);
      } else {
        setFiltered(allPosts);
      }
      setLoading(false);
    }
    loadData();
  }, [searchParams]);

  useEffect(() => {
    async function applyFilters() {
      if (debouncedSearch) {
        const results = await searchPosts(debouncedSearch);
        setFiltered(results);
      } else {
        const results = await getPostsByCategory(activeCategory);
        setFiltered(results);
      }
    }
    applyFilters();
  }, [debouncedSearch, activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearch("");
    if (category !== "All") {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const displayedPosts = useMemo(() => filtered, [filtered]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            Loading blogs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            {/* ✅ H1 with keyword */}
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {activeCategory === "All" ? (
                <>
                  All <span className="gradient-text">Blogs</span>
                </>
              ) : (
                <>
                  <span className="gradient-text">{activeCategory}</span>{" "}
                  Articles
                </>
              )}
            </h1>
            <p className="text-muted-foreground text-sm">
              {activeCategory === "All"
                ? "Explore our latest articles and level up! 🚀"
                : `Explore all ${activeCategory} articles on NexBlog`}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <SearchBar
              value={search}
              onChange={(v) => {
                setSearch(v);
                setActiveCategory("All");
                setSearchParams({});
              }}
              placeholder="Search AI, tech, growth articles..."
            />
          </div>

          {!search && (
            <div className="mb-8">
              <CategoryFilter
                categories={categories}
                active={activeCategory}
                onChange={handleCategoryChange}
              />
            </div>
          )}

          {/* 🎯 Ad #1 - After Search/Filters (Top position) */}
          <AdSense adSlot="5555555555" adFormat="horizontal" className="mb-8" />

          {displayedPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">😕</div>
              <p className="text-lg text-muted-foreground mb-2">
                No results found
              </p>
              <p className="text-sm text-muted-foreground">
                Try different keywords!
              </p>
            </div>
          ) : (
            <>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                role="list"
                aria-label="Blog posts"
              >
                {displayedPosts.map((post, i) => (
                  <div key={post.id} role="listitem">
                    <BlogCard post={post} index={i} />
                  </div>
                ))}
              </div>

              {/* 🎯 Ad #2 - After Blog Grid (Bottom position) */}
              <AdSense adSlot="6666666666" adFormat="auto" className="mt-12" />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
