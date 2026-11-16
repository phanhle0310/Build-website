import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { SpaceCard } from "../components/SpaceCard";
import { ButtonLink } from "../components/ui/Button";
import { images, principles, spaces } from "../data/site";

export function HomePage() {
  return (
    <>
      <section className="page-shell py-5 md:py-8">
        <div className="relative min-h-[76vh] overflow-hidden rounded-[2rem] bg-ink">
          <img
            src={images.hero}
            alt="Warm, minimal café interior"
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <div className="relative flex min-h-[76vh] flex-col justify-between p-6 text-paper sm:p-10 md:p-14">
            <div className="flex justify-between">
              <p className="eyebrow">Study • Pause • Restore</p>
              <p className="hidden text-right text-xs leading-5 text-paper/70 sm:block">
                Inspired by the Japanese concept of ma—
                <br />
                the meaningful space between moments.
              </p>
            </div>
            <div>
              <h1 className="max-w-5xl font-serif text-6xl leading-[0.88] tracking-[-0.04em] sm:text-7xl md:text-[7rem] lg:text-[9rem] reveal">
                Find your
                <br />
                <span className="italic">space between.</span>
              </h1>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink to="/booking" variant="light">
                  Book your space <ArrowRight size={17} />
                </ButtonLink>
                <Link to="/spaces" className="flex items-center gap-2 px-3 text-sm">
                  Explore MA <ArrowDown size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-36">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.5fr]">
          <p className="eyebrow pt-3 text-sage">One place, three rhythms</p>
          <div>
            <h2 className="font-serif text-5xl leading-[1.02] tracking-[-0.02em] sm:text-6xl md:text-7xl">
              Not quite an office.
              <br />
              Not quite a hotel.
              <br />
              <span className="italic text-sage">Entirely your own.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-7 text-ink/60">
              MA is a place to move between focused work, thoughtful breaks, and genuine rest—all
              under one quiet roof.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mist/50 py-24">
        <div className="page-shell">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow text-sage">Choose your pace</p>
              <h2 className="mt-3 font-serif text-5xl">Spaces for every state.</h2>
            </div>
            <Link to="/spaces" className="hidden items-center gap-2 text-sm font-medium md:flex">
              View all spaces <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {spaces.map((space) => (
              <SpaceCard key={space.title} space={space} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-36">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div className="relative">
            <img
              src={images.detail}
              alt="Quiet table by a window"
              className="aspect-[4/5] w-full rounded-[2rem] object-cover"
            />
            <div className="absolute -bottom-6 -right-2 rounded-2xl bg-walnut p-6 text-paper sm:right-8">
              <p className="font-serif text-4xl">間</p>
              <p className="mt-1 text-xs tracking-widest">MA / THE PAUSE</p>
            </div>
          </div>
          <div className="md:pl-10">
            <p className="eyebrow text-sage">Our philosophy</p>
            <h2 className="mt-5 font-serif text-5xl leading-none md:text-7xl">
              Better work begins with a better pause.
            </h2>
            <div className="mt-10 space-y-8">
              {principles.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-5 border-t border-ink/10 pt-6">
                  <Icon className="mt-1 text-sage" size={21} strokeWidth={1.5} />
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-ink/60">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
