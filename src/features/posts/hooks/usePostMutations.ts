"use client";

import toast from "react-hot-toast";
import { PostService } from "../services/postService";
import { usePostStore } from "../store/postStore";

export function usePostMutations() {
  const { addPost, updatePost, deletePost } = usePostStore();

  async function handleCreate(data) {
    try {
      const created = await PostService.create(data);
      addPost({
        ...created,
        id: Date.now(),
        origin: "local"
      });

      toast.success("Post creado correctamente");
    } catch {
      toast.error("Error, no se pudo crear el post");
    }
  }

  async function handleUpdate(id, data) {
    try {
      const updated = await PostService.update(id, data);
      updatePost({
        ...updated,
        origin: "local"
      });
      toast.success("Post actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el post");
    }
  }

  async function handleDelete(id) {
    try {
      await PostService.delete(id);
      deletePost(id);
      toast.success("Post eliminado");
    } catch {
      toast.error("Error al eliminar post");
    }
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete
  };
}
