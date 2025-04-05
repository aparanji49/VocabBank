import { useState } from "react";
import "./Flashcard.css";

function Flashcard({ word }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        {/* Front side: only word */}
        <div className="front bg-white rounded-xl shadow p-6 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-indigo-700">{word.word}</h3>
        </div>

        {/* Back side: meaning and example */}
        <div className="back bg-indigo-50 rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-indigo-700">{word.word}</h3>
          <p className="mt-2 text-gray-800">{word.meaning}</p>
          {word.example && (
            <>
              <p className="mt-3 text-sm text-slate-800 italic">Example:</p>
              <p className="text-slate-700">{word.example}</p>
            </>
          )}
          {!word.example && (
            <p className="mt-3 text-sm italic text-gray-400">
              No example provided.
            </p>
          )}
          <p className="mt-3 text-xs text-gray-500 text-right">Click to go back</p>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
