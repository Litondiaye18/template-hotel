"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { MobileMenu } from "@/components/MobileMenu";
import { SmartImage } from "@/components/SmartImage";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="shell flex h-[4.25rem] items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <SmartImage
            src={siteConfig.logo}
            alt={siteConfig.logoIncludesName ? siteConfig.siteName : ""}
            width={44}
            height={44}
            className="h-11 w-11 shrink-0"
          />
          {siteConfig.logoIncludesName ? null : (
            <span className="truncate font-serif text-xl text-ink sm:text-2xl">
              {siteConfig.siteName}
            </span>
          )}
        </Link>
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center px-3 text-sm font-medium ${
                      active ? "text-accent" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/reservation" className="btn btn-primary hidden lg:inline-flex">
            {siteConfig.cta.booking}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
