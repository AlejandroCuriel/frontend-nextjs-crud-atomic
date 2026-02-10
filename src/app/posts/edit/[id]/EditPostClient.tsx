"use client";

import { PostService } from "@/src/features/posts/services/postService";
import { usePostStore } from "@/src/features/posts/store/postStore";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import BackButton from "@/src/components/atoms/BackButton";
import { postSchema } from "@/src/features/posts/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type FormData = z.infer<typeof postSchema>;

export function EditPostClient({ id }: { id: number }) {
  const router = useRouter();
  const posts = usePostStore((state) => state.posts);
  const updatePost = usePostStore((state) => state.updatePost);

  const post = useMemo(() => {
    return posts.find((p) => p.id === id);
  }, [posts, id]);

  const form = useForm<FormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      id: post?.id,
      title: post?.title ?? "",
      body: post?.body ?? "",
      userId: 1
    }
  });

  useEffect(() => {
    if (!post) return;

    form.reset({
      id: post.id,
      title: post.title ?? "",
      body: post.body ?? "",
      userId: 1
    });
  }, [post, form]);

  if (!post) {
    return (
      <div className="text-center py-10">
        {posts.length === 0 ? "Cargando..." : "Post no encontrado"}
      </div>
    );
  }

  const currentPost = post;

  async function onSubmit(data: FormData) {
    try {
      // Fake API update
      await PostService.update(id, data);

      // Real store update
      updatePost({
        ...currentPost,
        ...data,
        id: currentPost.id
      });

      toast.success("Post actualizado");

      router.push("/posts");

    } catch {
      toast.error("Error actualizando post");
    }
  }

  return (
    <main className="min-h-screen space-y-6 flex items-center justify-center">
      <div className="w-full lg:w-2/6 mx-4 lg:mx-auto bg-[#f8f8f8] p-4 rounded-md shadow-md">
        <BackButton />
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
            <div className="flex">
              <button
                type="submit"
                className="mx-auto btn btn--primario"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
