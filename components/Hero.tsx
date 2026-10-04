import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SmartImage } from "@/components/SmartImage";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden sm:min-h-[calc(100svh-4.25rem)] sm:items-center">
      <SmartImage
        src={siteConfig.hero.image}
        alt={siteConfig.hero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="shell relative z-10 py-14 sm:py-20">
        <p className="eyebrow text-on-dark-muted">
          {siteConfig.city} · {siteConfig.country}
        </p>
        <h1 className="mt-4 max-w-4xl text-[2.7rem] text-on-dark min-[390px]:text-5xl sm:text-6xl lg:text-7xl">
          {siteConfig.hero.title}
        </h1>
        <p className="mt-4 max-w-xl font-serif text-2xl text-on-dark-muted sm:text-3xl">
          {siteConfig.hero.subtitle}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-on-dark sm:text-lg">
          {siteConfig.hero.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/reservation" className="btn btn-light w-full sm:w-auto">
            {siteConfig.cta.booking}
          </Link>
          <WhatsAppButton
            payload={{ intent: "information" }}
            className="btn btn-on-dark w-full sm:w-auto"
          />
        </div>
      </div>
    </section>
  );
}
