"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { soundManager } from "@/lib/sound";
import { type AppId } from "./apps";

interface TerminalProps {
  onOpen?: (id: AppId) => void;
}

interface CommandLog {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "system";
}

export function StudioTerminalWindow({ onOpen }: TerminalProps) {
  const [logs, setLogs] = useState<CommandLog[]>([
    { id: 1, text: "Udaan Labs Studio Kernel v2.4 (x86_64-wasm)", type: "system" },
    { id: 2, text: "Type 'help' to view available studio commands.", type: "system" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

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
  • projects      - Launch selected production work
  • services      - List studio engineering capabilities
  • contact       - Start a project / direct email
  • sfx           - Toggle sound effects
  • matrix        - Activate live background grid
  • clear         - Clear terminal console`,
        type: "output",
      });
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
        text: `command not found: '${cmd}'. Type 'help' for manual.`,
        type: "error",
      });
    }

    setLogs(newLogs);
    setInput("");
  };

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

      <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2 border-t border-ink/40">
        <span className="text-yellow font-bold">udaan@studio:~$</span>
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type command here..."
          className="flex-1 bg-transparent text-[#fbf8f2] focus:outline-none placeholder:text-muted/50"
        />
      </form>
    </div>
  );
}
