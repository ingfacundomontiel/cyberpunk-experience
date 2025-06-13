import { useState, useEffect } from "react";

interface DataLogsProps {
  isAttackMode: boolean;
}

const attackLogs = [
  "INTRUSION DETECTED: 192.168.1.1",
  "FIREWALL BREACH: PORT 443",
  "MALWARE SIGNATURE: TROJAN.WIN32",
  "UNAUTHORIZED ACCESS: ADMIN PANEL",
  "DATA EXFILTRATION: 2.3GB",
  "BOTNET ACTIVITY: 127 NODES",
  "SQL INJECTION: USER_TABLE",
  "PRIVILEGE ESCALATION: ROOT ACCESS",
];

const safeLogs = [
  "SYSTEM SCAN: COMPLETE",
  "FIREWALL: ACTIVE",
  "ANTIVIRUS: UPDATED",
  "BACKUP: SUCCESSFUL",
  "ENCRYPTION: ENABLED",
  "MONITORING: ACTIVE",
  "PATCHES: UP TO DATE",
  "SECURITY: OPTIMAL",
];

export default function DataLogs({ isAttackMode }: DataLogsProps) {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const logSource = isAttackMode ? attackLogs : safeLogs;

    const interval = setInterval(
      () => {
        const newLog = logSource[Math.floor(Math.random() * logSource.length)];
        setLogs((prev) => [newLog, ...prev.slice(0, 9)]); // Keep only 10 logs
      },
      isAttackMode ? 800 : 2000,
    );

    return () => clearInterval(interval);
  }, [isAttackMode]);

  return (
    <div className="mt-4 bg-black border border-gray-700 p-4 h-48 overflow-hidden">
      <div className={`font-mono text-xs mb-2 ${isAttackMode ? "text-red-400" : "text-green-400"}`}>SYSTEM LOGS</div>
      <div className="space-y-1">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`font-mono text-xs transition-opacity duration-500 ${
              isAttackMode ? "text-red-300" : "text-green-300"
            }`}
            style={{ opacity: 1 - index * 0.1 }}
          >
            [{new Date().toLocaleTimeString()}] {log}
          </div>
        ))}
      </div>
    </div>
  );
} 