import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, ChevronRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    text: 'Welcome to our website ("the Site", "we", "us", or "our"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.',
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: [
      {
        subtitle: "a) Automatically Collected Data",
        text: "When you visit our Site, certain information may be collected automatically, including your IP address, browser type, device type, operating system, referring URLs, pages visited, and time spent on pages. This data is collected through cookies and similar tracking technologies to help us analyze and improve site performance.",
      },
      {
        subtitle: "b) Information You Voluntarily Provide",
        text: "We may collect personal information that you voluntarily provide when you submit a contact form, leave a comment, or subscribe to our newsletter. This may include your name and email address. You are not required to provide any personal information to browse the Site.",
      },
      {
        subtitle: "c) Third-Party Services",
        text: "Our Site uses third-party services such as advertising networks and analytics providers. These services may independently collect data about your browsing behavior through cookies and similar technologies. We do not control the data collection practices of these third parties.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    points: [
      "To operate, maintain, and improve the Site and its content",
      "To respond to your comments, questions, and requests",
      "To send periodic newsletter emails if you have subscribed",
      "To analyze website traffic and user behavior for improvement",
      "To display relevant advertisements through third-party ad networks",
      "To detect and prevent spam, fraud, or other harmful activity",
    ],
  },
  {
    id: "advertising",
    title: "4. Advertising & Google AdSense",
    content: [
      {
        subtitle: "Third-Party Advertising",
        text: "We use third-party advertising services, including Google AdSense, to display advertisements on our Site. These services use cookies to serve ads based on your prior visits to our website and other websites on the Internet, helping to show you ads that may be relevant to your interests.",
      },
      {
        subtitle: "Opting Out",
        text: "You may opt out of personalized advertising by visiting Google's Ads Settings at g.co/adsettings. You can also manage cookie preferences through your browser settings. Opting out of personalized ads does not mean you will stop seeing all advertisements — you may still see non-personalized ads.",
      },
    ],
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    content: [
      {
        subtitle: "What Are Cookies?",
        text: "Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and understand how you interact with the content.",
      },
      {
        subtitle: "Types of Cookies We Use",
        text: "We use essential cookies required for basic site functionality, analytics cookies to understand visitor behavior, and advertising cookies to serve relevant ads. You can control or disable cookies through your browser settings at any time. Disabling certain cookies may affect the functionality of the Site.",
      },
    ],
  },
  {
    id: "data-sharing",
    title: "6. Sharing of Information",
    text: "We do not sell, trade, or rent your personal information to third parties for marketing purposes. We may share anonymized or aggregated data that cannot identify you personally. Your information may be processed by third-party service providers we use to operate the Site — such as analytics providers, advertising networks, email delivery services, and hosting providers — each governed by their own privacy practices.",
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    text: "We retain personal information only for as long as reasonably necessary to fulfill the purposes outlined in this policy. Newsletter subscription data is retained until you choose to unsubscribe. Contact form submissions are retained for a reasonable period to manage communications. Analytics data is retained according to the policies of the respective analytics provider.",
  },
  {
    id: "your-rights",
    title: "8. Your Privacy Rights",
    points: [
      "Right to Access — Request a copy of the personal data we hold about you",
      "Right to Rectification — Request correction of inaccurate personal data",
      "Right to Erasure — Request deletion of your personal data",
      "Right to Opt-Out — Unsubscribe from newsletters at any time",
      "Right to Object — Object to certain types of data processing",
      "Right to Data Portability — Request your data in a portable format",
    ],
    footer: "To exercise any of these rights, please reach out through the Contact page on this website.",
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    text: "Our Site is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us and we will promptly delete such data.",
  },
  {
    id: "security",
    title: "10. Data Security",
    text: "We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, alteration, or disclosure. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security of your data.",
  },
  {
    id: "third-party-links",
    title: "11. Links to Other Websites",
    text: "Our Site may contain links to third-party websites for reference or convenience. We have no control over the privacy practices or content of those external sites and are not responsible for them. We encourage you to review the privacy policy of every website you visit.",
  },
  {
    id: "changes",
    title: "12. Changes to This Policy",
    text: "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will indicate the date of the most recent revision at the top of this page. Your continued use of the Site after any changes are posted constitutes your acceptance of the updated policy.",
  },
  {
    id: "contact",
    title: "13. Contact Us",
    text: "If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please reach out through the Contact page available on this website. We will make every effort to respond to your inquiry in a timely manner.",
  },
];

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | NexBlog";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary flex items-center gap-1 transition-colors">
              <Home className="w-3 h-3" /> Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Privacy Policy</span>
          </nav>

          {/* Header */}
          <div className="glass rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Privacy <span className="gradient-text">Policy</span>
                </h1>
                <p className="text-muted-foreground text-sm">
                  Last updated:{" "}
                  <span className="text-foreground font-medium">February 2026</span>
                </p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-2xl">
                  We are committed to protecting your privacy. This policy explains
                  what information we collect, how we use it, and your rights. 🔒
                </p>
              </div>
            </div>
          </div>

          {/* Quick Nav */}
          <div
            className="glass rounded-xl p-5 mb-8 opacity-0 animate-fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Navigation
            </p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-3 py-1.5 rounded-lg text-xs bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all border border-border"
                >
                  {s.title.split(". ")[1]}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-5">
            {sections.map((section, i) => (
              <div
                key={section.id}
                id={section.id}
                className="glass rounded-xl p-6 md:p-8 opacity-0 animate-fade-in scroll-mt-24"
                style={{ animationDelay: `${(i + 2) * 70}ms`, animationFillMode: "forwards" }}
              >
                <h2 className="text-lg font-bold mb-4 text-foreground">{section.title}</h2>

                {section.content &&
                  section.content.map((item, j) => (
                    <div key={j} className="mb-4 last:mb-0">
                      <h3 className="text-sm font-semibold text-primary mb-1.5">{item.subtitle}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}

                {section.text && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
                )}

                {section.points && (
                  <>
                    <ul className="space-y-2 mb-4">
                      {section.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    {section.footer && (
                      <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border">
                        {section.footer}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div
            className="mt-8 text-center opacity-0 animate-fade-in"
            style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
          >
            <p className="text-xs text-muted-foreground">
              By using this website, you agree to this Privacy Policy.{" "}
              <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
              {" · "}
              <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;