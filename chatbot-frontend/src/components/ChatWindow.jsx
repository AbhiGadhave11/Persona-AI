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

  async function sendMessage(){
    const text = input.trim();
    if (!text) return;
    const newMessages = [
      ...messages,
      { id: Math.random().toString(36).slice(2), sender: "user", text, done: true },
    ];
    setMessages(newMessages);
    setInput("");
    
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
