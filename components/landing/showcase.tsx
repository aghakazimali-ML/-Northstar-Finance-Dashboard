'use client';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { showcase } from '../../lib/site-config';

export default function Showcase() {
  const [i, setI] = useState(0);
  const s = showcase[i];
  return (
    <div className="lp-showcase">
      <div className="lp-showcase-copy">
        <div className="lp-tabs" role="tablist" aria-label="Product views">
          {showcase.map((t, n) => (
            <button key={t.id} role="tab" type="button" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>{t.tab}</button>
          ))}
        </div>
        <div key={s.id} className="lp-showcase-text">
          <h3>{s.title}</h3>
          <ul>{s.points.map((p) => (<li key={p}><span><Check size={14} strokeWidth={3} /></span>{p}</li>))}</ul>
          <a href="/dashboard?demo=1" className="lp-btn lp-btn-primary">Explore this view</a>
        </div>
      </div>
      <div className="lp-frame">
        <div className="lp-frame-bar"><i /><i /><i /><span>sample data</span></div>
        <div className="lp-frame-body">
          {showcase.map((t, n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={t.id} src={t.image} alt={`${t.tab} view of the ${t.title}`} width={1440} height={900} loading="lazy" className={n === i ? 'on' : ''} />
          ))}
        </div>
      </div>
    </div>
  );
}
