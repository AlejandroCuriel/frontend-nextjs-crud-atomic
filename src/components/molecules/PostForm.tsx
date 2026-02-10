"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "@/src/features/posts/schemas/postSchema";

interface Props {
  defaultValues?: PostFormValues;
  onSubmit: (data: PostFormValues) => Promise<void>;
}

export function PostForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <input
        {...register("title")}
        placeholder="Agrega un título"
        className="border p-2 rounded"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <textarea
        {...register("body")}
        placeholder="Agrega una descripción"
        className="border p-2 rounded"
      />

      {errors.body && (
        <p className="text-red-500 text-sm">{errors.body.message}</p>
      )}

      <button
        disabled={isSubmitting}
        className={`btn btn--primario ${isSubmitting ? 'btn--inactivo': ''}`}
      >
        {isSubmitting ? "Publicando post..." : "Publicar Post"}
      </button>
    </form>
  );
}
