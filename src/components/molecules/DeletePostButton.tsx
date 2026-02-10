import { usePostMutations } from "@/src/features/posts/hooks/usePostMutations";

export function DeletePostButton({ post }) {
  const { handleDelete } = usePostMutations();

  if (post.origin !== "local") return null;

  return (
    <button
      onClick={() => handleDelete(post.id)}
      className="text-red-500"
    >
      Delete
    </button>
  );
}
