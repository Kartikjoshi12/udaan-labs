"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import type { AppId } from "./apps";
import { PixelPhoto } from "./PixelPhoto";
import { TicTacToe } from "./TicTacToe";
import { useWallpaper } from "./WallpaperContext";

export function WindowContent({ id }: { id: AppId }) {
  switch (id) {
    case "about":
      return <AboutWindow />;
    case "services":
      return <ServicesWindow />;
    case "projects":
      return <ProjectsWindow />;
    case "process":
      return <ProcessWindow />;
    case "contact":
      return <ContactWindow />;
    case "wallpaper":
      return <WallpaperWindow />;
    case "tictactoe":
      return <TicTacToe />;
  }
}

function FrameImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border-[3px] border-ink bg-paper-2 ${className}`}
    >
      <PixelPhoto
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function AboutWindow() {
  return (
    <div className="space-y-5">
      <div className="overflow-hidden border-[3px] border-ink bg-ink text-cream">
        <div className="relative h-36 w-full border-b-[3px] border-ink sm:h-44">
          <PixelPhoto
            src={site.images.aboutHero}
            alt="Desk and build notes"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="p-4">
          <p className="text-xs text-mustard">{site.hero.eyebrow}</p>
          <h2 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight md:text-3xl">
            {site.name}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/85">
            {site.hero.subtitle}
          </p>
        </div>
      </div>

      <p className="border-[3px] border-ink bg-mustard px-4 py-3 text-sm font-semibold leading-snug">
        {site.tagline}
      </p>

      <div className="grid gap-3 sm:grid-cols-[1fr_0.85fr] sm:items-stretch">
        <ul className="grid grid-cols-2 gap-2">
          {site.facts.map((fact) => (
            <li
              key={fact.label}
              className="border-[3px] border-ink bg-paper px-3 py-2.5"
            >
              <p className="text-[10px] uppercase tracking-wide text-muted">
                {fact.label}
              </p>
              <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-sm font-bold">
                {fact.value}
              </p>
            </li>
          ))}
        </ul>
        <div className="border-[3px] border-ink bg-cream p-2">
          <FrameImage
            src={site.images.team}
            alt="Working together"
            className="h-full min-h-[132px] w-full"
          />
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted">{site.whyUs}</p>
    </div>
  );
}

function ServicesWindow() {
  return (
    <div className="space-y-4">
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold md:text-2xl">
        What we build
      </h2>
      <div className="grid gap-4">
        {site.services.map((service) => (
          <article
            key={service.title}
            className="grid gap-0 overflow-hidden border-[3px] border-ink bg-paper sm:grid-cols-[148px_1fr]"
          >
            <FrameImage
              src={service.image}
              alt={service.title}
              className="h-32 w-full sm:h-full sm:min-h-[128px]"
            />
            <div className="border-t-[3px] border-ink p-4 sm:border-l-[3px] sm:border-t-0">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProjectsWindow() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold md:text-2xl">
          Selected work
        </h2>
        <p className="mt-1 text-sm text-muted">
          A few recent builds. Swap these for your real screenshots when ready.
        </p>
      </div>
      <div className="grid gap-4">
        {site.projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden border-[3px] border-ink bg-paper"
          >
            <FrameImage
              src={project.image}
              alt={`${project.title} preview`}
              className="h-40 w-full sm:h-48"
            />
            <div className="border-t-[3px] border-ink p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
                  {project.title}
                </h3>
                <span className="text-xs text-muted">{project.type}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.blurb}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-2 border-ink bg-cream px-2 py-0.5 text-[11px]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProcessWindow() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold md:text-2xl">
          How we work
        </h2>
        <p className="mt-1 text-sm text-muted">
          Short loop. You always know what we’re doing this week.
        </p>
      </div>
      <ol className="space-y-3">
        {site.process.map((step) => (
          <li
            key={step.step}
            className="flex gap-3 border-[3px] border-ink bg-paper p-4"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border-[3px] border-ink bg-mustard text-sm font-bold">
              {step.step}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ContactWindow() {
  const { contact } = site;
  const [hint, setHint] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(
      `Project from ${name || "website"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setHint(true);
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold md:text-2xl">
          {contact.heading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{contact.body}</p>
      </div>
      <ul className="space-y-3 border-[3px] border-ink bg-paper p-3 text-sm">
        <li>
          <span className="text-xs text-muted">Email</span>
          <br />
          <a
            className="font-medium text-blue underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
        </li>
        <li>
          <span className="text-xs text-muted">Based in</span>
          <br />
          <span className="font-medium">{contact.location}</span>
        </li>
      </ul>
      <form
        onSubmit={onSubmit}
        className="space-y-3 border-[3px] border-ink bg-paper p-4"
      >
        <input
          name="name"
          required
          placeholder="Your name"
          className="min-h-11 w-full border-[3px] border-ink bg-cream px-3 text-sm outline-none focus:bg-mustard"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="min-h-11 w-full border-[3px] border-ink bg-cream px-3 text-sm outline-none focus:bg-mustard"
        />
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What are you trying to build?"
          className="w-full border-[3px] border-ink bg-cream px-3 py-2 text-sm outline-none focus:bg-mustard"
        />
        <button
          type="submit"
          className="nb-btn min-h-11 w-full px-4 text-xs"
          style={{ background: "#0a0a0a", color: "#fff8e7" }}
        >
          Open email
        </button>
        {hint && (
          <p className="text-[11px] text-muted">
            If nothing opens, write us at {contact.email}
          </p>
        )}
      </form>
    </div>
  );
}

function WallpaperWindow() {
  const { wallpapers, current, ready, setWallpaper, cycleNext } = useWallpaper();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold md:text-2xl">
            Wallpaper
          </h2>
          <p className="mt-1 text-sm text-muted">Pick one, or hit next.</p>
        </div>
        <button
          type="button"
          onClick={cycleNext}
          disabled={wallpapers.length === 0}
          className="nb-btn px-4 py-2 text-xs disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {!ready && (
        <p className="border-[3px] border-ink bg-paper p-4 text-sm">
          Loading wallpapers…
        </p>
      )}

      {ready && wallpapers.length === 0 && (
        <div className="border-[3px] border-ink bg-mustard p-4 text-sm">
          <p>No wallpapers yet.</p>
          <p className="mt-2 text-xs">
            Drop images in{" "}
            <code className="border border-ink bg-cream px-1">
              public/wallpapers/
            </code>{" "}
            and refresh.
          </p>
        </div>
      )}

      {wallpapers.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {wallpapers.map((path) => {
            const active = path === current;
            const label = path.split("/").pop() ?? path;
            return (
              <button
                key={path}
                type="button"
                onClick={() => setWallpaper(path)}
                className={`overflow-hidden border-[3px] border-ink text-left ${
                  active ? "bg-mustard" : "bg-paper hover:bg-cream"
                }`}
              >
                <div className="relative h-24 w-full border-b-[3px] border-ink">
                  <PixelPhoto
                    src={path}
                    alt={label}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="px-2 py-1.5">
                  <p className="truncate text-[11px]">{label}</p>
                  {active && (
                    <p className="text-[10px] text-ink/70">Active</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
