import { Check } from "lucide-react";
import { SpaceCard } from "../components/SpaceCard";
import { PageHeader } from "../components/ui/PageHeader";
import { images, spaces } from "../data/site";

export function SpacesPage() {
  return (
    <>
      <PageHeader
        eyebrow="The spaces"
        title="A room for every rhythm."
        intro="From the gentle hum of the café to complete private quiet, choose the environment your next hour needs."
      />
      <section className="page-shell grid gap-5 pb-24 lg:grid-cols-3">
        {spaces.map((space) => (
          <SpaceCard key={space.title} space={space} />
        ))}
      </section>
      <section className="bg-walnut py-24 text-paper">
        <div className="page-shell grid gap-12 md:grid-cols-2 md:items-center">
          <img
            src={images.pods}
            alt="Private study desk"
            className="aspect-[4/3] rounded-[2rem] object-cover"
          />
          <div>
            <p className="eyebrow text-mist">Everything considered</p>
            <h2 className="mt-5 font-serif text-5xl leading-none">
              Comfort that helps you disappear into the work.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Fast, secure Wi-Fi",
                "Ergonomic seating",
                "Plenty of power",
                "Filtered water",
                "Dimmable lighting",
                "Fresh air circulation",
              ].map((item) => (
                <p key={item} className="flex items-center gap-3 text-sm text-paper/80">
                  <Check size={16} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
