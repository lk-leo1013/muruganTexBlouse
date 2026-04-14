import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './BlouseCollection.css';
import { fetchBlouses } from '../../lib/db';

const BlouseCollection = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchBlouses({ orderBy: 'contactClicks', ascending: false, limit: 8 })
      .then(({ data }) => {
        if (data) setFeatured(data);
      });
  }, []);

  // Mirror the same bestseller logic as ViewAllBlouses
  const bestsellerIds = useMemo(() => {
    const sorted = [...featured]
      .filter(b => (b.contactClicks || 0) > 0)
      .sort((a, b) => (b.contactClicks || 0) - (a.contactClicks || 0))
      .slice(0, 30);
    return new Set(sorted.map(b => b.id));
  }, [featured]);

  const effectiveBadge = (b) =>
    bestsellerIds.has(b.id) ? 'BESTSELLER' : (b.badge || null);

  if (featured.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="featured-header">
        <span className="section-eyebrow">Our Collection</span>
        <h2>Bestselling Blouses</h2>
        <div className="section-divider" />
        <h6>Explore our exclusive range of stylish, elegant blouses for every occasion.</h6>
      </div>

      <div className="featured-grid">
        {featured.map(b => {
          const img = b.colors?.[0]?.images?.[0];
          const badge = effectiveBadge(b);
          return (
            <Link key={b.id} to="/blouses/all" className="feat-card" aria-label={b.name}>
              <div className="feat-img-wrap">
                {img
                  ? <img src={img} alt={b.name} className="feat-img" loading="lazy" />
                  : <div className="feat-img feat-img-placeholder" />
                }
                {badge && (
                  <span className={`feat-badge ${badge === 'BESTSELLER' ? 'badge-bs' : 'badge-new'}`}>
                    {badge}
                  </span>
                )}
              </div>
              <div className="feat-info">
                <p className="feat-name">{b.name}</p>
                <p className="feat-fabric">{b.fabric}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="featured-cta">
        <Link to="/blouses/all" className="btn-primary">View All Blouses</Link>
      </div>
    </section>
  );
};

export default BlouseCollection;
