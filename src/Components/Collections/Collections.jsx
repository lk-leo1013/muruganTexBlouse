import { Link } from 'react-router-dom';
import './Collections.css';
import cotton   from '../../assets/cotton.jpg';
import silk     from '../../assets/silk1.jpg';
import mirror   from '../../assets/mirror.avif';
import netted   from '../../assets/offwhite.jpg';
import bridal   from '../../assets/ivory.webp';
import royal    from '../../assets/royal.jpg';

const CATEGORIES = [
  { id: 1, image: cotton,  title: 'Cotton',         desc: 'Soft & breathable everyday elegance' },
  { id: 2, image: silk,    title: 'Silk',            desc: 'Luxurious sheen for every occasion'  },
  { id: 3, image: mirror,  title: 'Mirror Work',     desc: 'Timeless traditional craftsmanship'  },
  { id: 4, image: netted,  title: 'Fancy Netted',    desc: 'Modern festive chic'                 },
  { id: 5, image: bridal,  title: 'Bridal',          desc: 'Crafted for your special moments'    },
  { id: 6, image: royal,   title: 'Royal',           desc: 'Rich weaves fit for royalty'         },
];

const Collections = () => (
  <section id="collections" className="collections-section">
    <div className="collections-header">
      <span className="section-eyebrow">Shop by Style</span>
      <h2>Trending Blouse Picks</h2>
      <div className="section-divider" />
      <h6>Discover the perfect blend of tradition and trend, crafted just for you.</h6>
    </div>

    <div className="collections-grid">
      {CATEGORIES.map((item) => (
        <Link
          key={item.id}
          to="/blouses/all"
          className="coll-card"
          aria-label={`Shop ${item.title} blouses`}
        >
          <div className="coll-img-wrap">
            <img src={item.image} alt={item.title} className="coll-img" loading="lazy" />
            <div className="coll-overlay" />
          </div>
          <div className="coll-info">
            <h3 className="coll-title">{item.title}</h3>
            <p className="coll-desc">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default Collections;
