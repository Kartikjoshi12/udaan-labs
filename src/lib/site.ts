export const site = {
  name: "Udaan Labs",
  url: "https://udaanlabs.com",
  tagline: "We build digital solutions, not just apps and websites.",
  description:
    "Udaan Labs is an independent software development studio in India building custom web apps, mobile apps, internal tools, MVPs and digital solutions for businesses and startups.",
  hero: {
    eyebrow: "Independent Software Studio · India / Remote",
    h1: "We build digital solutions, not just apps and websites.",
    subtitle:
      "Udaan Labs is an independent software development studio building custom web apps, mobile apps, internal tools and MVPs for businesses and startups — from idea to production.",
    positioning:
      "We turn ideas, workflows, and business problems into working software.",
    sheet: "Custom web apps, mobile apps, and internal tools.",
    primaryCta: { label: "Start a project", href: "#contact" },
    secondaryCta: { label: "See our work", href: "#projects" },
  },
  images: {
    aboutHero: "/projects/about-hero.jpg",
    team: "/projects/team.jpg",
  },
  nav: [
    { label: "What We Build", href: "#services" },
    { label: "Why Udaan", href: "#why-us" },
    { label: "How We Work", href: "#process" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    {
      title: "Web Applications",
      body: "Customer portals, dashboards, SaaS products and business platforms built for performance and scale.",
      image: "/projects/northline.jpg",
      tags: ["Portals & SaaS", "Dashboards", "Fast Web Platforms"],
    },
    {
      title: "Mobile Applications",
      body: "Cross-platform and native mobile experiences engineered for real-world products, users, and workflows.",
      image: "/projects/liftfit.jpg",
      tags: ["iOS & Android", "Offline-first", "Polished UX"],
    },
    {
      title: "Custom Software & Tools",
      body: "Internal systems, operations dashboards, and custom software tools built specifically around your business workflow.",
      image: "/projects/harbor.jpg",
      tags: ["Internal Ops", "Workflow Tools", "Custom Systems"],
    },
    {
      title: "MVPs & Prototypes",
      body: "Turn an idea into a testable, production-ready product quickly to validate with real users before over-investing.",
      image: "/projects/northline.jpg",
      tags: ["Rapid Sprints", "Validation", "Production Architecture"],
    },
    {
      title: "Business Automation",
      body: "Replace repetitive manual workflows with reliable software integrations, background jobs, and data pipelines.",
      image: "/projects/harbor.jpg",
      tags: ["Integrations", "Data Sync", "Automated Pipelines"],
    },
    {
      title: "Product Engineering",
      body: "Take an existing prototype or MVP to a robust, scalable, and maintainable production system ready for growth.",
      image: "/projects/liftfit.jpg",
      tags: ["Refactoring", "Scale & Speed", "Full Handoff"],
    },
  ],
  facts: [
    {
      label: "Custom Software",
      value: "Business tools built around your workflow",
    },
    {
      label: "Web Applications",
      value: "Dashboards, portals, SaaS & platforms",
    },
    {
      label: "Mobile Apps",
      value: "iOS & Android for real-world products",
    },
    {
      label: "MVPs & Prototypes",
      value: "Validate ideas with working software",
    },
  ],
  whyUs: {
    headline: "A website is sometimes the answer. Sometimes it isn't.",
    subhead: "We start with the problem, not the technology.",
    body: "Sometimes you need a website. Sometimes you need a dashboard, mobile app, automation, internal tool, or a completely custom system. We help figure out what actually needs to be built — then build it.",
    philosophy:
      "Talk directly to the people building your product. No unnecessary layers between you and the engineering team. We define the problem, scope the work, build in short iterations, share working builds, and improve based on real feedback. Less presentation. More working software.",
  },
  process: [
    {
      step: "01",
      title: "UNDERSTAND",
      sublabel: "PROBLEM · USERS · GOALS",
      status: "STATUS: DISCOVERY",
      body: "We start with the problem — your users, workflow, goals and constraints. Before writing code, we figure out what actually needs fixing.",
    },
    {
      step: "02",
      title: "SCOPE",
      sublabel: "FEATURES · PRIORITIES · PLAN",
      status: "STATUS: DEFINED",
      body: "We turn the problem into a clear build plan. What goes in, what stays out, what it will take, and what can wait.",
    },
    {
      step: "03",
      title: "BUILD",
      sublabel: "DESIGN · DEVELOP · TEST",
      status: "STATUS: ITERATING",
      body: "We design and build in short iterations, sharing working versions instead of disappearing for weeks.",
    },
    {
      step: "04",
      title: "LAUNCH",
      sublabel: "DEPLOY · LEARN · IMPROVE",
      status: "STATUS: LIVE & HANDOFF",
      body: "We get the product into the hands of real users, fix what matters, and keep improving after launch.",
    },
  ],
  projects: [
    {
      id: "PROJECT_001",
      title: "LiftFit",
      type: "Mobile Application",
      status: "SHIPPED",
      year: "2025",
      stack: "Flutter / Node / PostgreSQL",
      blurb:
        "Workout tracker for people who don’t want a social network bolted onto every set. Plans, logs, simple charts.",
      tags: ["iOS", "Android", "Offline First"],
      image: "/projects/liftfit.jpg",
      metrics: "Sub-100ms log entry · Zero cloud sync lock-in",
      link: "#",
    },
    {
      id: "PROJECT_002",
      title: "Northline",
      type: "Web Application & Commerce",
      status: "ACTIVE",
      year: "2025",
      stack: "Next.js / Tailwind / Custom Backend",
      blurb:
        "High-performance brand catalog and web portal. Instant page loads, bespoke purchasing flow, and clear conversion paths.",
      tags: ["Next.js", "Web App", "Design System"],
      image: "/projects/northline.jpg",
      metrics: "99 Lighthouse Score · 1.4s First Paint",
      link: "#",
    },
    {
      id: "PROJECT_003",
      title: "Harbor Desk",
      type: "Internal Ops & Custom Software",
      status: "SHIPPED",
      year: "2026",
      stack: "React / Node.js / Realtime Redis",
      blurb:
        "Custom operations dashboard for a logistics crew — order tracking, inventory status, and automated dispatch routines on the floor.",
      tags: ["Custom Software", "Ops Tool", "Realtime"],
      image: "/projects/harbor.jpg",
      metrics: "Handles 12k daily parcel dispatches without reload",
      link: "#",
    },
  ],
  contact: {
    heading: "Have a problem worth solving?",
    body: "Tell us what you're trying to build, what isn't working today, and what success looks like. We'll reply with honest feedback and clear next steps.",
    cta: "Tell us about your project",
    email: "hello@udaanlabs.com",
    phone: "",
    location: "India · Remote / Global",
  },
} as const;
