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
    const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🦁', '🐯', '🦄', '🐝', '🦋', '🐢', '🦖', '🦕'];
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

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameInfo}>
        <div className={styles.stats}>
          <div>Moves: {moves}</div>
          <div>Time: {formatTime(timer)}</div>
        </div>
        <button className={styles.restartButton} onClick={restartGame}>
          Restart Game
        </button>
      </div>
      
      {gameComplete && (
        <div className={styles.gameComplete}>
          <h2>Congratulations!</h2>
          <p>You completed the game in {moves} moves and {formatTime(timer)}.</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
      
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
    </div>
  );
}
