import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { useState } from "react";

import { CustomPointer } from "@/components/custom-pointer";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Srikishan Sethu Madhavan" },
      {
        name: "description",
        content: "Selected experience in video editing, branding, and UI/UX design.",
      },
    ],
  }),
  component: ExperiencePage,
});

const roles = [
  {
    company: "Rough Paper Technologies",
    title: "Video Editor",
    location: "Dubai",
    dates: "2024–2025",
    number: "01",
    description:
      "Edited video projects at Rough Paper Technologies, shaping footage into clear, engaging stories for digital audiences.",
  },
  {
    company: "Ethnic Village Resort",
    title: "Branding Consultant",
    location: "Assam, India",
    dates: "2025",
    number: "02",
    description:
      "Worked on the resort's branding, helping translate its sense of place and hospitality into a consistent visual identity.",
  },
  {
    company: "Speaker Box",
    title: "UI/UX Design Intern",
    location: "Kerala, India",
    dates: "2026",
    number: "03",
    description:
      "Joined the UI/UX design team as an intern, learning to observe user needs and turn complex tasks into clearer digital experiences.",
  },
] as const;

function ExperiencePage() {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(roles[0].company);
  const selectedRole = roles.find((role) => role.company === selectedCompany);

  return (
    <main className="portfolio-canvas page-enter relative isolate min-h-screen bg-paper text-foreground portfolio-grid-bg">
      <CustomPointer />
      <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-gridline bg-paper/90 px-4 py-3 backdrop-blur sm:min-h-20 sm:px-10 lg:px-16">
        <Link
          to="/menu"
          className="inline-flex min-w-0 items-center gap-2 text-xs font-bold uppercase transition-colors hover:text-flame sm:gap-3 sm:text-sm"
        >
          <ArrowLeft className="size-5 shrink-0" /> <span className="truncate">Back to menu</span>
        </Link>
        <span className="shrink-0 font-display text-xl text-ocean sm:text-2xl">
          EXPERIENCE / 01
        </span>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
        <div className="grid gap-8 border-b border-gridline pb-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-flame">
              A few chapters so far
            </p>
            <h1 className="mt-3 font-display text-[clamp(4rem,10vw,8rem)] leading-[.82] text-ocean">
              EXPERIENCE
            </h1>
          </div>
          <p className="max-w-sm text-sm font-semibold leading-relaxed text-muted-foreground">
            A growing mix of editing, branding, and digital design. Select a chapter to explore.
          </p>
        </div>

        <div className="mt-9 grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,.9fr)]">
          <div className="min-w-0 divide-y divide-gridline border-y border-gridline">
            {roles.map((role) => {
              const active = selectedCompany === role.company;
              return (
                <button
                  key={role.company}
                  type="button"
                  aria-expanded={active}
                  onClick={() => setSelectedCompany(active ? null : role.company)}
                  className={`group grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-3 py-4 text-left transition-colors sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 sm:px-6 sm:py-5 ${
                    active ? "bg-ocean text-ocean-foreground" : "hover:bg-flame/10"
                  }`}
                >
                  <span
                    className={`row-span-2 font-display text-2xl sm:row-span-1 sm:text-3xl ${
                      active ? "text-flame-foreground/70" : "text-flame"
                    }`}
                  >
                    {role.number}
                  </span>
                  <span className="min-w-0">
                    <span className="block break-words font-display text-xl leading-none sm:text-3xl">
                      {role.company}
                    </span>
                    <span
                      className={`mt-2 block text-xs font-bold uppercase tracking-[.1em] ${
                        active ? "text-ocean-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {role.title}
                      {role.location ? ` · ${role.location}` : ""}
                    </span>
                  </span>
                  <span
                    className={`col-start-2 text-[10px] font-bold uppercase sm:col-start-auto sm:text-xs ${
                      active ? "text-flame-foreground" : "text-flame"
                    }`}
                  >
                    {role.dates}
                  </span>
                </button>
              );
            })}
          </div>

          <aside
            className="relative flex min-h-52 min-w-0 flex-col justify-between overflow-hidden border border-gridline bg-mist/30 p-5 sm:min-h-60 sm:p-8"
            aria-live="polite"
          >
            <span className="absolute right-2 -top-12 font-display text-[12rem] leading-none text-flame/10 sm:-right-5">
              {selectedRole?.number ?? "↗"}
            </span>
            {selectedRole ? (
              <>
                <BriefcaseBusiness className="relative size-7 text-flame" />
                <div className="relative mt-12">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-flame">
                    {selectedRole.dates}
                  </p>
                  <h2 className="mt-2 font-display text-4xl leading-none text-ocean">
                    {selectedRole.title}
                  </h2>
                  <p className="mt-2 text-sm font-bold">{selectedRole.company}</p>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-muted-foreground">
                    {selectedRole.description}
                  </p>
                  {selectedRole.location ? (
                    <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                      <MapPin className="size-4" /> {selectedRole.location}
                    </p>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="relative flex h-full min-h-44 flex-col justify-end">
                <BriefcaseBusiness className="mb-auto size-7 text-flame" />
                <h2 className="font-display text-3xl leading-none text-ocean">Select a chapter</h2>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  Choose a role to see its details here.
                </p>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-gridline pt-6">
          <p className="text-sm font-semibold text-muted-foreground">
            Each role is a new way to observe, shape, and share an idea.
          </p>
          <Link
            to="/"
            hash="featured"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase transition-colors hover:text-flame"
          >
            Back to portfolio <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
