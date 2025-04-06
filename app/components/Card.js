'use client';

import styles from '../styles/Game.module.css';

export default function Card({ id, type, flipped, solved, onClick, disabled }) {
  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ''} ${solved ? styles.solved : ''}`}
      onClick={() => !disabled && onClick()}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.cardPattern}></div>
        </div>
        <div className={styles.cardBack}>
          <span className={styles.emoji}>{type}</span>
        </div>
      </div>
    </div>
  );
}
