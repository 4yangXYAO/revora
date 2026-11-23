'use client';

import { useEffect, useState } from 'react';

const services = [
  {
    n: '01',
    title: 'Digital Strategy',
    text: 'Kami memetakan pasar, perilaku pengguna, dan peluang produk menjadi arah yang bisa dieksekusi.',
    tags: ['Research', 'Positioning', 'Roadmap'],
  },
  {
    n: '02',
    title: 'Brand & Experience',
    text: 'Identitas visual dan pengalaman interaksi yang konsisten, mudah dikenali, dan terasa premium.',
    tags: ['Identity', 'UI/UX', 'Design system'],
  },
  {
    n: '03',
    title: 'Web & Product Engineering',
    text: 'Website dan aplikasi yang cepat, adaptif, aman, dan siap tumbuh mengikuti kebutuhan bisnis.',
    tags: ['Next.js', 'API', 'Performance'],
  },
];

const projects = [
  { name: 'AURELIA / CULTURE', type: 'Brand platform & immersive archive', year: '2025', art: 'linear-gradient(145deg,#201a15,#5b3224 46%,#a4432e)' },
  { name: 'NORTH / GOODS', type: 'Commerce experience for modern craft', year: '2024', art: 'linear-gradient(145deg,#181511,#4b4438 50%,#d7c9ae)' },
  { name: 'ATELIER / FORM', type: 'Digital home for design research', year: '2024', art: 'linear-gradient(145deg,#211c16,#7c503a 48%,#e6dece)' },
];

const process = [
  { step: 'I', title: 'Discover', text: 'Kami mendengar dulu: konteks, ambisi, dan hambatan nyata bisnis.' },
  { step: 'II', title: 'Frame', text: 'Masalah ditata menjadi arah strategi dan struktur pengalaman.' },
  { step: 'III', title: 'Craft', text: 'Desain dan teknologi dibangun dengan detail yang terukur.' },
  { step: 'IV', title: 'Ignite', text: 'Produk dirilis, diukur, dan disempurnakan berdasarkan data.' },
];

const stats = [
  { value: '120+', label: 'Digital artifacts' },
  { value: '8 yrs', label: 'Studio practice' },
  { value: '98%', label: 'Client retention' },
];

export default function Home() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6 * 70, 350)}ms`);
      observer.observe(element);
    });

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(scrolled / max, 1) : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress * 100}%`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  async function submitContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setBusy(true);
    setStatus('');
    const form = new FormData(formElement);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(form)),
      });
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
      <div className="scroll-progress" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">P</span>
          <span>
            PROMETHEUS
            <span className="brand-sub">DIGITAL STUDIO</span>
          </span>
        </a>
        <nav aria-label="Primary">
          <a href="#about">The myth</a>
          <a href="#services">Craft</a>
          <a href="#work">Work</a>
          <a href="#process">Process</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a conversation <span>↗</span></a>
        <a className="mobile-cta" href="#contact" aria-label="Contact">↗</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-painting" />
        <div className="hero-shade" />
        <div className="hero-grain" />
        <div className="hero-embers" aria-hidden="true">
          {Array.from({ length: 14 }).map((_, index) => <i key={index} />)}
        </div>

        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> INDEPENDENT DIGITAL STUDIO · EST. 2021</p>
          <h1>We bring<br />the <em>fire.</em></h1>
          <p className="hero-intro">Strategi, desain, dan teknologi untuk brand yang ingin membakar batas lama — lalu membangun sesuatu yang lebih bermakna.</p>
          <div className="hero-actions">
            <a className="primary-link" href="#contact">Start a project <span>↗</span></a>
            <a className="round-link" href="#about">Discover our story <span>↓</span></a>
          </div>
          <dl className="hero-stats">
            {stats.map(item => (
              <div key={item.label}><dt>{item.value}</dt><dd>{item.label}</dd></div>
            ))}
          </dl>
        </div>

        <div className="hero-panel">
          <span className="panel-title">THE GIFT OF FIRE</span>
          <p>Prometheus membawa api bukan untuk dipuja, tapi untuk dipakai. Kami mengambil makna itu: teknologi harus menghidupkan, bukan sekadar memukau.</p>
          <span className="panel-glyph">ΠΡΟΜΗΘΕΥΣ</span>
        </div>
        <div className="hero-caption"><span>01 — CREATIVE TECHNOLOGY</span><span>ATHENS / JAKARTA / MMXXV</span></div>
      </section>

      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map(index => (
            <span key={index}>STRATEGY ✦ IDENTITY ✦ WEB EXPERIENCE ✦ MOTION ✦ ENGINEERING ✦ GROWTH ✦ </span>
          ))}
        </div>
      </section>

      <section className="manifesto section-pad" id="about">
        <div className="section-label"><span>01 / OUR ORIGIN</span><span>THINK AHEAD. MAKE A DIFFERENCE.</span></div>
        <div className="manifesto-grid">
          <div data-reveal>
            <p className="manifesto-kicker">A story about<br /><em>seeing further.</em></p>
            <div className="manifesto-stamp">P<span>φῶς</span></div>
          </div>
          <div className="manifesto-body" data-reveal>
            <h2>Not every spark is an accident.</h2>
            <p>Dalam mitos Yunani, Prometheus memandang ke depan dan membawa api ke manusia. Kami melihatnya sebagai simbol teknologi yang paling berguna: pengetahuan yang dibagikan, alat yang memberidayakan, dan ide yang berani dieksekusi.</p>
            <p>Prometheus Digital Studio lahir dari semangat itu. Kami membantu founder dan brand mengubah intuisi menjadi produk digital yang jelas, hidup, dan berdampak.</p>
            <div className="value-list">
              <span>Clarity before decoration</span>
              <span>Craft with intent</span>
              <span>Technology that serves people</span>
            </div>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-label"><span>02 / OUR CRAFT</span><span>IDEAS INTO ORBITS</span></div>
        <div className="services-heading">
          <h2 data-reveal>Different disciplines.<br /><em>One bright direction.</em></h2>
          <p data-reveal>Tiga disiplin yang saling menguatkan — bukan layanan lepas yang kehilangan benang merah.</p>
        </div>
        <div className="service-grid">
          {services.map(service => (
            <article className="service-card" key={service.n} data-reveal>
              <span className="service-num">{service.n}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <span className="service-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="section-label"><span>03 / SELECTED WORK</span><span>MADE WITH INTENTION</span></div>
        <div className="work-heading">
          <h2 data-reveal>Proof of <em>possibility.</em></h2>
          <p data-reveal>Studi konsep independen yang menunjukkan bagaimana sebuah percikan bisa menjadi pengalaman utuh.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-${index === 0 ? 'large' : 'small'}`} key={project.name} data-reveal>
              <div className="project-art" style={{ backgroundImage: project.art }}>
                <span className="project-count">0{index + 1} / 03</span>
                <span className="project-visit">↗</span>
              </div>
              <div className="project-meta"><span>{project.name}</span><span>{project.type} · {project.year}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad" id="process">
        <div className="section-label"><span>04 / HOW WE WORK</span><span>FROM EMBER TO ENGINE</span></div>
        <div className="process-heading">
          <h2 data-reveal>A deliberate path<br /><em>from idea to impact.</em></h2>
          <p data-reveal>Proses yang jelas membuat kreativitas tidak kehilangan arah.</p>
        </div>
        <ol className="process-grid">
          {process.map(item => (
            <li key={item.title} data-reveal>
              <span className="process-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-glow" />
        <div className="section-label"><span>05 / YOUR NEXT CHAPTER</span><span>THE FLAME IS YOURS</span></div>
        <div className="contact-grid">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow">HAVE A GOOD ONE IN MIND?</p>
            <h2>Let’s make<br />something <em>matter.</em></h2>
            <p>Ceritakan tujuanmu. Kami bawa peta, pertanyaan yang tepat, dan keahlian untuk menyalakannya.</p>
            <div className="contact-details">
              <a href="mailto:studio@prometheus.digital">studio@prometheus.digital</a>
              <span>Jakarta · Remote-first</span>
            </div>
          </div>
          <form className="contact-form" onSubmit={submitContact} data-reveal>
            <label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="The name you go by" /></label>
            <label>Your email<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@somewhere.com" /></label>
            <label>A little about your idea<textarea name="message" required maxLength={2000} rows={4} placeholder="What are you dreaming up?" /></label>
            <button type="submit" disabled={busy}>{busy ? 'SENDING…' : 'SEND YOUR SPARK'} <span>↗</span></button>
            <p className="form-status" aria-live="polite">{status || 'Demo form · email delivery is not enabled yet.'}</p>
          </form>
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#home">
          <span className="brand-mark">P</span>
          <span>PROMETHEUS<span className="brand-sub">DIGITAL STUDIO</span></span>
        </a>
        <p>THE FUTURE FAVOURS THE FIRED-UP.</p>
        <a href="#home">BACK TO THE TOP ↑</a>
        <span className="footer-copy">© 2026 PROMETHEUS STUDIO</span>
      </footer>
    </main>
  );
}
