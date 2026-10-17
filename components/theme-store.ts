'use client';
import { useSyncExternalStore } from 'react';

/**
 * Light/dark mode lives on <html data-theme> (set before paint by the script in app/layout.tsx).
 * The hooks read it from the DOM so every component stays in sync, including the dashboard,
 * which toggles data-theme itself.
 */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

export function useDarkMode(): boolean {
  return useSyncExternalStore(subscribe, () => document.documentElement.dataset.theme === 'dark', () => false);
}

export function setDarkMode(dark: boolean) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  try { localStorage.setItem('northstar-theme-v2', dark ? 'dark' : 'light'); } catch {}
}
