import { Post } from "@/src/features/posts/types/post";
import { PostCard } from "@/src/components/molecules/PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {posts.map(p => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
