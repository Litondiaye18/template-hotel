"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="btn btn-secondary min-w-12 px-3"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          "Fermer"
        ) : (
          <>
            <span className="sr-only">Ouvrir le menu</span>
            <span aria-hidden="true" className="flex flex-col gap-1.5">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </>
        )}
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[4.25rem] z-40 max-h-[calc(100svh-4.25rem)] overflow-y-auto border-t border-line bg-canvas px-4 py-6"
      >
        <nav aria-label="Navigation mobile">
          <ul className="flex flex-col gap-2">
            {siteConfig.navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-12 items-center px-2 text-lg ${
                      active ? "text-accent" : "text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/reservation" className="btn btn-primary mt-4 w-full" onClick={() => setOpen(false)}>
            {siteConfig.cta.booking}
          </Link>
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="btn btn-secondary mt-3 w-full">
            Appeler
          </a>
        </nav>
      </div>
    </div>
  );
}
