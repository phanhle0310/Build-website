import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const links = [
  ["Spaces", "/spaces"],
  ["Menu", "/menu"],
  ["Membership", "/membership"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/90 backdrop-blur-xl">
      <div className="page-shell flex h-20 items-center justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
          aria-label="Ma home"
        >
          <span className="grid size-9 place-items-center rounded-full bg-ink font-serif text-xl text-paper">
            間
          </span>
          <span className="text-sm font-semibold tracking-[0.18em]">MA / REST & STUDY</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm transition hover:text-walnut ${isActive ? "font-semibold text-walnut" : "text-ink/65"}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/booking"
            className="rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-walnut"
          >
            Book a space
          </Link>
        </nav>
        <button
          className="grid size-11 place-items-center rounded-full border border-ink/15 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <nav
          className="border-t border-ink/10 bg-ivory px-4 pb-6 pt-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          {[...links, ["Book a space", "/booking"]].map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block border-b border-ink/10 py-4 font-serif text-3xl"
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
