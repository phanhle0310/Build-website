import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import type { spaces } from "../data/site";

export function SpaceCard({ space }: { space: (typeof spaces)[number] }) {
  const Icon = space.icon;
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-paper">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={space.image}
          alt={`${space.title} interior`}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-sage">{space.label}</span>
          <Icon size={19} strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-serif text-4xl">{space.title}</h3>
        <p className="mt-3 min-h-12 text-sm leading-6 text-ink/60">{space.description}</p>
        <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-5">
          <span className="text-sm font-medium">{space.price}</span>
          <Link
            to="/booking"
            aria-label={`Book ${space.title}`}
            className="grid size-10 place-items-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-paper"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
