// TypingArea.js
import React from 'react';

const TypingArea = ({ paragraph, charsRef, timeLeft, mistakes, WPM, CPM, resetGame }) => {
  return (
    <div className="typing-area">
      <div className="text">
        {paragraph.split('').map((char, index) => (
          <span
            key={index}
            ref={(el) => (charsRef.current[index] = el)}
            className={`char ${index === 0 ? 'active' : ''}`}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="stats">
        <p><strong>Time Left:</strong> {timeLeft}s</p>
        <p><strong>Mistakes:</strong> {mistakes}</p>
        <p><strong>WPM:</strong> {WPM}</p>
        <p><strong>CPM:</strong> {CPM}</p>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
};

export default TypingArea;
