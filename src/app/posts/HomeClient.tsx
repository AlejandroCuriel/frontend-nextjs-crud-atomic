"use client";

import { PostList } from "@/src/components/organisms/PostList";
import { usePostStore } from "@/src/features/posts/store/postStore";
import { Post } from "@/src/features/posts/types/post";
import { useEffect } from "react";

type Props = { initialPosts: Post[] };

export default function HomeClient({ initialPosts }: Props) {
  const posts = usePostStore(s => s.posts);
  const setPosts = usePostStore(s => s.setPosts);

  useEffect(() => {
    if (posts.length === 0) {
      setPosts(
        initialPosts.map((post) => ({
          ...post,
          origin: "api" as const
        }))
      );
    }
  }, [initialPosts]);

  const visiblePosts =
    posts.length > 0
      ? posts.slice(0, 7)
      : initialPosts;

  return <PostList posts={visiblePosts} />
}
