import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ArrowIcon } from "./Icons";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  /** Primary is the one filled action. Secondary outlines a supporting action. Tertiary is a text link. */
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  className?: string;
  onClick?: () => void;
  external?: boolean;
  disabled?: boolean;
};

const variants = {
  primary:
    "press bg-brand px-6 py-4 text-white uppercase hover:bg-brand-dark hover:shadow-[0_8px_20px_rgba(21,169,112,0.22)]",
  secondary: "press border border-brand bg-white px-6 py-4 text-brand uppercase hover:bg-brand hover:text-white",
  tertiary: "group/cta gap-2 py-1 text-sm tracking-wide text-brand uppercase hover:text-brand-dark",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
  external,
  disabled,
}: ButtonProps) {
  const tone = variant === "outline" ? "secondary" : variant;
  const classes = `inline-flex items-center justify-center text-center text-[15px] leading-5 font-bold disabled:pointer-events-none disabled:opacity-60 ${variants[tone]} ${className}`;

  const content = (
    <>
      {tone === "tertiary" ? <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" /> : null}
      {children}
    </>
  );

  if (href && external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link className={classes} to={href} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
