"use client";

import { IconButton } from "@/src/components/atoms/IconButton";
import { usePostMutations } from "@/src/features/posts/hooks/usePostMutations";
import { Post } from "@/src/features/posts/types/post";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = { post: Post };

export function PostActionsMenu({ post }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { handleDelete } = usePostMutations();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Solo mostrar si es local
  if (post.origin !== "local") return null;

  return (
    <div className="relative" ref={ref}>
      <IconButton
        onClick={() => setOpen((value) => !value)}
        aria-label="Abrir menú de opciones"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span className="text-xl leading-none">⋮</span>
      </IconButton>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-0 w-36 bg-white border rounded shadow-md z-50"
        >
          <Link
            href={`/posts/edit/${post.id}`}
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
            role="menuitem"
          >
            Editar Post
          </Link>

          <button
            role="menuitem"
            onClick={() => {
              if (window.confirm("¿Estás seguro de que quieres eliminar este post?")) {
                handleDelete(post.id);
                setOpen(false);
              }
            }}
            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
          >
            Eliminar Post
          </button>
        </div>
      )}
    </div>
  );
}
