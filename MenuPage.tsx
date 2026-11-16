import { PageHeader } from "../components/ui/PageHeader";
import { images, menuGroups } from "../data/site";

export function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Café menu"
        title="Made slowly. Enjoyed quietly."
        intro="Thoughtful drinks and simple food, designed to sustain focus without interrupting your flow."
      />
      <section className="page-shell grid gap-14 pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <img
            src={images.cup}
            alt="Coffee on a wooden table"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
          <p className="mt-4 text-xs leading-5 text-ink/50">
            Our menu changes with the season. Plant-based milk is always available at no extra
            charge.
          </p>
        </div>
        <div className="space-y-16">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <div className="border-b border-ink/20 pb-5">
                <h2 className="font-serif text-5xl">{group.title}</h2>
                <p className="mt-2 text-sm text-ink/50">{group.note}</p>
              </div>
              <div>
                {group.items.map(([name, description, price]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[1fr_auto] gap-4 border-b border-ink/10 py-5"
                  >
                    <div>
                      <h3 className="font-medium">{name}</h3>
                      <p className="mt-1 text-sm text-ink/50">{description}</p>
                    </div>
                    <span className="text-sm">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
