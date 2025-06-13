import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  isActive: boolean;
}

export default function GlitchText({ text, className = "", isActive }: GlitchTextProps) {
  const [glitchedText, setGlitchedText] = useState(text);

  useEffect(() => {
    if (!isActive) {
      setGlitchedText(text);
      return;
    }

    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newText = text
          .split("")
          .map((char) => {
            if (char === " ") return char;
            return Math.random() > 0.9 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char;
          })
          .join("");
        setGlitchedText(newText);

        setTimeout(() => setGlitchedText(text), 100);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [text, isActive]);

  return (
    <h1
      className={`font-mono ${isActive ? "text-red-400" : "text-green-400"} ${className} transition-colors duration-1000`}
    >
      {glitchedText}
    </h1>
  );
} 