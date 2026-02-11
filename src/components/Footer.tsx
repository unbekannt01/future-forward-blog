import { Link } from "react-router-dom";
import { Zap, Heart } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" onClick={scrollToTop}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold gradient-text">NexBlog</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              Next generation blog platform covering AI, Technology, Digital Growth and much more.
              Stay ahead with the future! 🚀
            </p>
            {/* Social handles hidden for now */}
            {/* <div className="flex gap-3 mt-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div> */}
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Home", "Blogs", "Categories", "About", "Contact"].map((link) => (
                <Link
                  key={link}
                  to={`/${link === "Home" ? "" : link.toLowerCase()}`}
                  onClick={scrollToTop}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Categories</h4>
            <div className="flex flex-col gap-2">
              {["AI & Technology", "Digital Growth", "Online Earning", "Motivation"].map((cat) => (
                <Link
                  key={cat}
                  to={`/blogs?category=${encodeURIComponent(cat)}`}
                  onClick={scrollToTop}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="neon-line mt-8 mb-6" />

        <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart className="w-3 h-3 text-secondary" /> by NexBlog Team © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;