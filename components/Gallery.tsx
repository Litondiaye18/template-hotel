"use client";

import { useCallback, useState } from "react";
import {
  galleryCategories,
  galleryImages,
  type GalleryCategory,
  type GalleryImage,
} from "@/data/gallery";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { SmartImage } from "@/components/SmartImage";

type GalleryProps = {
  items?: GalleryImage[];
  showFilters?: boolean;
  limit?: number;
  variant?: "grid" | "feature";
};

export function Gallery({
  items = galleryImages,
  showFilters = true,
  limit,
  variant = "grid",
}: GalleryProps) {
  const source = typeof limit === "number" ? items.slice(0, limit) : items;
  const [category, setCategory] = useState<"all" | GalleryCategory>("all");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);

  const visible =
    showFilters && category !== "all"
      ? source.filter((item) => item.category === category)
      : source;

  const close = useCallback(() => setOpen(false), []);
  const changeIndex = useCallback((next: number) => setIndex(next), []);

  const openAt = (next: number) => {
    setIndex(next);
    setOpen(true);
  };

  if (variant === "feature") {
    const current = items[Math.min(selected, Math.max(items.length - 1, 0))];
    if (!current) return null;

    return (
      <div>
        <button
          type="button"
          className="relative block aspect-[16/10] w-full overflow-hidden border border-line"
          onClick={() => openAt(selected)}
          aria-label={`Agrandir l’image : ${current.alt}`}
        >
          <SmartImage
            src={current.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 70vw"
            className="object-cover"
          />
        </button>
        {items.length > 1 ? (
          <ul className="mt-3 grid grid-cols-3 gap-3">
            {items.map((item, itemIndex) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={itemIndex === selected}
                  aria-label={item.alt}
                  className={`relative block aspect-[4/3] w-full overflow-hidden border ${
                    itemIndex === selected ? "border-accent" : "border-line"
                  }`}
                  onClick={() => setSelected(itemIndex)}
                >
                  <SmartImage
                    src={item.image}
                    alt=""
                    fill
                    sizes="30vw"
                    className="object-cover"
                  />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {open ? (
          <GalleryLightbox
            items={items}
            index={index}
            onClose={close}
            onIndexChange={changeIndex}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div>
      {showFilters ? (
        <div role="group" aria-label="Filtrer la galerie" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={category === "all"}
            className={category === "all" ? "btn btn-primary" : "btn btn-secondary"}
            onClick={() => {
              setCategory("all");
              setOpen(false);
            }}
          >
            Tout
          </button>
          {galleryCategories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              className={category === item.id ? "btn btn-primary" : "btn btn-secondary"}
              onClick={() => {
                setCategory(item.id);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">Aucune image dans cette catégorie.</p>
      ) : (
        <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${showFilters ? "mt-8" : ""}`}>
          {visible.map((item, itemIndex) => (
            <li key={item.id}>
              <figure>
                <button
                  type="button"
                  className="relative block aspect-[4/3] w-full overflow-hidden border border-line"
                  aria-label={`Agrandir l’image : ${item.alt}`}
                  onClick={() => openAt(itemIndex)}
                >
                  <SmartImage
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </button>
                <figcaption className="mt-2 text-sm text-muted">{item.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      )}

      {open ? (
        <GalleryLightbox
          items={visible}
          index={index}
          onClose={close}
          onIndexChange={changeIndex}
        />
      ) : null}
    </div>
  );
}
