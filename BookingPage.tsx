import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  LoaderCircle,
  Moon,
  Search,
  Square,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button, ButtonLink } from "../components/ui/Button";
import {
  bookingRepository,
  calculateBookingTotal,
} from "../services/booking/mockBookingRepository";
import type { BookableUnit, BookingConfirmation, SpaceType } from "../services/booking/types";

type Status = "idle" | "loading" | "ready" | "empty" | "error" | "confirming" | "success";

const today = new Date();
const minDate = today.toISOString().split("T")[0];
const initialDate = new Date(today.getTime() + 86400000).toISOString().split("T")[0];
const timeOptions = Array.from(
  { length: 15 },
  (_, index) => `${String(index + 7).padStart(2, "0")}:00`,
);

export function BookingPage() {
  const [type, setType] = useState<SpaceType>("pod");
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState("10:00");
  const [duration, setDuration] = useState(2);
  const [available, setAvailable] = useState<BookableUnit[]>([]);
  const [selected, setSelected] = useState<BookableUnit | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const total = useMemo(
    () => calculateBookingTotal(selected, type, duration),
    [selected, type, duration],
  );

  const check = async () => {
    setStatus("loading");
    setSelected(null);
    setError("");
    try {
      const results = await bookingRepository.checkAvailability({ type, date, time, duration });
      setAvailable(results);
      setStatus(results.length ? "ready" : "empty");
    } catch {
      setError("We could not check availability. Please try again.");
      setStatus("error");
    }
  };

  const confirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    setStatus("confirming");
    const form = new FormData(event.currentTarget);
    try {
      const result = await bookingRepository.createBooking({
        type,
        date,
        time,
        duration,
        unitId: selected.id,
        total,
        guestName: String(form.get("name")),
        guestEmail: String(form.get("email")),
      });
      setConfirmation(result);
      setStatus("success");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Booking failed. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success" && confirmation) {
    return (
      <section className="page-shell grid min-h-[75vh] place-items-center py-20">
        <div className="w-full max-w-2xl rounded-[2rem] bg-paper p-8 text-center shadow-[0_25px_80px_rgba(55,45,35,0.08)] sm:p-14">
          <CheckCircle2 className="mx-auto text-sage" size={48} strokeWidth={1.5} />
          <p className="eyebrow mt-6 text-sage">Booking confirmed</p>
          <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Your quiet is waiting.</h1>
          <p className="mx-auto mt-5 max-w-md text-ink/60">
            A confirmation has been prepared for your visit. In this prototype, no payment has been
            taken.
          </p>
          <div className="my-8 grid gap-4 rounded-2xl bg-ivory p-6 text-left sm:grid-cols-2">
            <Detail label="Space" value={confirmation.unitName} />
            <Detail label="Reference" value={confirmation.reference} />
            <Detail label="When" value={`${formatDate(confirmation.date)}, ${confirmation.time}`} />
            <Detail
              label="Duration"
              value={`${confirmation.duration} hour${confirmation.duration > 1 ? "s" : ""}`}
            />
          </div>
          <p className="font-serif text-4xl">${confirmation.total}</p>
          <p className="text-xs text-ink/45">Due at check-in</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => {
                setStatus("idle");
                setSelected(null);
                setConfirmation(null);
              }}
            >
              Make another booking
            </Button>
            <ButtonLink to="/" variant="outline">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell py-14 md:py-24">
      <div className="mb-12">
        <p className="eyebrow text-sage">Reservations</p>
        <h1 className="mt-4 font-serif text-6xl leading-none md:text-8xl">Book your quiet.</h1>
        <p className="mt-5 max-w-xl text-ink/60">
          Choose a private pod for focused work or a sleep box for genuine rest.
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] bg-paper p-6 sm:p-9">
          <div className="grid grid-cols-2 gap-3">
            <TypeButton
              active={type === "pod"}
              onClick={() => {
                setType("pod");
                setStatus("idle");
                setSelected(null);
              }}
              icon={<Square size={19} />}
              title="Study pod"
              detail="4 private spaces"
            />
            <TypeButton
              active={type === "sleep-box"}
              onClick={() => {
                setType("sleep-box");
                setStatus("idle");
                setSelected(null);
              }}
              icon={<Moon size={19} />}
              title="Sleep box"
              detail="8 restful boxes"
            />
          </div>
          <div className="my-8 h-px bg-ink/10" />
          <div className="grid gap-5 sm:grid-cols-3">
            <BookingField label="Date">
              <input
                type="date"
                min={minDate}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setStatus("idle");
                }}
                className="booking-input"
              />
            </BookingField>
            <BookingField label="Start time">
              <select
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setStatus("idle");
                }}
                className="booking-input"
              >
                {timeOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </BookingField>
            <BookingField label="Duration">
              <select
                value={duration}
                onChange={(e) => {
                  setDuration(Number(e.target.value));
                  setStatus("idle");
                }}
                className="booking-input"
              >
                {[1, 2, 3, 4, 6, 8].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} hour{hours > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </BookingField>
          </div>
          <Button onClick={check} disabled={!date || status === "loading"} className="mt-7 w-full">
            {status === "loading" ? (
              <>
                <LoaderCircle className="animate-spin" size={18} />
                Checking spaces...
              </>
            ) : (
              <>
                <Search size={18} />
                Check availability
              </>
            )}
          </Button>

          <div className="mt-8" aria-live="polite">
            {status === "idle" && (
              <State
                icon={<Search />}
                title="Ready when you are"
                text="Choose a date, time, and duration to see available spaces."
              />
            )}
            {status === "loading" && (
              <State
                icon={<LoaderCircle className="animate-spin" />}
                title="Finding your space"
                text="We’re checking each room for your selected time."
              />
            )}
            {status === "empty" && (
              <State
                icon={<Moon />}
                title="No spaces at this time"
                text="Try another start time or shorten your stay."
              />
            )}
            {status === "error" && (
              <State icon={<AlertCircle />} title="Something went quiet" text={error} />
            )}
            {(status === "ready" || status === "confirming") && (
              <div>
                <p className="mb-4 text-sm font-medium">
                  {available.length} space{available.length > 1 ? "s" : ""} available
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {available.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => setSelected(unit)}
                      className={`rounded-2xl border p-4 text-left transition ${selected?.id === unit.id ? "border-sage bg-mist/50" : "border-ink/10 hover:border-ink/30"}`}
                    >
                      <div className="flex justify-between">
                        <span className="font-medium">{unit.name}</span>
                        {selected?.id === unit.id && <Check size={18} className="text-sage" />}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-ink/50">{unit.description}</p>
                      <p className="mt-3 text-sm">${unit.hourlyRate} / hour</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2rem] bg-walnut p-7 text-paper sm:p-9">
            <p className="eyebrow text-mist">Your visit</p>
            <h2 className="mt-4 font-serif text-4xl">
              {selected ? selected.name : type === "pod" ? "Study pod" : "Sleep box"}
            </h2>
            <div className="mt-7 space-y-4 border-y border-paper/15 py-6 text-sm">
              <Summary label="Date" value={formatDate(date)} />
              <Summary label="Time" value={`${time} · ${duration} hr`} />
              <Summary
                label="Rate"
                value={`$${selected?.hourlyRate ?? (type === "pod" ? 12 : 16)} / hr`}
              />
            </div>
            <div className="flex items-baseline justify-between py-6">
              <span className="text-sm text-paper/60">Estimated total</span>
              <span className="font-serif text-5xl">${total}</span>
            </div>
            {selected ? (
              <form onSubmit={confirm} className="space-y-3">
                <input
                  required
                  name="name"
                  placeholder="Full name"
                  className="w-full rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-sm placeholder:text-paper/45"
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 text-sm placeholder:text-paper/45"
                />
                <Button
                  type="submit"
                  variant="light"
                  disabled={status === "confirming"}
                  className="w-full"
                >
                  {status === "confirming" ? (
                    <>
                      <LoaderCircle className="animate-spin" size={18} />
                      Confirming...
                    </>
                  ) : (
                    "Confirm booking"
                  )}
                </Button>
              </form>
            ) : (
              <p className="rounded-xl bg-paper/10 p-4 text-center text-xs text-paper/60">
                Check availability and select a space to continue.
              </p>
            )}
          </div>
          <p className="mt-4 px-4 text-xs leading-5 text-ink/45">
            Free cancellation up to 2 hours before your booking. This is a working prototype; no
            payment is collected.
          </p>
        </aside>
      </div>
    </section>
  );
}

function TypeButton({
  active,
  onClick,
  icon,
  title,
  detail,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition ${active ? "border-sage bg-mist/50" : "border-ink/10"}`}
    >
      <span className="mb-5 block text-sage">{icon}</span>
      <span className="block font-medium">{title}</span>
      <span className="mt-1 block text-xs text-ink/50">{detail}</span>
    </button>
  );
}
function BookingField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="text-sm font-medium">
      {label}
      <span className="mt-2 block [&_.booking-input]:w-full [&_.booking-input]:rounded-xl [&_.booking-input]:border [&_.booking-input]:border-ink/15 [&_.booking-input]:bg-ivory/50 [&_.booking-input]:px-3 [&_.booking-input]:py-3 [&_.booking-input]:font-normal">
        {children}
      </span>
    </label>
  );
}
function State({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-ivory/70 p-8 text-center">
      <span className="mx-auto grid size-11 place-items-center rounded-full bg-mist text-sage">
        {icon}
      </span>
      <h3 className="mt-4 font-serif text-2xl">{title}</h3>
      <p className="mt-1 text-sm text-ink/50">{text}</p>
    </div>
  );
}
function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-paper/50">{label}</span>
      <span>{value}</span>
    </div>
  );
}
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-ink/40">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
function formatDate(value: string) {
  if (!value) return "Select a date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
