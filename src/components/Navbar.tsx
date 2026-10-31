"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { CALENDLY_URL, NAV_LINKS } from "@/lib/content";
import { Container } from "./ui/Container";

// Full-width light header with a hairline border.
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/#top" className="flex shrink-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/logo-sg.png" alt="SenzelGrowth Logo" width={34} height={22} priority />
          <span className="hidden text-base font-semibold tracking-tight text-ink min-[400px]:inline">SenzelGrowth</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-[#163a6b] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0f2a4f]"
          >
            Erstgespräch <ArrowUpRight size={15} />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-line bg-white md:hidden">
          <Container className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-base text-ink last:border-0"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
