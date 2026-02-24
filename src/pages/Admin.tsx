// src/pages/Admin.tsx
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/lib/useAdminAuth";
import {
  getAllPostsForAdmin,
  savePost,
  deletePost,
  saveCategories,
  getCategories,
  type BlogPost,
} from "@/config/content";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Eye,
  EyeOff,
  Tag,
  Loader2,
  ChevronLeft,
  Clock, // ← CHANGE 1: Clock icon add kiya
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateId(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) +
    "-" +
    Date.now().toString(36)
  );
}

// ─── CHANGE 2: publishedAt format helper ──────────────────────────────────────
function formatPublishedAt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const EMPTY_POST: Omit<BlogPost, "id"> = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  author: "NexBlog Team",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min",
  image: "",
  tags: [],
  published: true,
};

// ─── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen() {
  const { login, error, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await login(email, password);
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-1 gradient-text">NexBlog Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in to manage your content
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Post Editor ───────────────────────────────────────────────────────────────

function PostEditor({
  initial,
  categories,
  onSave,
  onCancel,
}: {
  initial: BlogPost | null;
  categories: string[];
  onSave: () => void;
  onCancel: () => void;
}) {
  const isNew = !initial;
  const [form, setForm] = useState<Omit<BlogPost, "id">>(
    initial ? { ...initial } : { ...EMPTY_POST },
  );
  const [tagsInput, setTagsInput] = useState(
    initial ? initial.tags.join(", ") : "",
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    if (!form.title || !form.content || !form.category) {
      setError("Title, category aur content required hai!");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const id = initial?.id ?? generateId(form.title);
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await savePost({ id, ...form, tags });
      onSave();
    } catch {
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold">
          {isNew ? "New Post" : "Edit Post"}
        </h2>

        {/* ── CHANGE 3: publishedAt editor screen mein bhi dikhao ── */}
        {!isNew && (form as BlogPost).publishedAt && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            Published: {formatPublishedAt((form as BlogPost).publishedAt!)}
          </span>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => set("published", !form.published)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              form.published
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            {form.published ? (
              <Eye className="w-3.5 h-3.5" />
            ) : (
              <EyeOff className="w-3.5 h-3.5" />
            )}
            {form.published ? "Published" : "Draft"}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm hover:opacity-90 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-xl p-5 space-y-4">
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Post Title *"
              className={inputCls}
            />
            <textarea
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short excerpt (shown on cards)"
              rows={2}
              className={`${inputCls} resize-none`}
            />
            <textarea
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Content (Markdown: ## Heading, **bold**, - list, > quote)"
              rows={18}
              className={`${inputCls} resize-y font-mono text-xs leading-relaxed`}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold">Post Settings</h3>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                <option value="">Select category</option>
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Author
              </label>
              <input
                value={form.author}
                onChange={(e) => set("author", e.target.value)}
                placeholder="Author name"
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Read Time
              </label>
              <input
                value={form.readTime}
                onChange={(e) => set("readTime", e.target.value)}
                placeholder="5 min"
                className={inputCls}
              />
            </div>
          </div>

          <div className="glass rounded-xl p-5 space-y-4">
            <h3 className="text-sm font-semibold">Media & SEO</h3>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">
                Cover Image URL
              </label>
              <input
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://..."
                className={inputCls}
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="mt-2 rounded-lg w-full h-28 object-cover border border-border"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tags (comma separated)
              </label>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="AI, Machine Learning, Tech"
                className={inputCls}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Categories Manager ────────────────────────────────────────────────────────

function CategoriesManager({
  categories,
  onUpdate,
}: {
  categories: string[];
  onUpdate: (cats: string[]) => void;
}) {
  const [cats, setCats] = useState(categories.filter((c) => c !== "All"));
  const [newCat, setNewCat] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    const updated = ["All", ...cats];
    await saveCategories(updated);
    onUpdate(updated);
    setSaving(false);
  }

  function addCat() {
    const trimmed = newCat.trim();
    if (trimmed && !cats.includes(trimmed)) {
      setCats([...cats, trimmed]);
      setNewCat("");
    }
  }

  return (
    <div className="glass rounded-xl p-6 max-w-lg">
      <h3 className="font-semibold mb-4">Manage Categories</h3>
      <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
        {cats.map((cat) => (
          <span
            key={cat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs"
          >
            {cat}
            <button
              onClick={() => setCats(cats.filter((c) => c !== cat))}
              className="hover:text-red-400 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCat()}
          placeholder="New category name"
          className="flex-1 px-4 py-2 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
        />
        <button
          onClick={addCat}
          className="px-4 py-2 rounded-xl bg-muted border border-border hover:bg-primary/10 hover:border-primary/30 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm hover:opacity-90 disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        Save Categories
      </button>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

function Dashboard() {
  const { user, logout } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "editor" | "categories">("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function loadData() {
    setLoading(true);
    try {
      const [allPosts, catsData] = await Promise.all([
        getAllPostsForAdmin(),
        getCategories(),
      ]);
      setPosts(allPosts);
      setCategories(catsData);
    } catch (err) {
      console.error("loadData error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    setDeleting(id);
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  function handleEdit(post: BlogPost) {
    setEditingPost(post);
    setView("editor");
  }

  function handleNew() {
    setEditingPost(null);
    setView("editor");
  }

  async function handleSaved() {
    setView("list");
    setEditingPost(null);
    await loadData();
  }

  if (view === "editor") {
    return (
      <div className="min-h-screen bg-background">
        <AdminHeader
          user={user}
          onLogout={logout}
          onBack={() => setView("list")}
        />
        <main className="pt-20 pb-20 px-4">
          <PostEditor
            initial={editingPost}
            categories={categories}
            onSave={handleSaved}
            onCancel={() => setView("list")}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} onLogout={logout} />
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === "list"
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Posts ({posts.length})
              </button>
              <button
                onClick={() => setView("categories")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  view === "categories"
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Categories
              </button>
            </div>
            <button
              onClick={handleNew}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm hover:opacity-90"
            >
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>

          {view === "categories" && (
            <CategoriesManager
              categories={categories}
              onUpdate={setCategories}
            />
          )}

          {view === "list" && (
            <>
              {loading ? (
                <div className="text-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20 glass rounded-xl">
                  <p className="text-muted-foreground mb-4">No posts yet!</p>
                  <button
                    onClick={handleNew}
                    className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm"
                  >
                    Create First Post
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="glass rounded-xl p-4 flex items-center gap-4"
                    >
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-12 rounded-lg object-cover flex-shrink-0 hidden sm:block"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-sm truncate">
                            {post.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              post.published
                                ? "bg-green-500/10 text-green-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </div>

                        {/* ── CHANGE 4: publishedAt post list mein dikhao ── */}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {post.category} · {post.date} · {post.readTime}
                          {post.publishedAt && (
                            <span className="ml-2 inline-flex items-center gap-1 text-blue-400/70">
                              <Clock className="w-3 h-3" />
                              {formatPublishedAt(post.publishedAt)}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-muted-foreground"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deleting === post.id}
                          className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-muted-foreground disabled:opacity-50"
                          title="Delete"
                        >
                          {deleting === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Admin Header ──────────────────────────────────────────────────────────────

function AdminHeader({
  user,
  onLogout,
  onBack,
}: {
  user: { email?: string | null } | null;
  onLogout: () => void;
  onBack?: () => void;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <span className="font-bold gradient-text">NexBlog</span>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {user?.email}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Entry Point ───────────────────────────────────────────────────────────────

const Admin = () => {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return user ? <Dashboard /> : <LoginScreen />;
};

export default Admin;
