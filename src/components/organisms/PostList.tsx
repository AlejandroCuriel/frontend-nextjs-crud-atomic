import { Post } from "@/src/features/posts/types/post";
import { PostCard } from "@/src/components/molecules/PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-4 px-4 md:px-0 md:grid-cols-3 auto-rows-fr">
      {posts.map(p => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
