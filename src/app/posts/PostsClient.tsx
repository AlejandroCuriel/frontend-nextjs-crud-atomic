"use client";

import { usePostStore } from "@/src/features/posts/store/postStore";
import { Post } from "@/src/features/posts/types/post";
import { PostList } from "@/src/components/organisms/PostList";
import { useEffect } from "react";

type Props = { initialPosts: Post[] };

export default function PostsClient({ initialPosts }: Props) {
    const setPosts = usePostStore(state => state.setPosts);

  useEffect(() => {
    setPosts(prev => {
      // Separar posts locales
      const localPosts = prev.filter(p => p.origin === "local");

      // Marcar API posts
      const apiPosts = initialPosts.map((p) => ({
        ...p,
        origin: "api" as const
      }));

      return [...localPosts, ...apiPosts];
    });
  }, [initialPosts, setPosts]);

  const finalPosts = usePostStore((state) => state.posts);
  return <PostList posts={finalPosts} />;
}
