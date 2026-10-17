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
    let last = -1;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const v = Math.min(1, window.scrollY / 520);
        if (v === last) return; // past the hero: nothing to restyle
        last = v;
        el.style.setProperty('--s', String(v));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const pending = useRef(0);
  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== 'mouse' || pending.current) return;
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    pending.current = requestAnimationFrame(() => {
      pending.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--px', String(((clientX - r.left) / r.width - 0.5) * 2));
      el.style.setProperty('--py', String(((clientY - r.top) / r.height - 0.5) * 2));
    });
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
