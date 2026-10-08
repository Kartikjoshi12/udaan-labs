import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function PageShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main className="h-full overflow-y-auto bg-[#f7f4ed] text-ink">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider">
          <Link href="/" className="underline">
            {site.name}
          </Link>
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-xl font-mono text-sm leading-relaxed text-muted">{lede}</p>
        <div className="mt-8 space-y-4">{children}</div>
        <nav className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t-2 border-ink pt-4 font-mono text-xs font-bold">
          <Link href="/saas" className="underline">SaaS</Link>
          <Link href="/web-apps" className="underline">Web apps</Link>
          <Link href="/mobile-apps" className="underline">Mobile apps</Link>
          <Link href="/custom-software" className="underline">Custom software</Link>
          <Link href="/projects" className="underline">Projects</Link>
          <Link href="/contact" className="underline">Contact</Link>
        </nav>
      </div>
    </main>
  );
}
