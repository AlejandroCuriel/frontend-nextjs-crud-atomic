import PostsPage from "@/src/app/posts/page";
import { PostList } from "@/src/components/organisms/PostList";
import { PostService } from "@/src/features/posts/services/postService";
import Link from "next/link";

export default async function Home() {
  const posts = await PostService.getAll(7);

  return (
    <main className="space-y-10">
      <section id="header--imagen" className="relative">
        <div className="w-full absolute space-y-10 top-2/5 text-center">
          <h1 className="text-white text-4xl ">Descubre nuestros posts</h1>
          <div className="mx-auto">
            <Link className="btn" href={'/posts'}>Ver todos nuestros post</Link>
          </div>
        </div>
      </section>
      <section className="space-y-6 container mx-auto">
        <h2 className="text-center text-2xl"> Algunos de todos nuestros Posts</h2>
        <div className="w-5/6 mx-auto bg-[#f8f8f8] p-8 rounded-md shadow-md">
        <PostList posts={posts} />
        </div>
      </section>
    </main>
  );
}
