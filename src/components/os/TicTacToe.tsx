"use client";

import { useMemo, useState } from "react";
import { Close, Checkbox, Reload, Trophy } from "pixelarticons/react";

type Cell = "X" | "O" | null;
type Board = Cell[];

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

function winnerOf(board: Board): Cell | "draw" | null {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(Boolean)) return "draw";
  return null;
}

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

  const result = useMemo(() => winnerOf(board), [board]);
  const locked = result !== null;

  function play(i: number) {
    if (locked || board[i]) return;
    const next = board.slice() as Board;
    next[i] = xTurn ? "X" : "O";
    setBoard(next);
    const w = winnerOf(next);
    if (w === "X" || w === "O" || w === "draw") {
      setScore((s) => ({
        ...s,
        ...(w === "draw" ? { draw: s.draw + 1 } : { [w]: s[w] + 1 }),
      }));
    } else {
      setXTurn((t) => !t);
    }
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  }

  function resetAll() {
    resetBoard();
    setScore({ X: 0, O: 0, draw: 0 });
  }

  const status =
    result === "X" || result === "O"
      ? `${result} wins!`
      : result === "draw"
        ? "Draw!"
        : `${xTurn ? "X" : "O"} turn`;

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold md:text-2xl">
            <Trophy width={24} height={24} className="pixel-icon" />
            Tic Tac Toe
          </h2>
          <p className="mt-1 text-sm text-muted">Two players, one screen.</p>
        </div>
        <button type="button" onClick={resetAll} className="nb-btn px-3 py-2 text-[10px]">
          Reset score
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 border-2 border-ink bg-paper p-3 font-mono">
        <div className="border border-ink bg-yellow px-2 py-2 text-center shadow-[1px_1px_0_0_#111111]">
          <p className="text-[10px] uppercase font-bold text-muted">Player X</p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
            {score.X}
          </p>
        </div>
        <div className="border border-ink bg-cream px-2 py-2 text-center shadow-[1px_1px_0_0_#111111]">
          <p className="text-[10px] uppercase font-bold text-muted">Draws</p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
            {score.draw}
          </p>
        </div>
        <div className="border border-ink bg-paper-2 px-2 py-2 text-center shadow-[1px_1px_0_0_#111111]">
          <p className="text-[10px] uppercase font-bold text-muted">Player O</p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold">
            {score.O}
          </p>
        </div>
      </div>

      <div
        className={`border-2 border-ink px-3 py-2 text-center font-mono text-xs font-bold tracking-wider uppercase ${
          result === "X"
            ? "bg-yellow text-ink"
            : result === "O"
              ? "bg-orange text-cream"
              : result === "draw"
                ? "bg-paper-2"
                : "bg-cream text-ink"
        }`}
      >
        {status}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            type="button"
            onClick={() => play(i)}
            disabled={locked || Boolean(cell)}
            className="flex aspect-square items-center justify-center border-2 border-ink bg-cream nb-shadow-sm transition enabled:hover:-translate-x-0.5 enabled:hover:-translate-y-0.5 enabled:hover:shadow-[3px_3px_0_0_#111111] disabled:cursor-default"
            aria-label={`Cell ${i + 1}${cell ? `, ${cell}` : ""}`}
          >
            {cell === "X" && (
              <Close width={36} height={36} className="pixel-icon text-ink" />
            )}
            {cell === "O" && (
              <Checkbox
                width={36}
                height={36}
                className="pixel-icon text-orange"
              />
            )}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={resetBoard}
        className="nb-btn flex min-h-10 w-full items-center justify-center gap-2 font-mono text-xs"
      >
        <Reload width={14} height={14} className="pixel-icon" />
        <span>RESTART ROUND</span>
      </button>
    </div>
  );
}
