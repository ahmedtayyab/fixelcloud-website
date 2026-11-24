export function Eyebrow({ children, className = "text-brand" }: { children: string; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionTitle({
  eyebrow,
  title,
  light = false,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`heading-section mt-2 whitespace-pre-line ${align === "center" ? "mx-auto" : ""} max-w-2xl ${light ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
    </div>
  );
}
