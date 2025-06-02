import React, { useEffect, useState } from 'react';
import './FutureAI.css'; // we'll create this CSS file

interface Repo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export default function FutureAI() {
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/AlanThomas321/ExpenseTracker")
      .then((res) => res.json())
      .then((data) => setRepo(data))
      .catch((err) => console.error("Failed to fetch repo:", err));
  }, []);

  if (!repo) return <p className="loading-text">Loading project...</p>;

  return (
    <div className="future-ai-container">
      <h2>🧠 Future Project Spotlight</h2>
      <div className="repo-card">
        <h3>
          <a href={repo.html_url} target="_blank" rel="noreferrer">
            {repo.name}
          </a>
        </h3>
        <p className="description">{repo.description}</p>
        <div className="repo-meta">
          <span>⭐ {repo.stargazers_count}</span>
          <span>{repo.language}</span>
        </div>
      </div>
    </div>
  );
}
