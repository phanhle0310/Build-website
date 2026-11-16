import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="page-shell py-16 md:py-24">
        <div className="grid gap-12 border-b border-paper/15 pb-14 md:grid-cols-2">
          <div>
            <p className="eyebrow text-mist">Make room for what matters</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-none md:text-7xl">
              Your quiet place, in the middle of everything.
            </h2>
          </div>
          <div className="flex items-end md:justify-end">
            <Link
              to="/booking"
              className="group flex items-center gap-4 border-b border-paper/40 pb-3 text-lg"
            >
              Reserve your space
              <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
        <div className="grid gap-8 pt-10 text-sm text-paper/60 sm:grid-cols-3">
          <div>
            <p className="font-medium text-paper">MA / Rest & Study</p>
            <p className="mt-2">
              142 Cedar Street
              <br />
              Downtown, CA 94108
            </p>
          </div>
          <div>
            <p className="font-medium text-paper">Open daily</p>
            <p className="mt-2">
              Café 7:00–22:00
              <br />
              Sleep boxes 24 hours
            </p>
          </div>
          <div className="sm:text-right">
            <p>hello@madeeper.com</p>
            <p className="mt-2">© {new Date().getFullYear()} MA Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
