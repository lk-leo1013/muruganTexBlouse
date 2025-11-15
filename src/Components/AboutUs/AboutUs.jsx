import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import shop1 from '../../assets/stock.jpg';
import shop2 from '../../assets/manufacturing.jpg';
import shop3 from '../../assets/saree.jpg';

const shopImages = [shop1, shop2, shop3];

const AboutUs = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % shopImages.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [shopImages.length]);

    return (
        <section className="about-classic">
            <div className="about-box">
                <h2>Woven Heritage of Murugan Tex</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>
                            <strong>Murugan Tex</strong>, based in <strong>Ellampillai, Salem</strong>, is a legacy of South Indian
                            textile excellence. As a trusted manufacturer and wholesaler of sarees and blouse materials, we are proud
                            to preserve and promote traditional craftsmanship.
                        </p>
                        <p>
                            Generations of customers and retailers choose us for our commitment to quality, culture, and the timeless
                            art of weaving.
                        </p>
                        <p className="tagline">Tradition wrapped in every thread</p>
                    </div>
                    <div className="image-container">
                        <div className="image-box">
                            <img
                                src={shopImages[currentImageIndex]}
                                alt={`Murugan Tex Shop ${currentImageIndex + 1}`}
                            />
                            <p className="caption">Our Shop – Ellampillai, Salem</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
