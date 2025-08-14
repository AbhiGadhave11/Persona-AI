// import { personas } from "../myData/personas";

// export default function PersonaSelector({ currentPersona, setCurrentPersona }) {
//   return (
//     <div className="p-4 space-y-4 bg-gray-100 border-r w-64">
//       <h2 className="text-xl font-bold">Choose Persona</h2>
//       {personas.map((p) => (
//         <div
//           key={p.id}
//           className={`p-3 rounded-lg cursor-pointer border flex items-center gap-3 ${
//             currentPersona?.id === p.id ? `border-${p.color}-500 bg-${p.color}-50` : "bg-white"
//           }`}
//           onClick={() => setCurrentPersona(p)}
//         >
//           <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full" />
//           <div>
//             <h3 className="font-semibold">{p.name}</h3>
//             <p className="text-sm text-gray-500">{p.tone.slice(0, 35)}...</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// import { personas } from "../myData/personas";
// import { motion } from "framer-motion";

// export default function PersonaSelector({ currentPersona, setCurrentPersona }) {
//   return (
//     <div className="p-4 space-y-4 bg-gray-200 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-700 w-64">
//       <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">Choose Persona</h2>
//       {personas.map((p) => (
//         <motion.div
//           key={p.id}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className={`p-3 rounded-lg cursor-pointer border flex items-center gap-3 transition ${
//             currentPersona?.id === p.id
//               ? `border-${p.color}-500 bg-${p.color}-50 dark:bg-${p.color}-900`
//               : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
//           }`}
//           onClick={() => setCurrentPersona(p)}
//         >
//           <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full" />
//           <div>
//             <h3 className="font-semibold text-gray-800 dark:text-gray-100">{p.name}</h3>
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               {p.tone.slice(0, 35)}...
//             </p>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// }

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
