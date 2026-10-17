'use client';
import { useState } from 'react';
import { Check, Crown } from 'lucide-react';
import CountUp from '../count-up';
import Reveal from './reveal';
import { pricing, site } from '../../lib/site-config';

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <>
      <Reveal className="lp-toggle-wrap">
        <div className="lp-toggle" role="group" aria-label="Billing period">
          <span className="lp-toggle-pill" style={{ transform: yearly ? 'translateX(100%)' : 'none' }} />
          <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
          <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly <em>−20%</em></button>
        </div>
      </Reveal>
      <div className="lp-pricing-grid">
        {pricing.plans.map((p, i) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <Reveal key={p.name} delay={i * 110} className={`lp-plan-wrap ${'popular' in p && p.popular ? 'is-popular' : ''}`}>
              <article className={`lp-plan ${'popular' in p && p.popular ? 'is-popular' : ''}`}>
                {'popular' in p && p.popular && <span className="lp-ribbon">Most popular</span>}
                <div className="lp-plan-icon"><Crown size={18} /></div>
                <h3>{p.name}</h3>
                <p className="lp-plan-blurb">{p.blurb}</p>
                <div className="lp-price">
                  <span className="lp-price-num">$<CountUp value={price} immediate duration={650} /></span>
                  <span className="lp-price-per">{price === 0 ? 'free forever' : '/ user / month'}</span>
                </div>
                <a href={p.href} className={`lp-btn ${'popular' in p && p.popular ? 'lp-btn-primary' : 'lp-btn-outline'} lp-btn-block`}>{p.cta}</a>
                <ul>
                  {p.features.map((f) => (<li key={f}><Check size={16} strokeWidth={2.5} />{f}</li>))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
      {site.showSampleNotice && <p className="lp-sample-note">{pricing.note}</p>}
    </>
  );
}
