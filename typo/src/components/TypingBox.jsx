import { useState, useEffect, useRef, useCallback } from "react";
import ShowResult from "./ShowResult";

export default function TypingBox() {
  const [targetWords, setTargetWords] = useState([]);
  const [visibleWords, setVisibleWords] = useState([]);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLimit, setTimeLimit] = useState(60);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [stats, setStats] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const typingSound = useRef(new Audio("/sounds/typing.mp3"));

  useEffect(() => {
    const words = generateWords(300);
    setTargetWords(words);
    setVisibleWords(words.slice(0, 30));
  }, []);

const handleKeyDown = (e) => {
  if (finished) return;

  // Prevent arrow scrolling
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
    e.preventDefault();

  // ✅ Start timer ONLY when first real character is typed
  if (!started && e.key.length === 1 && e.key !== " ") {
    setStarted(true);
    startTimer(); // <-- Start the timer when typing starts
  }

  // ✅ Handle backspace
  if (e.key === "Backspace") {
    setTyped((prev) => prev.slice(0, -1));
    return;
  }

  // ✅ Add typed character
  if (e.key.length === 1) {
    setTyped((prev) => prev + e.key);
  }

  // ✅ Shift words when enough typed
  if (e.key === " ") {
    e.preventDefault();
    const wordsTyped = typed.trim().split(" ").length;
    if (wordsTyped - currentIndex >= 10) shiftWords();
  }
};



  const shiftWords = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 10;
      const nextVisible = targetWords.slice(newIndex, newIndex + 30);
      if (nextVisible.length < 30) {
        const extra = generateWords(50);
        const newTarget = [...targetWords, ...extra];
        setTargetWords(newTarget);
        setVisibleWords(newTarget.slice(newIndex, newIndex + 30));
      } else {
        setVisibleWords(nextVisible);
      }
      return newIndex;
    });
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const calculateStats = useCallback(() => {
    const joinedTarget = targetWords.join(" ");
    const elapsed = Math.max(1, timeLimit - timeLeft);
    const total = typed.length;
    const correct = typed.split("").filter((c, i) => c === joinedTarget[i]).length;

    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const wpm = elapsed > 0 ? Math.round((correct / 5) / (elapsed / 60)) : 0;
    const raw = elapsed > 0 ? Math.round((total / 5) / (elapsed / 60)) : 0;

    setStats({
      wpm: isFinite(wpm) ? wpm : 0,
      raw: isFinite(raw) ? raw : 0,
      accuracy: isFinite(accuracy) ? accuracy.toFixed(1) : 0,
      correct,
      total,
      elapsed,
    });
  }, [typed, targetWords, timeLimit, timeLeft]);

  const endTest = () => {
    setFinished(true);
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (finished) {
      calculateStats();
    }
  }, [finished, calculateStats]);

  const restart = () => {
    const newWords = generateWords(300);
    setTargetWords(newWords);
    setVisibleWords(newWords.slice(0, 30));
    setTyped("");
    setStarted(false);
    setFinished(false);
    setTimeLeft(timeLimit);
    setStats({});
    setCurrentIndex(0);
  };

  const renderWords = () => {
    const visibleText = visibleWords.join(" ");
    return visibleText.split("").map((char, i) => {
      const globalIndex = currentIndex * 6 + i;
      let color = "text-gray-400";
      if (typed[globalIndex]) {
        color =
          typed[globalIndex] === char
            ? "text-teal-600 dark:text-cyan-400"
            : "text-red-500";
      }
      return (
        <span key={i} className={`${color} transition-colors duration-100`}>
          {char}
        </span>
      );
    });
  };

  if (finished) {
    return <ShowResult stats={stats} onRestart={restart} />;
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full mx-auto bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl shadow-xl border border-teal-500/40 rounded-2xl p-10 outline-none cursor-text select-none mt-20 relative"
    >
      {/* Animated Timer Progress */}
     {started && (
  <div
    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
    style={{ width: `${(timeLeft / timeLimit) * 100}%`, transition: "width 1s linear" }}
  ></div>
)}


      {!started && (
        <div className="flex justify-center mb-6 space-x-3">
          {[15, 30, 60, 120].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTimeLimit(t);
                setTimeLeft(t);
              }}
              className={`px-4 py-1.5 rounded-full border ${
                timeLimit === t
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md"
                  : "border-gray-300 text-gray-600 dark:text-gray-300 hover:border-cyan-500"
              } transition-all`}
            >
              {t}s
            </button>
          ))}
        </div>
      )}

      <div className="text-2xl font-medium leading-relaxed text-center tracking-wide mb-6 h-32 overflow-hidden">
        {renderWords()}
        {started && !finished && (
          <span className="inline-block w-1 bg-teal-400 animate-pulse ml-0.5 h-5"></span>
        )}
      </div>

     {started && (
  <div
    className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
    style={{ width: `${(timeLeft / timeLimit) * 100}%`, transition: "width 1s linear" }}
  ></div>
)}


      <div className="flex justify-center mt-6">
        <button
          onClick={restart}
          className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full hover:opacity-90 transition-all shadow-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function generateWords(count = 50) {
  const words = [
    "focus", "keyboard", "speed", "type", "flow", "mind", "precision", "skill",
    "energy", "light", "future", "create", "train", "goal", "motion", "dream",
    "swift", "clear", "fast", "balance", "time", "space", "shift", "logic",
    "typing", "learn", "control", "power", "effort", "steady"
  ];
  return Array.from({ length: count }, () =>
    words[Math.floor(Math.random() * words.length)]
  );
}
