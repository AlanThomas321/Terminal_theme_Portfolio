import { useEffect, useRef, useState } from 'react';
import './landing.css';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const textRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const isTypingFinishedRef = useRef(false);

  useEffect(() => {
    const handleEnter = () => {
      if (isTypingFinishedRef.current) {
        navigate('/options');
      }
    };
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleEnter();
    };
  
    const handleTouch = () => handleEnter();
    const handleClick = () => handleEnter(); // fallback for taps on some browsers
  
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('click', handleClick);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('click', handleClick);
    };
  }, [navigate]);
  

  useEffect(() => {
    const lines = [
      "Starting the site....",
      "Booting up....",
      "Initializing sarcasm....",
      "Memory test failures: 0",
      "Loading optimism: OK",
      "Please think twice before typing...",
      "",
      "Please press ENTER or RETURN to continue",
    ];

    const tl = gsap.timeline();
    const finishedLines: string[] = [];

    lines.forEach((line) => {
      let currentLine = '';
      line.split('').forEach((char) => {
        tl.to({}, {
          duration: 0.1,
          onStart: () => {
            currentLine += char;
            const fullText = [...finishedLines, currentLine].join('\n');
            if (textRef.current) {
              textRef.current.innerHTML = fullText.replace(/\n/g, '<br/>');
            }
          }
        });
      });

      tl.to({}, {
        duration: 0.3,
        onStart: () => {
          finishedLines.push(line);
        }
      });
    });

    tl.to({}, {
      duration: 0,
      onComplete: () => {
        setIsTypingFinished(true);
        isTypingFinishedRef.current = true;
      }
    });
  }, []);

  return (
    <div className="body">
      <div className="name">
        <div ref={textRef} className="typed-text"></div>
      </div>
    </div>
  );
}

export default LandingPage;