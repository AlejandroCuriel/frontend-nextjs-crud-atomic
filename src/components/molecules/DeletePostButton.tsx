"use client";

import { usePostMutations } from "@/src/features/posts/hooks/usePostMutations";
import { Post } from "@/src/features/posts/types/post";

type Props = { post: Post };

export function DeletePostButton({ post }: Props) {
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
