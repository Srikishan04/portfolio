import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  Play,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { CustomPointer, type CursorMode } from "@/components/custom-pointer";
import { Button } from "@/components/ui/button";
import { portfolioMedia } from "@/lib/portfolio-media";

type CssVars = CSSProperties & Record<string, string | number>;
type MediaKey = keyof typeof portfolioMedia;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Srikishan Sethu Madhavan — UX & Visual Design Portfolio" },
      {
        name: "description",
        content:
          "UX, graphic design, identity, video, artwork, and photography by Srikishan Sethu Madhavan.",
      },
      { property: "og:title", content: "Srikishan Sethu Madhavan — UX & Visual Design Portfolio" },
      {
        property: "og:description",
        content: "Explore selected UX, identity, video, artwork, and photography projects.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const sectionLinks = [
  ["Featured", "featured"],
  ["UX", "ux"],
  ["Graphic", "graphic"],
  ["Logo", "logo"],
  ["Video", "video"],
  ["Artwork", "artwork"],
] as const;

type UxProject = {
  title: string;
  number: string;
  type: string;
  copy: string;
  cover: MediaKey;
  presentation: MediaKey;
  categoryPresentation: MediaKey;
  sections?: readonly PresentationCategory[];
};

type PresentationCategory = {
  label: string;
  page: number;
  description: string;
};

const bookingPresentationSections = [
  { label: "Landing screen", page: 1, description: "The opening screen and first impression." },
  { label: "Intro", page: 2, description: "An introduction to the waterway booking experience." },
  { label: "Landing", page: 3, description: "Welcome travelers and choose a preferred language." },
  { label: "Choose island", page: 4, description: "Browse and choose an island destination." },
  {
    label: "Different options",
    page: 5,
    description: "Compare boats and available travel options.",
  },
  { label: "Summary", page: 6, description: "Review the itinerary, passengers, and ticket total." },
  {
    label: "Payment section",
    page: 7,
    description: "Complete payment and review the confirmation.",
  },
] as const satisfies readonly PresentationCategory[];

const uxProjects = [
  {
    title: "Sipit",
    number: "01",
    type: "Sustainable packaging · UX research",
    copy: "A sustainable packaging study that turns material research into a clear, useful product experience.",
    cover: "sipitCover",
    presentation: "sipitProjectImage",
    categoryPresentation: "sipitPresentation",
  },
  {
    title: "Kiosk Booking",
    number: "02",
    type: "Booking system · Interface design",
    copy: "A direct kiosk flow designed around fast choices, visible availability, and confident confirmation.",
    cover: "kioskBookingCover",
    presentation: "kioskBookingProjectImage",
    categoryPresentation: "kioskBookingPresentation",
    sections: bookingPresentationSections,
  },
  {
    title: "Stuart",
    number: "03",
    type: "Service design · Product UX",
    copy: "A guided service experience that makes actions, progress, and status easier to understand.",
    cover: "stuartCover",
    presentation: "stuartProjectImage",
    categoryPresentation: "stuartPresentation",
  },
  {
    title: "Street Smart Game Design",
    number: "04",
    type: "Game design · Interaction",
    copy: "A street-safety learning game shaped through clear play loops, feedback, and progression.",
    cover: "streetSmartGameCover",
    presentation: "gameDesignProjectImage",
    categoryPresentation: "streetSmartPresentation",
  },
] as const satisfies readonly UxProject[];

const videos: Array<{
  title: string;
  copy: string;
  cover: MediaKey;
  media: MediaKey;
  extra?: string;
}> = [
  {
    title: "Sangeet Kala",
    copy: "Music-led edit with cultural pacing, quick cuts, and atmospheric transitions.",
    cover: "sangeetKalaCover",
    media: "sangeetKalaVideo",
  },
  {
    title: "Warden's",
    copy: "Brand film direction focused on tension, contrast, and sharp visual rhythm.",
    cover: "wardensCover",
    media: "wardensVideo",
  },
  {
    title: "Editing Showreel",
    copy: "A compact reel of cuts, effects, motion, and experimental edits.",
    cover: "editingShowreelCover",
    media: "editingShowreelVideo",
    extra: "AI video / AI video editing",
  },
];

const logoCarousel = [
  { title: "Aerion", src: portfolioMedia.carouselAerionLogo },
  { title: "Butterloop", src: portfolioMedia.carouselButterloopLogo },
  { title: "Co Action", src: portfolioMedia.carouselCoActionLogo },
  { title: "Ethnic Village Resort", src: portfolioMedia.carouselEthnicLogo },
  { title: "Refil", src: portfolioMedia.carouselRefilLogo },
];

function PortfolioPage() {
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [markSpin, setMarkSpin] = useState(false);
  const [visibleArt, setVisibleArt] = useState<string[]>([]);
  const [presentation, setPresentation] = useState<{
    project: (typeof uxProjects)[number];
    page: number;
  } | null>(null);
  const [theaterVideo, setTheaterVideo] = useState<(typeof videos)[number] | null>(null);
  const [theaterLightsOn, setTheaterLightsOn] = useState(true);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-collage-item]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute("data-collage-item");
          if (key)
            setVisibleArt((current) => (current.includes(key) ? current : [...current, key]));
        });
      },
      { threshold: 0.18 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-canvas relative isolate min-h-screen bg-paper text-foreground">
      <CustomPointer mode={cursorMode} />
      <Preloader />
      <SiteNav
        markSpin={markSpin}
        setCursorMode={setCursorMode}
        onMarkClick={() => {
          setMarkSpin(true);
          window.setTimeout(() => setMarkSpin(false), 760);
        }}
      />
      <main className="portfolio-surface relative z-10">
        <LandingSection
          setCursorMode={setCursorMode}
          onOpenPresentation={(project, page) => setPresentation({ project, page })}
        />
        <SectionNavigator setCursorMode={setCursorMode} />
        <UxSection
          setCursorMode={setCursorMode}
          onOpenPresentation={(project, page) => setPresentation({ project, page })}
        />
        <GraphicSection setCursorMode={setCursorMode} />
        <VideoSection setCursorMode={setCursorMode} onOpenVideo={setTheaterVideo} />
        <ArtworkSection visibleArt={visibleArt} setCursorMode={setCursorMode} />
        <section id="about" className="border-t border-gridline px-5 py-20 sm:px-10 lg:px-16">
          <p className="mx-auto max-w-7xl text-lg font-semibold leading-relaxed text-muted-foreground">
            I build visual systems, interaction flows, moving images, and identity stories with a
            focus on people, culture, and memorable digital moments.
          </p>
        </section>
      </main>
      <Footer setCursorMode={setCursorMode} />
      {theaterVideo ? (
        <TheaterViewer
          video={theaterVideo}
          lightsOn={theaterLightsOn}
          onToggleLights={() => setTheaterLightsOn((current) => !current)}
          onClose={() => {
            setTheaterVideo(null);
            setTheaterLightsOn(true);
          }}
        />
      ) : null}
      {presentation ? (
        <PresentationViewer
          project={presentation.project}
          page={presentation.page}
          onClose={() => setPresentation(null)}
        />
      ) : null}
    </div>
  );
}

function Preloader() {
  return (
    <div className="preloader-screen fixed inset-0 z-40 grid place-items-center bg-flame text-flame-foreground">
      <div className="w-[min(78vw,30rem)]">
        <div className="flex items-end justify-between border-b border-flame-foreground/50 pb-4">
          <p className="font-display text-5xl leading-none sm:text-7xl">KISHAN</p>
          <span className="text-xs font-bold uppercase">Portfolio · 2026</span>
        </div>
        <div className="mt-4 h-1 overflow-hidden bg-flame-foreground/25">
          <div className="h-full w-full origin-left bg-flame-foreground [animation:loader-line_1.4s_ease-out_both]" />
        </div>
      </div>
    </div>
  );
}

function SiteNav({
  markSpin,
  onMarkClick,
  setCursorMode,
}: {
  markSpin: boolean;
  onMarkClick: () => void;
  setCursorMode: (mode: CursorMode) => void;
}) {
  const navLogo = portfolioMedia.navLogo;
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-gridline bg-paper/95 px-4 backdrop-blur sm:px-8 lg:px-12">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Animate portfolio mark"
        className="h-11 w-11 shrink-0 rounded-none border border-foreground bg-flame text-foreground shadow-[3px_3px_0_var(--color-foreground)] hover:bg-flame hover:text-foreground"
        onMouseEnter={() => setCursorMode("link")}
        onMouseLeave={() => setCursorMode("default")}
        onClick={onMarkClick}
      >
        {navLogo ? (
          <img
            src={navLogo}
            alt="Srikishan Sethu logo"
            className={`size-8 object-contain ${markSpin ? "[animation:mark-spin-in_700ms_ease-out_both]" : ""}`}
          />
        ) : (
          <span
            className={`font-display text-2xl ${markSpin ? "[animation:mark-spin-in_700ms_ease-out_both]" : ""}`}
          >
            SK
          </span>
        )}
      </Button>
      <nav className="flex shrink-0 items-center gap-2 sm:gap-5">
        <a
          href="#contact"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }}
          className="hidden text-sm font-bold uppercase opacity-75 transition-[color,opacity] hover:text-flame hover:opacity-100 sm:block"
          onMouseEnter={() => setCursorMode("link")}
          onMouseLeave={() => setCursorMode("default")}
        >
          Contact
        </a>
        <Link
          to="/about"
          className="hidden text-sm font-bold uppercase opacity-75 transition-[color,opacity] hover:text-flame hover:opacity-100 sm:block"
          onMouseEnter={() => setCursorMode("link")}
          onMouseLeave={() => setCursorMode("default")}
        >
          About
        </Link>
        <Link
          to="/menu"
          aria-label="Open portfolio menu"
          className="relative grid size-12 place-items-center transition-transform hover:rotate-45"
          onMouseEnter={() => setCursorMode("link")}
          onMouseLeave={() => setCursorMode("default")}
        >
          <span aria-hidden="true" className="menu-diamond-frame" />
          <img
            src={portfolioMedia.diamondMenuIcon ?? ""}
            alt=""
            className="relative size-7 object-contain"
          />
        </Link>
      </nav>
    </header>
  );
}

function LandingSection({
  setCursorMode,
  onOpenPresentation,
}: {
  setCursorMode: (mode: CursorMode) => void;
  onOpenPresentation: (project: (typeof uxProjects)[number], page: number) => void;
}) {
  return (
    <section
      id="featured"
      className="landing-enter min-h-[calc(100svh-5rem)] border-b border-gridline pt-20"
    >
      <div className="mx-auto grid max-w-[96rem] gap-10 px-5 py-9 sm:px-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(19rem,.7fr)] lg:px-12 lg:py-12">
        <div className="min-w-0">
          <h1
            aria-label="Srikishan Sethu Madhavan"
            className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[.82] text-ocean"
          >
            <span className="hero-name-glitch block" data-text="SRIKISHAN" data-numeric="5R1K1SH4N">
              SRIKISHAN
            </span>
            <span
              className="hero-name-glitch block whitespace-nowrap"
              data-text="SETHUMADHAVAN"
              data-numeric="53THUM4DH4V4N"
            >
              SETHUMADHAVAN
            </span>
          </h1>
          <PhotoSequence setCursorMode={setCursorMode} />
          <p className="mt-5 max-w-xl border-l-2 border-flame pl-4 text-sm font-semibold leading-relaxed text-muted-foreground sm:text-base">
            I’m a multidisciplinary designer focused on UX and film &amp; video design.
          </p>
        </div>
        <aside className="min-w-0 lg:pt-8">
          <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center border-b border-gridline pb-3">
            <h2 className="text-sm font-bold uppercase text-ocean">Featured work</h2>
            <span className="text-xs font-bold uppercase text-muted-foreground">Selected 03</span>
          </div>
          <div className="grid gap-4">
            <FeaturedCard
              title="Sipit"
              type="UX · Sustainable packaging"
              description="Research, materials, systems thinking"
              cover="sipitCover"
              presentationProject={uxProjects[0]}
              onOpenPresentation={(project) => onOpenPresentation(project, 1)}
              setCursorMode={setCursorMode}
            />
            <FeaturedCard
              title="Street Smart Game Design"
              type="UX · Game design"
              description="Playful learning, street safety, thoughtful interaction"
              cover="streetSmartGameCover"
              presentationProject={uxProjects[3]}
              onOpenPresentation={(project) => onOpenPresentation(project, 1)}
              setCursorMode={setCursorMode}
            />
            <FeaturedCard
              title="Ethnic Village Resort"
              type="Brand identity · Hospitality"
              description="A place-led identity inspired by culture, landscape, and regional memory"
              cover="ethnicVillageCover"
              to="/ethnic-village"
              setCursorMode={setCursorMode}
            />
          </div>
        </aside>
      </div>
    </section>
  );
}

function PhotoSequence({ setCursorMode }: { setCursorMode: (mode: CursorMode) => void }) {
  const photos: Array<[MediaKey, string]> = [
    ["kishanPortrait01", "Kishan in the rain"],
    ["kishanPortrait02", "Kishan by the waterfront"],
  ];
  return (
    <div
      className="relative mt-8 aspect-[4/3] max-h-[36rem] min-h-[22rem] w-full sm:aspect-[16/9]"
      onMouseEnter={() => setCursorMode("view")}
      onMouseLeave={() => setCursorMode("default")}
    >
      {photos.map(([key, label]) => (
        <div
          key={key}
          className={`album-photo absolute inset-[4%_3%] overflow-hidden border border-gridline bg-background shadow-[0_18px_45px_var(--shadow-tint)] ${key === "kishanPortrait01" ? "intro-photo-one -rotate-2" : "intro-photo-two rotate-2"}`}
        >
          <MediaVisual media={key} label={label} className="h-full w-full" eager />
        </div>
      ))}
    </div>
  );
}

function FeaturedCard({
  title,
  type,
  description,
  cover,
  href,
  to,
  presentationProject,
  onOpenPresentation,
  setCursorMode,
}: {
  title: string;
  type: string;
  description: string;
  cover: MediaKey;
  href?: string | null;
  to?: "/logo-deck" | "/ethnic-village";
  presentationProject?: (typeof uxProjects)[number];
  onOpenPresentation?: (project: (typeof uxProjects)[number]) => void;
  setCursorMode: (mode: CursorMode) => void;
}) {
  const contents = (
    <>
      <div className="relative overflow-hidden">
        <MediaVisual
          media={cover}
          label={`${title} cover`}
          className="aspect-[16/8] w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex translate-y-full items-end bg-ocean/90 p-5 text-ocean-foreground transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-sm font-semibold leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 p-5">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase text-flame">{type}</p>
          <h3 className="mt-2 font-display text-4xl leading-none">{title}</h3>
        </div>
        <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </>
  );
  const cls =
    "group block overflow-hidden border border-gridline bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_var(--shadow-tint)]";
  if (presentationProject && onOpenPresentation)
    return (
      <article
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        className={cls}
        onClick={() => onOpenPresentation(presentationProject)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpenPresentation(presentationProject);
          }
        }}
        onMouseEnter={() => setCursorMode("view")}
        onMouseLeave={() => setCursorMode("default")}
      >
        {contents}
      </article>
    );
  if (to)
    return (
      <Link
        to={to}
        className={cls}
        onMouseEnter={() => setCursorMode("view")}
        onMouseLeave={() => setCursorMode("default")}
      >
        {contents}
      </Link>
    );
  if (href)
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cls}
        onMouseEnter={() => setCursorMode("view")}
        onMouseLeave={() => setCursorMode("default")}
      >
        {contents}
      </a>
    );
  return (
    <article
      className={cls}
      onMouseEnter={() => setCursorMode("view")}
      onMouseLeave={() => setCursorMode("default")}
    >
      {contents}
    </article>
  );
}

function SectionNavigator({ setCursorMode }: { setCursorMode: (mode: CursorMode) => void }) {
  return (
    <nav
      aria-label="Portfolio sections"
      className="sticky top-20 z-20 overflow-x-auto border-b border-gridline bg-paper/95 backdrop-blur"
    >
      <div className="mx-auto flex w-max min-w-full max-w-7xl items-center justify-start px-3 sm:justify-center sm:px-8">
        {sectionLinks.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className="shrink-0 border-x border-gridline px-4 py-3 text-xs font-bold uppercase transition-colors hover:bg-ocean hover:text-ocean-foreground sm:px-6"
            onMouseEnter={() => setCursorMode("link")}
            onMouseLeave={() => setCursorMode("default")}
          >
            {label}
          </a>
        ))}
        <Link
          to="/about"
          className="shrink-0 border-x border-gridline px-4 py-3 text-xs font-bold uppercase transition-colors hover:bg-ocean hover:text-ocean-foreground sm:px-6"
          onMouseEnter={() => setCursorMode("link")}
          onMouseLeave={() => setCursorMode("default")}
        >
          About
        </Link>
      </div>
    </nav>
  );
}

function UxSection({
  setCursorMode,
  onOpenPresentation,
}: {
  setCursorMode: (mode: CursorMode) => void;
  onOpenPresentation: (project: (typeof uxProjects)[number], page: number) => void;
}) {
  return (
    <section
      id="ux"
      className="portfolio-grid-bg scroll-mt-32 border-b border-gridline px-5 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="User Experience Projects"
          eyebrow="Turning observation into simple, intuitive, and meaningful experiences."
          icon={portfolioMedia.uxProjectIcon ?? ""}
          setCursorMode={setCursorMode}
        />
        <div className="project-columns mt-12 grid border-y border-gridline md:grid-cols-2">
          {uxProjects.map((project) => {
            const href = portfolioMedia[project.presentation];
            const categoryHref = portfolioMedia[project.categoryPresentation];
            const sections = project.sections ?? presentationCategories;
            const usesPngPresentation = Boolean(href?.toLowerCase().endsWith(".png"));
            const content = (
              <>
                <div className="relative overflow-hidden border-b border-gridline">
                  <MediaVisual
                    media={project.cover}
                    label={`${project.title} project cover`}
                    className="project-cover aspect-[1.42/1] w-full"
                  />
                  <div className="project-description absolute inset-0 flex items-end bg-ocean/95 p-6 text-ocean-foreground sm:p-8">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[.16em] text-flame-foreground/75">
                        About the project
                      </p>
                      <p className="mt-3 max-w-md text-base font-semibold leading-relaxed">
                        {project.copy}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex min-h-32 items-start justify-between gap-5 p-5 sm:min-h-40 sm:p-7">
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-flame">
                      {project.type}
                    </p>
                    <h3 className="project-heading mt-3 break-words font-display text-4xl leading-[.9] sm:text-5xl">
                      {project.title}
                    </h3>
                  </div>
                  <span className="pt-1 text-sm font-bold text-muted-foreground">
                    {project.number}
                  </span>
                </div>
              </>
            );
            const cls =
              "project-card group block min-w-0 border-b border-gridline bg-paper transition-colors last:border-b-0 md:nth-[even]:border-l md:nth-last-[-n+2]:border-b-0 hover:bg-ocean hover:text-ocean-foreground";
            return (
              <article
                key={project.title}
                className={cls}
                onMouseEnter={() => setCursorMode("view")}
                onMouseLeave={() => setCursorMode("default")}
              >
                {usesPngPresentation ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenPresentation(project, 1)}
                      className="block w-full text-left"
                    >
                      {content}
                    </button>
                    <nav
                      aria-label={`${project.title} presentation categories`}
                      className="flex flex-wrap gap-2 border-t border-gridline px-5 py-4 sm:px-7"
                    >
                      {sections.map((category) => (
                        <button
                          key={category.label}
                          type="button"
                          onClick={() => onOpenPresentation(project, category.page)}
                          className="border border-gridline px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors hover:border-flame hover:bg-flame hover:text-flame-foreground"
                        >
                          {category.label}
                        </button>
                      ))}
                    </nav>
                  </>
                ) : href ? (
                  <>
                    <a href={href} target="_blank" rel="noreferrer" className="block">
                      {content}
                    </a>
                    <nav
                      aria-label={`${project.title} presentation categories`}
                      className="flex flex-wrap gap-2 border-t border-gridline px-5 py-4 sm:px-7"
                    >
                      {presentationCategories.map((category) => (
                        <a
                          key={category.label}
                          href={`${categoryHref ?? href}#page=${category.page}`}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-gridline px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-colors hover:border-flame hover:bg-flame hover:text-flame-foreground"
                        >
                          {category.label}
                        </a>
                      ))}
                    </nav>
                  </>
                ) : (
                  content
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  label,
  eyebrow,
  icon,
  iconFrameClassName,
  iconClassName,
  setCursorMode,
}: {
  label: string;
  eyebrow: string;
  icon: string;
  iconFrameClassName?: string;
  iconClassName?: string;
  setCursorMode: (mode: CursorMode) => void;
}) {
  const [stretch, setStretch] = useState(1);
  return (
    <div
      className="section-title grid items-center gap-5 sm:grid-cols-[8rem_minmax(0,34rem)] sm:gap-8"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const ratio = bounds.width > 0 ? (event.clientX - bounds.left) / bounds.width : 0.5;
        setStretch(0.96 + Math.max(0, Math.min(1, ratio)) * 0.08);
      }}
      onMouseEnter={() => setCursorMode("link")}
      onMouseLeave={() => {
        setStretch(1);
        setCursorMode("default");
      }}
    >
      <div
        className={`grid shrink-0 place-items-center ${iconFrameClassName ?? "h-24 w-28 sm:h-28 sm:w-32"}`}
      >
        <img
          src={icon}
          alt=""
          className={`h-full w-full object-contain ${iconClassName ?? "transition-transform duration-300 hover:-translate-y-1 hover:scale-105"}`}
        />
      </div>
      <div className="min-w-0">
        <h2
          className="text-stretch origin-left font-display text-4xl leading-[.92] sm:text-6xl"
          style={{ "--headline-stretch": stretch } as CssVars}
        >
          {label}
        </h2>
        <p className="mt-3 max-w-[27rem] text-sm font-semibold leading-[1.45] text-muted-foreground">
          {eyebrow}
        </p>
      </div>
    </div>
  );
}

function GraphicSection({ setCursorMode }: { setCursorMode: (mode: CursorMode) => void }) {
  return (
    <section
      id="graphic"
      className="scroll-mt-32 border-b border-gridline px-5 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="Graphic Projects"
          eyebrow="Identity, editorial systems, and moving image connected through strong visual storytelling."
          icon={portfolioMedia.graphicProjectIcon ?? ""}
          iconClassName="graphic-icon-spin"
          setCursorMode={setCursorMode}
        />
        <div className="mt-14">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              to="/ethnic-village"
              className="group relative isolate block aspect-[2/1] scroll-mt-32 overflow-hidden border border-gridline bg-ocean"
              onMouseEnter={() => setCursorMode("view")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <MediaVisual
                media="ethnicVillageCover"
                label="Ethnic Village Resort cover"
                className="absolute inset-0 size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/85 via-cocoa/15 to-transparent transition-colors group-hover:from-cocoa/95" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-ocean-foreground sm:p-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.16em]">
                    Brand identity · 2025
                  </p>
                  <h3 className="mt-1 font-display text-3xl leading-none sm:text-4xl">
                    Ethnic Village Resort
                  </h3>
                </div>
                <ArrowUpRight
                  className="mb-1 size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
            <Link
              id="logo"
              to="/logo-deck"
              className="group relative isolate block aspect-[2/1] scroll-mt-32 overflow-hidden border border-gridline bg-ocean text-ocean-foreground"
              onMouseEnter={() => setCursorMode("view")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,color-mix(in_oklab,var(--flame)_45%,transparent),transparent_55%)] transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-4 sm:p-6">
                <p className="text-[10px] font-bold uppercase tracking-[.16em]">
                  Identity study · 04 marks
                </p>
                <ArrowUpRight
                  className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                <h3 className="max-w-[14rem] font-display text-3xl leading-none sm:text-4xl">
                  Logo Ideation Deck
                </h3>
              </div>
            </Link>
          </div>
          <div className="logo-carousel-shell relative overflow-hidden bg-paper py-7 sm:py-9">
            <div className="logo-marquee flex w-max items-center">
              {[...logoCarousel, ...logoCarousel].map((logo, index) => (
                <div
                  key={`${logo.title}-${index}`}
                  className="grid h-36 w-64 shrink-0 place-items-center px-5 sm:h-40 sm:w-72 sm:px-7 lg:h-44 lg:w-80"
                >
                  {logo.src ? (
                    <img
                      src={logo.src}
                      alt={index < logoCarousel.length ? `${logo.title} logo` : ""}
                      aria-hidden={index >= logoCarousel.length}
                      className="h-28 w-52 object-contain sm:h-32 sm:w-60 lg:h-36 lg:w-68"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection({
  setCursorMode,
  onOpenVideo,
}: {
  setCursorMode: (mode: CursorMode) => void;
  onOpenVideo: (video: (typeof videos)[number]) => void;
}) {
  return (
    <section
      id="video"
      className="scroll-mt-32 border-b border-gridline px-5 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="Video Projects"
          eyebrow="Editing, rhythm, storytelling, and experimental moving image built for the big screen."
          icon={portfolioMedia.videoProjectIcon ?? ""}
          iconFrameClassName="h-[231px] w-[70px]"
          setCursorMode={setCursorMode}
        />
        <div className="video-columns mt-12 grid border-x border-t border-gridline md:grid-cols-3">
          {videos.map((video) => (
            <button
              key={video.title}
              type="button"
              className="video-card group min-w-0 overflow-hidden bg-paper text-left"
              onClick={() => onOpenVideo(video)}
              onMouseEnter={() => setCursorMode("view")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <span className="relative block aspect-[16/10] overflow-hidden border-b border-gridline">
                <MediaVisual
                  media={video.cover}
                  label={`${video.title} cover`}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-ocean/15 transition-colors group-hover:bg-ocean/30" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-flame text-flame-foreground shadow-[0_0_0_7px_color-mix(in_oklab,var(--flame)_24%,transparent)] transition-transform group-hover:scale-110">
                    <Play className="ml-1 size-5 fill-current" />
                  </span>
                </span>
              </span>
              <span className="block min-h-44 p-5 sm:p-6">
                <span className="block font-display text-4xl leading-none">{video.title}</span>
                <span className="mt-3 block text-sm font-semibold leading-relaxed text-muted-foreground">
                  {video.copy}
                </span>
                {video.extra ? (
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase text-flame">
                    <Sparkles className="size-4" />
                    {video.extra}
                  </span>
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtworkSection({
  visibleArt,
  setCursorMode,
}: {
  visibleArt: string[];
  setCursorMode: (mode: CursorMode) => void;
}) {
  const items: Array<[MediaKey, string]> = [
    ["artwork01", "Artwork 01"],
    ["photograph01", "Photograph 01"],
    ["artwork02", "Artwork 02"],
    ["photograph02", "Photograph 02"],
    ["artwork03", "Artwork 03"],
    ["photograph03", "Photograph 03"],
    ["artwork04", "Artwork 04"],
    ["photograph04", "Photograph 04"],
    ["artwork05", "Artwork 05"],
    ["photograph05", "Photograph 05"],
    ["artwork06", "Artwork 06"],
    ["photograph06", "Photograph 06"],
    ["photograph07", "Photograph 07"],
    ["photograph08", "Photograph 08"],
    ["photograph09", "Photograph 09"],
    ["photograph10", "Photograph 10"],
  ];
  return (
    <section id="artwork" className="scroll-mt-32 px-5 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          label="Artworks & Photographs"
          eyebrow="Personal observations, textures, portraits, and visual studies collected across formats."
          icon={portfolioMedia.artworkProjectIcon ?? ""}
          setCursorMode={setCursorMode}
        />
        <div className="artwork-masonry mt-14 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {items.map(([media, label]) => (
            <div
              key={media}
              data-collage-item={media}
              className={`mb-3 break-inside-avoid overflow-hidden border border-gridline transition-all duration-700 ${visibleArt.includes(media) ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-sm"}`}
              onMouseEnter={() => setCursorMode("view")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <MediaVisual
                media={media}
                label={label}
                className={`h-auto w-full transition-transform duration-500 hover:scale-[1.025] ${media === "photograph10" ? "rotate-180" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const presentationCategories: readonly PresentationCategory[] = [
  { label: "Cover", page: 1, description: "Start with the project and its core idea." },
  { label: "Context", page: 2, description: "See the brief, audience, and design setting." },
  { label: "Research", page: 3, description: "Explore the observations behind the work." },
  { label: "Insights", page: 4, description: "Review the needs and opportunities identified." },
  { label: "Concept", page: 5, description: "Follow the central design direction." },
  { label: "System", page: 6, description: "See how the solution works as a system." },
  { label: "Outcome", page: 7, description: "Finish with the resolved design and results." },
];

function PresentationViewer({
  project,
  page,
  onClose,
}: {
  project: (typeof uxProjects)[number];
  page: number;
  onClose: () => void;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [activePage, setActivePage] = useState(page);
  const sections = project.sections ?? presentationCategories;
  const selectedCategory = sections.find((category) => category.page === activePage) ?? {
    label: "Cover",
    page: 1,
    description: "Start with the project and its core idea.",
  };
  const image = portfolioMedia[project.presentation];

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const imageElement = imageRef.current;
    if (!viewer || !imageElement) return;
    const scrollToCategory = () => {
      const imageTop =
        imageElement.getBoundingClientRect().top -
        viewer.getBoundingClientRect().top +
        viewer.scrollTop;
      const sectionOffset = ((page - 1) / sections.length) * imageElement.clientHeight;
      viewer.scrollTo({
        top: imageTop + sectionOffset - 180,
        behavior: "smooth",
      });
    };
    if (imageElement.complete) scrollToCategory();
    else imageElement.addEventListener("load", scrollToCategory, { once: true });
    return () => imageElement.removeEventListener("load", scrollToCategory);
  }, [page, project, sections]);

  if (!image) return null;

  return (
    <div
      ref={viewerRef}
      className="fixed inset-0 z-[86] overflow-y-auto bg-paper"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} presentation`}
    >
      <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gridline bg-paper/95 px-5 py-4 backdrop-blur sm:px-10">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-flame">
            Project presentation
          </p>
          <h2 className="mt-1 truncate font-display text-3xl leading-none sm:text-4xl">
            {project.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close presentation"
          className="shrink-0 border border-gridline px-4 py-3 text-xs font-bold uppercase transition-colors hover:bg-ocean hover:text-ocean-foreground"
        >
          Close
        </button>
      </header>
      <div className="sticky top-[89px] z-10 border-b border-gridline bg-paper/95 px-3 py-3 backdrop-blur sm:px-8">
        <p className="mb-2 text-xs font-semibold text-muted-foreground">
          Choose a section to jump through the exported presentation.
        </p>
        <nav aria-label="Presentation sections" className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((category) => (
            <button
              key={category.label}
              type="button"
              onClick={() => {
                setActivePage(category.page);
                const imageElement = imageRef.current;
                const viewer = viewerRef.current;
                if (!imageElement || !viewer) return;
                const imageTop =
                  imageElement.getBoundingClientRect().top -
                  viewer.getBoundingClientRect().top +
                  viewer.scrollTop;
                const sectionOffset =
                  ((category.page - 1) / sections.length) * imageElement.clientHeight;
                viewer.scrollTo({
                  top: imageTop + sectionOffset - 180,
                  behavior: "smooth",
                });
              }}
              aria-current={category.page === activePage ? "location" : undefined}
              title={category.description}
              className={`shrink-0 border px-3 py-2 text-[10px] font-bold uppercase tracking-wide transition-colors ${category.page === activePage ? "border-flame bg-flame text-flame-foreground" : "border-gridline hover:border-flame hover:bg-flame hover:text-flame-foreground"}`}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-8">
        <p className="mb-4 border-l-2 border-flame pl-3 text-sm font-semibold text-muted-foreground">
          {selectedCategory.description}
        </p>
        <img
          ref={imageRef}
          src={image}
          alt={`${project.title} complete presentation`}
          className="block h-auto w-full"
        />
      </div>
    </div>
  );
}

function TheaterViewer({
  video,
  lightsOn,
  onToggleLights,
  onClose,
}: {
  video: (typeof videos)[number];
  lightsOn: boolean;
  onToggleLights: () => void;
  onClose: () => void;
}) {
  const src = portfolioMedia[video.media];
  return (
    <div
      className={`theater-overlay fixed inset-0 z-[85] overflow-y-auto transition-colors duration-500 ${lightsOn ? "bg-flame/95" : "bg-cocoa/98"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} theater`}
    >
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center px-4 py-5 sm:px-8 sm:py-8">
        <div className="mb-3 flex items-center justify-between gap-3 text-flame-foreground sm:mb-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[.18em]">Now showing</p>
            <h2 className="mt-1 break-words font-display text-3xl leading-none sm:text-5xl">
              {video.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close theater"
            className="grid size-11 shrink-0 place-items-center border border-flame-foreground/60 transition-colors hover:bg-flame-foreground hover:text-flame"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="relative mx-auto aspect-video max-h-[65svh] w-full overflow-hidden border border-flame-foreground/40 bg-black shadow-[0_24px_80px_rgba(0,0,0,.3)]">
          {src ? (
            <video
              src={src}
              controls
              autoPlay
              playsInline
              className="size-full object-contain"
              aria-label={video.title}
            />
          ) : (
            <div className="grid size-full place-items-center bg-mist/20 text-center text-flame-foreground">
              <div>
                <Lightbulb className="mx-auto size-12" />
                <p className="mt-4 text-sm font-bold uppercase tracking-[.14em]">
                  Movie replacement slot
                </p>
                <p className="mt-2 text-xs opacity-75">
                  Upload the final {video.title} film to start playback here.
                </p>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 theater-screen-glow" />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-flame-foreground sm:mt-4">
          <p className="max-w-xl text-sm font-semibold leading-relaxed opacity-80">{video.copy}</p>
          <button
            type="button"
            onClick={onToggleLights}
            aria-pressed={!lightsOn}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-flame-foreground px-4 py-3 text-xs font-bold uppercase transition-colors hover:bg-flame-foreground hover:text-flame"
          >
            <Lightbulb className="size-4" />
            {lightsOn ? "Lights off" : "Lights on"}
          </button>
        </div>
      </div>
    </div>
  );
}

function MediaVisual({
  media,
  label,
  className,
  video = false,
  eager = false,
}: {
  media: MediaKey;
  label: string;
  className: string;
  video?: boolean;
  eager?: boolean;
}) {
  const src = portfolioMedia[media];
  if (src && video)
    return (
      <video
        src={src}
        className={`${className} object-cover`}
        preload="metadata"
        aria-label={label}
      />
    );
  if (src)
    return (
      <img
        src={src}
        alt={label}
        className={`${className} object-cover`}
        loading={eager ? "eager" : "lazy"}
      />
    );
  return (
    <div
      className={`${className} media-slot relative grid place-items-center overflow-hidden bg-mist p-5 text-center`}
    >
      <div className="relative z-10 flex max-w-full flex-col items-center gap-3">
        {video ? <Play className="size-9" /> : <ImageIcon className="size-9" />}
        <span className="max-w-full break-words text-xs font-bold uppercase">{label}</span>
      </div>
    </div>
  );
}

function Footer({ setCursorMode }: { setCursorMode: (mode: CursorMode) => void }) {
  const [nameGlitchActive, setNameGlitchActive] = useState(false);

  const replayNameGlitch = () => {
    setNameGlitchActive(false);
    window.requestAnimationFrame(() => setNameGlitchActive(true));
    window.setTimeout(() => setNameGlitchActive(false), 650);
  };

  return (
    <footer
      id="contact"
      className="reveal-footer scroll-mt-20 min-h-[62vh] bg-flame text-flame-foreground"
    >
      <div className="mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-between px-5 py-12 sm:px-10 lg:px-16">
        <div className="grid gap-8 border-b border-flame-foreground/35 pb-10 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="flex min-w-0 flex-col gap-4">
            <p className="text-xs font-bold uppercase">Contact</p>
            <a
              href="mailto:srikishansethu06@gmail.com"
              className="inline-flex items-center gap-3 break-all text-lg font-semibold hover:text-foreground"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <Mail className="size-5 shrink-0" aria-hidden="true" />
              srikishansethu06@gmail.com
            </a>
            <a
              href="tel:+917358009276"
              className="inline-flex items-center gap-3 text-lg font-semibold hover:text-foreground"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
            >
              <Phone className="size-5 shrink-0" aria-hidden="true" />
              +91 73580 09276
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-bold uppercase">
            <a
              href="https://www.linkedin.com/in/srikishan-sethumadhavan-76b3a7313/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
              className="inline-flex min-h-10 items-center justify-center border border-flame-foreground/60 px-4 py-2 transition-colors hover:bg-flame-foreground hover:text-flame"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/srikishansethu"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
              className="inline-flex min-h-10 items-center justify-center border border-flame-foreground/60 px-4 py-2 transition-colors hover:bg-flame-foreground hover:text-flame"
            >
              Behance
            </a>
          </div>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <h2 className="min-w-0">
            <button
              type="button"
              aria-label="Replay name glitch effect"
              onClick={replayNameGlitch}
              onMouseEnter={() => setCursorMode("link")}
              onMouseLeave={() => setCursorMode("default")}
              className={`footer-name-trigger min-w-0 text-left font-display text-[clamp(3.25rem,8vw,7rem)] leading-[.82] text-ocean ${nameGlitchActive ? "footer-name-glitch-active" : ""}`}
            >
              <span
                className="hero-name-glitch block"
                data-text="SRIKISHAN"
                data-numeric="5R1K1SH4N"
              >
                SRIKISHAN
              </span>
              <span
                className="hero-name-glitch block whitespace-nowrap"
                data-text="SETHUMADHAVAN"
                data-numeric="53THUM4DH4V4N"
              >
                SETHUMADHAVAN
              </span>
            </button>
          </h2>
          <Button
            asChild
            className="w-fit rounded-none bg-ocean font-bold uppercase text-ocean-foreground hover:bg-foreground hover:text-background"
            onMouseEnter={() => setCursorMode("link")}
            onMouseLeave={() => setCursorMode("default")}
          >
            <a href={portfolioMedia.resume} download>
              <ArrowDownToLine />
              Resume
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
