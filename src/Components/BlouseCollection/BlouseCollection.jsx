import React from 'react';
import { Link } from 'react-router-dom';
import './BlouseCollection.css';
import blouse1 from '../../assets/blouse1.jpg';
import blouse2 from '../../assets/blouse2.jpg';
import blouse3 from '../../assets/blouse3.jpg';
import blouse4 from '../../assets/blouse2.jpg';
import blouse5 from '../../assets/blouse3.jpg';

const blouses = [
  { name: 'Georgette Grace', image: blouse1 },
  { name: 'Emerald Elegance', image: blouse2 },
  { name: 'Royal Blue Radiance', image: blouse3 },
  { name: 'Classic Charm', image: blouse4 },
  { name: 'Silken Serenity', image: blouse5 },
  // Add more blouse objects as needed
];

const BlouseCollection = () => (
  <div className="blouse-collection-container">
    <hr className="blouse-divider" />
    <h2 className="blouse-collection-heading">Dazzling Blouse Collections</h2>
    <h6 className="blouse-collection-subheading">
      Explore our exclusive range of stylish and elegant blouses for every occasion.
    </h6>
    <div className="blouse-grid">
      {blouses.slice(0, 5).map((blouse, idx) => (
        <div className="blouse-card" key={idx}>
          <img src={blouse.image} alt={blouse.name} className="blouse-image" />
          <div className="blouse-name">{blouse.name}</div>
        </div>
      ))}
    </div>
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <Link
        to="/blouses/all"
        className="view-all-btn"
        style={{
          background: '#e1917d',
          color: '#fff',
          padding: '8px 20px',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        }}
      >
        View All
      </Link>
    </div>
  </div>
);

export default BlouseCollection;