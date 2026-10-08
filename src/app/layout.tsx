import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import { MotionRoot } from "@/components/MotionRoot";
import "./globals.css";

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Udaan Labs | Custom Software Development Studio in India",
    template: "%s | Udaan Labs",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Udaan Labs | Custom Software Development Studio in India",
    description: site.description,
    images: [{ url: site.images.aboutHero, alt: "Udaan Labs studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Udaan Labs | Custom Software Development Studio in India",
    description: site.description,
    images: [site.images.aboutHero],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmMono.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="h-full overflow-hidden font-mono antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              email: site.contact.email,
              description: site.description,
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
