import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useNavigate } from "react-router-dom";
import "./OptionsPage.css";
import keystroke from "../assets/typingSound.mp3";

gsap.registerPlugin(TextPlugin);

function OptionsPage() {
  const line1 = useRef<HTMLDivElement>(null);
  const line2 = useRef<HTMLDivElement>(null);
  const line3 = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const audio = new Audio(keystroke);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(line1.current, {
      duration: 2,
      text: "Hi, My name is Alan Thomas",
      ease: "power1.inOut",
    });
    gsap.to(line2.current, {
      duration: 3,
      text: "I am a Web Developer and this is my personal site",
      delay: 2.2,
      ease: "power1.inOut",
    });
    gsap.to(line3.current, {
      duration: 4,
      text: "To see available commands, type 'com' and hit ENTER",
      delay: 5.5,
      ease: "power1.inOut",
      onComplete: () => {
        setShowTerminal(true);
      },
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!showTerminal) return;

    if (e.key.length === 1) {
      audio.currentTime = 0;
      audio.play();
      setInput((prev) => prev + e.key);
    } else if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key === "Enter") {
      const trimmedInput = input.trim().toLowerCase();

      switch (trimmedInput) {
        case "com":
          setTerminalOutput((prev) => [
            ...prev,
            "",
            "Available commands:",
            "help       getting this help",
            "startx     access GUI",
            "shutdown   shut the site down",
            "reboot     restart the site",
            "clear      clear the terminal",
          ]);
          break;
        case "startx":
          navigate("/web");
          break;
        case "shutdown":
          navigate("/shutdown");
          break;
        case "reboot":
          navigate("/");
          break;
        case "clear":
          setTerminalOutput([]);
          break;
        default:
          setTerminalOutput((prev) => [
            ...prev,
            `Invalid command: ${input}`,
            "Type 'com' to show available commands.",
          ]);
      }

      setInput("");
    }
  };

  return (
    <div
      className="body"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.currentTarget.focus()}
    >
      <pre className="heading">
{String.raw`
    ______   __         ______   __    __       
 /      \ |  \       /      \ |  \  |  \      
|  $$$$$$\| $$      |  $$$$$$\| $$\ | $$      
| $$__| $$| $$      | $$__| $$| $$$\| $$      
| $$    $$| $$      | $$    $$| $$$$\ $$      
| $$$$$$$$| $$      | $$$$$$$$| $$\$$ $$      
| $$  | $$| $$_____ | $$  | $$| $$ \$$$$      
| $$  | $$| $$     \| $$  | $$| $$  \$$$      
 \$$   \$$ \$$$$$$$$ \$$   \$$ \$$   \$$   
 
 

`}
      </pre>
      <div className="intro">
        <div ref={line1}></div>
        <div ref={line2}></div>
        <br />
        <div ref={line3} className="line3"></div>

        <pre className="terminal-output">
          {terminalOutput.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </pre>

        {showTerminal && (
          <div className="terminal-wrapper">
            <span className="input-label">user@alan:~$</span>&nbsp;
            <span className="terminal-input">{input}</span>
            <span className="cursor">█</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OptionsPage;
