'use client';
import { Post } from "@/src/features/posts/types/post";
import { PostCard } from "@/src/components/molecules/PostCard";
import { useState, useEffect, useRef } from 'react';

export function PostList({ posts }: { posts: Post[] }) {
  const [visiblePosts, setVisiblePosts] = useState(posts.slice(0, 7));
  const [nextIndex, setNextIndex] = useState(7);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && nextIndex < posts.length) {
        const newIndex = nextIndex + 7;
        setVisiblePosts(posts.slice(0, newIndex));
        setNextIndex(newIndex);
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [nextIndex, posts]);

  return (
    <>
      <div className="grid gap-4 px-4 md:px-0 md:grid-cols-3 auto-rows-fr">
        {visiblePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {nextIndex < posts.length && (
        <div 
          ref={loaderRef} 
          className="h-20 flex items-center justify-center w-full col-span-full"
        >
          <span className="text-gray-400 animate-pulse">Cargando más contenido...</span>
        </div>
      )}
    </>
  );
}