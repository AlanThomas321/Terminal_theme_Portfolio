import { useEffect, useRef, useState } from 'react';
import './landing.css';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
//import typingSound from '../assets/typingSound.mp3';

function LandingPage() {
  const textRef = useRef<HTMLDivElement>(null);
 // const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const isTypingFinishedRef = useRef(false);

  // ✅ This listener now lives outside useEffect and always sees the latest ref
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isTypingFinishedRef.current) {
        navigate('/options');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // ✅ Separate effect just for typing animation
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

            //if (audioRef.current) {
              //const sound = audioRef.current.cloneNode() as HTMLAudioElement;
              //sound.play().catch(() => {});
            //}
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
        isTypingFinishedRef.current = true; // ✅ update this so listener sees it
      }
    });
  }, []);

  return (
    <div className="body">
      <div className="name">
        <div ref={textRef} className="typed-text"></div>
      </div>
     {/* <audio ref={audioRef} src={typingSound} preload="auto" />*/}
    </div>
  );
}

export default LandingPage;
