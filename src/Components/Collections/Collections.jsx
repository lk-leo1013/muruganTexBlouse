import React from 'react';
import './Collections.css';
import blouse1 from '../../assets/cotton.jpg';
import blouse2 from '../../assets/silk1.jpg';
import blouse3 from '../../assets/mirror.avif';
import blouse4 from '../../assets/offwhite.jpg';
import blouse5 from '../../assets/ivory.webp';
import blouse6 from '../../assets/royal.jpg'

const items = [
  {
    id: 1,
    image: blouse1,
    title: 'Cotton',
    desc: 'Soft, breathable cotton for everyday elegance.'
  },
  {
    id: 2,
    image: blouse2,
    title: 'Silk',
    desc: 'Luxurious silk that adds a royal touch to your style.'
  },
  {
    id: 3,
    image: blouse3,
    title: 'Traditional Mirror Work',
    desc: 'Sparkle with timeless mirror work craftsmanship.'
  },
  {
    id: 4,
    image: blouse4,
    title: 'Fancy Netted',
    desc: 'Chic netted designs for a modern festive look.'
  },
  {
    id: 5,
    image: blouse5,
    title: 'Fancy Bridal',
    desc: 'perfect for your special bridal moments.'
  },
  {
    id: 6,
    image: blouse6,
    title: 'Royal',
    desc: 'Rich blue'
  },
  // Add more items as needed
];

const Collections = () => {
  return (
    <section id="collections" className="collections-block">
      <h2 className="collections-heading">
        Trending Blouse Picks
      </h2>
      <h6 className="collection-oneliner">
        Discover the perfect blend of tradition and trend, crafted just for you.
      </h6>
      <div className="collections-grid">
        {items.map((item) => (
          <a
            className="collection-card"
            key={item.id}
            href="#"
            tabIndex={0}
            aria-label={item.title}
          >
            <div className="img-container">
              <img src={item.image} alt={item.title} />
              <div className="img-overlay"></div>
              <h3 className="collection-title">{item.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Collections;
