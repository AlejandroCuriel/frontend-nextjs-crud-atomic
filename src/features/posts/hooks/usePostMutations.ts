"use client";

import toast from "react-hot-toast";
import { PostService } from "../services/postService";
import { usePostStore } from "../store/postStore";
import { PostFormValues } from "../schemas/postSchema";

export function usePostMutations() {
  const { addPost, updatePost, deletePost } = usePostStore();

  async function handleCreate(data: PostFormValues) {
    try {
      const created = await PostService.create(data);
      addPost({
        ...created,
        id: Date.now(),
        origin: "local"
      });

      toast.success("Post creado correctamente");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al crear el post";
      toast.error(msg);
    }
  }

  async function handleUpdate(id: number, data: PostFormValues) {
    try {
      await PostService.update(1, data);
      updatePost({
        ...data,
        id,
        userId: data.userId ?? 1,
        origin: "local"
      });
      toast.success("Post actualizado correctamente");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al actualizar el post";
      toast.error(msg);
    }
  }

  async function handleDelete(id: number) {
    try {
      await PostService.delete(1);
      deletePost(id);
      toast.success("Post eliminado");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al eliminar el post";
      toast.error(msg);
    }
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete
  };
}
