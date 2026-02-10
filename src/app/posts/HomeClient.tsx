"use client";

import { PostList } from "@/src/components/organisms/PostList";
import { usePostStore } from "@/src/features/posts/store/postStore";
import { useEffect } from "react";

export default function HomeClient({ initialPosts }) {
  const posts = usePostStore(s => s.posts);
  const setPosts = usePostStore(s => s.setPosts);

  useEffect(() => {
    if (posts.length === 0) {
      setPosts(
        initialPosts.map(post => ({
          ...post,
          origin: "api"
        }))
      );
    }
  }, [initialPosts]);

  const visiblePosts =
    posts.length > 0
      ? posts.slice(0, 7)
      : initialPosts;

  return <PostList posts={visiblePosts} />;
}
