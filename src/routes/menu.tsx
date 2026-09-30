import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowLeft, BriefcaseBusiness, Gamepad2, Hop as Home } from "lucide-react";
import { useCallback, useRef } from "react";

import { CustomPointer } from "@/components/custom-pointer";
import { PacmanMiniGame } from "@/components/pacman-mini-game";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Srikishan Sethu Portfolio" },
      {
        name: "description",
        content:
          "Explore Srikishan Sethu Madhavan's portfolio sections, experience, and resume download.",
      },
      { property: "og:title", content: "Menu — Srikishan Sethu Portfolio" },
      {
        property: "og:description",
        content: "Choose a section of Srikishan's portfolio through an interactive diamond menu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

type ToneKind = "hover" | "choose";

function useMenuAudio() {
  const audioContext = useRef<AudioContext | null>(null);

  return useCallback((kind: ToneKind) => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

      if (!AudioContextCtor) {
        return;
      }

      if (!audioContext.current) {
        audioContext.current = new AudioContextCtor();
      }

      const context = audioContext.current;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const now = context.currentTime;

      oscillator.type = kind === "choose" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(kind === "choose" ? 520 : 330, now);
      oscillator.frequency.exponentialRampToValueAtTime(kind === "choose" ? 180 : 440, now + 0.12);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(kind === "choose" ? 0.07 : 0.035, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.18);
    } catch {
      audioContext.current = null;
    }
  }, []);
}

const menuItems = [
  {
    label: "Home",
    caption: "Return to the landing composition.",
    to: "/",
    icon: Home,
  },
  {
    label: "Experience",
    caption: "Explore roles, dates, and places I’ve worked.",
    to: "/experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "Mini game",
    caption: "Take a quick break in the pocket maze.",
    icon: Gamepad2,
  },
  {
    label: "Download resume",
    caption: "Save the resume PDF to your device.",
    href: "/Media/Kishan%20resume.pdf",
    icon: ArrowDownToLine,
  },
] as const;

function MenuPage() {
  const playTone = useMenuAudio();

  return (
    <main className="portfolio-canvas page-enter relative isolate min-h-screen bg-paper text-foreground portfolio-grid-bg">
      <CustomPointer />
      <header className="sticky top-0 z-30 flex h-24 items-center justify-between border-b border-gridline bg-paper/95 px-6 backdrop-blur sm:px-10 lg:px-16">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 font-display text-3xl tracking-normal text-foreground transition-colors hover:text-flame"
          onMouseEnter={() => playTone("hover")}
          onClick={() => playTone("choose")}
        >
          <ArrowLeft className="size-7 transition-transform group-hover:-translate-x-1" />
          BACK
        </Link>
        <div className="relative size-9 rotate-45 border border-foreground transition-transform hover:rotate-[225deg]">
          <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 bg-flame" />
        </div>
      </header>

      <section className="mx-auto grid auto-rows-fr gap-6 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-20">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const commonClass =
            "group relative flex h-full min-h-44 flex-col items-start justify-start overflow-hidden whitespace-normal border border-gridline bg-background p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-ocean hover:text-ocean-foreground hover:shadow-[0_24px_50px_var(--shadow-tint)] sm:min-h-52 sm:p-9";

          const contents = (
            <>
              <span className="pointer-events-none absolute -right-8 -top-8 size-24 rotate-45 border border-current opacity-25 transition-transform duration-500 group-hover:rotate-[225deg] sm:size-28" />
              <Icon className="mb-8 size-8 text-flame transition-transform duration-300 group-hover:scale-125 group-hover:text-ocean-foreground sm:size-9" />
              <span className="block max-w-full break-words font-display text-4xl leading-none tracking-normal sm:text-5xl lg:text-4xl xl:text-5xl">
                {item.label}
              </span>
              <span className="mt-3 block max-w-full text-sm font-medium leading-relaxed opacity-80 sm:text-base">
                {item.caption}
              </span>
            </>
          );

          if (item.label === "Mini game") {
            return (
              <PacmanMiniGame
                key={item.label}
                triggerClassName={commonClass}
                triggerContent={contents}
                onTriggerMouseEnter={() => playTone("hover")}
                onTriggerClick={() => playTone("choose")}
              />
            );
          }

          if ("href" in item) {
            return (
              <Button key={item.label} asChild variant="ghost" className={commonClass}>
                <a
                  href={item.href}
                  download
                  onMouseEnter={() => playTone("hover")}
                  onClick={() => playTone("choose")}
                >
                  {contents}
                </a>
              </Button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.to}
              className={commonClass}
              onMouseEnter={() => playTone("hover")}
              onClick={() => playTone("choose")}
            >
              {contents}
            </Link>
          );
        })}
      </section>
    </main>
  );
}
