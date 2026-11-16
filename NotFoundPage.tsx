import { ButtonLink } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <section className="page-shell grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="font-serif text-9xl text-walnut/25">404</p>
        <h1 className="font-serif text-5xl">A little too much space.</h1>
        <p className="mt-4 text-ink/55">The page you’re looking for isn’t here.</p>
        <ButtonLink to="/" className="mt-8">
          Return home
        </ButtonLink>
      </div>
    </section>
  );
}
