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
        {!gameStarted ? (
          <div className="menu-container">
            <h1 className="title">MemoMix</h1>
            <div className="menu">
              <h2>Select Difficulty</h2>
              <div className="button-group">
                <button 
                  className="difficulty-btn easy" 
                  onClick={() => startGame('easy')}
                >
                  Easy
                  <span className="difficulty-description">4×3 Grid</span>
                </button>
                <button 
                  className="difficulty-btn medium" 
                  onClick={() => startGame('medium')}
                >
                  Medium
                  <span className="difficulty-description">4×4 Grid</span>
                </button>
                <button 
                  className="difficulty-btn hard" 
                  onClick={() => startGame('hard')}
                >
                  Hard
                  <span className="difficulty-description">5×4 Grid</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="game-container">
            <div className="header">
              <h1 className="title game-title">MemoMix</h1>
              <button className="back-button" onClick={() => setGameStarted(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                Back
              </button>
            </div>
            <Game difficulty={difficulty} />
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #ffffff;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        main {
          width: 100%;
          max-width: 900px;
          padding: 2rem 1rem;
        }
        
        .menu-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
        }
        
        .title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
          text-align: center;
          background: linear-gradient(90deg, #ff8a00, #e52e71);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 2px 10px rgba(229, 46, 113, 0.2);
        }
        
        .game-title {
          font-size: 2.5rem;
          margin-bottom: 0;
          text-align: left;
        }
        
        .menu {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        h2 {
          margin-top: 0;
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #fff;
        }
        
        .button-group {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 1rem;
        }
        
        .difficulty-btn {
          position: relative;
          padding: 1.2rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          text-align: left;
          display: flex;
          flex-direction: column;
        }
        
        .difficulty-description {
          font-size: 0.85rem;
          opacity: 0.8;
          font-weight: 400;
          margin-top: 0.25rem;
        }
        
        .easy {
          background: linear-gradient(90deg, #3498db, #2980b9);
        }
        
        .medium {
          background: linear-gradient(90deg, #9b59b6, #8e44ad);
        }
        
        .hard {
          background: linear-gradient(90deg, #e74c3c, #c0392b);
        }
        
        .difficulty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
        }
        
        .difficulty-btn:active {
          transform: translateY(0);
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          width: 100%;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.2rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .game-container {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 2.5rem;
          }
          
          .game-title {
            font-size: 1.8rem;
          }
          
          .menu {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
