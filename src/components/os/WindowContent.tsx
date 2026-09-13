"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import type { AppId } from "./apps";
import { DoodleArrow, DoodleSquiggle, DoodleStar } from "./Doodles";
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

function BrutalImage({
  src,
  alt,
  className = "",
  pixelSize = 3,
}: {
  src: string;
  alt: string;
  className?: string;
  pixelSize?: number;
}) {
  return (
    <div
      className={`relative overflow-hidden border-[3px] border-ink bg-paper-2 ${className}`}
    >
      <PixelPhoto
        src={src}
        alt={alt}
        pixelSize={pixelSize}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function AboutWindow() {
  return (
    <div className="space-y-5">
      <div className="relative overflow-hidden border-[3px] border-ink bg-blue text-cream nb-shadow">
        <div className="relative h-40 w-full border-b-[3px] border-ink sm:h-48">
          <PixelPhoto
            src={site.images.aboutHero}
            alt="Product studio workspace"
            pixelSize={3}
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="relative p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-mustard">
            {site.hero.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-black tracking-tight md:text-3xl">
            {site.name}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/90">
            {site.hero.subtitle}
          </p>
          <DoodleStar className="absolute -right-1 top-2 h-10 w-10" />
          <DoodleSquiggle className="mt-3 h-6 w-24 text-mustard" />
        </div>
      </div>

      <p className="border-[3px] border-ink bg-mustard px-4 py-3 text-sm font-black nb-shadow-sm">
        {site.tagline}
      </p>

      <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr] sm:items-stretch">
        <div className="grid grid-cols-2 gap-3">
          {site.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="border-[3px] border-ink p-3 nb-shadow-sm"
              style={{
                backgroundColor: ["#ffd60a", "#ff4d2e", "#7cb518", "#ff6b9d"][
                  i % 4
                ],
                color: i % 4 === 1 ? "#fff8e7" : "#0a0a0a",
              }}
            >
              <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-black">
                {stat.value}
              </p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-wide opacity-80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="border-[3px] border-ink bg-cream p-2 nb-shadow-sm">
          <BrutalImage
            src={site.images.team}
            alt="Team collaborating"
            className="h-full min-h-[140px] w-full"
          />
          <p className="mt-2 text-center text-[10px] font-black uppercase tracking-wide">
            studio.jpg
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted">{site.whyUs}</p>
    </div>
  );
}

function ServicesWindow() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black md:text-2xl">
          Services
        </h2>
        <DoodleStar className="h-5 w-5" />
      </div>
      <div className="grid gap-4">
        {site.services.map((service, i) => (
          <article
            key={service.title}
            className="grid gap-0 overflow-hidden border-[3px] border-ink bg-paper nb-shadow sm:grid-cols-[160px_1fr]"
          >
            <BrutalImage
              src={service.image}
              alt={service.title}
              className="h-36 w-full sm:h-full sm:min-h-[140px]"
            />
            <div className="border-t-[3px] border-ink p-4 sm:border-l-[3px] sm:border-t-0">
              <p className="inline-block border-[3px] border-ink bg-blue px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-cream">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-lg font-black">
                {service.title}
              </h3>
              <p className="mt-2 text-sm font-medium text-muted">{service.body}</p>
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
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black md:text-2xl">
        Projects
      </h2>
      <p className="text-xs font-bold uppercase tracking-wide text-muted">
        Placeholder shots — swap with your real screenshots anytime
      </p>
      <div className="grid gap-4">
        {site.projects.map((project) => (
          <article
            key={project.title}
            className="overflow-hidden border-[3px] border-ink bg-paper nb-shadow"
          >
            <BrutalImage
              src={project.image}
              alt={`${project.title} preview`}
              className="h-44 w-full sm:h-52"
            />
            <div className="border-t-[3px] border-ink p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-black">
                  {project.title}
                </h3>
                <span className="border-[3px] border-ink bg-rust px-2 py-0.5 text-[10px] font-black uppercase text-cream">
                  {project.type}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-muted">{project.blurb}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-[3px] border-ink bg-mustard px-2 py-0.5 text-[10px] font-black uppercase"
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
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black md:text-2xl">
        Process
      </h2>
      <ol className="space-y-3">
        {site.process.map((step) => (
          <li
            key={step.step}
            className="flex gap-3 border-[3px] border-ink bg-paper p-4 nb-shadow"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center border-[3px] border-ink bg-ink text-[11px] font-black text-cream">
              {step.step}
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-black">
                {step.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <DoodleArrow className="h-6 w-16 text-rust" />
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
      `Project inquiry from ${name || "website"}`,
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
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black md:text-2xl">
          {contact.heading}
        </h2>
        <p className="mt-2 text-sm text-muted">{contact.body}</p>
      </div>
      <ul className="space-y-2 border-[3px] border-ink bg-paper p-3 text-sm nb-shadow">
        <li>
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
            Email
          </span>
          <br />
          <a
            className="font-medium text-blue underline"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
        </li>
        <li>
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
            Phone
          </span>
          <br />
          <a
            className="font-medium"
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
          >
            {contact.phone}
          </a>
        </li>
        <li>
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted">
            Location
          </span>
          <br />
          <span className="font-medium">{contact.location}</span>
        </li>
      </ul>
      <form
        onSubmit={onSubmit}
        className="space-y-3 border-[3px] border-ink bg-paper p-4 nb-shadow"
      >
        <input
          name="name"
          required
          placeholder="NAME_"
          className="min-h-11 w-full border-[3px] border-ink bg-cream px-3 text-sm font-bold outline-none focus:bg-mustard"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="EMAIL_"
          className="min-h-11 w-full border-[3px] border-ink bg-cream px-3 text-sm font-bold outline-none focus:bg-mustard"
        />
        <textarea
          name="message"
          required
          rows={4}
          placeholder="MESSAGE_"
          className="w-full border-[3px] border-ink bg-cream px-3 py-2 text-sm font-bold outline-none focus:bg-mustard"
        />
        <button
          type="submit"
          className="nb-btn min-h-11 w-full px-4 text-xs"
          style={{ background: "#0a0a0a", color: "#fff8e7" }}
        >
          Send
        </button>
        {hint && (
          <p className="text-[11px] text-muted">
            Opening mail… or write {contact.email}
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
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black md:text-2xl">
            Wallpaper
          </h2>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-muted">
            Click a preview · or cycle next
          </p>
        </div>
        <button
          type="button"
          onClick={cycleNext}
          disabled={wallpapers.length === 0}
          className="nb-btn px-4 py-2 text-xs disabled:opacity-40"
        >
          Next wallpaper
        </button>
      </div>

      {!ready && (
        <p className="border-[3px] border-ink bg-paper p-4 text-sm font-bold">
          Scanning /wallpapers…
        </p>
      )}

      {ready && wallpapers.length === 0 && (
        <div className="border-[3px] border-ink bg-mustard p-4 text-sm font-bold nb-shadow-sm">
          <p>No wallpapers found.</p>
          <p className="mt-2 text-xs font-medium normal-case tracking-normal">
            Paste images into{" "}
            <code className="border-2 border-ink bg-cream px-1">
              public/wallpapers/
            </code>{" "}
            as <code className="border-2 border-ink bg-cream px-1">1.jpg</code>,{" "}
            <code className="border-2 border-ink bg-cream px-1">2.png</code>, then
            refresh.
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
                className={`overflow-hidden border-[3px] border-ink text-left nb-shadow-sm ${
                  active ? "bg-mustard" : "bg-paper hover:bg-cream"
                }`}
              >
                <div className="relative h-24 w-full border-b-[3px] border-ink">
                  <PixelPhoto
                    src={path}
                    alt={label}
                    pixelSize={3}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="px-2 py-1.5">
                  <p className="truncate text-[10px] font-black uppercase tracking-wide">
                    {label}
                  </p>
                  {active && (
                    <p className="text-[9px] font-bold uppercase text-ink/70">
                      Active
                    </p>
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
