import { useState } from "react";
import { User, Send } from "lucide-react";
import type { Comment } from "@/data/blogData";

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Rahul Kumar",
    content: "Bahut accha article hai bhai! AI ke baare mein itna detail mein padha pehli baar. Keep it up! 🔥",
    date: "2026-02-09",
  },
  {
    id: "2",
    author: "Sneha Patel",
    content: "This is exactly what I needed! Very informative and easy to understand. More articles please! 💡",
    date: "2026-02-08",
  },
];

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: name,
      content: text,
      date: new Date().toISOString().split("T")[0],
    };
    setComments([newComment, ...comments]);
    setName("");
    setText("");
  };

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold mb-6">
        Comments <span className="text-muted-foreground text-sm font-normal">({comments.length})</span>
      </h3>

      <form onSubmit={handleSubmit} className="glass rounded-xl p-5 mb-8 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          required
          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm resize-none"
        />
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          Post Comment <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className="glass rounded-xl p-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{c.author}</p>
                <p className="text-xs text-muted-foreground">{new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
