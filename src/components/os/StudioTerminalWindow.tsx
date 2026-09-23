"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { soundManager } from "@/lib/sound";
import { type AppId } from "./apps";
import { SpaceShooterGame } from "./SpaceShooterGame";

interface TerminalProps {
  onOpen?: (id: AppId) => void;
}

interface CommandLog {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "system";
}

export function StudioTerminalWindow({ onOpen }: TerminalProps) {
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [logs, setLogs] = useState<CommandLog[]>([
    { id: 1, text: "Udaan Labs Studio Kernel v2.4 (x86_64-wasm)", type: "system" },
    { id: 2, text: "Type 'help' to view available studio commands or 'space' to play Space Shooter.", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlayingGame) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isPlayingGame]);

  const handleGameExit = (finalScore = 0, finalWave = 1) => {
    setIsPlayingGame(false);
    soundManager.playClick();
    setLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `[MISSION REPORT - RETRO SPACE SHOOTER]
  ════════════════════════════════════════
  Status      : FIGHTER PILOT RETURNED
  Sector Wave : Wave ${finalWave}
  Final Score : ${finalScore.toLocaleString()} PTS
  System      : Udaan Space Defense Core Standby
  ════════════════════════════════════════`,
        type: "output",
      },
      {
        id: Date.now() + 1,
        text: "Type 'space' or 'shooter' to relaunch arcade mission.",
        type: "system",
      },
    ]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playClick();
    const newLogs: CommandLog[] = [
      ...logs,
      { id: Date.now(), text: `$ ${input}`, type: "input" },
    ];

    if (cmd === "help") {
      newLogs.push({
        id: Date.now() + 1,
        text: `AVAILABLE COMMANDS:
  • help          - Show this command manual
  • space / shoot - Launch Retro Space Shooter Arcade 🚀
  • projects      - Launch selected production work
  • services      - List studio engineering capabilities
  • contact       - Start a project / direct email
  • sfx           - Toggle sound effects
  • matrix        - Activate live background grid
  • clear         - Clear terminal console`,
        type: "output",
      });
    } else if (
      cmd === "space" ||
      cmd === "shooter" ||
      cmd === "spaceshooter" ||
      cmd === "invaders" ||
      cmd === "play" ||
      cmd === "game"
    ) {
      newLogs.push({
        id: Date.now() + 1,
        text: "INITIALIZING RETRO SPACE SHOOTER CRT CORE...",
        type: "output",
      });
      setLogs(newLogs);
      setInput("");
      setIsPlayingGame(true);
      return;
    } else if (cmd === "projects" || cmd === "work") {
      onOpen?.("projects");
      newLogs.push({ id: Date.now() + 1, text: "Opening Selected Work [02_WRK]...", type: "output" });
    } else if (cmd === "services" || cmd === "skills") {
      onOpen?.("services");
      newLogs.push({ id: Date.now() + 1, text: "Opening Studio Capabilities [03_CAP]...", type: "output" });
    } else if (cmd === "contact" || cmd === "email") {
      onOpen?.("contact");
      newLogs.push({ id: Date.now() + 1, text: "Opening Dispatch / Contact [05_DSP]...", type: "output" });
    } else if (cmd === "sfx" || cmd === "sound") {
      const next = !soundManager.isEnabled();
      soundManager.setEnabled(next);
      newLogs.push({ id: Date.now() + 1, text: `Sound FX toggled: ${next ? "ENABLED" : "MUTED"}`, type: "output" });
    } else if (cmd === "clear") {
      setLogs([]);
      setInput("");
      return;
    } else if (cmd === "matrix") {
      onOpen?.("wallpaper");
      newLogs.push({ id: Date.now() + 1, text: "Live Matrix Canvas active.", type: "output" });
    } else {
      newLogs.push({
        id: Date.now() + 1,
        text: `command not found: '${cmd}'. Type 'help' or 'space' to play.`,
        type: "error",
      });
    }

    setLogs(newLogs);
    setInput("");
  };

  if (isPlayingGame) {
    return <SpaceShooterGame onExit={handleGameExit} />;
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="h-full min-h-[340px] flex flex-col bg-[#111111] text-[#fbf8f2] font-mono text-xs p-3 select-text cursor-text"
    >
      <div className="flex-1 overflow-y-auto space-y-1 pb-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`whitespace-pre-wrap leading-relaxed ${
              log.type === "input"
                ? "text-yellow font-bold"
                : log.type === "error"
                ? "text-orange"
                : log.type === "system"
                ? "text-faint"
                : "text-green"
            }`}
          >
            {log.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Launch Chips for Mobile & Fast Access */}
      <div className="flex items-center gap-1.5 py-1.5 overflow-x-auto shrink-0 border-t border-ink/40 text-[10px]">
        <span className="text-muted shrink-0 text-[9px] uppercase font-bold">Quick:</span>
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setIsPlayingGame(true);
          }}
          className="shrink-0 px-2 py-0.5 bg-yellow text-ink font-bold rounded hover:bg-yellow/90 active:scale-95 transition-transform flex items-center gap-1"
        >
          🚀 Play Space Shooter
        </button>
        <button
          type="button"
          onClick={() => {
            setInput("help");
            setTimeout(() => {
              const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
              // Trigger help
              soundManager.playClick();
              setLogs((prev) => [
                ...prev,
                { id: Date.now(), text: "$ help", type: "input" },
                {
                  id: Date.now() + 1,
                  text: `AVAILABLE COMMANDS:
  • help          - Show this command manual
  • space / shoot - Launch Retro Space Shooter Arcade 🚀
  • projects      - Launch selected production work
  • services      - List studio engineering capabilities
  • contact       - Start a project / direct email
  • sfx           - Toggle sound effects
  • matrix        - Activate live background grid
  • clear         - Clear terminal console`,
                  type: "output",
                },
              ]);
            }, 50);
          }}
          className="shrink-0 px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-muted hover:text-cream rounded"
        >
          help
        </button>
        <button
          type="button"
          onClick={() => onOpen?.("projects")}
          className="shrink-0 px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-muted hover:text-cream rounded"
        >
          projects
        </button>
        <button
          type="button"
          onClick={() => onOpen?.("contact")}
          className="shrink-0 px-1.5 py-0.5 bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-muted hover:text-cream rounded"
        >
          contact
        </button>
      </div>

      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-1.5 border-t border-ink/40">
        <span className="text-yellow font-bold shrink-0">udaan@studio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type 'space' or 'help'..."
          className="flex-1 bg-transparent text-[#fbf8f2] focus:outline-none placeholder:text-muted/50 min-w-0"
        />
      </form>
    </div>
  );
}
