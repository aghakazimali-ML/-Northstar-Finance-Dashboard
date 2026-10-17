'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faq } from '../../lib/site-config';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="lp-faq">
      {faq.map((f, i) => (
        <div key={f.q} className={`lp-faq-item ${open === i ? 'open' : ''}`}>
          <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
            <span>{f.q}</span>
            <span className="lp-faq-plus"><Plus size={18} /></span>
          </button>
          <div className="lp-faq-body" id={`faq-${i}`} role="region"><div><p>{f.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}
