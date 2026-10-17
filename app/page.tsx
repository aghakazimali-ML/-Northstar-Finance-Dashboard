import Link from 'next/link';
import { ArrowRight, Check, FileText, Play, Sparkles, TrendingUp } from 'lucide-react';
import SiteNav from '../components/landing/site-nav';
import Reveal from '../components/landing/reveal';
import Spotlight from '../components/landing/spotlight';
import HeroStage from '../components/landing/hero-stage';
import FeatureIcon from '../components/landing/icons';
import Showcase from '../components/landing/showcase';
import Pricing from '../components/landing/pricing';
import Faq from '../components/landing/faq';
import CountUp from '../components/count-up';
import BrandMark from '../components/brand-mark';
import { capabilityChips, cta, features, footer, hero, site, stats, steps, testimonials } from '../lib/site-config';

function Heading({ eyebrow, before, accent, after, text }: { eyebrow: string; before: string; accent: string; after?: string; text?: string }) {
  return (
    <Reveal className="lp-heading">
      <span className="lp-eyebrow"><i />{eyebrow}</span>
      <h2>{before} <em>{accent}</em>{after ? ` ${after}` : ''}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

/** A small, animated product preview built from HTML/SVG so it stays sharp at any size and follows the colour theme. */
function HeroMock() {
  return (
    <div className="lp-mock" aria-hidden="true">
      <div className="lp-mock-bar"><i /><i /><i /><span>{site.name.toLowerCase()}.app / overview · sample data</span></div>
      <div className="lp-mock-body">
        <aside>
          <b><BrandMark size={12} /></b>
          {['Overview', 'Variance', 'Departments', 'Forecast', 'Actions'].map((t, i) => (<span key={t} className={i === 0 ? 'on' : ''}>{t}</span>))}
        </aside>
        <div className="lp-mock-main">
          <div className="lp-mock-kpis">
            <div className="k0"><small>Revenue</small><strong>$2,328,584</strong><em>▲ 0.7% vs budget</em></div>
            <div><small>Gross profit</small><strong>$1,523,487</strong><em>▲ 0.6% vs budget</em></div>
            <div><small>Operating expenses</small><strong>$1,023,665</strong><em>▲ 0.9% vs budget</em></div>
            <div className="k3"><small>EBITDA</small><strong>$499,822</strong><em>▲ 3.8% vs budget</em></div>
          </div>
          <div className="lp-mock-grid">
            <div className="lp-mock-chart">
              <header><b>Revenue performance</b><span><i />Actual<i className="b" />Budget</span></header>
              <svg viewBox="0 0 520 190" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="mockArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand-1)" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="var(--brand-1)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[40, 80, 120, 160].map((y) => (<line key={y} x1="0" x2="520" y1={y} y2={y} className="grid" />))}
                <path className="area" d="M0,128 C40,120 70,104 110,100 S190,88 230,80 S310,82 350,66 S440,52 520,40 L520,190 L0,190 Z" fill="url(#mockArea)" />
                <path className="budget" d="M0,134 C40,126 80,114 120,108 S200,98 240,92 S320,82 360,76 S450,64 520,54" />
                <path className="actual" pathLength={1} d="M0,128 C40,120 70,104 110,100 S190,88 230,80 S310,82 350,66 S440,52 520,40" />
              </svg>
            </div>
            <div className="lp-mock-bars">
              <header><b>Spend by department</b></header>
              {[['Engineering', 92], ['Operations', 58], ['Marketing', 34], ['Admin', 22]].map(([n, w], i) => (
                <div key={n as string}><span>{n}</span><u><s style={{ width: `${w}%`, animationDelay: `${0.6 + i * 0.12}s` }} /></u></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="lp">
      <SiteNav />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero-bg" aria-hidden="true"><i className="b1" /><i className="b2" /><i className="b3" /><span className="lp-grid-bg" /></div>
        <div className="lp-wrap">
          <div className="lp-hero-copy">
            <span className="lp-badge"><span className="lp-badge-dot" /><Sparkles size={14} />{hero.badge}</span>
            <h1>{hero.titleBefore} <em>{hero.titleAccent}</em></h1>
            <p>{hero.subtitle}</p>
            <div className="lp-cta-row">
              <a href={site.demoHref} className="lp-btn lp-btn-primary lp-btn-lg">{hero.primaryCta} <ArrowRight size={18} /></a>
              <a href="#how" className="lp-btn lp-btn-outline lp-btn-lg"><Play size={15} fill="currentColor" />{hero.secondaryCta}</a>
            </div>
            <ul className="lp-trust">{hero.trust.map((t) => (<li key={t}><Check size={15} strokeWidth={3} />{t}</li>))}</ul>
          </div>
          <HeroStage>
            <HeroMock />
            <div className="lp-chip lp-chip-lime c1"><span><TrendingUp size={16} /></span><div><small>Subscription revenue</small><b>+4.5% vs budget</b></div></div>
            <div className="lp-chip lp-chip-glass c2"><span><Sparkles size={16} /></span><div><small>Marketing programmes</small><b>8.6% under budget</b></div></div>
            <div className="lp-chip lp-chip-white c3"><span><FileText size={16} /></span><div><small>Management report</small><b>PDF exported</b></div></div>
          </HeroStage>
        </div>
      </section>

      {/* ───────────────────────── MARQUEE ───────────────────────── */}
      <section className="lp-marquee-section" aria-label="Capabilities">
        <p>Built for the way finance teams really work</p>
        <div className="lp-marquee">
          <div className="lp-marquee-track">
            {[...capabilityChips, ...capabilityChips].map((c, i) => (<span key={i} className="lp-pill"><i />{c}</span>))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── STATS ───────────────────────── */}
      <section className="lp-stats">
        <div className="lp-wrap">
          <Reveal className="lp-stats-card">
            {stats.map((s) => (
              <div key={s.label}>
                <strong><CountUp value={s.value} />{s.suffix}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── FEATURES ───────────────────────── */}
      <section className="lp-section" id="features">
        <div className="lp-wrap">
          <Heading eyebrow="Features" before="Everything you need to" accent="understand performance" text="From messy exports to a board-ready story — without exporting your financial data to anyone." />
          <div className="lp-features">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 100}>
                <Spotlight className="lp-feature">
                  <span className="lp-feature-icon"><FeatureIcon name={f.icon} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
      <section className="lp-section lp-how" id="how">
        <div className="lp-wrap">
          <Heading eyebrow="How it works" before="From files to" accent="decisions" after="in three steps" text="Nothing changes on your dashboard until you review and approve a validated import." />
          <div className="lp-steps">
            <span className="lp-steps-line" aria-hidden="true" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 140}>
                <div className="lp-step">
                  <span className="lp-step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── SHOWCASE ───────────────────────── */}
      <section className="lp-section lp-showcase-section" id="product">
        <div className="lp-wrap">
          <Heading eyebrow="The product" before="Take full control of" accent="your numbers" />
          <Reveal><Showcase /></Reveal>
        </div>
      </section>

      {/* ───────────────────────── PRICING ───────────────────────── */}
      <section className="lp-section lp-pricing" id="pricing">
        <div className="lp-pricing-bg" aria-hidden="true" />
        <div className="lp-wrap">
          <Heading eyebrow="Pricing" before="Simple plans that" accent="grow with you" text="Start free, upgrade when your team needs forecasting and richer exports." />
          <Pricing />
        </div>
      </section>

      {/* ───────────────────────── TESTIMONIALS ───────────────────────── */}
      <section className="lp-section lp-testimonials" id="stories">
        <div className="lp-wrap">
          <Heading eyebrow="Loved by finance teams" before="Trusted by people who" accent="live in spreadsheets" />
        </div>
        <Reveal>
          {[0, 1].map((row) => (
            <div className="lp-marquee lp-marquee-cards" key={row}>
              <div className={`lp-marquee-track ${row ? 'reverse' : ''}`}>
                {[...testimonials, ...testimonials].map((_, i) => {
                  const list = row ? [...testimonials].reverse() : testimonials;
                  const item = list[i % list.length];
                  return (
                    <figure className="lp-quote" key={i}>
                      <blockquote>“{item.text}”</blockquote>
                      <figcaption>
                        <span className="lp-avatar">{item.name.split(' ').map((w) => w[0]).join('')}</span>
                        <div><b>{item.name}</b><small>{item.role}, {item.company}</small></div>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          ))}
        </Reveal>
        {site.showSampleNotice && <p className="lp-sample-note">Placeholder quotes for demonstration — replace them in lib/site-config.ts.</p>}
      </section>

      {/* ───────────────────────── FAQ ───────────────────────── */}
      <section className="lp-section" id="faq">
        <div className="lp-wrap lp-narrow">
          <Heading eyebrow="FAQ" before="Questions," accent="answered" />
          <Reveal><Faq /></Reveal>
        </div>
      </section>

      {/* ───────────────────────── CTA ───────────────────────── */}
      <section className="lp-cta-section">
        <div className="lp-wrap">
          <Reveal className="lp-cta">
            <i className="o1" /><i className="o2" />
            <h2>{cta.title}</h2>
            <p>{cta.text}</p>
            <div className="lp-cta-row">
              <a href={site.demoHref} className="lp-btn lp-btn-light lp-btn-lg">{cta.primary} <ArrowRight size={18} /></a>
              <a href={site.dashboardHref} className="lp-btn lp-btn-ghost-light lp-btn-lg">{cta.secondary}</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────── FOOTER ───────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-grid">
          <div>
            <Link href="/" className="lp-logo"><span className="lp-logo-mark"><BrandMark size={18} /></span><span>{site.name}</span></Link>
            <p>{site.tagline}. Private, fast and built for clarity.</p>
            {site.social.length > 0 && (
              <div className="lp-social">{site.social.map((s) => (<a key={s.label} href={s.href} rel="noopener noreferrer" target="_blank">{s.label}</a>))}</div>
            )}
          </div>
          {footer.columns.map((c) => (
            <div key={c.title}>
              <h4>{c.title}</h4>
              <ul>{c.links.map((l) => (<li key={l.label}><a href={l.href}>{l.label}</a></li>))}</ul>
            </div>
          ))}
          <div>
            <h4>Contact</h4>
            <ul><li><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></li></ul>
          </div>
        </div>
        <div className="lp-wrap lp-footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Your financial files are processed in your browser.</span>
        </div>
      </footer>
    </div>
  );
}
