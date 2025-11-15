import React from 'react';
import './NewArrivals.css';
import blouse1 from '../../assets/blouse1.jpg';
import blouse2 from '../../assets/blouse2.jpg';
import blouse3 from '../../assets/blouse3.jpg';

const newArrivals = [
  { name: 'Sunset Shimmer', image: blouse1 },
  { name: 'Mint Muse', image: blouse2 },
  { name: 'Azure Allure', image: blouse3 },
  // Add more as needed
];

const NewArrivals = () => (
    <section id="new-arrivals" className="new-arrivals-section">
        <div className="new-arrivals-header">
            <h2 className="new-arrivals-title">Fresh Finds</h2>
            <h6 className="new-arrivals-subtitle">
                Unwrap Your Style: Handpicked Looks Just Landed!
            </h6>
        </div>
        <div className="new-arrivals-grid">
            {newArrivals.map((item, idx) => (
                <div className="new-arrival-card" key={idx}>
                    <div className="new-arrival-img-wrap">
                        <img src={item.image} alt={item.name} className="new-arrival-img" />
                        <span className="new-badge">NEW</span>
                    </div>
                    <div className="new-arrival-name">{item.name}</div>
                </div>
            ))}
        </div>
    </section>
);

export default NewArrivals;