import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          from_name: "NexBlog Newsletter",
          subject: "🎉 New Newsletter Subscription",
          name: name || "Anonymous",
          email: email,
          message: `New subscriber: ${name || "Anonymous"} (${email})`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setEmail("");
        setName("");
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError("Something went wrong. Please try again!");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setError("Network error. Please try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Stay <span className="gradient-text">Ahead</span> of the Curve
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Weekly insights on AI, tech, and digital growth — delivered straight to your inbox! 🚀
            </p>

            {submitted ? (
              <div className="animate-fade-in space-y-2">
                <div className="flex items-center justify-center gap-2 text-green-500">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium text-lg">Subscribed successfully!</p>
                </div>
                <p className="text-muted-foreground text-sm">
                  Thank you for joining our community! 🎉
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe anytime. 🔒
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;