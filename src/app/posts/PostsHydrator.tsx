"use client";

import { useEffect } from "react";
import { usePostStore } from "@/src/features/posts/store/postStore";

export function PostsHydrator({ posts }) {
  const setPosts = usePostStore(state => state.setPosts);
  const storePosts = usePostStore(state => state.posts);

  useEffect(() => {
  console.log("PostsHydrator:", storePosts);

    if (storePosts.length === 0) {
      setPosts(
        posts.map(post => ({
          ...post,
          origin: "api"
        }))
      );
    }
  }, [posts, setPosts, storePosts.length]);

  return null;
}
