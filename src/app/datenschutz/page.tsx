import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { LegalSection } from "@/components/LegalSection";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — SenzelGrowth",
  description: "Datenschutzerklärung von SenzelGrowth — Celvin Senzel.",
};

export default function DatenschutzPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-40 pb-24">
        <Container className="flex flex-col gap-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink">
            Datenschutzerklärung
          </h1>

          <LegalSection title="1. Verantwortlicher">
            <p>
              Celvin Senzel
              <br />
              Wintersteinstr. 7
              <br />
              61194 Niddatal
              <br />
              E-Mail:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-strong hover:text-ink">
                {CONTACT_EMAIL}
              </a>
            </p>
          </LegalSection>

          <LegalSection title="2. Erhebung und Speicherung personenbezogener Daten">
            <p>
              Beim Besuch dieser Website werden automatisch Informationen
              allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles)
              beinhalten etwa die Art des Webbrowsers, das verwendete
              Betriebssystem, den Domainnamen Ihres Internet-Service-Providers
              sowie ähnliches.
            </p>
            <p>
              Diese Daten sind nicht bestimmten Personen zuordenbar. Eine
              Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
              vorgenommen. Wir behalten uns vor, diese Daten nachträglich zu
              prüfen, wenn uns konkrete Anhaltspunkte für eine rechtswidrige
              Nutzung bekannt werden.
            </p>
          </LegalSection>

          <LegalSection title="3. Kontaktaufnahme">
            <p>
              Wenn Sie uns per E-Mail oder über ein Kontaktformular
              kontaktieren, werden Ihre Angaben zur Bearbeitung Ihrer Anfrage
              und für den Fall von Anschlussfragen bei uns gespeichert. Diese
              Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b
              DSGVO (Vertragsanbahnung) sowie Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse an der Beantwortung von Anfragen).
            </p>
          </LegalSection>

          <LegalSection title="4. Externe Dienste">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-strong">
                Google Fonts
              </h3>
              <p>
                Diese Seite nutzt zur einheitlichen Darstellung von
                Schriftarten Google Fonts. Anbieter ist Google LLC, 1600
                Amphitheatre Parkway, Mountain View, CA 94043, USA. Beim
                Aufruf der Seite lädt Ihr Browser die benötigten Schriften in
                Ihren Browser-Cache. Dabei kann Ihre IP-Adresse an
                Google-Server übertragen werden. Weitere Informationen finden
                Sie in der Datenschutzerklärung von Google unter{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong hover:text-ink"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-muted-strong">
                Calendly
              </h3>
              <p>
                Für die Terminbuchung nutzen wir den Dienst Calendly (Calendly
                LLC, 271 17th St NW, Atlanta, GA 30363, USA). Wenn Sie über
                den Buchungslink einen Termin vereinbaren, werden die von
                Ihnen eingegebenen Daten (Name, E-Mail, ggf. weitere Angaben)
                an Calendly übermittelt. Die Datenschutzerklärung von Calendly
                finden Sie unter{" "}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-strong hover:text-ink"
                >
                  calendly.com/privacy
                </a>
                .
              </p>
            </div>
          </LegalSection>

          <LegalSection title="5. Cookies">
            <p>
              Diese Website verwendet keine Tracking-Cookies und setzt kein
              Web-Analytics ein. Es werden lediglich technisch notwendige
              Browserfunktionen genutzt, um die korrekte Darstellung der Seite
              zu gewährleisten.
            </p>
          </LegalSection>

          <LegalSection title="6. Ihre Rechte">
            <p>Sie haben jederzeit das Recht auf:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten (Art. 21 DSGVO)</li>
            </ul>
            <p>
              Zur Geltendmachung dieser Rechte wenden Sie sich bitte an:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-strong hover:text-ink">
                {CONTACT_EMAIL}
              </a>
              . Zudem haben Sie das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde zu beschweren.
            </p>
          </LegalSection>

          <LegalSection title="7. Aktualität dieser Datenschutzerklärung">
            <p>
              Diese Datenschutzerklärung ist aktuell gültig. Durch die
              Weiterentwicklung unserer Website oder aufgrund geänderter
              gesetzlicher bzw. behördlicher Vorgaben kann es notwendig
              werden, diese Datenschutzerklärung zu ändern.
            </p>
          </LegalSection>
        </Container>
      </main>
      <Footer />
    </>
  );
}
