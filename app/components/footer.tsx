import React from 'react';
import styles from './styles/footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left Column - Branding and Contact */}
        <div className={styles.branding}>
        <h2 className={styles.companyName}>EXSOLVIA</h2>
        <p className={styles.description}>Solving Tomorrow, Today</p>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📍</div>
              <span>Bangalore, India</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📞</div>
              <span>+91 98765 43210</span>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>✉️</div>
              <span>hello@exsolvia.com</span>
            </div>
          </div>
        </div>

        {/* Middle Column - Quick Links */}
        <div className={styles.quickLinks}>
          <h3 className={styles.sectionTitle}>Quick Links</h3>
          <div className={styles.linkList}>
            <a href="/about" className={styles.footerLink}>About</a>
            <a href="/products" className={styles.footerLink}>Products</a>
            <a href="/team" className={styles.footerLink}>Team</a>
            <a href="/contact" className={styles.footerLink}>Contact</a>
          </div>
        </div>

        {/* Right Column - Products */}
        <div className={styles.products}>
          <h3 className={styles.sectionTitle}>Products</h3>
          <div className={styles.linkList}>
            <a href="/kampyn" className={styles.footerLink}>KAMPYN</a>
            {/* <a href="/serenify" className={styles.footerLink}>Serenify</a>
            <a href="/careers" className={styles.footerLink}>Careers</a>
            <a href="/blog" className={styles.footerLink}>Blog</a> */}
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className={styles.separator}></div>

      {/* Bottom Section - Copyright and Social */}
      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
          <p>© {currentYear} EXSOLVIA. All rights reserved. Building the future, one solution at a time.</p>
        </div>
        <div className={styles.socialIcons}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
          </a>
          <a href="mailto:hello@exsolvia.com" className={styles.socialIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
