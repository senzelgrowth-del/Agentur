import { ReactNode } from "react";

// Content is rendered visible immediately (no JS-driven reveal), so sections never
// appear empty while scripts load. `delay` is kept for API compatibility.
export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
