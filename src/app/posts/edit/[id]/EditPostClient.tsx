"use client";

import BackButton from "@/src/components/atoms/BackButton";
import { PostForm } from "@/src/components/molecules/PostForm";
import { usePostMutations } from "@/src/features/posts/hooks/usePostMutations";
import { PostFormValues } from "@/src/features/posts/schemas/postSchema";
import { usePostStore } from "@/src/features/posts/store/postStore";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export function EditPostClient({ id }: { id: number }) {
  const router = useRouter();
  const posts = usePostStore((state) => state.posts);
  const { handleUpdate } = usePostMutations();

  const post = useMemo(() => posts.find((p) => p.id === id), [posts, id]);

  if (!post) {
    return (
      <div className="text-center py-10">
        {posts.length === 0 ? "Cargando..." : "Post no encontrado"}
      </div>
    );
  }

  async function onSubmit(data: PostFormValues) {
    await handleUpdate(id, data);
    router.push("/posts");
  }

  return (
    <main className="min-h-screen space-y-6 flex items-center justify-center">
      <div className="w-full lg:w-2/6 mx-4 lg:mx-auto bg-[#f8f8f8] p-4 rounded-md shadow-md">
        <BackButton />
        <section className="space-y-6 max-w-11/12 md:container mx-auto mt-4">
          <h1 className="text-2xl font-bold mb-6">Editar Post</h1>
          <PostForm
            key={post.id}
            defaultValues={{
              id: post.id,
              title: post.title,
              body: post.body,
              userId: post.userId
            }}
            onSubmit={onSubmit}
            submitLabel="Guardar cambios"
            submittingLabel="Guardando..."
          />
        </section>
      </div>
    </main>
  );
}
