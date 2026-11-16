import { PageHeader } from "../components/ui/PageHeader";
import { images } from "../data/site";

export function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="The space between is not empty."
        intro="In Japanese, ma describes the meaningful interval between things. We built a place that gives that interval room to breathe."
      />
      <section className="page-shell pb-24">
        <img
          src={images.about}
          alt="Sunlit wooden café interior"
          className="h-[55vh] min-h-96 w-full rounded-[2rem] object-cover"
        />
        <div className="grid gap-10 py-20 md:grid-cols-2">
          <h2 className="max-w-lg font-serif text-5xl leading-none md:text-6xl">
            We were tired of choosing between a noisy café and an empty hotel room.
          </h2>
          <div className="space-y-6 text-base leading-7 text-ink/65">
            <p>
              MA began with a simple question: what if a single place could support every part of a
              productive day—not just the work, but the pauses that make the work possible?
            </p>
            <p>
              Our answer brings together a warm study café, genuinely quiet private pods, and simple
              sleep spaces. Every detail is designed to reduce friction, from the lighting and
              acoustics to the tea at your desk.
            </p>
            <p>
              We believe focus should feel human, rest should be accessible, and good spaces can
              change the shape of a day.
            </p>
          </div>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-ink/10 sm:grid-cols-3">
          {[
            ["2025", "Founded with care"],
            ["12", "Quiet private spaces"],
            ["100%", "Renewable energy"],
          ].map(([number, label]) => (
            <div key={label} className="bg-paper p-8 text-center">
              <p className="font-serif text-6xl text-walnut">{number}</p>
              <p className="mt-2 text-sm text-ink/55">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
