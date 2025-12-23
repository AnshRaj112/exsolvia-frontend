"use client";
import React, { useEffect, useState } from 'react';
import styles from './styles/snowflakes.module.scss';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

const Snowflakes: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate snowflakes
    const generateSnowflakes = () => {
      const count = 90; // Number of snowflakes
      const newSnowflakes: Snowflake[] = [];

      for (let i = 0; i < count; i++) {
        newSnowflakes.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position (0-100%)
          animationDuration: 3 + Math.random() * 7, // Random fall speed (3-10 seconds)
          animationDelay: Math.random() * 5, // Random start delay (0-5 seconds)
          size: 5 + Math.random() * 10, // Random size (5-15px)
          opacity: 0.3 + Math.random() * 0.7, // Random opacity (0.3-1.0)
        });
      }

      setSnowflakes(newSnowflakes);
    };

    generateSnowflakes();
  }, []);

  const getSnowflakeChar = (id: number): string => {
    const chars = ['❄', '❅', '❆', '✻', '✼', '✽', '✾', '✿'];
    return chars[id % chars.length];
  };

  return (
    <div className={styles.snowflakesContainer}>
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className={styles.snowflake}
          style={{
            left: `${snowflake.left}%`,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            animationDuration: `${snowflake.animationDuration}s`,
            animationDelay: `${snowflake.animationDelay}s`,
            fontSize: `${snowflake.size}px`,
          }}
        >
          {getSnowflakeChar(snowflake.id)}
        </div>
      ))}
    </div>
  );
};

export default Snowflakes;

