'use client';

import { useState } from 'react';

const services = [
  { n: '01', title: 'Digital strategy', text: 'Peta yang jelas untuk membawa bisnis bergerak lebih jauh—berangkat dari insight, berakhir pada dampak.' },
  { n: '02', title: 'Brand & experience', text: 'Identitas dan pengalaman digital yang mudah dikenali, nyaman digunakan, dan sulit dilupakan.' },
  { n: '03', title: 'Web & technology', text: 'Website dan produk digital yang cepat, adaptif, dan dibangun untuk bertumbuh bersama ambisimu.' },
];
const projects = [
  { name: 'AURELIA / CULTURE', type: 'Digital home for a new kind of luxury', image: 'photo-1531058020387-3be344556be6', size: 'large' },
  { name: 'NORTH / GOODS', type: 'A sharper edge for everyday essentials', image: 'photo-1490481651871-ab68de25d43d', size: 'small' },
  { name: 'ATELIER / FORM', type: 'A living archive of material and craft', image: 'photo-1494438639946-1ebd1d20bf85', size: 'small' },
];

export default function Home() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBusy(true);
    setStatus('');
    const form = new FormData(formElement);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form)) });
      const result = await response.json();
      setStatus(result.message || result.error);
      if (response.ok) formElement.reset();
    } catch {
      setStatus('Tidak bisa menghubungi server. Coba lagi sebentar.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main>
      <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">P</span><span>PROMETHEUS<span className="brand-sub">DIGITAL STUDIO</span></span></a><nav><a href="#about">The myth</a><a href="#services">What we do</a><a href="#work">Selected work</a></nav><a className="nav-cta" href="#contact">Start a conversation <span>↗</span></a><a className="mobile-cta" href="#contact">↗</a></header>

      <section className="hero" id="home"><div className="hero-photo"/><div className="hero-shade"/><div className="hero-grain"/><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/> AN INDEPENDENT DIGITAL STUDIO · EST. 2021</p><h1>We bring<br/>the <em>fire.</em></h1><p className="hero-intro">We turn brave ideas into meaningful digital experiences. A little myth, a lot of making.</p><a className="round-link" href="#about">DISCOVER OUR STORY <span>↓</span></a></div><div className="hero-caption"><span>01 — THE GIFT OF FIRE</span><span>CREATIVE TECHNOLOGY / MMXXV</span></div><span className="hero-greek">ΠΡΟΜΗΘΕΥΣ</span></section>

      <section className="manifesto section-pad" id="about"><div className="section-label"><span>01 / OUR ORIGIN</span><span>THINK AHEAD. MAKE A DIFFERENCE.</span></div><div className="manifesto-grid"><p className="manifesto-kicker">A story about<br/><em>seeing further.</em></p><div className="manifesto-body"><h2>Not every spark is an accident.</h2><p>In the old stories, Prometheus didn’t wait for a brighter future. He imagined one—and carried its first flame to humankind.</p><p>We borrow that spirit. At Prometheus, we pair sharp thinking with digital craft to help ambitious people make what comes next.</p><a className="text-link" href="#contact">A little more about us <span>↗</span></a></div><div className="manifesto-stamp">P<br/><span>φῶς</span></div></div></section>

      <section className="services section-pad" id="services"><div className="section-label"><span>02 / OUR CRAFT</span><span>IDEAS INTO ORBITS</span></div><div className="services-heading"><h2>Different disciplines.<br/><em>One bright direction.</em></h2><p>We connect the dots between what your brand stands for and what the world feels.</p></div><div className="service-list">{services.map(s=><article className="service-row" key={s.n}><span className="service-num">{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><span className="service-arrow">↗</span></article>)}</div></section>

      <section className="work section-pad" id="work"><div className="section-label"><span>03 / A FEW GOOD THINGS</span><span>MADE WITH INTENTION</span></div><div className="work-heading"><h2>Proof of <em>possibility.</em></h2><p>Good work moves people. Here are a few sparks we helped set in motion.</p></div><div className="project-grid">{projects.map((p,i)=><article key={p.name} className={`project-card project-${p.size}`}><div className="project-image" style={{backgroundImage:`url(https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=1400&q=85)`}}><span className="project-count">0{i+1} / 03</span><span className="project-visit">↗</span></div><div className="project-meta"><span>{p.name}</span><span>{p.type}</span></div></article>)}</div><p className="work-note">Independent concept studies — crafted to show how a spark becomes a whole new world.</p></section>

      <section className="contact section-pad" id="contact"><div className="contact-glow"/><div className="section-label"><span>04 / YOUR NEXT CHAPTER</span><span>THE FLAME IS YOURS</span></div><div className="contact-grid"><div className="contact-copy"><p className="eyebrow">HAVE A GOOD ONE IN MIND?</p><h2>Let’s make<br/>something <em>matter.</em></h2><p>Tell us where you want to go. We’ll bring a map, a match, and a few good questions.</p><span className="contact-sigil">✳</span></div><form className="contact-form" onSubmit={submitContact}><label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="The name you go by"/></label><label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@somewhere.com"/></label><label>A little about your idea<textarea name="message" required maxLength={2000} rows={3} placeholder="What are you dreaming up?"/></label><button type="submit" disabled={busy}>{busy?'SENDING…':'SEND YOUR SPARK'} <span>↗</span></button><p className="form-status" aria-live="polite">{status || 'Demo form · no email is sent or stored yet.'}</p></form></div></section>

      <footer className="footer"><a className="brand" href="#home"><span className="brand-mark">P</span><span>PROMETHEUS<span className="brand-sub">DIGITAL STUDIO</span></span></a><p>THE FUTURE FAVOURS THE FIRED-UP.</p><a href="#home">BACK TO THE TOP ↑</a><span className="footer-copy">© 2025 PROMETHEUS STUDIO</span></footer>
    </main>
  );
}
