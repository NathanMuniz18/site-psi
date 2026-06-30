import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Instagram, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import keilyPhoto from "@/assets/keily.jpg.asset.json";

const WHATSAPP_URL = "https://wa.me/5511920404580?text=Ol%C3%A1%2C%20Keily!%20Vi%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Keily Silva | Psicóloga e Psicanalista Online para Mulheres" },
      {
        name: "description",
        content:
          "Atendimento psicanalítico online especializado em mulheres e relacionamentos. Keily Silva, Psicóloga CRP 06/215333, formada pela UNJ e especialista em Psicanálise pela PUCRS.",
      },
      { property: "og:title", content: "Keily Silva | Psicóloga e Psicanalista Online" },
      {
        property: "og:description",
        content:
          "Atendimento psicanalítico online para mulheres que querem se escutar de verdade.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Psychologist",
          name: "Keily Silva",
          description:
            "Psicóloga e Psicanalista especializada no atendimento de mulheres e relacionamentos. Atendimento 100% online.",
          url: "/",
          telephone: "+55-11-94271-3592",
          areaServed: "Brasil",
          availableLanguage: "Portuguese",
          priceRange: "$$",
          knowsAbout: ["Psicanálise", "Relacionamentos", "Saúde Mental Feminina"],
        }),
      },
    ],
  }),
  component: Page,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".ks-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Page() {
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <ComoFunciona />
        <Depoimentos />
        <Sobre />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

/* ---------- NAVBAR ---------- */

const NAV_LINKS = [
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
  { href: "#contato", label: "Contato" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[color:var(--cream)]/70 border-b border-[color:var(--gold)]/15"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-display text-2xl tracking-tight text-[color:var(--brown)]"
        >
          Keily Silva
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="ks-link text-[14px] tracking-wide text-[color:var(--brown)]/80 hover:text-[color:var(--brown)] transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 px-5 h-11 rounded-full bg-[color:var(--brown)] text-[color:var(--cream)] text-[14px] tracking-wide hover:-translate-y-px hover:shadow-lg transition-all duration-300"
        >
          Agendar consulta
        </a>
        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(true)}
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[color:var(--brown)] hover:bg-[color:var(--cream)]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-[color:var(--brown)]/40"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm bg-[color:var(--bg,#FAF7F2)] shadow-2xl px-8 pt-8 pb-12 flex flex-col transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ backgroundColor: "var(--background)" }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-xl text-[color:var(--brown)]">Keily Silva</span>
            <button
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="w-11 h-11 inline-flex items-center justify-center rounded-full text-[color:var(--brown)] hover:bg-[color:var(--cream)]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-[color:var(--brown)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-auto inline-flex items-center justify-center h-12 rounded-full bg-[color:var(--brown)] text-[color:var(--cream)] text-[14px] tracking-wide"
          >
            Agendar consulta
          </a>
        </aside>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-32 md:pt-48 md:pb-40">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(245,236,215,0.9), transparent 60%), radial-gradient(900px 500px at 90% 30%, rgba(122,106,42,0.08), transparent 60%), linear-gradient(180deg, #FAF7F2 0%, #FAF7F2 100%)",
        }}
      />
      <div aria-hidden className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full -z-10" style={{ background: "radial-gradient(circle, rgba(201,174,93,0.10), transparent 70%)" }} />
      <div aria-hidden className="absolute bottom-0 right-[-120px] w-[600px] h-[600px] rounded-full -z-10" style={{ background: "radial-gradient(circle, rgba(122,106,42,0.06), transparent 70%)" }} />
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full -z-10 opacity-[0.05] mix-blend-multiply"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="ks-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ks-noise)" />
      </svg>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="max-w-[680px] ks-reveal">
          <span className="inline-block text-[12px] tracking-[0.22em] uppercase text-[color:var(--olive)] mb-8">
            Psicanálise Online · Para Mulheres
          </span>
          <h1 className="font-display font-light text-[44px] leading-[1.08] sm:text-[56px] md:text-[64px] lg:text-[72px] text-[color:var(--brown)]">
            Algo em você pede atenção.
            <br />
            <em className="not-italic text-[color:var(--olive)]">Faz tempo.</em>
          </h1>
          <p className="mt-8 text-[17px] md:text-[18px] leading-[1.7] text-[color:var(--brown)]/75 max-w-[600px]">
            Atendimento psicanalítico online para mulheres que querem se escutar de verdade — e
            compreender o que está por trás dos seus relacionamentos, escolhas e sofrimentos.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 h-14 px-8 rounded-full bg-[color:var(--brown)] text-[color:var(--cream)] text-[15px] tracking-wide hover:-translate-y-px hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
            >
              Agende sua consulta
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#sobre"
              className="ks-link text-[14px] tracking-wide text-[color:var(--brown)]/75"
            >
              Conheça meu trabalho
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- COMO FUNCIONA ---------- */

const STEPS = [
  {
    label: "Agendamento",
    body: "Marcamos o melhor horário de acordo com a disponibilidade da agenda.",
  },
  {
    label: "Sessões iniciais",
    body: "Conversamos sobre o que te trouxe e como funciona o processo.",
  },
  {
    label: "Análise",
    body: "Trabalhamos juntas, no seu tempo, com escuta e cuidado.",
  },
];

function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="max-w-[760px] ks-reveal">
          <span className="inline-block text-[12px] tracking-[0.22em] uppercase text-[color:var(--olive)] mb-6">
            Como funciona a psicanálise
          </span>
          <h2 className="font-display font-light text-[32px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[color:var(--brown)]">
            Um espaço para o que não cabe mais em lugar nenhum
          </h2>
          <div className="mt-8 space-y-5 text-[17px] md:text-[18px] leading-[1.75] text-[color:var(--brown)]/75">
            <p>
              A psicanálise é uma prática clínica que aposta na fala como caminho de transformação.
              Não se trata de dar conselhos ou seguir roteiros — trata-se de criar um espaço onde
              você possa se escutar de um jeito diferente, e descobrir sentidos que até então
              estavam fora do alcance.
            </p>
            <p>
              É um trabalho que leva tempo e que respeita o seu ritmo. Os efeitos não são rápidos,
              mas são profundos e duradouros.
            </p>
          </div>
        </div>

        <div className="mt-16 md:mt-20 grid gap-6 md:gap-8 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.label}
              className="ks-reveal group rounded-2xl border bg-[color:var(--cream)] p-8 md:p-9 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(46,26,14,0.35)]"
              style={{ borderColor: "rgba(201,174,93,0.2)" }}
            >
              <span
                className="block w-10 h-px mb-6"
                style={{ backgroundColor: "var(--gold)" }}
                aria-hidden
              />
              <h3 className="font-display text-[22px] text-[color:var(--brown)]">{s.label}</h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-[color:var(--brown)]/75">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- DEPOIMENTOS ---------- */

const TESTIMONIALS = [
  {
    quote:
      "Nunca imaginei que falar pudesse mudar tanto minha forma de me ver. A análise me ajudou a entender padrões que eu repetia sem perceber — nos relacionamentos e em mim mesma.",
  },
  {
    quote:
      "É um espaço diferente de tudo que já conheci. Não há respostas prontas, mas há uma escuta que transforma. Comecei a me entender de um jeito que não esperava.",
  },
  {
    quote:
      "O processo é lento, mas os efeitos são reais e duradouros. Aprendi a me escutar de verdade — e isso mudou minha relação comigo e com as pessoas que amo.",
  },
];

function Depoimentos() {
  return (
    <section id="depoimentos" className="py-20 md:py-28 lg:py-32 bg-[color:var(--cream)]/40">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="max-w-[720px] ks-reveal">
          <span className="inline-block text-[12px] tracking-[0.22em] uppercase text-[color:var(--olive)] mb-6">
            Depoimentos
          </span>
          <h2 className="font-display font-light text-[32px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[color:var(--brown)]">
            O que dizem as mulheres que passaram por aqui
          </h2>
        </div>

        <div className="mt-14 md:mt-16 grid gap-6 md:gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="ks-reveal relative rounded-2xl border bg-[color:var(--bg,white)] p-8 md:p-10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-30px_rgba(46,26,14,0.35)]"
              style={{
                borderColor: "rgba(201,174,93,0.2)",
                backgroundColor: "var(--background)",
              }}
            >
              <span
                aria-hidden
                className="font-display absolute top-4 left-6 leading-none select-none"
                style={{
                  fontSize: "80px",
                  color: "var(--gold)",
                }}
              >
                “
              </span>
              <blockquote className="pt-10 italic text-[16px] leading-[1.75] text-[color:var(--brown)]/85">
                {t.quote}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SOBRE ---------- */

function Sobre() {
  return (
    <section id="sobre" className="py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 grid gap-12 md:gap-16 lg:gap-20 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center">
        <div className="ks-reveal">
          <div
            className="relative aspect-[4/5] w-full rounded-3xl border overflow-hidden"
            style={{ borderColor: "rgba(201,174,93,0.4)" }}
          >
            <img
              src="/keily.jpg"
              alt="Keily Silva - Psicóloga e Psicanalista"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="ks-reveal">
          <span className="inline-block text-[12px] tracking-[0.22em] uppercase text-[color:var(--olive)] mb-6">
            Sobre mim
          </span>
          <h2 className="font-display font-light text-[36px] sm:text-[42px] md:text-[48px] leading-[1.1] text-[color:var(--brown)]">
            Keily Silva
          </h2>
          <p className="mt-2 text-[15px] tracking-wide text-[color:var(--brown)]/60">
            Psicóloga e Psicanalista
          </p>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-[color:var(--brown)]/80">
            <p>
              Formada pela UNJ e especialista em Psicanálise e Análise do Contemporâneo pela
              PUCRS.
            </p>
            <p>
              Sou especializada no atendimento de mulheres e nas questões que atravessam os
              relacionamentos — amorosos, familiares e, sobretudo, a relação consigo mesma.
            </p>
            <p>
              Meu trabalho parte da escuta do que é singular em cada pessoa. Na psicanálise, não
              há protocolo que caiba em todos. Há um sujeito, sua história e aquilo que, muitas
              vezes, só se revela quando há espaço para falar livremente.
            </p>
            <p>
              Atendo mulheres de todo o Brasil, de forma 100% online, em um espaço ético,
              sigiloso e de confiança.
            </p>
          </div>
          <div className="mt-8">
            <span
              className="inline-flex items-center px-4 h-9 rounded-full text-[13px] tracking-wide border"
              style={{
                color: "rgba(46,26,14,0.7)",
                backgroundColor: "var(--cream)",
                borderColor: "rgba(201,174,93,0.35)",
              }}
            >
              CRP 06/215333
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQS = [
  {
    q: "A psicanálise online funciona?",
    a: "Sim. O setting analítico pode ser construído também no ambiente virtual, com a mesma seriedade e ética do atendimento presencial. O que importa é a qualidade da escuta — e ela independe da distância.",
  },
  {
    q: "Com que frequência são as sessões?",
    a: "As sessões são semanais, com duração de 50 minutos. A frequência pode ser discutida conforme o andamento do processo.",
  },
  {
    q: "Por quanto tempo vou precisar fazer análise?",
    a: "A psicanálise não tem prazo fixo — ela dura o tempo que for necessário para cada pessoa. Isso é definido ao longo do próprio processo, com liberdade e sem pressão.",
  },
  {
    q: "Você atende por qual plataforma?",
    a: "As sessões acontecem por videochamada, em plataforma segura. O link é enviado após o agendamento.",
  },
  {
    q: "Nunca fiz terapia. Posso começar pela psicanálise?",
    a: "Sim. Não é preciso nenhuma experiência anterior. Basta uma questão — algo que te incomoda, que te intriga, que você quer entender melhor.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 lg:py-32 bg-[color:var(--cream)]/40">
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <div className="ks-reveal text-center">
          <span className="inline-block text-[12px] tracking-[0.22em] uppercase text-[color:var(--olive)] mb-6">
            FAQ
          </span>
          <h2 className="font-display font-light text-[32px] sm:text-[40px] md:text-[44px] leading-[1.15] text-[color:var(--brown)]">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="mt-12 md:mt-16 ks-reveal">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b"
                style={{ borderColor: "rgba(201,174,93,0.3)" }}
              >
                <AccordionTrigger className="py-6 text-left font-display text-[18px] md:text-[20px] font-normal text-[color:var(--brown)] hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-[1.75] text-[color:var(--brown)]/75">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA FINAL ---------- */

function CtaFinal() {
  return (
    <section
      id="contato"
      className="py-24 md:py-32 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: "var(--brown)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(800px 400px at 50% 0%, rgba(201,174,93,0.25), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[900px] px-6 lg:px-10 text-center ks-reveal">
        <h2 className="font-display font-light text-[40px] sm:text-[52px] md:text-[64px] leading-[1.1] text-[color:var(--cream)]">
          Pronta para se escutar?
        </h2>
        <p className="mt-6 text-[17px] md:text-[18px] leading-[1.7] text-[color:var(--cream)]/80 max-w-[560px] mx-auto">
          Dê o primeiro passo. Agende sua consulta online.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-3 h-14 px-9 rounded-full text-[15px] tracking-wide hover:-translate-y-px hover:shadow-2xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cream)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--brown)]"
          style={{ backgroundColor: "var(--gold)", color: "var(--brown)" }}
        >
          Falar no WhatsApp
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer
      className="py-14 md:py-16 border-t"
      style={{ borderColor: "rgba(201,174,93,0.25)", backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <div className="font-display text-2xl text-[color:var(--brown)]">Keily Silva</div>
          <p className="mt-2 text-[14px] text-[color:var(--brown)]/70">
            Psicóloga e Psicanalista · CRP 06/215333
          </p>
          <p className="text-[14px] text-[color:var(--brown)]/70">
            Atendimento 100% online para mulheres de todo o Brasil.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full border text-[color:var(--brown)] hover:bg-[color:var(--cream)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)]"
            style={{ borderColor: "rgba(201,174,93,0.4)" }}
          >
            <Instagram className="w-4 h-4" />
          </a>
          <p className="text-[12px] tracking-wide text-[color:var(--brown)]/55">
            © 2025 Keily Silva. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- WhatsApp Float ---------- */

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="ks-pulse fixed bottom-6 right-6 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold)] focus-visible:ring-offset-2"
      style={{ backgroundColor: "var(--olive)", color: "white" }}
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.715.315-.444.43-1.32 1.247-1.32 2.523 0 1.262.93 2.484 1.06 2.662 1.16 1.56 2.46 2.95 4.14 3.703 2.43 1.09 2.91.825 3.44.776.53-.054 1.71-.685 1.96-1.39.245-.704.245-1.32.175-1.46-.07-.137-.255-.21-.54-.345l-1.69-.79zM16 30.005c-7.732 0-14-6.273-14-14 0-7.732 6.268-14 14-14s14 6.268 14 14c0 7.727-6.268 14-14 14zm0-25.602C9.654 4.403 4.4 9.652 4.4 16c0 2.516.81 4.846 2.183 6.737L5.34 27l4.4-1.156A11.524 11.524 0 0 0 16 27.6c6.346 0 11.6-5.25 11.6-11.6 0-6.348-5.254-11.597-11.6-11.597z" />
      </svg>
    </a>
  );
}