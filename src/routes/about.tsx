import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Eye, Film, Lightbulb, MoveUpRight } from "lucide-react";
import { useState } from "react";

import { CustomPointer } from "@/components/custom-pointer";
import { portfolioMedia } from "@/lib/portfolio-media";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Me — Srikishan Sethu Madhavan" },
      {
        name: "description",
        content:
          "Meet Srikishan: a 21-year-old filmmaker, editor, observer, and thoughtful problem solver.",
      },
    ],
  }),
  component: AboutPage,
});

const waysOfWorking = [
  {
    label: "Observe",
    icon: Eye,
    title: "Look a little closer.",
    copy: "I pay attention to the small details, people, and patterns that are easy to miss. Good solutions often start with a better question.",
  },
  {
    label: "Imagine",
    icon: Lightbulb,
    title: "Find another way through.",
    copy: "I enjoy untangling complex tasks and turning what feels overwhelming into a clear, considered direction.",
  },
  {
    label: "Make",
    icon: Film,
    title: "Shape it into a story.",
    copy: "Film and editing let me bring ideas to life through rhythm, movement, and the right point of view.",
  },
];

function AboutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const active = waysOfWorking[activeStep];
  if (!active) return null;
  const ActiveIcon = active.icon;

  return (
    <main className="portfolio-canvas page-enter relative isolate min-h-screen bg-paper text-foreground">
      <CustomPointer />
      <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-gridline bg-paper/95 px-5 backdrop-blur sm:px-10 lg:px-16">
        <Link
          to="/"
          className="inline-flex min-w-0 items-center gap-3 font-bold uppercase transition-colors hover:text-flame"
        >
          <ArrowLeft className="size-5 shrink-0" />{" "}
          <span className="truncate">Back to portfolio</span>
        </Link>
        <span className="font-display text-2xl text-ocean">ABOUT / 01</span>
      </header>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.15fr_.85fr] lg:gap-16 lg:px-16 lg:py-24">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-flame">
            A little about me · 21
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(4rem,10vw,9rem)] leading-[.8] text-ocean">
            I NOTICE.
            <br />I MAKE.
            <br />
            <span className="text-flame">I FIGURE IT OUT.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg font-semibold leading-relaxed text-muted-foreground sm:text-xl">
            I’m Srikishan, a 21-year-old creative who loves filming, editing, and finding thoughtful
            solutions to complex tasks. I like to observe first, understand what matters, and then
            act.
          </p>
          <Link
            to="/"
            hash="video"
            className="mt-7 inline-flex items-center gap-3 border-b border-flame pb-2 text-sm font-bold uppercase transition-colors hover:text-flame"
          >
            See my films <MoveUpRight className="size-4" />
          </Link>
        </div>
        <figure className="group relative min-h-[22rem] overflow-hidden border border-gridline bg-mist sm:min-h-[30rem]">
          {portfolioMedia.aboutPortrait ? (
            <img
              src={portfolioMedia.aboutPortrait}
              alt="Portrait of Srikishan"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="media-slot absolute inset-0 grid place-items-center p-8 text-center">
              <div className="flex max-w-xs flex-col items-center gap-4">
                <span className="grid size-16 place-items-center rounded-full border border-gridline text-ocean">
                  <Eye className="size-7" />
                </span>
                <span className="text-sm font-bold uppercase">About portrait · add your photo</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Replace the aboutPortrait slot in src/lib/portfolio-media.ts
                </span>
              </div>
            </div>
          )}
          <figcaption className="absolute bottom-4 left-4 bg-paper px-3 py-2 text-xs font-bold uppercase">
            Srikishan · behind the lens
          </figcaption>
        </figure>
      </section>
      <section className="border-y border-gridline bg-mist/25 px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-flame">
                How I find my way
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none text-ocean sm:text-7xl">
                THREE SMALL MOVES.
              </h2>
            </div>
            <p className="max-w-xs text-sm font-semibold leading-relaxed text-muted-foreground">
              Choose a step to see how I turn an interesting question into something real.
            </p>
          </div>
          <div className="mt-9 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div
              className="grid content-start gap-2"
              role="tablist"
              aria-label="My creative process"
            >
              {waysOfWorking.map((step, index) => {
                const Icon = step.icon;
                const selected = activeStep === index;
                return (
                  <button
                    key={step.label}
                    id={`about-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="about-step-panel"
                    onClick={() => setActiveStep(index)}
                    className={`flex items-center justify-between gap-4 border px-5 py-4 text-left font-bold uppercase transition-all ${selected ? "translate-x-2 border-ocean bg-ocean text-ocean-foreground shadow-[4px_4px_0_var(--color-flame)]" : "border-gridline bg-paper hover:border-flame"}`}
                  >
                    <span className="inline-flex items-center gap-3">
                      <Icon className="size-5" />
                      {step.label}
                    </span>
                    <span className="text-xs opacity-60">0{index + 1}</span>
                  </button>
                );
              })}
            </div>
            <article
              id="about-step-panel"
              role="tabpanel"
              aria-labelledby={`about-tab-${activeStep}`}
              className="relative flex min-h-64 flex-col justify-between overflow-hidden border border-gridline bg-paper p-6 sm:p-9"
            >
              <ActiveIcon className="size-9 text-flame" aria-hidden="true" />
              <div
                key={activeStep}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <p className="font-display text-5xl leading-none text-ocean sm:text-6xl">
                  {active.title}
                </p>
                <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-muted-foreground">
                  {active.copy}
                </p>
              </div>
              <span className="absolute right-4 top-2 font-display text-8xl leading-none text-flame/10">
                0{activeStep + 1}
              </span>
            </article>
          </div>
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={() => setActiveStep((current) => (current + 1) % waysOfWorking.length)}
              className="inline-flex items-center gap-2 border border-foreground px-4 py-3 text-xs font-bold uppercase transition-colors hover:bg-ocean hover:text-ocean-foreground"
            >
              Next thought <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-10 lg:px-16">
        <p className="text-sm font-semibold text-muted-foreground">
          Notice something. Make something of it.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-bold uppercase transition-colors hover:text-flame"
        >
          Back to all projects <ArrowRight className="size-4" />
        </Link>
      </footer>
    </main>
  );
}
