"use client";

import { Button } from "@/src/components/atoms/Button";
import {
  PostFormValues,
  postSchema
} from "@/src/features/posts/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface Props {
  defaultValues?: PostFormValues;
  onSubmit: (data: PostFormValues) => Promise<void>;
  submitLabel?: string;
  submittingLabel?: string;
}

export function PostForm({
  defaultValues,
  onSubmit,
  submitLabel = "Publicar Post",
  submittingLabel = "Publicando Post..."
}: Props) {
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
      <div className="flex">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mx-auto"
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </Button>
      </div>

    </form>
  );
}
