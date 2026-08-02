"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { CALENDLY_URL, NAV_LINKS } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-navy-950/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="#top" className="flex items-center gap-2.5">
          <Image
            src="/logo.jpg"
            alt="SenzelGrowth Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold tracking-tight text-ink">
            Senzel<span className="text-accent-strong">Growth</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-strong transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={CALENDLY_URL} external className="px-5 py-2.5 text-sm">
            Strategiegespräch
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-ink"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t border-line bg-navy-950/95 backdrop-blur-md">
          <Container className="flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-muted-strong hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Button
              href={CALENDLY_URL}
              external
              className="mt-3 w-full"
            >
              Strategiegespräch buchen
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
