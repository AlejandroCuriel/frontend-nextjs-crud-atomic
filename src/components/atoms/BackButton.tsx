"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  to?: string;
};

export default function BackButton({ to }: Props) {
  const router = useRouter();

  // 👉 Si existe destino → usar Link (mejor para SEO y prefetch)
  if (to) {
    return (
      <Link
        href={to}
        className="flex items-center space-x-1 pb-2 md:pb-0"
        aria-label="Regresar a la página anterior"
      >
        <Image
          src="/back-arrow.svg"
          width={18}
          height={18}
          alt="Regresar"
          loading="eager"
        />
        <p className="font-bold">Regresar</p>
      </Link>
    );
  }

  // 👉 Si NO existe destino → usar historial
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="flex items-center space-x-1 pb-2 md:pb-0"
      aria-label="Regresar a la página anterior"
    >
      <Image
        src="/back-arrow.svg"
        width={18}
        height={18}
        alt="Regresar"
      />
      <p className="font-bold">Regresar</p>
    </button>
  );
}
