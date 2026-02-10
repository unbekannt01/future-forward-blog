import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Zap, Target, Users, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            About <span className="gradient-text">NexBlog</span>
          </h1>

          <div className="glass rounded-xl p-8 mb-8 animate-fade-in" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <p className="text-muted-foreground leading-relaxed mb-4">
              NexBlog is a modern blog platform focused on AI, Technology, Digital Growth, Online Earning, 
              Social Media, Motivation and Future Trends. 🚀
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to explain complex tech topics in a simple, engaging way 
              so that every reader can easily understand and kickstart their digital journey!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Target, title: "Our Mission", desc: "Make tech knowledge accessible to everyone" },
              { icon: Users, title: "Our Audience", desc: "Young Indians eager to learn & grow" },
              { icon: Sparkles, title: "Our Content", desc: "Engaging Hinglish articles on trending topics" },
              { icon: Zap, title: "Our Vision", desc: "The #1 next-gen tech blog platform" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="glass rounded-xl p-6 opacity-0 animate-fade-in"
                style={{ animationDelay: `${(i + 2) * 100}ms`, animationFillMode: "forwards" }}
              >
                <Icon className="w-5 h-5 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
