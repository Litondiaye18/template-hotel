import Link from "next/link";
import { siteConfig } from "@/config/site";
import { OpeningHours } from "@/components/OpeningHours";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-on-dark">
      <div className="shell grid gap-10 py-14 pb-28 sm:pb-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-3xl">{siteConfig.siteName}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-dark-muted">
            {siteConfig.slogan}
          </p>
        </div>
        <nav aria-label="Navigation du pied de page">
          <p className="text-sm font-semibold tracking-[0.16em] text-on-dark-muted uppercase">
            Explorer
          </p>
          <ul className="mt-4 space-y-2">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-on-dark">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reservation" className="inline-flex min-h-11 items-center text-on-dark">
                {siteConfig.cta.booking}
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-on-dark-muted uppercase">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="inline-flex min-h-11 items-center" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-2 leading-relaxed text-on-dark-muted">
              {siteConfig.address}
              <br />
              {siteConfig.city}, {siteConfig.country}
            </li>
          </ul>
          <ul className="mt-4 flex flex-wrap gap-4">
            {siteConfig.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center underline decoration-accent underline-offset-4"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <OpeningHours titleId="footer-horaires" heading="Horaires" tone="dark" />
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="shell py-5 pr-28 text-sm text-on-dark-muted">
          © {year} {siteConfig.siteName}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
