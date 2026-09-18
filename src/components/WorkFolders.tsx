import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import SectionWrapper from "@/components/SectionWrapper";
import SectionHeading from "@/components/SectionHeading";
import ParticleBackground from "@/components/ui/particle-background";
import { cn } from "@/lib/utils";
import { workCategories } from "@/data";
import substackPosts from "@/data/substack-posts.json";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string | null;
  description: string;
  image: string;
  tags: string[];
}

const posts: Record<string, SubstackPost[]> = substackPosts;

const folderCategories = workCategories.filter((c) => c.id !== "community");

function formatDate(dateStr: string | null) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function PostCard({ post }: { post: SubstackPost }) {
  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      whileHover={{ y: -4 }}
    >
      <Card className="bg-white/5 border-white/10 overflow-hidden h-full transition-colors group-hover:bg-white/10 group-hover:border-violet-400/40">
        {post.image && (
          <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
        )}
        <div className="p-6">
          {post.pubDate && (
            <p className="text-muted-foreground text-[13px] mb-2">{formatDate(post.pubDate)}</p>
          )}
          <h3 className="text-foreground font-bold text-[18px] leading-snug group-hover:text-violet-300 transition-colors">
            {post.title}
          </h3>
          {post.description && (
            <p className="mt-2 text-muted-foreground text-[14px] leading-relaxed line-clamp-3">
              {post.description}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-violet-300 text-sm font-semibold">
            Read on Substack
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/8 text-foreground group-hover:bg-violet-500 group-hover:text-white transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </span>
        </div>
      </Card>
    </motion.a>
  );
}

export default function WorkFolders({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (id: string) => void;
}) {
  const activePosts = posts[activeTab] ?? [];
  const activeCategory = folderCategories.find((c) => c.id === activeTab);

  return (
    <section id="work-folders" className="relative bg-black py-20 sm:py-28">
      <ParticleBackground className="-z-10" />
      <SectionWrapper id="work-folders-content">
        <SectionHeading kicker="Work" title="Browse by Topic" />
        <p className="mt-3 text-muted-foreground text-[16px] max-w-2xl">
          Articles from my Substack, organized into folders. New posts tagged on Substack show up
          here automatically.
        </p>

        {/* Folder tabs */}
        <div className="mt-10 flex flex-wrap gap-1" role="tablist">
          {folderCategories.map((category) => {
            const isActive = category.id === activeTab;
            return (
              <motion.button
                key={category.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(category.id)}
                whileHover={{ y: -4 }}
                className={cn(
                  "relative px-5 py-3 text-[15px] font-semibold rounded-t-xl border border-b-0 transition-colors",
                  isActive
                    ? "bg-white/5 text-foreground border-white/10 z-10"
                    : "bg-transparent text-muted-foreground border-transparent hover:bg-white/10 hover:border-violet-400/40 hover:text-foreground",
                )}
              >
                {category.label}
                {posts[category.id]?.length > 0 && (
                  <span className="ml-2 text-[11px] text-violet-300">
                    {posts[category.id].length}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Folder content panel */}
        <div className="bg-white/5 border border-white/10 rounded-b-2xl rounded-tr-2xl p-8 min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {activePosts.length === 0 ? (
                <p className="text-muted-foreground text-[15px]">
                  No posts tagged{" "}
                  <span className="text-foreground font-medium">#{activeCategory?.label}</span>{" "}
                  on Substack yet — check back soon.
                </p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activePosts.map((post) => (
                    <PostCard key={post.link} post={post} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionWrapper>
    </section>
  );
}
