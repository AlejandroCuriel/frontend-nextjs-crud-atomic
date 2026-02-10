import HomeClient from "@/src/app/posts/HomeClient";
import { PostCardSkeleton } from "@/src/components/molecules/PostCardSkeleton";
import { PostService } from "@/src/features/posts/services/postService";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const posts = await PostService.getAll(7)

  return (
    <main className="space-y-10 mb-8">

      <section id="header--imagen" className="relative">
        <div className="w-full absolute space-y-10 top-2/5 text-center">
          <h1 className="text-white text-4xl ">Descubre nuestros posts</h1>
          <div className="md:mx-auto mx-4 gap-6 flex flex-col md:flex-row justify-center">
            <Link className="btn btn--primario md:min-w-48" href={'/posts'}>Ver todos nuestros post</Link>
            <Link className="btn btn--secundario md:min-w-48" href={'/posts/create'}>Crear un nuevo post</Link>
          </div>
        </div>
      </section>
      <section className="space-y-6 max-w-11/12 md:container mx-auto">
        <h2 className="text-center text-2xl"> Algunos de nuestros Posts</h2>
        <div className="md:w-5/6 mx-auto md:bg-[#f8f8f8] md:p-4 rounded-md md:shadow-md">
          <Suspense fallback={
            <div className="space-y-4 lg:grid grid-cols-3 gap-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))}
            </div>
          }>
            <HomeClient initialPosts={posts} />
          </Suspense>
        </div>
      </section>
    </main>

  )
}
