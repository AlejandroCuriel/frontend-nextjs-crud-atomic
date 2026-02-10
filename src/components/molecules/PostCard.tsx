import { Post } from "@/src/features/posts/types/post";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="h-full p-4 rounded space-y-4 bg-white shadow-lg hover card_flotante">
      <h3 className="font-bold capitalize text-center">{post.title}</h3>
      <p className="text-sm text-gray-600 capitalize">{post.body}</p>
    </div>
  );
}
