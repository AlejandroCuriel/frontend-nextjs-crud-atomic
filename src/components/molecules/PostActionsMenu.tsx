"use client";

import { useState, useRef, useEffect } from "react";
import { IconButton } from "@/src/components/atoms/IconButton";
import { usePostMutations } from "@/src/features/posts/hooks/usePostMutations";
import Link from "next/link";

export function PostActionsMenu({ post }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { handleDelete } = usePostMutations();

  // Cerrar al hacer click afuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Solo mostrar si es local
  if (post.origin !== "local") return null;

  return (
    <div className="relative" ref={ref}>
      {/* Botón 3 puntos */}
      <IconButton onClick={() => setOpen(value => !value)}>
        <span className="text-xl leading-none">⋮</span>
      </IconButton>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-0 w-36 bg-white border rounded shadow-md z-50">
          <Link
            href={`/posts/edit/${post.id}`}
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Editar post
          </Link>

          <button
            onClick={() => {
              handleDelete(post.id);
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
          >
            Eliminar post
          </button>
        </div>
      )}
    </div>
  );
}
