import React, { useEffect, useState } from "react";
import "./Web.css";
import AboutMe from "../apps/AboutMe.tsx";
import FutureAI from "../apps/apps.tsx";
import Contact from "../apps/Contact.tsx";
import Terminal from "../apps/Terminal.tsx";

function WebPage() {
  const [time, setTime] = useState(new Date());
  const [online, setOnline] = useState(navigator.onLine);
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);
  const [maximizedApps, setMaximizedApps] = useState<string[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [sizes, setSizes] = useState<Record<string, { width: number; height: number }>>({});
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.start-menu') &&
          !(e.target as HTMLElement).closest('.start-button')) {
        setShowStartMenu(false);
      }
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const icons = [
    { name: "About Me", icon: "👨‍💻" },
    { name: "Resume", icon: "📄" },
    { name: "Terminal", icon: "💻" },
    { name: "Projects", icon: "🚀" },
    { name: "Contact", icon: "📬" },
  ];

  const toggleApp = (appName: string) => {
    if (appName === "Resume"){
      window.open("/Alan Thomas_CV.pdf","_blank","noopener,noreferrer");
    }
    if (openApps.includes(appName)) {
      setOpenApps(openApps.filter(app => app !== appName));
    } else {
      setOpenApps([...openApps, appName]);
      setMinimizedApps(minimizedApps.filter(app => app !== appName));
      setMaximizedApps(maximizedApps.filter(app => app !== appName));
    }
  };

  const minimizeApp = (appName: string) => {
    setMinimizedApps([...minimizedApps, appName]);
  };

  const restoreApp = (appName: string) => {
    setMinimizedApps(minimizedApps.filter(app => app !== appName));
  };

  const maximizeApp = (appName: string) => {
    if (maximizedApps.includes(appName)) {
      setMaximizedApps(maximizedApps.filter(app => app !== appName));
    } else {
      setMaximizedApps([...maximizedApps, appName]);
    }
  };

  const handleDragStart = (e: React.MouseEvent, appName: string) => {
    const offsetX = e.clientX - (positions[appName]?.x || 60);
    const offsetY = e.clientY - (positions[appName]?.y || 60);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPositions(prev => ({
        ...prev,
        [appName]: {
          x: moveEvent.clientX - offsetX,
          y: moveEvent.clientY - offsetY,
        },
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleResize = (appName: string, width: number, height: number) => {
    setSizes(prev => ({
      ...prev,
      [appName]: { width, height },
    }));
  };

  const renderAppContent = (app: string) => {
    switch (app) {
      case "About Me":
        return <AboutMe />;
      case "Projects":
        return <FutureAI />;
      case "Contact":
        return <Contact/>;
      case "Terminal":
        return <Terminal/>;
      default:
        return <div>{app} content goes here...<button onClick={() => handleResize(app, 400, 300)}>Resize</button></div>;
    }
  };

  const getIconByAppName = (name: string) => {
    const found = icons.find(icon => icon.name === name);
    return found?.icon || "📦";
  };
  
  return (
    <div className="webos-container">
      <div className="desktop-icons">
        {icons.map((app, idx) => (
          <div className="icon" key={idx} onClick={() => toggleApp(app.name)}>
            <div className="icon-img">{app.icon}</div>
            <div className="icon-label">{app.name}</div>
          </div>
        ))}
      </div>

      {openApps.map(app => (
        !minimizedApps.includes(app) && (
          <div
            key={app}
            className={`app-window ${maximizedApps.includes(app) ? 'maximized' : ''}`}
            style={{
              top: maximizedApps.includes(app) ? 0 : positions[app]?.y || 100,
              left: maximizedApps.includes(app) ? 0 : positions[app]?.x || 100,
              width: maximizedApps.includes(app) ? '100%' : sizes[app]?.width || 600,
              height: maximizedApps.includes(app) ? '100%' : sizes[app]?.height || 400,
            }}
          >
            <div className="app-header" onMouseDown={(e) => handleDragStart(e, app)}>
              <span>{app}</span>
              <div>
                <button onClick={() => minimizeApp(app)}>-</button>
                <button onClick={() => maximizeApp(app)}>▢</button>
                <button onClick={() => toggleApp(app)}>×</button>
              </div>
            </div>
            <div className="app-content">
              {renderAppContent(app)}
            </div>
          </div>
        )
      ))}

      <div className="taskbar">
        <div className="start-button" onClick={() => setShowStartMenu(prev => !prev)}>Start</div>
        <div className="open-apps">
          {openApps.map((app, idx) => (
            <div key={idx} className="taskbar-app" onClick={() => minimizedApps.includes(app) ? restoreApp(app) : minimizeApp(app)} title={app}>
            <span className="taskbar-icon">{getIconByAppName(app)}</span>
          </div>
          
          ))}
        </div>
        <div className="taskbar-right">
          <span className="network-status">
            {online ? "📶 Online" : "❌ Offline"}
          </span>
          <span className="taskbar-time">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-item" onClick={() => toggleApp("About Me")}>👨‍💻 About Me</div>
          <div className="start-menu-item" onClick={() => toggleApp("Projects")}>🚀 Projects</div>
          <div className="start-menu-item" onClick={() => toggleApp("Terminal")}>💻 Terminal</div>
          <div className="start-menu-item" onClick={() => toggleApp("Resume")}>📄 Resume</div>
          <div className="start-menu-divider" />
          <div className="start-menu-item" onClick={() => window.location.reload()}>🔄 Restart</div>
        </div>
      )}
    </div>
  );
}

export default WebPage;
