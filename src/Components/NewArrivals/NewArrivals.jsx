import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NewArrivals.css';
import { supabase } from '../../lib/supabase';

const NewArrivals = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    supabase
      .from('blouses')
      .select('id, name, fabric, colors')
      .order('created_at', { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setItems(data);
      });
  }, []);

  if (items.length === 0) return null;

  return (
    <section id="new-arrivals" className="na-section">
      <div className="na-header">
        <span className="section-eyebrow">Just Arrived</span>
        <h2>Fresh Finds</h2>
        <div className="section-divider" />
        <h6>Handpicked looks, just landed — unwrap your next favourite blouse.</h6>
      </div>

      <div className="na-scroll-wrap">
        <div className="na-row">
          {items.map(item => {
            const img = item.colors?.[0]?.images?.[0];
            return (
              <Link key={item.id} to="/blouses/all" className="na-card" aria-label={item.name}>
                <div className="na-img-wrap">
                  {img
                    ? <img src={img} alt={item.name} className="na-img" loading="lazy" />
                    : <div className="na-img na-img-placeholder" />
                  }
                  <span className="na-badge">NEW</span>
                </div>
                <div className="na-info">
                  <p className="na-name">{item.name}</p>
                  <p className="na-fabric">{item.fabric}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="na-cta">
        <Link to="/blouses/all" className="btn-outline">View All New Arrivals</Link>
      </div>
    </section>
  );
};

export default NewArrivals;
