import { ReactNode } from "react";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-navy-900/60 p-8">
      <h2 className="mb-5 text-lg font-semibold text-ink">{title}</h2>
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}
