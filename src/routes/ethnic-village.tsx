import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

import { CustomPointer, type CursorMode } from "@/components/custom-pointer";
import { portfolioMedia } from "@/lib/portfolio-media";

export const Route = createFileRoute("/ethnic-village")({
  head: () => ({
    meta: [
      { title: "Ethnic Village Resort — Srikishan Sethu Madhavan" },
      {
        name: "description",
        content:
          "Brand identity and graphic design project for Ethnic Village Resort by Srikishan Sethu Madhavan — rooted in culture, hospitality, and regional memory.",
      },
      {
        property: "og:title",
        content: "Ethnic Village Resort — Srikishan Sethu Madhavan",
      },
      {
        property: "og:description",
        content:
          "A place-led identity project for Ethnic Village Resort, exploring heritage, welcome, and belonging through visual design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EthnicVillagePage,
});

const deliverables = [
  { label: "Brand Identity", detail: "Primary logo system and mark" },
  { label: "Colour System", detail: "Earthy palettes rooted in landscape" },
  { label: "Typography", detail: "Display + body pairing for hospitality" },
  { label: "Print Collateral", detail: "Signage, menus, and stationery" },
  { label: "Motion Intro", detail: "Brand film opener and contrast reel" },
  { label: "Logo Ideation", detail: "Four conceptual directions explored" },
];

function EthnicVillagePage() {
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const cover = portfolioMedia.ethnicVillageCover;
  const presentation = portfolioMedia.ethnicVillagePresentationImage;
  const presentation02 = portfolioMedia.ethnicVillagePresentationImage02;
  const projectVideo = portfolioMedia.contrastVideo;

  return (
    <div className="portfolio-canvas page-enter relative isolate min-h-screen bg-paper text-foreground">
      <CustomPointer mode={cursorMode} />

      {/* ── Sticky header ── */}
      <header className="fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-gridline bg-paper/95 px-4 backdrop-blur sm:px-8 lg:px-12">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 text-sm font-bold uppercase transition-colors hover:text-flame"
          onMouseEnter={() => setCursorMode("link")}
          onMouseLeave={() => setCursorMode("default")}
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to portfolio
        </Link>
        <img
          src={portfolioMedia.navLogo ?? ""}
          alt="Srikishan Sethu logo"
          className="size-8 object-contain"
        />
      </header>

      <main className="pt-20">
        {/* ── Hero ── */}
        <section className="relative isolate min-h-[55vh] overflow-hidden border-b border-gridline">
          {cover ? (
            <img
              src={cover}
              alt="Ethnic Village Resort cover"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-mist">
              <ImageIcon className="size-16 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-ocean/70" />
          <div className="relative z-10 flex min-h-[55vh] flex-col justify-end px-5 py-12 sm:px-10 lg:px-16">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-flame">
              Graphic Design · Identity · 2025
            </p>
            <h1 className="mt-3 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.85] text-ocean-foreground">
              Ethnic Village
              <br />
              Resort
            </h1>
            <p className="mt-5 max-w-xl text-sm font-semibold leading-relaxed text-ocean-foreground/80">
              A place-led visual identity rooted in culture, hospitality, nature, and regional
              memory. Built to feel immediate, warm, and distinctly local.
            </p>
          </div>
        </section>

        <section
          aria-label="Ethnic Village Resort project presentation"
          className="border-b border-gridline"
        >
          {presentation ? (
            <img
              src={presentation}
              alt="Ethnic Village Resort presentation, upper part"
              className="block h-auto w-full"
            />
          ) : null}
          {projectVideo ? (
            <video
              src={projectVideo}
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="block aspect-video w-full bg-black object-contain"
              aria-label="Ethnic Village Resort contrast video"
            />
          ) : null}
          {presentation02 ? (
            <img
              src={presentation02}
              alt="Ethnic Village Resort presentation, lower part"
              className="block h-auto w-full"
            />
          ) : null}
        </section>

        {/* ── Project overview ── */}
        <section className="portfolio-grid-bg border-b border-gridline px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.16em] text-flame">Overview</p>
              <h2 className="mt-4 font-display text-5xl leading-[.9] sm:text-6xl lg:text-7xl">
                Belonging through
                <br />
                design
              </h2>
              <p className="mt-6 max-w-prose text-sm font-semibold leading-[1.7] text-muted-foreground">
                Ethnic Village Resort needed an identity that honoured its landscape while speaking
                to modern guests. The design direction draws from traditional craft motifs, natural
                earthy tones, and a typographic voice that feels rooted without feeling dated. Every
                touchpoint — from signage to digital — carries a consistent sense of place.
              </p>
            </div>

            {/* Deliverables */}
            <div className="border border-gridline p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-ocean">
                Deliverables
              </p>
              <ul className="mt-5 divide-y divide-gridline">
                {deliverables.map((item) => (
                  <li key={item.label} className="flex items-start justify-between gap-4 py-4">
                    <span className="text-sm font-bold">{item.label}</span>
                    <span className="text-right text-xs font-semibold text-muted-foreground">
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Primary logo mark ── */}
        <section className="border-b border-gridline px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-flame">Identity Mark</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Logo on light */}
              <div className="col-span-full flex flex-col items-center justify-center border border-gridline bg-background p-12 lg:col-span-2">
                {portfolioMedia.conceptEthnicLogo ? (
                  <img
                    src={portfolioMedia.conceptEthnicLogo}
                    alt="Ethnic Village Resort logo on light background"
                    className="max-h-44 w-auto object-contain"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-mist/30">
                    <ImageIcon className="size-12 text-muted-foreground" />
                  </div>
                )}
                <span className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-muted-foreground">
                  Primary mark · Light
                </span>
              </div>
              {/* Logo on dark */}
              <div className="flex flex-col items-center justify-center border border-gridline bg-ocean p-12">
                {portfolioMedia.conceptEthnicLogo ? (
                  <img
                    src={portfolioMedia.conceptEthnicLogo}
                    alt="Ethnic Village Resort logo on dark background"
                    className="max-h-44 w-auto object-contain brightness-0 invert"
                  />
                ) : (
                  <div className="flex h-44 w-full items-center justify-center bg-ocean-foreground/10">
                    <ImageIcon className="size-12 text-ocean-foreground/50" />
                  </div>
                )}
                <span className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-ocean-foreground/60">
                  Primary mark · Dark
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer nav ── */}
        <footer className="border-t border-gridline px-5 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase transition-colors hover:text-flame"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              All work
            </Link>
            <Link
              to="/logo-deck"
              className="group inline-flex items-center gap-2 text-sm font-bold uppercase transition-colors hover:text-flame"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
            >
              Logo deck
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
