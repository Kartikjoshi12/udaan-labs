export const site = {
  name: "Udaan Labs",
  tagline: "Apps and websites for people who just want the thing built.",
  description:
    "Udaan Labs is a small studio that designs and builds mobile apps and websites. Straight talk, clear scope, and we ship.",
  images: {
    aboutHero: "/projects/about-hero.jpg",
    team: "/projects/team.jpg",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Why us", href: "#why-us" },
    { label: "How we work", href: "#process" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "India · remote-friendly",
    title: "We build the app. We build the site. Then we hand it over.",
    subtitle:
      "Small team. No pitch decks for fun. Tell us what you need — we scope it, design it, and get it live.",
    primaryCta: { label: "See work", href: "#projects" },
    secondaryCta: { label: "Say hi", href: "#contact" },
  },
  services: [
    {
      title: "Mobile apps",
      body: "iOS and Android — from first screens to store upload. We care about how it feels in the hand, not just how the Figma looks.",
      image: "/projects/liftfit.jpg",
    },
    {
      title: "Websites",
      body: "Marketing sites and light web apps that load fast and say what your product actually is.",
      image: "/projects/northline.jpg",
    },
    {
      title: "First versions",
      body: "A tight MVP so you can show users something real without burning six months on features nobody asked for.",
      image: "/projects/harbor.jpg",
    },
  ],
  facts: [
    { label: "What we do", value: "Apps + web" },
    { label: "How we work", value: "Small team" },
    { label: "Where", value: "India · remote" },
    { label: "Goal", value: "Ship, then iterate" },
  ],
  whyUs:
    "You talk to the people building it. We keep scope honest, push back when something is a waste of money, and prefer a live link over another slide.",
  process: [
    {
      step: "1",
      title: "Talk",
      body: "What are you building, for whom, and what’s the smallest useful version?",
    },
    {
      step: "2",
      title: "Sketch",
      body: "Rough screens and a clear list of what’s in / out. No surprise scope later.",
    },
    {
      step: "3",
      title: "Build",
      body: "We send working builds as we go. You click around. We fix what’s weird.",
    },
    {
      step: "4",
      title: "Ship",
      body: "Stores, hosting, handoff docs — then you’re running it, not stuck waiting on us.",
    },
  ],
  projects: [
    {
      title: "LiftFit",
      type: "Mobile",
      blurb:
        "Workout tracker for people who don’t want a social network bolted onto every set. Plans, logs, simple charts.",
      tags: ["iOS", "Android"],
      image: "/projects/liftfit.jpg",
    },
    {
      title: "Northline",
      type: "Website",
      blurb:
        "Brand site + catalog for a D2C shop. Fast pages, clear product stories, less fluff.",
      tags: ["Next.js", "Commerce"],
      image: "/projects/northline.jpg",
    },
    {
      title: "Harbor Desk",
      type: "Web app",
      blurb:
        "Ops dashboard for a logistics crew — orders, status, daily numbers. Built for people on a warehouse floor, not a demo stage.",
      tags: ["Dashboard", "Ops"],
      image: "/projects/harbor.jpg",
    },
  ],
  contact: {
    heading: "Got something to build?",
    body: "Send a short note — what it is, rough timeline, and any links. We’ll reply with whether we’re a fit and what next looks like.",
    email: "hello@udaanlabs.com",
    phone: "",
    location: "India · happy to work remote",
  },
} as const;
