import type { ReactNode } from "react";

/** Opens and closes height without unmounting, so accordions and menus do not jump. */
export function Collapse({
  open,
  children,
  className = "",
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ${className}`}
    >
      <div className="min-h-0 overflow-hidden" inert={open ? undefined : true}>
        {children}
      </div>
    </div>
  );
}
