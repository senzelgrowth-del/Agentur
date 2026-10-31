"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { CALENDLY_URL, NAV_LINKS } from "@/lib/content";

// Floating dark pill navigation; stays readable on light and dark sections alike.
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3">
      <Container>
        <div className="theme-dark flex h-16 items-center justify-between gap-3 rounded-full border border-line-strong bg-[#0a0e1a]/95 pl-5 pr-2 shadow-[0_12px_40px_-12px_rgba(10,14,26,0.55)] backdrop-blur-md">
          <Link href="/#top" className="flex shrink-0 items-center gap-2" onClick={() => setOpen(false)}>
            <Image src="/logo-sg-white.png" alt="SenzelGrowth Logo" width={34} height={22} priority />
            <span className="hidden text-base font-semibold tracking-tight text-ink min-[400px]:inline">SenzelGrowth</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-muted-strong transition-colors hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={CALENDLY_URL} external className="whitespace-nowrap px-5 py-3 text-sm">
              Erstgespräch
            </Button>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-ink md:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="theme-dark mt-2 rounded-3xl border border-line-strong bg-[#0a0e1a]/95 p-3 backdrop-blur-md md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base text-muted-strong hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </header>
  );
}
