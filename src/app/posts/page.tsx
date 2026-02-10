import { PostService } from "@/src/features/posts/services/postService";
import PostsClient from "@/src/app/posts/PostsClient";
import { PostsHydrator } from "@/src/app/posts/PostsHydrator";
import BackButton from "@/src/components/atoms/BackButton";
import { Suspense } from "react";
import { PostCardSkeleton } from "@/src/components/molecules/PostCardSkeleton";

export default async function PostsPage() {
  const posts = await PostService.getAll();

  return (
    <main className="space-y-6 my-4">
      <div className="max-w-11/12 md:container mx-auto">

        <section className="md:w-5/6 mx-auto space-y-6">
          <div className="md:flex items-center">
            <BackButton />
            <h1 className="text-center text-2xl w-full">Explora todos nuestros posts</h1>
          </div>

          <div className=" md:bg-[#f8f8f8] md:p-4 rounded-md md:shadow-md">
            <PostsHydrator posts={posts} />
            <Suspense fallback={
              <div className="space-y-4 lg:grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))}
              </div>
            }>
              <PostsClient initialPosts={posts} />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
