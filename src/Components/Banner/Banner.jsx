import './Banner.css';
import { Link } from 'react-router-dom';
import bannerImg from '../../assets/edited.png';

const Banner = () => (
  <section className="hero" aria-label="Hero banner">
    <div className="hero-inner">

      {/* ── Text ── */}
      <div className="hero-text">
        <span className="hero-eyebrow">✦ Temple of Blouse</span>
        <h1 className="hero-title">
          We Weave <em>Elegance</em><br />into Every Thread
        </h1>
        <p className="hero-sub">
          Handcrafted blouses rooted in South Indian tradition —
          timeless fabrics, impeccable stitching, made just for you.
        </p>
        <div className="hero-actions">
          <Link to="/blouses/all" className="hero-btn-primary">Explore Collection</Link>
          <a href="#about-us" className="hero-btn-ghost">Our Story</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">20+</span>
            <span className="stat-label">Years of craft</span>
          </div>
          <div className="stat-sep" />
          <div className="hero-stat">
            <span className="stat-num">500+</span>
            <span className="stat-label">Unique designs</span>
          </div>
          <div className="stat-sep" />
          <div className="hero-stat">
            <span className="stat-num">10K+</span>
            <span className="stat-label">Happy customers</span>
          </div>
        </div>
      </div>

      {/* ── Image (no frame/box) ── */}
      <div className="hero-img-side">
        <img src={bannerImg} alt="Elegant handcrafted blouse" className="hero-img" loading="eager" />
      </div>

    </div>
  </section>
);

export default Banner;
