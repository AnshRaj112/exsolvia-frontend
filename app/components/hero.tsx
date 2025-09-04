'use client';

import React from 'react';
import Image from 'next/image';
import styles from './styles/hero.module.scss';
import heroImage from '../../assets/hero-campus-tech.jpg';

const Hero: React.FC = () => {
  const handleLearnMoreClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.imageWrapper}>
        <Image src={heroImage} alt="Collaborating team with laptop" fill priority className={styles.image} />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Solving
          <br />
          Tomorrow, Today.
        </h1>
        <p className={styles.subtitle}>
          EXSOLVIA builds solutions where others stop looking.
        </p>

        <div className={styles.ctaRow}>
          <button className={styles.secondaryButton} onClick={handleLearnMoreClick} aria-label="Learn more about EXSOLVIA">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;


