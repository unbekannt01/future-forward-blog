import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: Mail, label: "Email", value: "hello@NexBlog.in" },
              { icon: MapPin, label: "Location", value: "New Delhi, India" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
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
            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 md:p-8 space-y-4 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm" />
                <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm" />
              </div>
              <input type="text" placeholder="Subject" required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm" />
              <textarea placeholder="Your Message" rows={5} required className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-sm resize-none" />
              <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
                Send Message <Send className="w-4 h-4" />
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
