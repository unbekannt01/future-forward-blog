import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FileText, ChevronRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    text: 'By accessing and using this website ("the Site"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must discontinue use of the Site immediately. We reserve the right to update or modify these terms at any time, and your continued use of the Site constitutes acceptance of any such changes.',
  },
  {
    id: "use-of-site",
    title: "2. Use of the Website",
    content: [
      {
        subtitle: "Permitted Use",
        text: "You may access and use this Site for personal, non-commercial purposes. You are welcome to read, share links to our articles, and engage with our content in good faith. All use of the Site must comply with applicable laws and regulations.",
      },
      {
        subtitle: "Prohibited Activities",
        points: [
          "Copying, reproducing, or republishing our content without explicit written permission",
          "Using bots, scrapers, crawlers, or automated tools to access or extract data from the Site",
          "Attempting to hack, deface, overload, or otherwise disrupt the website or its servers",
          "Submitting spam, abusive, defamatory, or illegal content through any forms or comments",
          "Impersonating other users, our team, or any other person or entity",
          "Using our content or platform for commercial purposes without prior written consent",
          "Circumventing, disabling, or interfering with ad-serving or security technologies on the Site",
        ],
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    content: [
      {
        subtitle: "Our Content",
        text: "All content published on this Site — including but not limited to articles, blog posts, graphics, logos, icons, images, and design elements — is owned by or licensed to us and is protected under applicable copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without our prior written permission.",
      },
      {
        subtitle: "Your Submissions",
        text: "By submitting comments, feedback, or other user-generated content on this Site, you grant us a non-exclusive, royalty-free, perpetual, worldwide license to use, display, moderate, and distribute that content. You confirm that your submissions do not infringe any third-party rights and that you have the right to grant this license.",
      },
    ],
  },
  {
    id: "advertising",
    title: "4. Advertising",
    text: "This Site displays advertisements served by Google AdSense and potentially other advertising networks. These advertisements help us maintain the Site as a free resource. You agree not to engage in fraudulent clicking on advertisements or use tools that artificially inflate ad impressions. We are not responsible for the content of third-party advertisements, and ad content is controlled by advertising partners rather than by us.",
  },
  {
    id: "affiliate",
    title: "5. Affiliate Links & Sponsored Content",
    text: "Some content on this Site may contain affiliate links or sponsored material. When you click on an affiliate link and make a qualifying purchase, we may receive a small commission at no additional cost to you. Any sponsored content will be clearly labeled. Our editorial views and opinions remain independent of any affiliate or sponsorship arrangements.",
  },
  {
    id: "disclaimers",
    title: "6. Disclaimers & Accuracy",
    content: [
      {
        subtitle: "Informational Purpose Only",
        text: "All content on this Site is provided for informational and educational purposes only. While we strive to provide accurate, up-to-date information, we make no warranties or representations regarding the completeness, reliability, accuracy, or timeliness of any content. Technology and digital landscapes change rapidly — always verify important information from official or authoritative sources.",
      },
      {
        subtitle: "No Professional Advice",
        text: "Nothing on this Site constitutes professional financial, legal, medical, investment, or technical advice. Content related to online earning, digital growth, or technology trends reflects general opinions and information only. Always consult a qualified professional before making significant decisions based on information found on this Site.",
      },
    ],
  },
  {
    id: "limitation",
    title: "7. Limitation of Liability",
    text: "To the fullest extent permitted by applicable law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to your access to or use of the Site, reliance on any content published here, or any errors, inaccuracies, or omissions in the content. Your use of this Site is entirely at your own risk.",
  },
  {
    id: "third-party",
    title: "8. Third-Party Links & Services",
    text: "This Site may contain links to third-party websites, tools, or services for your convenience or reference. These links do not imply endorsement of the linked sites or their content. We have no control over and accept no responsibility for the content, privacy policies, or practices of any third-party websites. We encourage you to review the terms and privacy policies of any external sites you visit.",
  },
  {
    id: "comments",
    title: "9. User Comments Policy",
    content: [
      {
        subtitle: "Acceptable Comments",
        text: "We welcome thoughtful and constructive comments that contribute meaningfully to the discussion. You may ask questions, share your experiences, or respectfully present differing viewpoints.",
      },
      {
        subtitle: "Prohibited Comment Content",
        points: [
          "Hate speech, discrimination, harassment, or personal attacks",
          "Spam, self-promotional content, or unrelated external links",
          "Content that infringes on the privacy or rights of others",
          "Illegal content, threats, or material that violates applicable laws",
          "Deliberately false or misleading information",
        ],
      },
    ],
    footer: "We reserve the right to remove any comments that violate these guidelines at our sole discretion and without prior notice.",
  },
  {
    id: "newsletter",
    title: "10. Newsletter",
    text: "By subscribing to our newsletter, you consent to receive periodic emails about new articles, site updates, and relevant content. You may unsubscribe at any time using the unsubscribe link included in every email. We will not share or sell your email address to third parties for marketing purposes.",
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    text: "These Terms of Service are governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. Any disputes arising out of or in connection with your use of this Site shall be subject to the jurisdiction of courts in India. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
  },
  {
    id: "changes",
    title: "12. Changes to Terms",
    text: "We reserve the right to revise or update these Terms of Service at any time. We will indicate the date of the last update at the top of this page. It is your responsibility to review these terms periodically. Continued use of the Site following the posting of updated terms constitutes your acceptance of those changes.",
  },
  {
    id: "contact",
    title: "13. Contact",
    text: "If you have any questions about these Terms of Service, wish to report a violation, or have any other legal inquiries, please contact us through the Contact page available on this website. We will endeavor to respond promptly.",
  },
];

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service | NexBlog";
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
            <span className="text-foreground">Terms of Service</span>
          </nav>

          {/* Header */}
          <div className="glass rounded-2xl p-8 md:p-10 mb-8 relative overflow-hidden animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Terms of <span className="gradient-text">Service</span>
                </h1>
                <p className="text-muted-foreground text-sm">
                  Last updated:{" "}
                  <span className="text-foreground font-medium">February 2026</span>
                </p>
                <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-2xl">
                  Please read these Terms of Service carefully before using our website.
                  By accessing the Site, you agree to be bound by these terms. 📄
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
                      <h3 className="text-sm font-semibold text-secondary mb-1.5">{item.subtitle}</h3>
                      {item.text && (
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                      )}
                      {item.points && (
                        <ul className="space-y-2 mt-2">
                          {item.points.map((point, k) => (
                            <li key={k} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                {section.text && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
                )}

                {section.footer && (
                  <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border italic">
                    {section.footer}
                  </p>
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
              By using this website, you agree to these Terms of Service.{" "}
              <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
              {" · "}
              <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;