import { PostService } from "@/src/features/posts/services/postService";
import { PostList } from "@/src/components/organisms/PostList";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await PostService.getAll();

  return (
    <main className="space-y-6">
      <section id="header--imagen" className="relative">
      </section>
      <div className="container mx-auto">

        <Link href={'/'}>Regresar</Link>

        <section className="space-y-6 container mx-auto">
          <h1 className="text-center text-2xl">Explora todos nuestros posts</h1>
          <div className="w-5/6 mx-auto bg-[#f8f8f8] p-8 rounded-md shadow-md">

            <PostList posts={posts} />
          </div>
        </section>
      </div>

    </main>
  );
}
