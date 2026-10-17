'use client';
import type { PointerEvent, ReactNode } from 'react';

/** Card with a soft light that follows the pointer. Pure CSS does the painting (see .spot in landing.css). */
export default function Spotlight({ children, className = '' }: { children: ReactNode; className?: string }) {
  function move(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
  return <div className={`spot ${className}`} onPointerMove={move}>{children}</div>;
}
