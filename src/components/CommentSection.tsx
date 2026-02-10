import { useState } from "react";
import { User, Send, Loader2, CheckCircle } from "lucide-react";
import type { Comment } from "@/config/content";

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Rahul Kumar",
    content: "What an amazing article! First time I've read about AI in such detail. Keep it up! 🔥",
    date: "2026-02-09",
  },
  {
    id: "2",
    author: "Sneha Patel",
    content: "This is exactly what I needed! Very informative and easy to understand. More articles please! 💡",
    date: "2026-02-08",
  },
];

interface CommentSectionProps {
  postTitle?: string;
}

const CommentSection = ({ postTitle = "Blog Post" }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !text.trim()) return;

    setIsSubmitting(true);

    // 1. Add comment instantly (frontend only)
    const newComment: Comment = {
      id: Date.now().toString(),
      author: name,
      content: text,
      date: new Date().toISOString().split("T")[0],
    };
    
    setComments([newComment, ...comments]);

    // 2. Send email via FormSubmit (HTML form submission)
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.log('Email send error (comment still posted):', error);
    } finally {
      setIsSubmitting(false);
      // Clear form
      setName("");
      setEmail("");
      setText("");
    }
  };

  return (
    <section className="mt-12">
      <h3 className="text-xl font-bold mb-6">
        Comments <span className="text-muted-foreground text-sm font-normal">({comments.length})</span>
      </h3>

      {/* FormSubmit HTML Form */}
      <form 
        onSubmit={handleSubmit}
        action="https://formsubmit.co/testing.buddy1111@gmail.com"
        method="POST"
        className="glass rounded-xl p-5 mb-8 space-y-3"
      >
        {/* FormSubmit Configuration (hidden fields) */}
        <input type="hidden" name="_subject" value={`💬 New Comment on: ${postTitle}`} />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="box" />
        <input type="hidden" name="_next" value={window.location.href} />
        <input type="hidden" name="_autoresponse" value="Thank you for your comment! We've received it." />
        <input type="hidden" name="Post Title" value={postTitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name *"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50"
          />
          <input
            type="email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email *"
            required
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50"
          />
        </div>
        
        <textarea
          name="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm resize-none disabled:opacity-50"
        />

        {showSuccess && (
          <div className="flex items-center gap-2 text-green-500 text-sm animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>Comment posted successfully! ✅</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              Post Comment <Send className="w-3.5 h-3.5" />
            </>
          )}
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