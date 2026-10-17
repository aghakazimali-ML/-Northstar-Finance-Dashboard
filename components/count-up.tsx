'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `value` when it first scrolls into view (or on mount
 * if `immediate`). `format` turns the in-flight number into the displayed string, so
 * the same component serves currency KPIs and plain counters. Respects reduced motion.
 */
export default function CountUp({
  value,
  format = (n: number) => Math.round(n).toLocaleString('en-US'),
  duration = 1300,
  immediate = false,
}: {
  value: number | null;
  format?: (n: number) => string;
  duration?: number;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(value);
  const started = useRef(false);

  /* eslint-disable react-hooks/set-state-in-effect -- animation state is deliberately driven from this effect */
  useEffect(() => {
    if (value === null || !Number.isFinite(value)) { setShown(value); return; }
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setShown(value); return; }
    started.current = false;
    // Resetting to 0 right before the animation starts is intentional (drives the count-up).
    setShown(0);
    const el = ref.current;
    let raf = 0;
    const run = () => {
      if (started.current) return;
      started.current = true;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 4);
        setShown(value * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setShown(value);
      };
      raf = requestAnimationFrame(tick);
    };
    if (immediate || !el || typeof IntersectionObserver === 'undefined') { run(); return () => cancelAnimationFrame(raf); }
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration, immediate]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return <span ref={ref}>{shown === null ? format(NaN) : format(shown)}</span>;
}
