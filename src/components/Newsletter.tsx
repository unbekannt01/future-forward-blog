import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

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

      setSubmitted(true);
      setEmail("");
      setName("");
      
      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
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
                  Check your email for a welcome message! 📧
                </p>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit}
                action="https://formsubmit.co/testing.buddy1111@gmail.com"
                method="POST"
                className="space-y-3 max-w-md mx-auto"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_subject" value="🎉 New Newsletter Subscription - NexBlog" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />
                <input type="hidden" name="_next" value={window.location.href} />
                <input 
                  type="hidden" 
                  name="_autoresponse" 
                  value="🎉 Welcome to NexBlog Newsletter!

Thank you for subscribing to NexBlog! 

You're now part of our community of tech enthusiasts, AI learners, and digital growth seekers. 🚀

What to expect:
✅ Weekly insights on AI & Technology
✅ Digital growth tips and strategies
✅ Latest tech trends and innovations
✅ Exclusive content before anyone else

Your first newsletter will arrive this week!

Stay curious, stay ahead! 💡

- The NexBlog Team
https://nexblog.vercel.app" 
                />

                <input
                  type="text"
                  name="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50"
                />

                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    name="Email"
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