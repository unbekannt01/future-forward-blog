import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, Mail, MapPin, Loader2 } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-muted-foreground text-sm mb-10">Have a question or suggestion? We're all ears! 🎧</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto">
            {[
              { icon: Mail, label: "Email", value: "testing.buddy1111@gmail.com" },
              { icon: MapPin, label: "Location", value: "India" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={label} className="glass rounded-xl p-5 text-center opacity-0 animate-fade-in" style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}>
                <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>

          {submitted ? (
            <div className="glass rounded-xl p-8 text-center animate-fade-in">
              <p className="text-primary font-medium text-lg">✅ Message sent successfully!</p>
              <p className="text-sm text-muted-foreground mt-2">We'll get back to you soon!</p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              action="https://formsubmit.co/testing.buddy1111@gmail.com"
              method="POST"
              className="glass rounded-xl p-6 md:p-8 space-y-4 animate-fade-in" 
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="📧 New Contact Form Submission - NexBlog" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />
              <input type="hidden" name="_next" value={window.location.href} />
              <input type="hidden" name="_autoresponse" value="Thank you for contacting NexBlog! We'll respond within 24 hours." />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="Name"
                  placeholder="Your Name" 
                  required 
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50" 
                />
                <input 
                  type="email" 
                  name="Email"
                  placeholder="Your Email" 
                  required 
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50" 
                />
              </div>
              <input 
                type="text" 
                name="Subject"
                placeholder="Subject" 
                required 
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm disabled:opacity-50" 
              />
              <textarea 
                name="Message"
                placeholder="Your Message" 
                rows={5} 
                required 
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm resize-none disabled:opacity-50" 
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;