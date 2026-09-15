"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";
import type { AppId } from "./apps";
import { PixelPhoto } from "./PixelPhoto";
import { TicTacToe } from "./TicTacToe";
import { WallpaperWindow } from "./WallpaperWindow";
import { Check, ArrowRight } from "pixelarticons/react";
import { soundFx } from "@/lib/sound";

export function WindowContent({
  id,
  onOpen,
}: {
  id: AppId;
  onOpen?: (id: AppId) => void;
}) {
  switch (id) {
    case "about":
      return <AboutWindow onOpen={onOpen} />;
    case "services":
      return <ServicesWindow onOpen={onOpen} />;
    case "projects":
      return <ProjectsWindow onOpen={onOpen} />;
    case "process":
      return <ProcessWindow onOpen={onOpen} />;
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
      className={`relative overflow-hidden border border-[#3a3228] bg-[#14120f] ${className}`}
    >
      <PixelPhoto
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full opacity-90 hover:opacity-100 transition-opacity"
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
    <div className="border-b border-[#332b23] pb-3 mb-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 font-mono">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-bold text-[#ff9e00]">{code}</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#f4ede2] uppercase">
          {title}
        </h2>
      </div>
      <p className="text-xs text-[#80776d] max-w-sm sm:text-right">
        {subtitle}
      </p>
    </div>
  );
}

function AboutWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6 font-mono">
      {/* Solari Departure Gate Header */}
      <div className="border-b border-[#332b23] pb-3 mb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#f4ede2] uppercase">
            Udaan Aerodrome
          </h2>
          <span className="border border-[#22c55e]/40 bg-[#22c55e]/10 px-2 py-0.5 text-[9px] font-bold text-[#22c55e] flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" />
            ON TIME // AVAILABLE FOR SPRINT
          </span>
        </div>
        <p className="text-xs text-[#80776d] max-w-sm sm:text-right">
          Independent Digital Flight Deck · New Delhi / Bangalore
        </p>
      </div>

      {/* Primary Split-Flap Gate Overview Panel */}
      <div className="border border-[#332b23] bg-[#161310] p-5 sm:p-7 relative overflow-hidden split-flap-module">
        <div className="flex items-center justify-between border-b border-[#29221b] pb-3 mb-5 text-xs text-[#80776d]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#ff9e00]">UL_FIDS</span>
            <span>/</span>
            <span className="text-[11px] uppercase tracking-wider text-[#ece5d8]">
              GATE DEL-01 · TERMINAL INFO
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="border border-[#3a3228] bg-[#110f0d] px-2 py-0.5 text-[10px] text-[#ff9e00]">
              EST. 2025 // ACTIVE
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 items-center">
          {/* Main Flight Manifesto */}
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight text-[#f4ede2] uppercase">
              Software engineered for takeoff. Handed over ready to fly.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#c2b8a8] max-w-xl">
              {site.hero.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <button
                type="button"
                onClick={() => {
                  soundFx.flap();
                  onOpen?.("projects");
                }}
                className="btn-base btn-primary px-4 py-2 text-xs flex items-center gap-2"
              >
                <span>VIEW DEPARTURES</span>
                <ArrowRight width={14} height={14} className="pixel-icon" />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.flap();
                  onOpen?.("contact");
                }}
                className="btn-base btn-secondary px-3.5 py-2 text-xs"
              >
                <span>REQUEST CLEARANCE</span>
              </button>
            </div>
          </div>

          {/* Air Traffic Control Radar Telemetry Card */}
          <div className="lg:col-span-5">
            <div className="card-secondary p-4 relative border border-[#3a3228]">
              <div className="flex items-center justify-between border-b border-[#29221b] pb-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#ece5d8]">
                  <span className="text-[#ff9e00]">✈</span>
                  <span>TOWER_TELEMETRY.LOG</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-[#22c55e] font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" />
                  RADAR LOCKED
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="card-inset p-2.5 border border-[#29221b]">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#80776d] uppercase text-[9px]">RUNWAY CAPACITY</span>
                    <span className="font-bold text-[#22c55e] flex items-center gap-1">
                      <span>● ACCEPTING SPRINTS</span>
                    </span>
                  </div>
                  <p className="text-[12px] text-[#c2b8a8] leading-snug">
                    Booking Q3/Q4 engineering slots for mobile flight decks, Next.js commerce, and rapid MVPs.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="card-inset p-2 border border-[#29221b]">
                    <span className="text-[9px] text-[#80776d] block uppercase">TAKEOFF TIMELINE</span>
                    <span className="text-xs font-bold text-[#f4ede2]">3 – 6 WEEKS</span>
                  </div>
                  <div className="card-inset p-2 border border-[#29221b]">
                    <span className="text-[9px] text-[#80776d] block uppercase">BASE COORDINATES</span>
                    <span className="text-xs font-bold text-[#f4ede2]">DEL / BLR (GMT+5:30)</span>
                  </div>
                </div>

                <div className="border border-[#3a3228] bg-[#161310] p-2 text-[11px] text-[#c2b8a8] flex items-center gap-2">
                  <span className="text-[#ff9e00] font-bold">⚡</span>
                  <span>Direct lead engineer comms · Weekly Thursday staging test builds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Specific Human Story & Bench Photo */}
      <div className="grid gap-5 md:grid-cols-12 items-stretch">
        <div className="md:col-span-7 flex flex-col justify-between card-secondary p-5 border border-[#332b23]">
          <div>
            <div className="grid grid-cols-2 gap-3">
              {site.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="card-inset p-3 border border-[#29221b]"
                >
                  <p className="text-[9px] uppercase tracking-wider text-[#80776d]">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#f4ede2]">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 border-t border-[#29221b] pt-4">
            <p className="text-xs sm:text-sm leading-relaxed text-[#c2b8a8]">
              {site.whyUs}
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col justify-between card-secondary p-3 border border-[#332b23]">
          <FrameImage
            src={site.images.aboutHero}
            alt="Studio workbench with development hardware"
            className="w-full h-48 md:h-full min-h-[160px]"
          />
          <div className="mt-2.5 flex items-center justify-between text-[10px] text-[#80776d] px-1">
            <span>OPERATIONS DESK</span>
            <span>WORKING BENCH</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6 font-mono">
      <WindowHeader
        code="[02_FLEET]"
        title="Fleet Capabilities"
        subtitle="Focused aircraft engineering across three production categories."
      />

      <div className="grid gap-5">
        {site.services.map((service, index) => (
          <div
            key={service.title}
            className="card-secondary p-5 relative hover:border-[#ff9e00]/50 transition-colors border border-[#332b23]"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#29221b] pb-2.5 mb-3">
              <div className="flex items-baseline gap-2.5">
                <span className="text-xs font-bold text-[#ff9e00]">
                  {service.code}
                </span>
                <span className="text-lg font-bold text-[#f4ede2]">
                  {service.title}
                </span>
              </div>
              <span className="text-[10px] text-[#80776d] tracking-wider uppercase">
                {service.role}
              </span>
            </div>

            <div className="grid sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-8">
                <p className="text-sm leading-relaxed text-[#c2b8a8]">
                  {service.body}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px]">
                  {service.specs.map((spec) => (
                    <span
                      key={spec}
                      className="border border-[#3a3228] bg-[#110f0d] px-2 py-0.5 text-[#ff9e00]"
                    >
                      {spec}
                    </span>
                  ))}
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

function ProjectsWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6 font-mono">
      <WindowHeader
        code="[03_DEPARTURES]"
        title="Flight Departures (Shipped Work)"
        subtitle="Live production software that successfully completed flight clearance and took off."
      />

      {/* Solari Departure Board Table Header */}
      <div className="border border-[#332b23] bg-[#161310] p-3 text-xs text-[#80776d] hidden md:grid grid-cols-12 gap-2 uppercase tracking-wider font-bold">
        <div className="col-span-2">Flight ID</div>
        <div className="col-span-3">Aircraft / Stack</div>
        <div className="col-span-3">Destination</div>
        <div className="col-span-2">Gate</div>
        <div className="col-span-2 text-right">Flight Status</div>
      </div>

      <div className="space-y-6">
        {site.projects.map((project) => (
          <article
            key={project.title}
            className="border border-[#332b23] bg-[#14120f] p-5 sm:p-6 transition-all hover:border-[#ff9e00]/60 split-flap-module"
          >
            {/* Flight Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#29221b] pb-3 mb-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 border border-[#ff9e00] bg-[#110f0d] text-[#ff9e00] px-2 py-0.5 font-bold tracking-wider text-[11px]">
                  ✈ {project.id}
                </span>
                <span className="text-[#80776d]">/</span>
                <span className="font-bold text-[#f4ede2] uppercase tracking-wide">
                  {project.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="border border-[#3a3228] bg-[#110f0d] px-2 py-0.5 text-[10px] text-[#80776d]">
                  {project.gate}
                </span>
                <span className="border border-[#22c55e]/40 bg-[#22c55e]/10 px-2 py-0.5 text-[10px] font-bold text-[#22c55e] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] beacon-hum" />
                  {project.flightStatus}
                </span>
              </div>
            </div>

            {/* Layout */}
            <div className="grid gap-6 items-stretch md:grid-cols-12">
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="inline-block border border-[#3a3228] bg-[#161310] px-2 py-0.5 text-xs font-semibold text-[#ff9e00]">
                    {project.stack}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-[#c2b8a8]">
                    {project.blurb}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="card-inset p-2.5 text-xs text-[#f4ede2] flex items-center gap-2.5 border border-[#29221b]">
                    <span className="h-2 w-2 bg-[#22c55e] rounded-full shrink-0" />
                    <span className="font-medium text-[11px]">{project.metrics}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[#29221b] bg-[#110f0d] px-2 py-0.5 text-[10px] text-[#80776d]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col justify-between">
                <div className="border border-[#3a3228] bg-[#161310] p-1.5">
                  <FrameImage
                    src={project.image}
                    alt={`${project.title} flight artifact visual`}
                    className="h-52 md:h-full min-h-[190px] w-full"
                  />
                </div>
              </div>
            </div>

            {/* Footer action bar */}
            <div className="mt-5 pt-3 border-t border-[#29221b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-[#80776d] text-[10px] flex items-center gap-1.5">
                <Check width={12} height={12} className="pixel-icon text-[#22c55e]" />
                Delivered to client infrastructure & live in production
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFx.flap();
                  onOpen?.("contact");
                }}
                className="btn-base btn-secondary px-3.5 py-1.5 text-xs flex items-center gap-1.5"
              >
                <span>REQUEST SIMILAR TAKEOFF</span>
                <ArrowRight width={12} height={12} className="pixel-icon" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProcessWindow({ onOpen }: { onOpen?: (id: AppId) => void }) {
  return (
    <div className="space-y-6 font-mono">
      <WindowHeader
        code="[04_FLIGHT_PLAN]"
        title="Flight Plan (How We Work)"
        subtitle="Clear waypoints. You always know what is being built, tested, and cleared for release."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {site.process.map((step) => (
          <div
            key={step.step}
            className="card-secondary p-5 flex flex-col justify-between hover:border-[#ff9e00]/50 transition-colors border border-[#332b23]"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#29221b] pb-2 mb-3">
                <span className="text-xs font-bold text-[#ff9e00]">
                  WAYPOINT {step.step} // {step.flightCode}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#f4ede2]">
                {step.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#c2b8a8]">
                {step.body}
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-[#29221b] flex items-center gap-1.5 text-[10px] text-[#80776d]">
              <Check width={12} height={12} className="pixel-icon text-[#22c55e]" />
              <span>Transparent weekly sign-off</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-inset p-4 text-xs text-[#c2b8a8] flex items-center justify-between border border-[#29221b]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22c55e] shrink-0 beacon-hum" />
          <span>Average mission duration: 3 to 6 weeks from kick-off to live production clearance.</span>
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
    soundFx.flap();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(
      `[Flight Clearance Inquiry] From ${name || "Sender"}`,
    );
    const body = encodeURIComponent(
      `Callsign / Team: ${name}\nEmail: ${email}\n\nMission Brief:\n${message}`,
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setHint(true);
  }

  return (
    <div className="space-y-6 font-mono">
      <WindowHeader
        code="[05_TOWER]"
        title="Control Tower (Inquiries)"
        subtitle="Direct channel with lead engineers. No sales account layers."
      />

      <div className="grid gap-6 md:grid-cols-12 items-start">
        <div className="md:col-span-5 space-y-4">
          <div className="card-secondary p-5 border border-[#332b23]">
            <h3 className="text-xl font-bold text-[#f4ede2]">
              {contact.heading}
            </h3>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#c2b8a8]">
              {contact.body}
            </p>
          </div>

          <div className="card-inset p-4 space-y-3 text-xs border border-[#29221b]">
            <div>
              <span className="text-[10px] text-[#80776d] block uppercase">TOWER FREQUENCY / INBOX</span>
              <a
                className="font-bold text-[#ff9e00] hover:underline"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </div>
            <div className="border-t border-[#29221b] pt-2">
              <span className="text-[10px] text-[#80776d] block uppercase">BASE LOCATION</span>
              <span className="text-[#ece5d8]">{contact.location}</span>
            </div>
            <div className="border-t border-[#29221b] pt-2">
              <span className="text-[10px] text-[#80776d] block uppercase">RESPONSE TIME</span>
              <span className="text-[#22c55e] font-semibold">Within 24 hours directly from a lead engineer</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          <form
            onSubmit={onSubmit}
            className="border border-[#332b23] bg-[#161310] p-5 space-y-4"
          >
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#80776d] font-bold">
                Callsign / Your Name / Team
              </label>
              <input
                name="name"
                required
                placeholder="e.g. Alex Morgan (Northline Logistics)"
                className="min-h-10 w-full border border-[#3a3228] bg-[#110f0d] px-3 font-mono text-xs text-[#ece5d8] outline-none focus:border-[#ff9e00] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#80776d] font-bold">
                Return Frequency (Email Address)
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="alex@company.com"
                className="min-h-10 w-full border border-[#3a3228] bg-[#110f0d] px-3 font-mono text-xs text-[#ece5d8] outline-none focus:border-[#ff9e00] transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-[#80776d] font-bold">
                Mission Brief (What are you trying to build?)
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Briefly describe the mobile app, web platform, or MVP you need, plus any ideal takeoff timeframe."
                className="w-full border border-[#3a3228] bg-[#110f0d] px-3 py-2 font-mono text-xs text-[#ece5d8] outline-none focus:border-[#ff9e00] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="btn-base btn-primary min-h-11 w-full text-xs font-bold tracking-wider flex items-center justify-center gap-2"
            >
              <span>TRANSMIT CLEARANCE REQUEST</span>
              <ArrowRight width={14} height={14} className="pixel-icon" />
            </button>

            {hint && (
              <p className="text-[11px] text-[#80776d] text-center">
                If your client didn’t launch, transmit directly to {contact.email}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
