import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { LegalSection } from "@/components/LegalSection";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Impressum — SenzelGrowth",
  description: "Impressum von SenzelGrowth — Celvin Senzel.",
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-40 pb-24">
        <Container className="flex flex-col gap-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Impressum
          </h1>

          <LegalSection title="Angaben gemäß § 5 TMG">
            <p>
              Celvin Senzel
              <br />
              Wintersteinstr. 7
              <br />
              61194 Niddatal
            </p>
          </LegalSection>

          <LegalSection title="Kontakt">
            <p>
              Telefon:{" "}
              <a href="tel:+491637212600" className="text-ink hover:text-accent-strong">
                +49 163 7212600
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-strong hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </p>
          </LegalSection>

          <LegalSection title="Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV">
            <p>
              Celvin Senzel
              <br />
              Wintersteinstr. 7
              <br />
              61194 Niddatal
            </p>
          </LegalSection>

          <LegalSection title="Haftungsausschluss">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-strong">
                Haftung für Inhalte
              </h3>
              <p>
                Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt.
                Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
                kann jedoch keine Gewähr übernommen werden. Als Diensteanbieter
                sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
                bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen,
                die auf eine rechtswidrige Tätigkeit hinweisen.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-strong">
                Haftung für Links
              </h3>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf
                deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
                diese fremden Inhalte auch keine Gewähr übernehmen. Für die
                Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
                oder Betreiber der Seiten verantwortlich.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-strong">
                Urheberrecht
              </h3>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                der schriftlichen Zustimmung des jeweiligen Autors bzw.
                Erstellers.
              </p>
            </div>
          </LegalSection>
        </Container>
      </main>
      <Footer />
    </>
  );
}
