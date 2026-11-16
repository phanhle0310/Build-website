import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
};

const styles = {
  dark: "bg-ink text-paper hover:bg-walnut",
  light: "bg-paper text-ink hover:bg-ivory",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

export function Button({ children, variant = "dark", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "dark",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
