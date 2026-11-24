import type { ReactNode } from "react";

/* 1186px content column with 20px gutters: matches the original's 127px left edge at 1440. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1226px] px-5 ${className}`}>{children}</div>;
}
