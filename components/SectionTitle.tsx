type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  id,
}: SectionTitleProps) {
  const centered = align === "center";

  return (
    <header className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="mt-3 text-[2.15rem] text-ink sm:text-5xl">
        {title}
      </h2>
      <span className={centered ? "ornament mx-auto" : "ornament"} aria-hidden="true" />
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </header>
  );
}
