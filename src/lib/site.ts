export const site = {
  name: "Udaan Labs",
  tagline: "We build mobile apps and websites that actually ship.",
  description:
    "Udaan Labs is a product studio for startups and growing businesses. We design and build mobile apps and websites — from first idea to launch.",
  images: {
    aboutHero: "/projects/about-hero.jpg",
    team: "/projects/team.jpg",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Why us", href: "#why-us" },
    { label: "Process", href: "#process" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    eyebrow: "Product studio",
    title: "Apps and websites, built to launch.",
    subtitle:
      "Udaan Labs helps you go from idea to a live product — clear scope, clean design, and shipping as the goal.",
    primaryCta: { label: "View work", href: "#projects" },
    secondaryCta: { label: "Contact us", href: "#contact" },
  },
  services: [
    {
      title: "Mobile apps",
      body: "iOS and Android products with solid UX, reliable backends, and store-ready delivery.",
      image: "/projects/liftfit.jpg",
    },
    {
      title: "Websites",
      body: "Marketing sites and web apps that load fast, look sharp, and convert visitors.",
      image: "/projects/northline.jpg",
    },
    {
      title: "MVP builds",
      body: "Scoped first versions so you can validate the idea without overbuilding.",
      image: "/projects/harbor.jpg",
    },
  ],
  // Placeholder stats — replace with real numbers when ready
  stats: [
    { value: "20+", label: "Projects shipped" },
    { value: "10+", label: "Happy clients" },
    { value: "3+", label: "Years building" },
    { value: "2", label: "Platforms: web & mobile" },
  ],
  whyUs:
    "We keep the process light and the communication clear. You get a small team that cares about shipping, not endless decks.",
  process: [
    {
      step: "01",
      title: "Discovery",
      body: "We learn your goals, users, and constraints, then agree on a focused scope.",
    },
    {
      step: "02",
      title: "Design",
      body: "Wireframes and UI that match your brand and make the product easy to use.",
    },
    {
      step: "03",
      title: "Build",
      body: "Clean, maintainable code for apps and websites — reviewed as we go.",
    },
    {
      step: "04",
      title: "Launch",
      body: "QA, deployment, store or hosting setup, and a handoff you can run with.",
    },
  ],
  projects: [
    {
      title: "LiftFit",
      type: "Mobile app",
      blurb:
        "Workout tracking app with simple plans and progress charts for busy professionals.",
      tags: ["iOS", "Android", "Fitness"],
      image: "/projects/liftfit.jpg",
    },
    {
      title: "Northline Commerce",
      type: "Website",
      blurb:
        "Brand site and catalog for a D2C retailer — fast pages and clear product stories.",
      tags: ["Next.js", "E‑commerce", "SEO"],
      image: "/projects/northline.jpg",
    },
    {
      title: "Harbor Desk",
      type: "Web app",
      blurb:
        "Internal ops dashboard for a logistics team: orders, status, and daily metrics.",
      tags: ["Dashboard", "SaaS", "Ops"],
      image: "/projects/harbor.jpg",
    },
  ],
  contact: {
    heading: "Tell us what you want to build",
    body: "Share a short note about your app or website. We’ll reply with next steps.",
    email: "hello@udaanlabs.com",
    phone: "+91 90000 00000",
    location: "Remote · worldwide",
  },
} as const;
