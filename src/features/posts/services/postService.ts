import { apiFetch } from "@/src/lib/apiClient";
import { Post } from "../types/post";

export const PostService = {
  getAll: (limit?: number) => {
    const params = new URLSearchParams();
    if (limit  && limit > 0) params.append('_limit', limit.toString());
    const query = params.toString();
    return apiFetch<Post[]>(`/posts${query ? `?${query}` : ''}`);
  },

  create: (data: Partial<Post>) =>
    apiFetch<Post>("/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
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
