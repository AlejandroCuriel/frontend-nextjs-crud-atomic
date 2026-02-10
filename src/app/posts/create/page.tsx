"use client";

import BackButton from "@/src/components/atoms/BackButton";
import { PostForm } from "@/src/components/molecules/PostForm";
import { usePostMutations } from "@/src/features/posts/hooks/usePostMutations";
import { PostFormValues } from "@/src/features/posts/schemas/postSchema";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const { handleCreate } = usePostMutations();
  const router = useRouter();

  async function onSubmit(data: PostFormValues) {
    await handleCreate(data);
    router.push("/posts");
  }


  return (
    <main className="min-h-screen space-y-6 flex items-center justify-center">
      <div className="lg:w-2/6 mx-4 lg:mx-auto bg-[#f8f8f8] p-4 rounded-md shadow-md">
        <BackButton />
        <section className="space-y-6 max-w-11/12 md:container mx-auto mt-4">
          <h1 className="text-2xl font-bold mb-4 text-center">¿Qué tienes en mente hoy?</h1>
          <PostForm
            defaultValues={{ title: "", body: "", userId: 1 }}
            onSubmit={onSubmit}
          />
        </section>
      </div>
    </main>
  );
}
