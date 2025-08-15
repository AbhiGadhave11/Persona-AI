import { personas } from "../myData/personas";

export default function PersonaSelector({ currentPersona, setCurrentPersona }) {
  return (
    <aside className="left">
      <div className="panel-title">/ personas</div>
      <div className="persona-list">
        {personas.map((p) => {
          const active = currentPersona?.id === p.id;
          return (
            <button
              key={p.id}
              className={`persona-card ${active ? "active" : ""}`}
              onClick={() => setCurrentPersona(p)}
              style={
                active
                  ? {
                      boxShadow: `0 0 0 1px ${p.accent} inset, 0 0 18px ${p.accent}`,
                      borderColor: p.accent
                    }
                  : undefined
              }
              aria-pressed={active}
            >
              <img src={p.avatar} alt={p.name} className="avatar" />
              <div className="meta">
                <div className="name" style={{ color: p.accent }}>
                  {p.name}
                </div>
                <div className="hint">{p.promptHint}</div>
              </div>
              <div className="scanline-mask" />
            </button>
          );
        })}
      </div>
    </aside>
  );
}
