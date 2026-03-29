import { Link } from 'react-router-dom';
import './NewArrivals.css';
import blouse1    from '../../assets/blouse1.jpg';
import blouse2    from '../../assets/blouse2.jpg';
import blouse3    from '../../assets/blouse3.jpg';
import georgette  from '../../assets/georgette.jpg';
import partywear  from '../../assets/partywear.avif';
import chikankari from '../../assets/chikankari.webp';

const NEW_ARRIVALS = [
  { name: 'Georgette Grace',    fabric: 'Georgette',     image: blouse1    },
  { name: 'Emerald Elegance',   fabric: 'Pure Silk',     image: blouse2    },
  { name: 'Silken Serenity',    fabric: 'Satin Silk',    image: partywear  },
  { name: 'Georgette Radiance', fabric: 'Georgette',     image: georgette  },
  { name: 'Chikankari Charm',   fabric: 'Georgette',     image: chikankari },
  { name: 'Azure Allure',       fabric: 'Kanjivaram',    image: blouse3    },
];

const NewArrivals = () => (
  <section id="new-arrivals" className="na-section">
    <div className="na-header">
      <span className="section-eyebrow">Just Arrived</span>
      <h2>Fresh Finds</h2>
      <div className="section-divider" />
      <h6>Handpicked looks, just landed — unwrap your next favourite blouse.</h6>
    </div>

    <div className="na-scroll-wrap">
      <div className="na-row">
        {NEW_ARRIVALS.map((item, i) => (
          <Link key={i} to="/blouses/all" className="na-card" aria-label={item.name}>
            <div className="na-img-wrap">
              <img src={item.image} alt={item.name} className="na-img" loading="lazy" />
              <span className="na-badge">NEW</span>
            </div>
            <div className="na-info">
              <p className="na-name">{item.name}</p>
              <p className="na-fabric">{item.fabric}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

    <div className="na-cta">
      <Link to="/blouses/all" className="btn-outline">View All New Arrivals</Link>
    </div>
  </section>
);

export default NewArrivals;
