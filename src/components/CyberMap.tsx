import { useState, useEffect } from "react";

interface CyberMapProps {
  isAttackMode: boolean;
}

export default function CyberMap({ isAttackMode }: CyberMapProps) {
  const [attacks, setAttacks] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    if (!isAttackMode) {
      setAttacks([]);
      return;
    }

    const interval = setInterval(() => {
      setAttacks((prev) => [
        ...prev.slice(-20), // Keep only last 20 attacks
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        },
      ]);
    }, 500);

    return () => clearInterval(interval);
  }, [isAttackMode]);

  return (
    <div className="relative w-full h-64 bg-black border border-gray-700 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50" />

      {/* World Map Outline */}
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 50">
        <path
          d="M10,25 Q20,20 30,25 Q40,30 50,25 Q60,20 70,25 Q80,30 90,25"
          stroke={isAttackMode ? "#ff0000" : "#00ff00"}
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M15,35 Q25,30 35,35 Q45,40 55,35 Q65,30 75,35 Q85,40 95,35"
          stroke={isAttackMode ? "#ff0000" : "#00ff00"}
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* Attack Points */}
      {attacks.map((attack) => (
        <div
          key={attack.id}
          className={`absolute w-2 h-2 rounded-full animate-ping ${isAttackMode ? "bg-red-500" : "bg-green-500"}`}
          style={{
            left: `${attack.x}%`,
            top: `${attack.y}%`,
          }}
        />
      ))}

      {/* Status Text */}
      <div className="absolute bottom-2 left-2 font-mono text-xs">
        <div className={isAttackMode ? "text-red-400" : "text-green-400"}>
          {isAttackMode ? "ACTIVE THREATS DETECTED" : "ALL SYSTEMS SECURE"}
        </div>
        <div className="text-gray-500">{isAttackMode ? `${attacks.length} ACTIVE ATTACKS` : "NO THREATS DETECTED"}</div>
      </div>
    </div>
  );
} 