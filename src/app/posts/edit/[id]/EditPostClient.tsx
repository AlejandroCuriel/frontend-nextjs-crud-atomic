"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePostStore } from "@/src/features/posts/store/postStore";
import { PostService } from "@/src/features/posts/services/postService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/src/features/posts/schemas/postSchema";
import toast from "react-hot-toast";
import { z } from "zod";
import Link from "next/link";
import BackButton from "@/src/components/atoms/BackButton";

type FormData = z.infer<typeof postSchema>;

export function EditPostClient({ id }: { id: number }) {
  const router = useRouter();
  console.log('id:', id)
  const posts = usePostStore(state => state.posts);
  const updatePost = usePostStore(state => state.updatePost);

  const post = useMemo(() => {
    return posts.find(p => p.id === id);
  }, [posts, id]);
  console.log('post:', post)
  let form
  if (post) {
    form = useForm<FormData>({
      resolver: zodResolver(postSchema),
      values: {
        id: post?.id,
        title: post?.title || "",
        body: post?.body || "",
        userId: 1,
      }
    });
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        Post no encontrado
      </div>
    );
  }

  async function onSubmit(data: FormData) {
    try {
      // Fake API update
      await PostService.update(1, data);

      // Real store update
      updatePost({
        ...post,
        ...data
      });

      toast.success("Post actualizado");

      router.push("/posts");

    } catch {
      toast.error("Error actualizando post");
    }
  }

  return (
    <main className="min-h-screen space-y-6 flex items-center justify-center">
      <div className="lg:w-2/6 mx-4 lg:mx-auto bg-[#f8f8f8] p-4 rounded-md shadow-md">
        <BackButton/>
        

        <section className="space-y-6 max-w-11/12 md:container mx-auto mt-4">
          <h1 className="text-2xl font-bold mb-6">
            Editar Post
          </h1>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 text-sm">
                Título
              </label>

              <input
                {...form.register("title")}
                className="w-full border rounded p-2"
              />

              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm">
                Contenido
              </label>

              <textarea
                {...form.register("body")}
                className="w-full border rounded p-2 min-h-[140px]"
              />

              {form.formState.errors.body && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.body.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
            >
              Guardar cambios
            </button>
          </form>
        </section>


      </div>
    </main>

  );
}
