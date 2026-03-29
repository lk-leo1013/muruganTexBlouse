import './ContactUs.css';
import logo from '../../assets/logo1.png';

const SOCIAL = [
  {
    name: 'WhatsApp', href: 'https://wa.me/919360997797', color: '#25D366',
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.09 4.89 4.21.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
  },
  {
    name: 'Instagram', href: 'https://www.instagram.com/renusilks/', color: '#E1306C',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg>
  },
  {
    name: 'Facebook', href: 'https://facebook.com/', color: '#1877F3',
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
  },
  {
    name: 'YouTube', href: 'https://youtube.com/', color: '#FF0000',
    icon: <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.204 3.5 12 3.5 12 3.5s-7.204 0-9.386.566a2.994 2.994 0 0 0-2.112 2.12C0 8.37 0 12 0 12s0 3.63.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.796 20.5 12 20.5 12 20.5s7.204 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.63 24 12 24 12s0-3.63-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  },
];

const ContactUs = () => (
  <footer id="contact-us" className="footer">

    {/* ── Top CTA strip ── */}
    <div className="footer-cta-strip">
      <div className="footer-cta-inner">
        <div className="footer-cta-text">
          <h3>Ready to find your perfect blouse?</h3>
          <p>Reach out and we'll help you find the right fabric, style, and fit.</p>
        </div>
        <a href="https://wa.me/919360997797" className="footer-whatsapp-btn" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>

    {/* ── Main footer body ── */}
    <div className="footer-body">
      <div className="footer-grid">

        {/* Brand */}
        <div className="footer-col footer-brand-col">
          <img src={logo} alt="Murugan Tex" className="footer-logo" />
          <p className="footer-tagline">
            Temple of Blouse — Handcrafted elegance rooted in South Indian textile tradition.
          </p>
          <div className="footer-social">
            {SOCIAL.map(s => (
              <a key={s.name} href={s.href} className="social-icon" title={s.name}
                target="_blank" rel="noopener noreferrer" style={{ '--social-clr': s.color }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#collections">Style Buzz</a></li>
            <li><a href="#new-arrivals">New Arrivals</a></li>
            <li><a href="/muruganTexBlouse/blouses/all">Shop All Blouses</a></li>
            <li><a href="#about-us">About Us</a></li>
            <li><a href="#contact-us">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-col-title">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <span>Ellampillai, Salem,<br />Tamil Nadu, India</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <a href="tel:+919360997797">+91 93609 97797</a>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <a href="https://wa.me/919360997797" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            </li>
            <li>
              <span className="contact-icon">🗺️</span>
              <a href="https://goo.gl/maps/MCnAcvmB7jwT1Nqp6" target="_blank" rel="noopener noreferrer">View on Maps</a>
            </li>
          </ul>
        </div>

      </div>
    </div>

    {/* ── Copyright bar ── */}
    <div className="footer-bar">
      <p>© {new Date().getFullYear()} Murugan Tex. All rights reserved.</p>
      <p className="footer-bar-right">✦ Handcrafted with love in Salem, Tamil Nadu</p>
    </div>

  </footer>
);

export default ContactUs;
