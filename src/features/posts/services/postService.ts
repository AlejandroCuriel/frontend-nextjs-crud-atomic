import { apiFetch } from "@/src/lib/apiClient";
import { Post } from "../types/post";

export const PostService = {
  getAll: () => apiFetch<Post[]>("/posts"),

  getById: (id: number) =>
    apiFetch<Post>(`/posts/${id}`),

  create: (data: Partial<Post>) =>
    apiFetch<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  update: (id: number, data: Partial<Post>) =>
    apiFetch<Post>(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    apiFetch(`/posts/${id}`, {
      method: "DELETE"
    })
};
