import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const BlogCard = ({ post, index = 0 }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${post.id}`}
      className="group block opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      <article className="glass rounded-xl overflow-hidden hover-glow transition-all duration-500 group-hover:border-primary/30 h-full flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            </div>
            <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
