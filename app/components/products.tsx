"use client";
import React from 'react';
import styles from './styles/products.module.scss';
import { LuUtensilsCrossed } from 'react-icons/lu';

const Products: React.FC = () => {
  return (
    <section id="products" className={styles.productsSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          <span className={styles.titleBase}>Our </span>
          <span className={styles.titleHighlight}>Products</span>
        </h1>
        <p className={styles.subtitle}>
          Innovative solutions that transform how people interact with technology in their daily lives.
        </p>

        <div className={styles.cardsGrid}>
          <div className={styles.cardKampyn}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap}>
                <LuUtensilsCrossed size={20} />
              </div>
              <div>
                <h3 className={styles.cardTitle}>KAMPYN</h3>
                <span className={styles.cardTag}>University Management Platform</span>
              </div>
            </div>

            <p className={styles.cardDescription}>
              College food ordering simplified. KAMPYN connects students with campus dining options through an intuitive platform that
              makes ordering, payment, and pickup seamless.
            </p>

            <ul className={styles.featuresList}>
              <li>Real-time order tracking</li>
              <li>Integrated payment solutions</li>
              <li>Campus-wide delivery network</li>
            </ul>

            <button
              className={styles.ctaButton}
              aria-label="Visit KAMPYN"
              onClick={() => window.open('https://kampyn.com', '_blank', 'noopener,noreferrer')}
            >
              Visit KAMPYN
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;


