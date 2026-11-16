import { CheckCircle2, Clock3, Mail, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../components/ui/Button";
import { PageHeader } from "../components/ui/PageHeader";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Come find your quiet."
        intro="Questions, group bookings, or just curious? Send a note or stop by. We would love to welcome you."
      />
      <section className="page-shell grid gap-12 pb-24 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-8">
          <div className="flex gap-4">
            <MapPin className="text-sage" />
            <div>
              <h2 className="font-medium">Visit</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                142 Cedar Street
                <br />
                Downtown, CA 94108
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock3 className="text-sage" />
            <div>
              <h2 className="font-medium">Hours</h2>
              <p className="mt-2 text-sm leading-6 text-ink/60">
                Café 7:00–22:00
                <br />
                Sleep boxes open 24 hours
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Mail className="text-sage" />
            <div>
              <h2 className="font-medium">Write</h2>
              <a
                href="mailto:hello@madeeper.com"
                className="mt-2 block text-sm text-ink/60 underline"
              >
                hello@madeeper.com
              </a>
            </div>
          </div>
        </div>
        {sent ? (
          <div className="grid min-h-96 place-items-center rounded-[2rem] bg-mist/60 p-10 text-center">
            <div>
              <CheckCircle2 className="mx-auto text-sage" size={42} />
              <h2 className="mt-5 font-serif text-5xl">Message received.</h2>
              <p className="mt-4 text-ink/60">We’ll get back to you within one business day.</p>
              <Button className="mt-8" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-[2rem] bg-paper p-7 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name">
                <input required className="form-input" placeholder="Your name" />
              </Field>
              <Field label="Email">
                <input required type="email" className="form-input" placeholder="you@example.com" />
              </Field>
            </div>
            <Field label="What can we help with?" className="mt-6">
              <select className="form-input">
                <option>General question</option>
                <option>Group booking</option>
                <option>Membership</option>
                <option>Press & partnerships</option>
              </select>
            </Field>
            <Field label="Message" className="mt-6">
              <textarea
                required
                rows={5}
                className="form-input resize-none"
                placeholder="Tell us a little more..."
              />
            </Field>
            <Button type="submit" className="mt-7 w-full sm:w-auto">
              Send message
            </Button>
          </form>
        )}
      </section>
    </>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-sm font-medium ${className}`}>
      {label}
      <span className="mt-2 block [&_.form-input]:w-full [&_.form-input]:rounded-xl [&_.form-input]:border [&_.form-input]:border-ink/15 [&_.form-input]:bg-ivory/40 [&_.form-input]:px-4 [&_.form-input]:py-3 [&_.form-input]:font-normal [&_.form-input]:transition focus-within:[&_.form-input]:border-sage">
        {children}
      </span>
    </label>
  );
}
