'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import BrandMark from '../brand-mark';
import { setDarkMode, useDarkMode } from '../theme-store';
import { nav, site } from '../../lib/site-config';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dark = useDarkMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`lp-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="lp-wrap lp-nav-inner">
        <Link href="/" className="lp-logo" aria-label={`${site.name} home`}>
          <span className="lp-logo-mark"><BrandMark size={18} /></span>
          <span>{site.name}</span>
        </Link>
        <nav className="lp-links" aria-label="Primary">
          {nav.map((l) => (<a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>))}
        </nav>
        <div className="lp-nav-actions">
          <button type="button" className="lp-icon-btn" onClick={() => setDarkMode(!dark)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a href={site.dashboardHref} className="lp-btn lp-btn-primary lp-nav-cta">Open dashboard <ArrowRight size={16} /></a>
          <button type="button" className="lp-icon-btn lp-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="lp-drawer">
        {nav.map((l) => (<a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>))}
        <a href={site.dashboardHref} className="lp-btn lp-btn-primary">Open dashboard <ArrowRight size={16} /></a>
      </div>
    </header>
  );
}
