import React from 'react';
import styles from './styles/innovations.module.scss';
import Image from 'next/image';
import projectImage from '@/assets/project-ai-automation.jpg';

const Innovations: React.FC = () => {
  return (
    <section id="innovations" className={styles.innovationsSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>This is Just the Beginning</h1>
        <p className={styles.subtitle}>
          EXSOLVIA is working on multiple new solutions to expand beyond KAMPYN. The future holds exciting innovations.
        </p>

        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={projectImage} alt="AI Automation Suite" width={300} height={200} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>AI Automation Suite</h3>
            <p className={styles.cardDescription}>Next-gen automation solutions</p>
            <button className={styles.comingSoonBtn}>Coming Soon</button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={projectImage} alt="Healthcare Connect" width={300} height={200} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>Healthcare Connect</h3>
            <p className={styles.cardDescription}>Campus health management</p>
            <button className={styles.comingSoonBtn}>Coming Soon</button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={projectImage} alt="FinTech Platform" width={300} height={200} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>FinTech Platform</h3>
            <p className={styles.cardDescription}>Smart financial solutions</p>
            <button className={styles.comingSoonBtn}>Coming Soon</button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={projectImage} alt="Mental Health App" width={300} height={200} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>Mental Health App</h3>
            <p className={styles.cardDescription}>Mental wellness support</p>
            <button className={styles.comingSoonBtn}>Coming Soon</button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={projectImage} alt="School Connect" width={300} height={200} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>School Connect</h3>
            <p className={styles.cardDescription}>Educational management platform</p>
            <button className={styles.comingSoonBtn}>Coming Soon</button>
          </div>

          <div className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={projectImage} alt="More to Come" width={300} height={200} className={styles.image} />
            </div>
            <h3 className={styles.cardTitle}>More to Come</h3>
            <p className={styles.cardDescription}>Innovation never stops</p>
            <button className={styles.comingSoonBtn}>Coming Soon</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Innovations;
