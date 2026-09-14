"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import type { AppId } from "./apps";
import { PixelPhoto } from "./PixelPhoto";
import { TicTacToe } from "./TicTacToe";
import { Check, ArrowRight } from "pixelarticons/react";

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
      className={`relative overflow-hidden border-2 border-ink bg-paper-2 ${className}`}
    >
      <PixelPhoto
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function WindowHeader({
  code,
  title,
  subtitle,
}: {
  code: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="border-b-2 border-ink pb-3 mb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs font-bold text-orange">{code}</span>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold tracking-tight text-ink">
          {title}
        </h2>
      </div>
      <p className="font-mono text-xs text-muted max-w-sm sm:text-right">
        {subtitle}
      </p>
    </div>
  );
}

function AboutWindow() {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[01]"
        title="Udaan Labs"
        subtitle="Independent digital product studio based in India · Working with clients worldwide."
      />

      {/* Hero Statement Block */}
      <div className="border-2 border-ink bg-paper p-6 nb-shadow">
        <p className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-ink">
          We build the app. We build the site. Then we hand it over.
        </p>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">
          Small team. No pitch decks for fun. Tell us what you need — we scope it, design it, and get it live.
        </p>
      </div>

      {/* Asymmetric Studio Info & Photo */}
      <div className="grid gap-5 md:grid-cols-12 items-stretch">
        <div className="md:col-span-7 flex flex-col justify-between border-2 border-ink bg-cream p-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-faint mb-3">
              AT A GLANCE
            </p>
            <div className="grid grid-cols-2 gap-3">
              {site.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="border border-ink bg-paper p-3 shadow-[1px_1px_0_0_#111111]"
                >
                  <p className="font-mono text-[9px] uppercase tracking-wider text-faint">
                    {fact.label}
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-ink">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-ink/20 pt-4">
            <p className="text-xs sm:text-sm leading-relaxed text-muted">
              {site.whyUs}
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between border-2 border-ink bg-paper p-3">
          <FrameImage
            src={site.images.aboutHero}
            alt="Studio workbench with development hardware"
            className="w-full h-48 md:h-full min-h-[160px]"
          />
          <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-faint px-1">
            <span>STUDIO BENCH</span>
            <span>WORKING BUILD</span>
          </div>
        </div>
      </div>

      {/* Studio Philosophy Banner */}
      <div className="border-2 border-ink bg-yellow p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-ink">
          {site.tagline}
        </p>
        <span className="font-mono text-[10px] text-ink/80 shrink-0 uppercase tracking-wider">
          FAST ITERATIONS · HONEST SCOPE
        </span>
      </div>
    </div>
  );
}

function ServicesWindow() {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[02]"
        title="What We Build"
        subtitle="Focused execution across three clear production tracks."
      />

      <div className="grid gap-5">
        {site.services.map((service, index) => (
          <div
            key={service.title}
            className="border-2 border-ink bg-cream p-5 nb-shadow relative"
          >
            {/* Spec Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/20 pb-2.5 mb-3">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xs font-bold text-orange">
                  0{index + 1}
                </span>
                <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink">
                  {service.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-faint uppercase tracking-wider">
                DEPLOYMENT TRACK
              </span>
            </div>

            <div className="grid sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-8">
                <p className="text-sm leading-relaxed text-muted">
                  {service.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px]">
                  <span className="border border-ink/30 bg-paper px-2 py-0.5 text-ink">
                    Weekly builds
                  </span>
                  <span className="border border-ink/30 bg-paper px-2 py-0.5 text-ink">
                    Direct engineer access
                  </span>
                  <span className="border border-ink/30 bg-paper px-2 py-0.5 text-ink">
                    Complete code ownership
                  </span>
                </div>
              </div>

              <div className="sm:col-span-4">
                <FrameImage
                  src={service.image}
                  alt={service.title}
                  className="h-32 sm:h-28 w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsWindow() {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[03]"
        title="Selected Work"
        subtitle="Real production software engineered for high utility, reliability, and speed."
      />

      <div className="space-y-6">
        {site.projects.map((project, idx) => (
          <article
            key={project.title}
            className="border-2 border-ink bg-paper p-5 nb-shadow transition-transform hover:-translate-y-0.5"
          >
            {/* Technical Spec Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/20 pb-2.5 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-orange tracking-wider">
                  {project.id}
                </span>
                <span className="text-faint">/</span>
                <span className="font-semibold text-ink">{project.type}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="border border-ink/40 bg-cream px-2 py-0.5 font-mono text-[10px]">
                  {project.year}
                </span>
                <span className="border border-ink bg-yellow px-2 py-0.5 font-mono text-[10px] font-bold text-ink">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Asymmetric Artifact Layout */}
            <div className="grid gap-5 items-stretch md:grid-cols-12">
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold tracking-tight text-ink">
                    {project.title}
                  </h3>
                  
                  <p className="mt-1 font-mono text-xs text-muted">
                    Stack: {project.stack}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {project.blurb}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="border border-ink/30 bg-cream p-2.5 font-mono text-[11px] text-ink flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-green rounded-full shrink-0" />
                    <span>{project.metrics}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/40 bg-cream px-2 py-0.5 font-mono text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <FrameImage
                  src={project.image}
                  alt={`${project.title} interface visual`}
                  className="h-48 md:h-full min-h-[170px] w-full"
                />
              </div>
            </div>

            {/* Footer action bar */}
            <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between font-mono text-xs">
              <span className="text-faint text-[10px]">
                PRODUCTION HANDOFF COMPLETE
              </span>
              <a
                href="#contact"
                className="nb-btn inline-flex items-center gap-1.5 px-3 py-1.5 text-xs hover:bg-cream"
              >
                <span>BUILD SOMETHING SIMILAR</span>
                <ArrowRight width={12} height={12} className="pixel-icon" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProcessWindow() {
  return (
    <div className="space-y-6">
      <WindowHeader
        code="[04]"
        title="How We Work"
        subtitle="Short feedback loops. You always know what is being built and shipped this week."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {site.process.map((step) => (
          <div
            key={step.step}
            className="border-2 border-ink bg-paper p-5 nb-shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-ink/20 pb-2 mb-3">
                <span className="font-mono text-xs font-bold text-orange">
                  Step 0{step.step}
                </span>
                <span className="font-mono text-[10px] text-faint uppercase">
                  ACTIVE STAGE
                </span>
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-ink/10 flex items-center gap-1.5 font-mono text-[10px] text-faint">
              <Check width={12} height={12} className="pixel-icon text-green" />
              <span>Transparent weekly sign-off</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-2 border-ink bg-cream p-4 text-xs text-muted flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green shrink-0" />
          <span>Average project handoff timeline: 2 to 6 weeks from kick-off to production.</span>
        </div>
      </div>
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
      `[Project Inquiry] From ${name || "Website Visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject Scope:\n${message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setHint(true);
  }

  return (
    <div className="space-y-6">
      <WindowHeader
        code="[05]"
        title="Start a Project"
        subtitle="Talk directly with the people building it. No intermediary sales reps."
      />

      <div className="grid gap-6 md:grid-cols-12 items-start">
        <div className="md:col-span-5 space-y-4">
          <div className="border-2 border-ink bg-paper p-5 nb-shadow-sm">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-ink">
              {contact.heading}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted">
              {contact.body}
            </p>
          </div>

          <div className="border-2 border-ink bg-cream p-4 space-y-3 font-mono text-xs">
            <div>
              <span className="text-[10px] text-faint block uppercase">DIRECT INBOX</span>
              <a
                className="font-bold text-ink hover:text-orange underline"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </div>
            <div className="border-t border-ink/20 pt-2">
              <span className="text-[10px] text-faint block uppercase">LOCATION</span>
              <span className="text-ink">{contact.location}</span>
            </div>
            <div className="border-t border-ink/20 pt-2">
              <span className="text-[10px] text-faint block uppercase">TYPICAL RESPONSE</span>
              <span className="text-green font-semibold">Same or next business day</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={onSubmit}
            className="border-2 border-ink bg-paper p-5 nb-shadow space-y-4"
          >
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                Your Name / Team
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Alex Morgan"
                className="min-h-10 w-full border-2 border-ink bg-cream px-3 font-mono text-xs outline-none focus:bg-cream focus:border-orange transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="alex@company.com"
                className="min-h-10 w-full border-2 border-ink bg-cream px-3 font-mono text-xs outline-none focus:bg-cream focus:border-orange transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider text-muted font-bold">
                What are you trying to build?
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Briefly describe the mobile app, web app, or site you need, plus any ideal timeline."
                className="w-full border-2 border-ink bg-cream px-3 py-2 font-mono text-xs outline-none focus:bg-cream focus:border-orange transition-colors"
              />
            </div>

            <button
              type="submit"
              className="nb-btn nb-btn-primary min-h-11 w-full text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <span>SEND MESSAGE</span>
              <ArrowRight width={14} height={14} className="pixel-icon" />
            </button>

            {hint && (
              <p className="font-mono text-[11px] text-muted text-center">
                If your client didn’t launch, write directly to {contact.email}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
