import React from 'react'
import './ContactUs.css'

const ContactUs = () => {
  return (
    <footer className="contactus-footer-icons">
      <div className="contactus-icons-row">
        <a href="tel:+919360997797" title="Call" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" fill="#25a244" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2z"/></svg>
        </a>
        <a href="https://wa.me/919360997797" title="WhatsApp" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" fill="#25D366" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.25-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.09 4.89 4.21.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
        </a>
        <a href="https://www.instagram.com/renusilks/" title="Instagram" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="2" width="20" height="20" rx="6" stroke="#E1306C" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="12" r="5" stroke="#E1306C" strokeWidth="2" fill="none"/>
            <circle cx="17" cy="7" r="1.2" fill="#E1306C"/>
          </svg>
        </a>
        <a href="https://facebook.com/" title="Facebook" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" fill="#1877F3" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
        </a>
        <a href="https://youtube.com/" title="YouTube" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" fill="#FF0000" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.204 3.5 12 3.5 12 3.5s-7.204 0-9.386.566a2.994 2.994 0 0 0-2.112 2.12C0 8.37 0 12 0 12s0 3.63.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.796 20.5 12 20.5 12 20.5s7.204 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.63 24 12 24 12s0-3.63-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        <a href="https://goo.gl/maps/MCnAcvmB7jwT1Nqp6" title="Google Maps" target="_blank" rel="noopener noreferrer">
          <svg width="20" height="20" fill="#4285F4" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
        </a>
      </div>
      <div className="contactus-copyright">
        &copy; {new Date().getFullYear()} Murugan Tex. All rights reserved.
      </div>
    </footer>
  )
}

export default ContactUs