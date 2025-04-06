'use client';

import { useState, useEffect } from 'react';
import Card from './Card';
import styles from '../styles/Game.module.css';

export default function Game({ difficulty }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Set grid dimensions based on difficulty
  const getDimensions = () => {
    switch (difficulty) {
      case 'easy':
        return { rows: 3, cols: 4 };
      case 'hard':
        return { rows: 4, cols: 5 };
      default: // medium
        return { rows: 4, cols: 4 };
    }
  };

  const { rows, cols } = getDimensions();
  const cardCount = rows * cols;

  // Generate card symbols (emojis)
  const generateCards = () => {
    // Modern themed emojis
    const emojis = ['🚀', '🎮', '🔮', '💎', '🌈', '🎨', '🎧', '🎭', '🏆', '⚡', '🔥', '❄️', '🌟', '🍦', '🧩', '🎯'];
    const pairsCount = cardCount / 2;
    const selectedEmojis = emojis.slice(0, pairsCount);

    const cardPairs = selectedEmojis.flatMap(emoji => [
      { id: `${emoji}-1`, type: emoji, flipped: false, solved: false },
      { id: `${emoji}-2`, type: emoji, flipped: false, solved: false }
    ]);

    // Shuffle cards
    return cardPairs.sort(() => Math.random() - 0.5);
  };

  // Initialize game
  useEffect(() => {
    const newCards = generateCards();
    setCards(newCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setMoves(0);
    setGameComplete(false);
    setTimer(0);
    setTimerRunning(true);
  }, [difficulty]);

  // Timer
  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  // Check for game completion
  useEffect(() => {
    if (solved.length === cardCount && cardCount > 0) {
      setGameComplete(true);
      setTimerRunning(false);
    }
  }, [solved, cardCount]);

  // Handle card click
  const handleCardClick = (id) => {
    if (disabled) return;

    // Don't allow same card to be clicked twice
    if (flipped.includes(id)) return;

    // Don't allow already solved cards to be flipped
    if (solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    // If this is the first card flipped, continue
    if (flipped.length === 0) {
      return;
    }

    // If this is the second card
    if (flipped.length === 1) {
      setDisabled(true);
      setMoves(prevMoves => prevMoves + 1);

      // Get both flipped cards
      const firstCardId = flipped[0];
      const secondCardId = id;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      // Check if they match
      if (firstCard.type === secondCard.type) {
        // Cards match - add to solved
        setSolved([...solved, firstCardId, secondCardId]);
        setFlipped([]);
        setDisabled(false);
      } else {
        // Cards don't match - flip back after delay
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Restart game with same difficulty
  const restartGame = () => {
    const newCards = generateCards();
    setCards(newCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setMoves(0);
    setGameComplete(false);
    setTimer(0);
    setTimerRunning(true);
  };

  // Calculate score based on time and moves
  const calculateScore = () => {
    const baseScore = 1000;
    const timeDeduction = Math.floor(timer * 0.5);
    const movesDeduction = moves * 10;
    const finalScore = Math.max(0, baseScore - timeDeduction - movesDeduction);
    return finalScore;
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameInfo}>
        <div className={styles.gameStats}>
          <div className={styles.statCard}>


            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {/* Up Arrow */}
                <polyline points="1 12 5 8 9 12" />
                <path d="M5 8v12" />

                {/* Down Arrow */}
                <polyline points="15 12 19 16 23 12" />
                <path d="M19 16V4" />
              </svg>
            </div>
            <div className={styles.statValue}>{moves}</div>
            <div className={styles.statLabel}>Moves</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className={styles.statValue}>{formatTime(timer)}</div>
            <div className={styles.statLabel}>Time</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <div className={styles.statValue}>{Math.round(solved.length / 2)}/{cardCount / 2}</div>
            <div className={styles.statLabel}>Pairs</div>
          </div>
        </div>
        <button className={styles.restartButton} onClick={restartGame}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">

            <path d="M2.5 12c0 5 4 9 9 9 3.1 0 5.9-1.6 7.5-4"></path>
            <path d="M20.3 15.5c.4-1.1.7-2.3.7-3.5 0-5-4-9-9-9-3.1 0-5.9 1.6-7.5 4"></path>
            <path d="M2.5 2v6h6"></path>
          </svg>
          Restart
        </button>
      </div>

      <div
        className={styles.gameBoard}
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`
        }}
      >
        {cards.map(card => (
          <Card
            key={card.id}
            id={card.id}
            type={card.type}
            flipped={flipped.includes(card.id)}
            solved={solved.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
            disabled={disabled}
          />
        ))}
      </div>

      {gameComplete && (
        <div className={styles.gameCompleteModal}>
          <div className={styles.modalContent}>
            <div className={styles.confetti}>🎉</div>
            <h2>Congratulations!</h2>
            <div className={styles.scoreBoard}>
              <div className={styles.scoreItem}>
                <span>Time</span>
                <span className={styles.scoreValue}>{formatTime(timer)}</span>
              </div>
              <div className={styles.scoreItem}>
                <span>Moves</span>
                <span className={styles.scoreValue}>{moves}</span>
              </div>
              <div className={styles.scoreItem}>
                <span>Score</span>
                <span className={styles.scoreValue}>{calculateScore()}</span>
              </div>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.playAgainBtn} onClick={restartGame}>Play Again</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}