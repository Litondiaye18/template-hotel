"use client";

import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import type { GalleryImage } from "@/data/gallery";
import { SmartImage } from "@/components/SmartImage";

type GalleryLightboxProps = {
  items: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function GalleryLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: GalleryLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = items[index];

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onIndexChange((index + 1) % items.length);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onIndexChange((index - 1 + items.length) % items.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndexChange]);

  if (!item) return null;

  const go = (direction: number) => {
    onIndexChange((index + direction + items.length) % items.length);
  };

  const onTab = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>("button, [href]"),
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        className="lightbox-backdrop absolute inset-0"
        aria-label="Fermer la visionneuse"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
        className="relative z-10 w-full max-w-5xl"
        onKeyDown={onTab}
      >
        <h2 id="lightbox-title" className="font-serif text-2xl text-on-dark sm:text-3xl">
          {item.title}
        </h2>
        <div className="relative mt-3 h-[68vh] w-full bg-canvas">
          <SmartImage
            src={item.image}
            alt={item.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <button type="button" className="btn btn-on-dark" onClick={() => go(-1)}>
            Précédent
          </button>
          <p className="text-sm text-on-dark" aria-live="polite">
            {index + 1} / {items.length}
          </p>
          <button type="button" className="btn btn-on-dark" onClick={() => go(1)}>
            Suivant
          </button>
          <button ref={closeRef} type="button" className="btn btn-light" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
