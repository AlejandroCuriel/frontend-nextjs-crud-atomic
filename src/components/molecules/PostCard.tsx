import { PostActionsMenu } from "@/src/components/molecules/PostActionsMenu";
import { Post } from "@/src/features/posts/types/post";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="h-full p-4 rounded space-y-4 bg-white shadow-lg hover card_flotante">
      <div className="flex justify-between items-start">
        <h3 className="font-bold capitalize">{post.title}</h3>
        <PostActionsMenu post={post} />
      </div>
      <p className="text-sm text-gray-600 capitalize text-justify">{post.body}</p>
    </div>
  );
}
