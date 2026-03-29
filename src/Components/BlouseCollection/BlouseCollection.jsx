import { Link } from 'react-router-dom';
import './BlouseCollection.css';
import blouse1    from '../../assets/blouse1.jpg';
import blouse2    from '../../assets/blouse2.jpg';
import blouse3    from '../../assets/blouse3.jpg';
import blackImg   from '../../assets/black.webp';
import partywear  from '../../assets/partywear.avif';
import chikankari from '../../assets/chikankari.webp';

const FEATURED = [
  { name: 'Georgette Grace',  fabric: 'Georgette',    image: blouse1,    badge: 'BESTSELLER' },
  { name: 'Emerald Elegance', fabric: 'Pure Silk',    image: blouse2,    badge: 'NEW'        },
  { name: 'Royal Radiance',   fabric: 'Kanjivaram',   image: blouse3,    badge: null         },
  { name: 'Classic Charm',    fabric: 'Pure Cotton',  image: blackImg,   badge: 'NEW'        },
  { name: 'Silken Serenity',  fabric: 'Satin Silk',   image: partywear,  badge: 'NEW'        },
  { name: 'Chikankari Charm', fabric: 'Georgette',    image: chikankari, badge: 'BESTSELLER' },
  { name: 'Mirror Marvel',    fabric: 'Chanderi Silk', image: blouse1,   badge: null         },
  { name: 'Silk Heritage',    fabric: 'Banarasi Silk', image: blouse2,   badge: 'BESTSELLER' },
];

const BlouseCollection = () => (
  <section className="featured-section">
    <div className="featured-header">
      <span className="section-eyebrow">Our Collection</span>
      <h2>Bestselling Blouses</h2>
      <div className="section-divider" />
      <h6>Explore our exclusive range of stylish, elegant blouses for every occasion.</h6>
    </div>

    <div className="featured-grid">
      {FEATURED.map((b, i) => (
        <Link key={i} to="/blouses/all" className="feat-card" aria-label={b.name}>
          <div className="feat-img-wrap">
            <img src={b.image} alt={b.name} className="feat-img" loading="lazy" />
            {b.badge && (
              <span className={`feat-badge ${b.badge === 'BESTSELLER' ? 'badge-bs' : 'badge-new'}`}>
                {b.badge}
              </span>
            )}
          </div>
          <div className="feat-info">
            <p className="feat-name">{b.name}</p>
            <p className="feat-fabric">{b.fabric}</p>
          </div>
        </Link>
      ))}
    </div>

    <div className="featured-cta">
      <Link to="/blouses/all" className="btn-primary">View All Blouses</Link>
    </div>
  </section>
);

export default BlouseCollection;
