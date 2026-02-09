import { PostService } from "@/src/features/posts/services/postService";
import { PostList } from "@/src/components/organisms/PostList";
import Link from "next/link";

export default async function PostsPage() {
  const posts = await PostService.getAll(5);

  return (
    <main className="container mx-auto p-6">
      <Link href={'/'}>Regresar</Link>
      <h1 className="text-2xl font-bold mb-6">Posts</h1>
      <PostList posts={posts} />
    </main>
  );
}
