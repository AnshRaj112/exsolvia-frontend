import React from 'react';
import styles from './styles/about.module.scss';
import { BsBuildingFill, BsRocketTakeoffFill, BsCompassFill } from 'react-icons/bs';

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>About EXSOLVIA</h1>
        <p className={styles.subtitle}>
          We identify overlooked problems and build scalable solutions that transform industries. Our mission is to bridge the gap between what exists and what's truly needed.
        </p>

        <div className={styles.highlights}>
          <div className={styles.card}>
            <div className={styles.icon}>
              <BsBuildingFill color="#1c2126" size={18} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>Founded</h3>
              <p className={styles.cardText}>Building the foundation for innovation</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <BsRocketTakeoffFill color="#1c2126" size={18} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>KAMPYN</h3>
              <p className={styles.cardText}>Revolutionizing campus hospitality</p>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>
              <BsCompassFill color="#1c2126" size={18} />
            </div>
            <div>
              <h3 className={styles.cardTitle}>Future Projects</h3>
              <p className={styles.cardText}>Expanding beyond boundaries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


