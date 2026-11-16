export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="page-shell pb-14 pt-16 md:pb-20 md:pt-24">
      <p className="eyebrow mb-5 text-sage reveal">{eyebrow}</p>
      <h1 className="max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.03em] sm:text-6xl md:text-8xl reveal delay-1">
        {title}
      </h1>
      <p className="mt-7 max-w-2xl text-base leading-7 text-ink/65 md:text-lg reveal delay-2">
        {intro}
      </p>
    </header>
  );
}
