// import { useState } from 'react'
// import ChatWindow from './components/ChatWindow'
// import PersonaSelector from './components/PersonaSelector'
// import './App.css'

// function App() {
//   const [currentPersona, setCurrentPersona] = useState(null);

//   return (
//     <div className="flex h-screen">
//       <PersonaSelector
//         currentPersona={currentPersona}
//         setCurrentPersona={setCurrentPersona}
//       />
//       <ChatWindow persona={currentPersona} />
//     </div>
//   );
// }

// export default App

// import { useState, useEffect } from "react";
// import PersonaSelector from "./components/PersonaSelector";
// import ChatWindow from "./components/ChatWindow";

// export default function App() {
//   const [currentPersona, setCurrentPersona] = useState(null);
//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//     localStorage.setItem("theme", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   return (
//     <div className={`flex flex-col h-screen ${darkMode ? "dark" : ""}`}>
//       {/* HEADER */}
//       <header className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white dark:bg-black">
//         <h1 className="text-2xl font-bold">🎭 Persona AI</h1>
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
//         >
//           {darkMode ? "☀️" : "🌙"}
//         </button>
//       </header>

//       {/* MAIN LAYOUT */}
//       <div className="flex flex-1 bg-gray-100 dark:bg-gray-900">
//         <PersonaSelector
//           currentPersona={currentPersona}
//           setCurrentPersona={setCurrentPersona}
//         />
//         <ChatWindow persona={currentPersona} />
//       </div>
//     </div>
//   );
// }



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
