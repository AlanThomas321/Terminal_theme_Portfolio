import { useState } from "react";
import './Terminal.css';

const commands = {
  help: `Available commands:\n- help: Show this help menu\n- clear: Clear the screen\n- about: Who I am\n- date: Show current date/time\n- echo [text]: Print text\n- projects: Show featured projects\n- resume: Open resume in new tab\n- contact: Show contact links\n- shutdown: Close all apps\n- cmd: Alias for help`,

  cmd: `Available commands:\n- help\n- clear\n- about\n- date\n- echo [text]\n- projects\n- resume\n- contact\n- shutdown`,

  about: "I am Alan Thomas, a full stack developer with 1.5 years of experience.",
  date: () => new Date().toString(),
  projects: `GitHub Projects:\n- Portfolio: https://github.com/AlanThomas321/Terminal_theme_Portfolio\n- Budget Tracker: https://github.com/AlanThomas321/Budget-Tracker-AI`,
  resume: "Opening resume in a new tab...",
  contact: `Contact Me:\n- Email: alanthomas2999@gmail.com\n- GitHub: https://github.com/AlanThomas321\n- LinkedIn: https://www.linkedin.com/in/alan-thomas-dev`,
  shutdown: "System shutting down... (Pretend mode)",
};

export default function Terminal() {
  const [lines, setLines] = useState(["Type `cmd` or `help` to see commands"]);
  const [input, setInput] = useState("");

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const command = input.trim();
      let output = "";

      if (command === "clear") {
        setLines([]);
        setInput("");
        return;
      } else if (commands[command]) {
        const result = commands[command];
        output = typeof result === "function" ? result() : result;

        if (command === "resume") {
          window.open("/Alan Thomas_CV.pdf", "_blank");
        }
      } else if (command.startsWith("echo ")) {
        output = command.slice(5);
      } else {
        output = `Command not found: ${command}`;
      }

      setLines((prev) => [...prev, `> ${command}`, output]);
      setInput("");
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-output">
        {lines.map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
      <div className="terminal-input">
        <span>&gt; </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
    </div>
  );
}
