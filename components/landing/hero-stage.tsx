'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Wraps the hero mock-up. Gives it depth: the product tilts flat as you scroll and
 * floating chips drift subtly with the pointer. All motion is disabled for reduced-motion users.
 */
export default function HeroStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => el.style.setProperty('--s', String(Math.min(1, window.scrollY / 520))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--px', String(((e.clientX - r.left) / r.width - 0.5) * 2));
    e.currentTarget.style.setProperty('--py', String(((e.clientY - r.top) / r.height - 0.5) * 2));
  }
  function leave(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.style.setProperty('--px', '0');
    e.currentTarget.style.setProperty('--py', '0');
  }

  return (
    <div ref={ref} className="lp-stage" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}
