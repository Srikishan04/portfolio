import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { CustomPointer } from "@/components/custom-pointer";
import { Button } from "@/components/ui/button";
import { portfolioMedia } from "@/lib/portfolio-media";

export const Route = createFileRoute("/logo-deck")({
  head: () => ({
    meta: [
      { title: "Logo Ideation Deck — Srikishan Sethu Madhavan" },
      {
        name: "description",
        content:
          "Explore four clickable identity concepts from Srikishan Sethu Madhavan's logo ideation process.",
      },
      { property: "og:title", content: "Logo Ideation Deck — Srikishan Sethu Madhavan" },
      {
        property: "og:description",
        content:
          "Four interactive identity concepts exploring place, welcome, heritage, and belonging.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LogoDeckPage,
});

const cards = [
  {
    title: "Feather Hat",
    front: portfolioMedia.conceptFeatherHatFront,
    back: portfolioMedia.conceptFeatherHatBack,
  },
  { title: "Nest", front: portfolioMedia.conceptNestFront, back: portfolioMedia.conceptNestBack },
  {
    title: "One Horn Rhino",
    front: portfolioMedia.conceptRhinoFront,
    back: portfolioMedia.conceptRhinoBack,
  },
  {
    title: "Welcome",
    front: portfolioMedia.conceptWelcomeFront,
    back: portfolioMedia.conceptWelcomeBack,
  },
];

function LogoDeckPage() {
  const [flipped, setFlipped] = useState<number[]>([]);
  const audioContext = useRef<AudioContext | null>(null);

  const playFlip = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) return;
      audioContext.current ??= new AudioContextCtor();
      const context = audioContext.current;
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(240, now);
      oscillator.frequency.exponentialRampToValueAtTime(520, now + 0.12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.035, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.18);
    } catch {
      audioContext.current = null;
    }
  }, []);

  const toggle = (index: number) => {
    setFlipped((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
    playFlip();
  };

  return (
    <main className="portfolio-canvas page-enter relative isolate min-h-screen bg-flame text-flame-foreground">
      <CustomPointer />
      <header className="sticky top-0 z-30 grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center border-b border-cocoa/40 bg-paper/95 px-5 text-foreground backdrop-blur sm:px-10 lg:px-16">
        <Link
          to="/"
          className="inline-flex min-w-0 items-center gap-3 font-bold uppercase transition-colors hover:text-flame"
        >
          <ArrowLeft className="size-5 shrink-0" />{" "}
          <span className="truncate">Back to portfolio</span>
        </Link>
        <img
          src={portfolioMedia.navLogo ?? ""}
          alt="Srikishan Sethu logo"
          className="size-8 object-contain"
        />
      </header>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-5 border-b border-flame-foreground/40 pb-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-xs font-bold uppercase">Identity study · click to reveal</p>
            <h1 className="mt-3 font-display text-6xl leading-none sm:text-8xl">
              Logo Ideation Deck
            </h1>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-relaxed opacity-80">
            Four visual routes shaped around strength, welcome, heritage, and belonging.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card, index) => {
            const isFlipped = flipped.includes(index);
            return (
              <Button
                key={card.title}
                type="button"
                variant="ghost"
                aria-pressed={isFlipped}
                aria-label={`${isFlipped ? "Hide" : "Show"} ${card.title} concept description`}
                onClick={() => toggle(index)}
                className="flip-card group h-96 w-full rounded-none p-0 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-transparent hover:shadow-[0_22px_48px_var(--shadow-tint)]"
              >
                <span
                  className={`flip-card-inner relative block h-full w-full ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
                >
                  <span className="flip-card-face absolute inset-0 flex flex-col items-center justify-center border border-cocoa bg-cocoa p-6 text-cocoa-foreground shadow-[0_18px_44px_var(--shadow-tint)] transition-shadow group-hover:shadow-[0_0_34px_var(--glow-tint)]">
                    {card.front ? (
                      <img
                        src={card.front}
                        alt={`${card.title} logo concept front`}
                        className="size-full object-contain"
                      />
                    ) : null}
                    <RotateCcw className="absolute bottom-5 right-5 size-5 opacity-70" />
                  </span>
                  <span className="flip-card-face flip-card-back absolute inset-0 flex items-center border border-ocean bg-ocean p-7 text-ocean-foreground shadow-[0_0_34px_var(--glow-tint)]">
                    {card.back ? (
                      <img
                        src={card.back}
                        alt={`${card.title} logo concept explanation`}
                        className="size-full object-contain"
                      />
                    ) : null}
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
