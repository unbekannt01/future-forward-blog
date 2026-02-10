/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  
  // ✅ Debounced search for better performance
  const debouncedSearch = useDebounce(search, 300);

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

  // ✅ Memoize displayed posts
  const displayedPosts = useMemo(() => filtered, [filtered]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading blogs...</p>
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              All <span className="gradient-text">Blogs</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Explore our latest articles and level up! 🚀
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPosts.map((post, i) => (
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