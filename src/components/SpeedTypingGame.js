// SpeedTypingGame.js
import React, { useState, useEffect, useRef } from 'react';
import TypingArea from './TypingArea';
import './SpeedTypingGame.css';

const SpeedTypingGame = () => {
  const paragraphs = [
    `A plant is one of the most important living things that 
    develop on the earth and is made up of stems, leaves, 
    roots, and so on.Parts of Plants: The part of the plant
    that developed beneath the soil is referred to as root 
    and the part that grows outside of the soil is known as shoot.
    The shoot consists of stems, branches, leaves, fruits, 
    and flowers.Plants are made up of six main parts: roots, stems,
    leaves, flowers, fruits, and seeds.
    `,
    `The root is the part of the plant that grows in the soil. 
    The primary root emerges from the embryo.Its primary

    function is to provide the plant stability in the earth
    and make other mineral salts from the earth available to the plant
    for various metabolic
    processes There are three types of roots i.e.Tap Root, 
    Adventitious Roots, and Lateral Root.The roots arise from 
    the parts of the plant and not from the rhizomes roots.
    `,
    `Stem is the posterior part that remains above the ground 
    and grows negatively geotropic. Internodes and nodes are 
    found on the stem.Branch, bud, leaf, petiole, flower, and
    inflorescence on a node are all those parts of the plant 
    that remain above the ground and undergo negative subsoil 
    development.The trees have brown bark and the young and
    newly developed stems are green.The roots arise from the 
    parts of plant and not from the rhizomes roots.
    `,
    `It is the blossom of a plant. A flower is the part of a plant 
    that produces seeds, which eventually become other flowers.They 
    are the reproductive system of a plant. Most flowers consist of 
    04 main parts that are sepals, petals, stamens, and carpels.
    The female portion of the flower is the carpels.The majority 
    of flowers are hermaphrodites,
    meaning they have both male and female components.Others may 
    consist of one of two parts and may be male or female.
    `,
    `An aunt is a bassoon from the right perspective. 
    As far as we can estimate, some posit the melic myanmar to 
    be less than kutcha.One cannot separate foods from blowzy bows.
    The scampish closet reveals itself as a sclerous llama to 
    those who look.A hip is the skirt of a peak.Some hempy laundries 
    are thought of simply as orchids.A gum is a trumpet from 
    the right perspective.A freebie flight is a wrench of the mind.Some
    posit the croupy.
    `
];
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);

  const [selectedParagraph, setSelectedParagraph] = useState('');
  const inputRef = useRef(null);
  const charsRef = useRef([]);

  const loadParagraph = () => {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);

    charsRef.current.forEach((span) => {
      if (span) {
        span.classList.remove('correct', 'wrong', 'active');
      }
    });

    setSelectedParagraph(paragraphs[randomIndex]);
    setCharIndex(0);
    setMistakes(0);
    setTimeLeft(maxTime);
    setIsTyping(false);
    setWPM(0);
    setCPM(0);
    charsRef.current = [];
    if (inputRef.current) inputRef.current.value = '';
  };

  const updateStats = (currentIndex, mistakeCount) => {
    const elapsedTime = maxTime - timeLeft;
    if (elapsedTime > 0) {
      const cpm = (currentIndex - mistakeCount) * (60 / elapsedTime);
      const wpm = Math.round(((currentIndex - mistakeCount) / 5 / elapsedTime) * 60);
      setCPM(Math.max(0, Math.floor(cpm)));
      setWPM(Math.max(0, wpm));
    }
  };

  const handleInput = (e) => {
    const typedChar = e.target.value.slice(-1);
    const currentChar = selectedParagraph[charIndex];

    if (!isTyping) setIsTyping(true);

    if (typedChar === currentChar) {
      charsRef.current[charIndex].className = 'char correct';
    } else {
      charsRef.current[charIndex].className = 'char wrong';
      setMistakes((prev) => prev + 1);
    }

    charsRef.current[charIndex]?.classList.remove('active');
    charsRef.current[charIndex + 1]?.classList.add('active');

    const newIndex = charIndex + 1;
    setCharIndex(newIndex);
    updateStats(newIndex, mistakes);
  };

  const handleBackspace = (e) => {
    if (e.key !== 'Backspace' || charIndex <= 0 || timeLeft === 0) return;
  
    const prevIndex = charIndex - 1;
    const span = charsRef.current[prevIndex];
  
    if (!span) return;
  
    charsRef.current[charIndex]?.classList.remove('active');
    if (span.classList.contains('wrong')) {
      setMistakes((prev) => prev - 1);
    }
  
    span.classList.remove('correct', 'wrong');
    span.classList.add('active');
  
    setCharIndex(prevIndex);
    updateStats(prevIndex, mistakes);
  };
  

  const resetGame = () => {
    loadParagraph();
    inputRef.current.focus();
  };

  useEffect(() => {
    loadParagraph();
  }, []);

  useEffect(() => {
    if (!isTyping) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTyping(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTyping]);

  return (
    <div className="container" onClick={() => inputRef.current.focus()}>
      <input
        ref={inputRef}
        type="text"
        className="input-field"
        onChange={handleInput}
        onKeyDown={handleBackspace}
        disabled={timeLeft === 0}
        autoFocus
      />
      <TypingArea
        paragraph={selectedParagraph}
        charIndex={charIndex}
        charsRef={charsRef}
        timeLeft={timeLeft}
        mistakes={mistakes}
        WPM={WPM}
        CPM={CPM}
        resetGame={resetGame}
      />
    </div>
  );
};

export default SpeedTypingGame;
