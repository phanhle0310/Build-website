import { Check, Sparkles } from "lucide-react";
import { ButtonLink } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";

const plans = [
  {
    name: "Drift",
    price: "$48",
    note: "For the occasional reset",
    featured: false,
    perks: ["12 café hours / month", "10% off food & drink", "Member booking window"],
  },
  {
    name: "Flow",
    price: "$128",
    note: "For your weekly rhythm",
    featured: true,
    perks: [
      "40 café hours / month",
      "6 pod hours included",
      "15% off food & drink",
      "One guest pass",
    ],
  },
  {
    name: "Still",
    price: "$248",
    note: "Your complete quiet routine",
    featured: false,
    perks: [
      "Unlimited café access",
      "16 pod hours included",
      "4 sleep box hours",
      "20% off food & drink",
      "Priority reservations",
    ],
  },
];

export function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership"
        title="Make quiet a habit."
        intro="Flexible monthly memberships for people who do their best work when the environment feels just right. Pause or cancel anytime."
      />
      <section className="page-shell grid gap-5 pb-24 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex min-h-[31rem] flex-col rounded-[2rem] p-8 ${plan.featured ? "bg-walnut text-paper" : "border border-ink/15 bg-paper"}`}
          >
            {plan.featured && (
              <span className="absolute right-6 top-6 flex items-center gap-2 rounded-full bg-paper/10 px-3 py-2 text-xs">
                <Sparkles size={14} />
                Most loved
              </span>
            )}
            <p className="eyebrow opacity-60">{plan.note}</p>
            <h2 className="mt-5 font-serif text-6xl">{plan.name}</h2>
            <p className="mt-7">
              <span className="font-serif text-5xl">{plan.price}</span>
              <span className="text-sm opacity-60"> / month</span>
            </p>
            <div className="my-8 h-px bg-current opacity-15" />
            <ul className="space-y-4">
              {plan.perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-sm opacity-80">
                  <Check size={17} />
                  {perk}
                </li>
              ))}
            </ul>
            <ButtonLink
              to="/contact"
              variant={plan.featured ? "light" : "dark"}
              className="mt-auto"
            >
              Choose {plan.name}
            </ButtonLink>
          </article>
        ))}
      </section>
    </>
  );
}
