import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/figtree/wght.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import './globals.css';
import './theme.css';
import './landing.css';
import { site } from '../lib/site-config';

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: { title: `${site.name} — ${site.tagline}`, description: site.description, type: 'website', siteName: site.name },
  twitter: { card: 'summary_large_image', title: `${site.name} — ${site.tagline}`, description: site.description },
};

export const viewport: Viewport = { themeColor: '#04241b', width: 'device-width', initialScale: 1 };

// Runs before first paint so the saved light/dark mode and colour preset never flash.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');try{d.dataset.theme=localStorage.getItem('northstar-theme-v2')==='dark'?'dark':'light';}catch(e){d.dataset.theme='light';}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
