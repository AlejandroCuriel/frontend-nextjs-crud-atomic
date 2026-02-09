import { Post } from "@/src/features/posts/types/post";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold capitalize">{post.title}</h3>
      <p className="text-sm text-gray-600 capitalize">{post.body}</p>
    </div>
  );
}
