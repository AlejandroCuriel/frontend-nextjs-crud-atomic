"use client";

import { usePostStore } from "@/src/features/posts/store/postStore";
import { PostList } from "@/src/components/organisms/PostList";
import { useEffect } from "react";

export default function PostsClient({initialPosts}) {
    const setPosts = usePostStore(state => state.setPosts);

  useEffect(() => {
    setPosts(prev => {
      // Separar posts locales
      const localPosts = prev.filter(p => p.origin === "local");

      // Marcar API posts
      const apiPosts = initialPosts.map(p => ({
        ...p,
        origin: "api"
      }));

      return [...localPosts, ...apiPosts];
    });
  }, [initialPosts, setPosts]);

  const finalPosts = usePostStore(state => state.posts);
  console.log("POSTS RENDER", finalPosts);
  return <PostList posts={finalPosts} />;
}
