'use client';
import { Post } from "@/src/features/posts/types/post";
import { PostCard } from "@/src/components/molecules/PostCard";
import { useState, useEffect, useRef, useMemo } from 'react';

export function PostList({ posts }: { posts: Post[] }) {
  const [nextIndex, setNextIndex] = useState(10);
  const loaderRef = useRef(null);

  const visiblePosts = useMemo(() => {
    console.log('postlist:', posts)
    return posts.slice(0, nextIndex);
  }, [posts, nextIndex]);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && nextIndex < posts.length) {
        setNextIndex(prev => prev + 7 );
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
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