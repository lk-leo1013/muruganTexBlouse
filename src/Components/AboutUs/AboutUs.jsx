import { useEffect, useState } from 'react';
import './AboutUs.css';
import shop1 from '../../assets/stock.jpg';
import shop2 from '../../assets/manufacturing.jpg';
import shop3 from '../../assets/saree.jpg';

const IMAGES = [shop1, shop2, shop3];

const STATS = [
  { num: '20+',  label: 'Years of Heritage' },
  { num: '500+', label: 'Unique Designs'    },
  { num: '10K+', label: 'Happy Customers'   },
  { num: '100%', label: 'Handcrafted'       },
];

const AboutUs = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % IMAGES.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="about-us" className="about-section">
      <div className="about-inner">

        {/* ── Image ── */}
        <div className="about-img-side">
          <div className="about-img-frame">
            <img src={IMAGES[idx]} alt="Murugan Tex shop" className="about-img" />
            <div className="about-img-dots">
              {IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`img-dot ${i === idx ? 'active' : ''}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </div>
          <p className="about-img-caption">Our Shop — Ellampillai, Salem</p>
        </div>

        {/* ── Text ── */}
        <div className="about-text-side">
          <span className="section-eyebrow">Our Story</span>
          <h2 className="about-heading">Woven Heritage of<br />Murugan Tex</h2>
          <div className="about-divider" />

          <p className="about-body">
            <strong>Murugan Tex</strong>, based in <strong>Ellampillai, Salem</strong>, is a legacy of
            South Indian textile excellence. As a trusted manufacturer and wholesaler of sarees and
            blouse materials, we preserve and promote traditional craftsmanship passed down through
            generations.
          </p>
          <p className="about-body">
            Every blouse that leaves our shop carries the skill of master artisans, the richness of
            premium fabrics, and the warmth of a family that has loved textiles for over two decades.
          </p>

          <blockquote className="about-quote">
            "Tradition wrapped in every thread."
          </blockquote>

          <a href="#contact-us" className="btn-primary about-cta">Get in Touch</a>
        </div>

      </div>

      {/* ── Stats ── */}
      <div className="about-stats">
        {STATS.map(({ num, label }) => (
          <div key={label} className="about-stat">
            <span className="stat-num">{num}</span>
            <span className="stat-label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
