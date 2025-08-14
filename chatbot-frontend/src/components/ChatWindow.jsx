// import { useState } from "react";

// export default function ChatWindow({ persona }) {
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Please select a persona to start chatting!" }
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     // Simulated Persona AI
//     setTimeout(() => {
//       let reply = "";
//       if (persona?.id === "hitesh") {
//         reply = `Bhai, ${input}? Dekh, code likh aur seekh, baki tension mat le!`;
//       } else if (persona?.id === "piyush") {
//         reply = `Arre waah! ${input}? Chal, turant project bana dete hain!🔥`;
//       } else {
//         reply = "Please select a persona.";
//       }
//       setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
//     }, 500);

//     setInput("");
//   };

//   return (
//     <div className="flex-1 flex flex-col bg-white">
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`max-w-xs p-3 rounded-lg ${
//               msg.sender === "bot"
//                 ? `bg-${persona?.color || "gray"}-100 text-gray-800 self-start`
//                 : "bg-gray-800 text-white self-end"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div className="p-3 flex gap-2 border-t">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder={
//             persona ? `Talk to ${persona.name}...` : "Select a persona first..."
//           }
//           className="flex-1 border rounded px-3 py-2"
//         />
//         <button
//           onClick={sendMessage}
//           className={`px-4 py-2 rounded bg-${persona?.color || "gray"}-500 text-white`}
//           disabled={!persona}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function ChatWindow({ persona }) {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const bottomRef = useRef(null);

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);

//     setTimeout(() => {
//       let reply = persona
//         ? persona.id === "hitesh"
//           ? `Bhai, ${input}? Dekh, code likh aur seekh, baki tension mat le!`
//           : `Arre waah! ${input}? Chal, turant project bana dete hain!🔥`
//         : "Please select a persona first.";
//       setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
//     }, 500);

//     setInput("");
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         {messages.map((msg, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, x: msg.sender === "bot" ? -30 : 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`max-w-xs p-3 rounded-lg ${
//               msg.sender === "bot"
//                 ? `bg-${persona?.color || "gray"}-100 dark:bg-${persona?.color || "gray"}-700 text-gray-800 dark:text-white self-start`
//                 : "bg-gray-800 text-white self-end"
//             }`}
//           >
//             {msg.text}
//           </motion.div>
//         ))}
//         <div ref={bottomRef} />
//       </div>

//       <div className="p-3 flex gap-2 border-t border-gray-300 dark:border-gray-700">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder={persona ? `Talk to ${persona.name}...` : "Select a persona first..."}
//           className="flex-1 border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
//         />
//         <button
//           onClick={sendMessage}
//           className={`px-4 py-2 rounded bg-${persona?.color || "gray"}-500 text-white`}
//           disabled={!persona}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ChatWindow({ persona }) {
  const [messages, setMessages] = useState([]);
   // Reset chat when persona changes
  useEffect(() => {
    if (persona) {
      setMessages([
        {
          id: "intro",
          sender: "assistant",
          text: `Boot sequence complete for ${persona.name}. Start typing... (User → left, Assistant → right)`,
          done: true,
          accent: persona?.accent ?? "#00ff9c",
        },
      ]);
    }
  }, [persona]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function typewriterInsert(text, sender = "assistant", accent = "#00ff9c") {
    // Create a message with typewriter animation for assistant
    const id = Math.random().toString(36).slice(2);
    setMessages((prev) => [
      ...prev,
      { id, sender, text: "", fullText: text, done: false, accent },
    ]);

    let i = 0;
    // const speed = 14; // chars per tick
    const interval = setInterval(() => {
      i += 1;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, text: m.fullText.slice(0, i), done: i >= m.fullText.length }
            : m
        )
      );
      if (i >= text.length) clearInterval(interval);
    }, 18);
  }

//   function personaReply(userText) {
//     if (!persona) return "Please select a persona first.";
//     if (persona.id === "hitesh") {
//       return `Bhai, "${userText}"? Dekh, basics strong kar. Daily 1 hour code, aur projects pe kaam kar. Consistency >> motivation. Chal, ab ek chhota feature implement karke dekh!`;
//     }
//     // piyush
//     return `Arey mast! "${userText}" — seedha project bana. Feature list likh, 30–60 mins me MVP. Shipping > Perfection. Chal, deploy karte hain! 🚀`;
//   }

  async function sendMessage(){
    const text = input.trim();
    if (!text) return;
    // User message (LEFT)
    // setMessages((prev) => [
    //   ...prev,
    //   { id: Math.random().toString(36).slice(2), 
    //     sender: "user", 
    //     text, 
    //     done: true 
    //   },
    // ]);
    const newMessages = [
      ...messages,
      { id: Math.random().toString(36).slice(2), sender: "user", text, done: true },
    ];
    setMessages(newMessages);
    setInput("");

    // Assistant reply (RIGHT) with typewriter
    // const reply = personaReply(text);
    // const accent = persona?.accent ?? "#00ff9c";
    // setTimeout(() => typewriterInsert(reply, "assistant", accent), 200);
    
    try {
      // Send full history to backend
      const res = await axios.post("https://persona-ai-ro5l.onrender.com/api/chat", {
        personasId: persona?.id,
        message: newMessages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      });

      const reply = res.data.reply || "No reply from server.";
      const accent = persona?.accent ?? "#00ff9c";
      setTimeout(() => typewriterInsert(reply, "assistant", accent), 200);
    } catch (err) {
      console.error(err);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <section className="right" style={{overflowY: "auto"}}>
      <div className="panel-title">/ chat</div>

      <div className="chat">
        {messages.map((m) => (
          <MessageBubble key={m.id} m={m} persona={persona} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="input-bar">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Type to talk with ${persona?.name ?? "a persona"}...`}
          className="input"
          rows={2}
        />
        <button className="send" onClick={sendMessage}>
          SEND ▷
        </button>
      </div>
    </section>
  );
}

function MessageBubble({ m, persona }) {
  const isUser = m.sender === "user";
  const alignClass = isUser ? "left-bubble" : "right-bubble";
  const accent = isUser ? "#19f0ff" : m.accent || persona?.accent || "#00ff9c";

  return (
    <div className={`row ${isUser ? "left" : "right"}`}>
      <div
        className={`bubble ${alignClass} ${m.done ? "done" : "typing"}`}
        style={{
          borderColor: accent,
          boxShadow: `0 0 12px ${accent}55`,
        }}
      >
        <pre className="bubble-text" style={{ color: accent }}>
          {m.text}
          {!m.done && <span className="caret">▌</span>}
        </pre>
        <div className="bubble-scan" />
      </div>
    </div>
  );
}
