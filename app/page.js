'use client';

import { useState } from 'react';
import Game from './components/Game';

export default function Home() {
  const [difficulty, setDifficulty] = useState('medium');
  const [gameStarted, setGameStarted] = useState(false);
  
  const startGame = (level) => {
    setDifficulty(level);
    setGameStarted(true);
  };
  
  return (
    <div className="container">
      <main>
        <h1 className="title">Memory Card Game</h1>
        
        {!gameStarted ? (
          <div className="menu">
            <h2>Select Difficulty</h2>
            <div className="button-group">
              <button onClick={() => startGame('easy')}>Easy (4x3)</button>
              <button onClick={() => startGame('medium')}>Medium (4x4)</button>
              <button onClick={() => startGame('hard')}>Hard (5x4)</button>
            </div>
          </div>
        ) : (
          <>
            <button className="back-button" onClick={() => setGameStarted(false)}>
              Back to Menu
            </button>
            <Game difficulty={difficulty} />
          </>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f0f2f5;
        }
        
        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 800px;
          width: 100%;
        }
        
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
          margin-bottom: 2rem;
          color: #333;
        }
        
        .menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }
        
        h2 {
          margin-top: 0;
          color: #444;
        }
        
        .button-group {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 1rem;
        }
        
        button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          background-color: #4a7dff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        button:hover {
          background-color: #3a6bdf;
        }
        
        .back-button {
          margin-bottom: 1rem;
          align-self: flex-start;
          background-color: #666;
        }
        
        .back-button:hover {
          background-color: #555;
        }
        
        @media (max-width: 600px) {
          .title {
            font-size: 2.5rem;
          }
          
          main {
            padding: 1rem 0;
          }
        }
      `}</style>
    </div>
  );
}