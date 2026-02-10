"use client";

import { create } from "zustand";
import { Post } from "../types/post";

interface PostState {
  posts: Post[];
  setPosts: (postsOrFn: Post[] | ((prev: Post[]) => Post[])) => void;

  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (id: number) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],

  setPosts: (postsOrFn) =>
  set(state => ({
    posts:
      typeof postsOrFn === "function"
        ? postsOrFn(state.posts)
        : postsOrFn
  })),

  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts]
    })),

  updatePost: (updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    })),

  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter(post => post.id !== id)
    }))
}));
