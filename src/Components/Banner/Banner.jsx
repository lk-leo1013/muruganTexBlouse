import React from "react";
import "./Banner.css";
// adjust the import path if your build expects images in a different folder
import bannerImg from '../../assets/edited.png';

const Banner = () => {
  return (
    <section className="hero-2col hero-2col--premium" role="region" aria-label="Blouse collection banner">
      <div className="hero-2col__left">
        <h1 className="hero-2col__title">We Weave Elegance into Every Thread</h1>
        <p className="hero-2col__sub">Discover blouse fabrics crafted with tradition and grace</p>
        <a className="hero-2col__cta" href="/muruganTexBlouse/blouses/all" aria-label="View all blouses">View all blouses</a>
      </div>

      <div className="hero-2col__right" aria-hidden="false">
          <img
            src={bannerImg}
            alt="Woman wearing an elegant embroidered blouse and cherry blossom background"
            className="hero-2col__img"
            loading="lazy"
            decoding="async"
          />
        </div>
    </section>
  );
};

export default Banner;


