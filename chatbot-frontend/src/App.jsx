import { useEffect, useState } from "react";
import PersonaSelector from "./components/PersonaSelector.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { personas } from "./MyData/personas.js";

export default function App() {
  const [currentPersona, setCurrentPersona] = useState(personas[0]); // default Hitesh

  // Add a retro “boot up” flicker once on mount (purely visual)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("boot-flicker");
    const t = setTimeout(() => root.classList.remove("boot-flicker"), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="app crt">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <span className="logo">PERSONA</span>
          <span className="logo-alt">TERMINAL</span>
          <span className="cursor">_</span>
        </div>
        <div className="persona-tag">
          <span className="dot" />
          <span className="persona-name">{currentPersona.name}</span>
        </div>
      </header>

      {/* Main Grid */}
      <main className="main">
        <PersonaSelector
          currentPersona={currentPersona}
          setCurrentPersona={setCurrentPersona}
        />
        <ChatWindow persona={currentPersona} />
      </main>
    </div>
  );
}
