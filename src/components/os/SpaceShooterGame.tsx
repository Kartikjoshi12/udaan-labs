"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { soundManager } from "@/lib/sound";

interface SpaceShooterGameProps {
  onExit: (finalScore?: number, wave?: number) => void;
}

// 8-bit Sound Synthesizer via Web Audio API
class RetroAudioSynth {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playLaser() {
    if (!soundManager.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext failure ignored
    }
  }

  playEnemyLaser() {
    if (!soundManager.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // AudioContext failure ignored
    }
  }

  playExplosion(isBoss = false) {
    if (!soundManager.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * (isBoss ? 0.4 : 0.2);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(isBoss ? 600 : 1000, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(80, ctx.currentTime + (isBoss ? 0.4 : 0.2));

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(isBoss ? 0.35 : 0.2, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + (isBoss ? 0.4 : 0.2));

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch {
      // AudioContext failure ignored
    }
  }

  playPowerup() {
    if (!soundManager.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [330, 440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.12, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.01, now + (idx + 1) * 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + (idx + 1) * 0.04);
      });
    } catch {
      // AudioContext failure ignored
    }
  }

  playWaveClear() {
    if (!soundManager.isEnabled()) return;
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + (i + 1) * 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + (i + 1) * 0.09);
      });
    } catch {
      // AudioContext failure ignored
    }
  }
}

const synth = new RetroAudioSynth();

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
  brightness: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isEnemy?: boolean;
  color?: string;
  size?: number;
}

interface Enemy {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hp: number;
  maxHp: number;
  type: "scout" | "cruiser" | "dreadnought" | "boss";
  shootTimer: number;
  shootInterval: number;
  width: number;
  height: number;
  color: string;
  phase?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface PowerUp {
  x: number;
  y: number;
  vy: number;
  type: "triple" | "shield" | "bomb" | "heal";
  color: string;
  symbol: string;
}

export function SpaceShooterGame({ onExit }: SpaceShooterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [wave, setWave] = useState(1);
  const [shield, setShield] = useState(0);
  const [bombs, setBombs] = useState(1);
  const [tripleShotTimer, setTripleShotTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [waveBanner, setWaveBanner] = useState<string | null>("WAVE 1: INVASION BEGINS");

  // Key tracking
  const keysRef = useRef<Record<string, boolean>>({});
  const touchSteerRef = useRef<{ active: boolean; targetX: number; targetY: number }>({
    active: false,
    targetX: 0,
    targetY: 0,
  });

  // Game Entities Refs for 60fps loop
  const gameStateRef = useRef({
    score: 0,
    lives: 3,
    wave: 1,
    shield: 0,
    bombs: 1,
    tripleShotTimer: 0,
    gameOver: false,
    screenShake: 0,
    player: {
      x: 300,
      y: 400,
      width: 28,
      height: 28,
      speed: 5.5,
      invulnerableTimer: 60,
    },
    stars: [] as Star[],
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    particles: [] as Particle[],
    powerUps: [] as PowerUp[],
    lastShotTime: 0,
    waveSpawning: false,
  });

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("udaan_space_shooter_highscore");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    } catch {
      // localstorage disabled
    }
  }, []);

  // Update high score
  const checkUpdateHighScore = useCallback((newScore: number) => {
    setHighScore((prev) => {
      if (newScore > prev) {
        try {
          localStorage.setItem("udaan_space_shooter_highscore", newScore.toString());
        } catch {
          // ignore
        }
        return newScore;
      }
      return prev;
    });
  }, []);

  // Initialize Stars
  const initStars = (width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < 70; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 2.5,
        size: Math.random() > 0.8 ? 2 : 1,
        brightness: 0.3 + Math.random() * 0.7,
      });
    }
    return stars;
  };

  // Spawn Wave
  const spawnWave = useCallback((waveNum: number, canvasWidth: number) => {
    const state = gameStateRef.current;
    state.enemies = [];
    setWaveBanner(waveNum % 3 === 0 ? `WARNING: BOSS APPROACHING (WAVE ${waveNum})` : `WAVE ${waveNum}: SECTOR CLEARANCE`);
    setTimeout(() => setWaveBanner(null), 2500);

    if (waveNum % 3 === 0) {
      // Boss battle
      synth.playWaveClear();
      state.enemies.push({
        x: canvasWidth / 2 - 40,
        y: 60,
        vx: 2.2,
        vy: 0,
        hp: 45 + waveNum * 15,
        maxHp: 45 + waveNum * 15,
        type: "boss",
        shootTimer: 0,
        shootInterval: 45,
        width: 80,
        height: 50,
        color: "#f7c948",
        phase: 0,
      });
    } else {
      // Standard enemy wave
      const rows = Math.min(2 + Math.floor(waveNum / 2), 4);
      const cols = Math.min(4 + waveNum, 8);
      const spacingX = Math.min(50, (canvasWidth - 60) / cols);
      const startX = (canvasWidth - cols * spacingX) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const isCruiser = r === 0 && waveNum >= 2;
          const isDreadnought = r === 0 && waveNum >= 4;
          const type = isDreadnought ? "dreadnought" : isCruiser ? "cruiser" : "scout";
          const hp = type === "dreadnought" ? 4 : type === "cruiser" ? 2 : 1;
          const color = type === "dreadnought" ? "#e45826" : type === "cruiser" ? "#f7c948" : "#2d8a4e";

          state.enemies.push({
            x: startX + c * spacingX,
            y: 40 + r * 38,
            vx: 1.2 + waveNum * 0.15,
            vy: 0,
            hp,
            maxHp: hp,
            type,
            shootTimer: Math.random() * 80,
            shootInterval: Math.max(60, 140 - waveNum * 10) + Math.random() * 60,
            width: type === "dreadnought" ? 34 : type === "cruiser" ? 28 : 22,
            height: 22,
            color,
          });
        }
      }
    }
  }, []);

  // Use Bomb
  const triggerBomb = useCallback(() => {
    const state = gameStateRef.current;
    if (state.bombs <= 0 || state.gameOver) return;
    state.bombs -= 1;
    setBombs(state.bombs);
    state.screenShake = 20;
    synth.playExplosion(true);

    // Destroy all normal enemy bullets and damage enemies
    state.bullets = state.bullets.filter((b) => !b.isEnemy);
    for (const enemy of state.enemies) {
      enemy.hp -= 20;
      // create particles
      for (let i = 0; i < 15; i++) {
        state.particles.push({
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height / 2,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 25,
          maxLife: 25,
          color: "#f7c948",
          size: 3,
        });
      }
    }
  }, []);

  // Restart Game
  const restartGame = () => {
    const state = gameStateRef.current;
    state.score = 0;
    state.lives = 3;
    state.wave = 1;
    state.shield = 0;
    state.bombs = 1;
    state.tripleShotTimer = 0;
    state.gameOver = false;
    state.bullets = [];
    state.particles = [];
    state.powerUps = [];
    state.player.invulnerableTimer = 60;
    setScore(0);
    setLives(3);
    setWave(1);
    setShield(0);
    setBombs(1);
    setTripleShotTimer(0);
    setGameOver(false);
    if (canvasRef.current) {
      spawnWave(1, canvasRef.current.width);
    }
  };

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.code] = true;
      if (e.code === "KeyB") {
        triggerBomb();
      } else if (e.code === "Escape") {
        onExit(gameStateRef.current.score, gameStateRef.current.wave);
      } else if (e.code === "KeyP") {
        setIsPaused((p) => !p);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [triggerBomb, onExit]);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to container
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(320, Math.floor(rect.width));
      canvas.height = Math.max(400, Math.floor(rect.height));
      if (gameStateRef.current.stars.length === 0) {
        gameStateRef.current.stars = initStars(canvas.width, canvas.height);
        gameStateRef.current.player.x = canvas.width / 2 - 14;
        gameStateRef.current.player.y = canvas.height - 60;
        spawnWave(1, canvas.width);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;

    const gameLoop = () => {
      animationId = requestAnimationFrame(gameLoop);
      if (isPaused) return;

      const state = gameStateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Update Screen Shake
      let shakeX = 0;
      let shakeY = 0;
      if (state.screenShake > 0) {
        shakeX = (Math.random() - 0.5) * state.screenShake;
        shakeY = (Math.random() - 0.5) * state.screenShake;
        state.screenShake *= 0.88;
        if (state.screenShake < 0.5) state.screenShake = 0;
      }

      ctx.save();
      ctx.translate(shakeX, shakeY);

      // Background Clear
      ctx.fillStyle = "#0c0d10";
      ctx.fillRect(0, 0, width, height);

      // Update and Draw Stars
      for (const star of state.stars) {
        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
        ctx.fillStyle = `rgba(240, 240, 255, ${star.brightness})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
      }

      if (!state.gameOver) {
        // Player Movement
        const keys = keysRef.current;
        const player = state.player;

        if (keys["ArrowLeft"] || keys["KeyA"]) {
          player.x -= player.speed;
        }
        if (keys["ArrowRight"] || keys["KeyD"]) {
          player.x += player.speed;
        }
        if (keys["ArrowUp"] || keys["KeyW"]) {
          player.y -= player.speed;
        }
        if (keys["ArrowDown"] || keys["KeyS"]) {
          player.y += player.speed;
        }

        // Touch Steering
        if (touchSteerRef.current.active) {
          const dx = touchSteerRef.current.targetX - (player.x + player.width / 2);
          const dy = touchSteerRef.current.targetY - (player.y + player.height / 2);
          player.x += Math.sign(dx) * Math.min(Math.abs(dx), player.speed);
          player.y += Math.sign(dy) * Math.min(Math.abs(dy), player.speed);
        }

        // Clamp player
        player.x = Math.max(10, Math.min(width - player.width - 10, player.x));
        player.y = Math.max(60, Math.min(height - player.height - 10, player.y));

        if (player.invulnerableTimer > 0) {
          player.invulnerableTimer--;
        }

        // Shooting (Space or touch)
        const now = Date.now();
        const shootRate = state.tripleShotTimer > 0 ? 110 : 180;
        if ((keys["Space"] || touchSteerRef.current.active) && now - state.lastShotTime > shootRate) {
          state.lastShotTime = now;
          synth.playLaser();

          if (state.tripleShotTimer > 0) {
            state.bullets.push(
              { x: player.x + player.width / 2, y: player.y, vx: 0, vy: -9, color: "#f7c948" },
              { x: player.x + 4, y: player.y + 6, vx: -2.5, vy: -8.5, color: "#f7c948" },
              { x: player.x + player.width - 4, y: player.y + 6, vx: 2.5, vy: -8.5, color: "#f7c948" }
            );
          } else {
            state.bullets.push({
              x: player.x + player.width / 2,
              y: player.y,
              vx: 0,
              vy: -9,
              color: "#2d8a4e",
            });
          }
        }

        // Powerup timer decay
        if (state.tripleShotTimer > 0) {
          state.tripleShotTimer--;
          if (state.tripleShotTimer % 30 === 0) {
            setTripleShotTimer(Math.ceil(state.tripleShotTimer / 60));
          }
        }

        // Player Engine Thruster Particles
        if (Math.random() > 0.3) {
          state.particles.push({
            x: player.x + player.width / 2 + (Math.random() - 0.5) * 6,
            y: player.y + player.height + 2,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 2 + Math.random() * 3,
            life: 14,
            maxLife: 14,
            color: Math.random() > 0.5 ? "#e45826" : "#f7c948",
            size: 2.5,
          });
        }
      }

      // Update & Draw Bullets
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        b.x += b.vx;
        b.y += b.vy;

        if (b.y < -10 || b.y > height + 10 || b.x < -10 || b.x > width + 10) {
          state.bullets.splice(i, 1);
          continue;
        }

        ctx.fillStyle = b.color || "#2d8a4e";
        if (b.isEnemy) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.size || 3.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(b.x - 1.5, b.y - 4, 3, 8);
        }
      }

      // Update & Draw Enemies
      let changeDir = false;
      for (const enemy of state.enemies) {
        enemy.x += enemy.vx;
        if (enemy.x <= 15 || enemy.x + enemy.width >= width - 15) {
          changeDir = true;
        }

        // Enemy shooting
        if (!state.gameOver) {
          enemy.shootTimer++;
          if (enemy.shootTimer >= enemy.shootInterval) {
            enemy.shootTimer = 0;
            synth.playEnemyLaser();
            if (enemy.type === "boss") {
              // Boss spread shot
              state.bullets.push(
                { x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height, vx: 0, vy: 4.5, isEnemy: true, color: "#e45826", size: 4 },
                { x: enemy.x + 10, y: enemy.y + enemy.height, vx: -2, vy: 4, isEnemy: true, color: "#e45826", size: 4 },
                { x: enemy.x + enemy.width - 10, y: enemy.y + enemy.height, vx: 2, vy: 4, isEnemy: true, color: "#e45826", size: 4 }
              );
            } else {
              state.bullets.push({
                x: enemy.x + enemy.width / 2,
                y: enemy.y + enemy.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: 4 + state.wave * 0.2,
                isEnemy: true,
                color: "#e45826",
              });
            }
          }
        }

        // Draw Enemy
        ctx.fillStyle = enemy.color;
        if (enemy.type === "boss") {
          // Boss Graphic
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
          ctx.fillStyle = "#111111";
          ctx.fillRect(enemy.x + 8, enemy.y + 12, enemy.width - 16, enemy.height - 24);
          ctx.fillStyle = "#e45826";
          ctx.fillRect(enemy.x + enemy.width / 2 - 6, enemy.y + enemy.height - 8, 12, 8);

          // Boss Health Bar
          const barWidth = enemy.width;
          const hpRatio = Math.max(0, enemy.hp / enemy.maxHp);
          ctx.fillStyle = "#222";
          ctx.fillRect(enemy.x, enemy.y - 10, barWidth, 5);
          ctx.fillStyle = hpRatio > 0.3 ? "#2d8a4e" : "#e45826";
          ctx.fillRect(enemy.x, enemy.y - 10, barWidth * hpRatio, 5);
        } else {
          // Standard Alien Pixel Art
          const ex = enemy.x;
          const ey = enemy.y;
          const ew = enemy.width;
          const eh = enemy.height;
          ctx.fillRect(ex + 4, ey, ew - 8, 4);
          ctx.fillRect(ex, ey + 4, ew, eh - 8);
          ctx.fillRect(ex + 2, ey + eh - 4, 4, 4);
          ctx.fillRect(ex + ew - 6, ey + eh - 4, 4, 4);
          // Eyes
          ctx.fillStyle = "#111111";
          ctx.fillRect(ex + 4, ey + 6, 3, 4);
          ctx.fillRect(ex + ew - 7, ey + 6, 3, 4);
        }
      }

      if (changeDir) {
        for (const enemy of state.enemies) {
          enemy.vx = -enemy.vx;
          if (enemy.type !== "boss") {
            enemy.y += 12;
            if (enemy.y + enemy.height >= state.player.y && !state.gameOver) {
              // Enemy reached bottom: instant life loss
              state.lives -= 1;
              setLives(state.lives);
              state.screenShake = 15;
              synth.playExplosion(true);
              if (state.lives <= 0) {
                state.gameOver = true;
                setGameOver(true);
                checkUpdateHighScore(state.score);
              }
            }
          }
        }
      }

      // Bullet vs Enemy Collisions
      for (let bIdx = state.bullets.length - 1; bIdx >= 0; bIdx--) {
        const bullet = state.bullets[bIdx];
        if (bullet.isEnemy) continue;

        for (let eIdx = state.enemies.length - 1; eIdx >= 0; eIdx--) {
          const enemy = state.enemies[eIdx];
          if (
            bullet.x >= enemy.x &&
            bullet.x <= enemy.x + enemy.width &&
            bullet.y >= enemy.y &&
            bullet.y <= enemy.y + enemy.height
          ) {
            // Hit!
            state.bullets.splice(bIdx, 1);
            enemy.hp -= 1;

            // Spark particles
            for (let p = 0; p < 4; p++) {
              state.particles.push({
                x: bullet.x,
                y: bullet.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 12,
                maxLife: 12,
                color: "#f7c948",
                size: 2,
              });
            }

            if (enemy.hp <= 0) {
              // Destroyed enemy
              const points = enemy.type === "boss" ? 1000 : enemy.type === "dreadnought" ? 300 : enemy.type === "cruiser" ? 150 : 50;
              state.score += points;
              setScore(state.score);
              checkUpdateHighScore(state.score);
              synth.playExplosion(enemy.type === "boss");
              state.screenShake = enemy.type === "boss" ? 18 : 6;

              // Explosion particles
              const pCount = enemy.type === "boss" ? 35 : 12;
              for (let p = 0; p < pCount; p++) {
                state.particles.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height / 2,
                  vx: (Math.random() - 0.5) * (enemy.type === "boss" ? 9 : 5),
                  vy: (Math.random() - 0.5) * (enemy.type === "boss" ? 9 : 5),
                  life: 22,
                  maxLife: 22,
                  color: enemy.color,
                  size: 3,
                });
              }

              // Powerup drop chance (20% for normal, 100% for boss)
              if (Math.random() < 0.22 || enemy.type === "boss") {
                const types: ("triple" | "shield" | "bomb" | "heal")[] = ["triple", "shield", "bomb", "heal"];
                const pType = types[Math.floor(Math.random() * types.length)];
                state.powerUps.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height / 2,
                  vy: 1.8,
                  type: pType,
                  color: pType === "triple" ? "#f7c948" : pType === "shield" ? "#2563eb" : pType === "bomb" ? "#e45826" : "#2d8a4e",
                  symbol: pType === "triple" ? "⚡" : pType === "shield" ? "🛡️" : pType === "bomb" ? "💣" : "❤️",
                });
              }

              state.enemies.splice(eIdx, 1);
            }
            break;
          }
        }
      }

      // Check Wave Clear
      if (state.enemies.length === 0 && !state.gameOver) {
        state.wave += 1;
        setWave(state.wave);
        synth.playWaveClear();
        spawnWave(state.wave, width);
      }

      // Update & Draw PowerUps
      for (let i = state.powerUps.length - 1; i >= 0; i--) {
        const p = state.powerUps[i];
        p.y += p.vy;

        if (p.y > height + 20) {
          state.powerUps.splice(i, 1);
          continue;
        }

        // Draw Powerup box
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x - 10, p.y - 10, 20, 20);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x - 10, p.y - 10, 20, 20);
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, p.x, p.y);

        // Powerup Pickup Collision
        if (
          !state.gameOver &&
          p.x >= state.player.x - 10 &&
          p.x <= state.player.x + state.player.width + 10 &&
          p.y >= state.player.y - 10 &&
          p.y <= state.player.y + state.player.height + 10
        ) {
          synth.playPowerup();
          if (p.type === "triple") {
            state.tripleShotTimer = 400;
            setTripleShotTimer(7);
          } else if (p.type === "shield") {
            state.shield = Math.min(state.shield + 1, 3);
            setShield(state.shield);
          } else if (p.type === "bomb") {
            state.bombs = Math.min(state.bombs + 1, 3);
            setBombs(state.bombs);
          } else if (p.type === "heal") {
            state.lives = Math.min(state.lives + 1, 5);
            setLives(state.lives);
          }
          state.score += 100;
          setScore(state.score);
          checkUpdateHighScore(state.score);
          state.powerUps.splice(i, 1);
        }
      }

      // Bullet vs Player Collisions
      if (!state.gameOver && state.player.invulnerableTimer === 0) {
        for (let bIdx = state.bullets.length - 1; bIdx >= 0; bIdx--) {
          const bullet = state.bullets[bIdx];
          if (!bullet.isEnemy) continue;

          if (
            bullet.x >= state.player.x &&
            bullet.x <= state.player.x + state.player.width &&
            bullet.y >= state.player.y &&
            bullet.y <= state.player.y + state.player.height
          ) {
            state.bullets.splice(bIdx, 1);
            state.screenShake = 12;

            if (state.shield > 0) {
              state.shield -= 1;
              setShield(state.shield);
              synth.playLaser();
              state.player.invulnerableTimer = 30;
            } else {
              state.lives -= 1;
              setLives(state.lives);
              synth.playExplosion(false);
              state.player.invulnerableTimer = 60;

              if (state.lives <= 0) {
                state.gameOver = true;
                setGameOver(true);
                checkUpdateHighScore(state.score);
              }
            }
            break;
          }
        }
      }

      // Update & Draw Particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }

        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        ctx.globalAlpha = 1.0;
      }

      // Draw Player
      if (!state.gameOver) {
        const px = state.player.x;
        const py = state.player.y;
        const pw = state.player.width;
        const ph = state.player.height;

        const isBlinking = state.player.invulnerableTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0;

        if (!isBlinking) {
          // Player Retro Fighter Jet
          ctx.fillStyle = "#fbf8f2";
          ctx.beginPath();
          ctx.moveTo(px + pw / 2, py);
          ctx.lineTo(px + pw, py + ph);
          ctx.lineTo(px + pw / 2, py + ph - 6);
          ctx.lineTo(px, py + ph);
          ctx.closePath();
          ctx.fill();

          // Cockpit
          ctx.fillStyle = "#2563eb";
          ctx.fillRect(px + pw / 2 - 2, py + 8, 4, 8);

          // Wings Accent
          ctx.fillStyle = "#e45826";
          ctx.fillRect(px + 2, py + ph - 8, 4, 6);
          ctx.fillRect(px + pw - 6, py + ph - 8, 4, 6);

          // Draw Shield Bubble if active
          if (state.shield > 0) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.4 + Math.sin(Date.now() / 150) * 0.3})`;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(px + pw / 2, py + ph / 2, pw * 0.9, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      // Draw CRT Scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isPaused, spawnWave, checkUpdateHighScore]);

  // Touch Steer handlers with preventDefault
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    touchSteerRef.current = {
      active: true,
      targetX: touch.clientX - rect.left,
      targetY: touch.clientY - rect.top,
    };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    touchSteerRef.current = {
      active: true,
      targetX: touch.clientX - rect.left,
      targetY: touch.clientY - rect.top,
    };
  };

  const handleTouchEnd = () => {
    touchSteerRef.current.active = false;
  };

  // Virtual D-pad button handlers for mobile
  const handleButtonDir = (dir: string, isDown: boolean) => {
    keysRef.current[dir] = isDown;
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0c0d10] select-none text-[#fbf8f2] font-mono overflow-hidden touch-none">
      {/* HUD Header Bar */}
      <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#16181d] border-b border-ink/60 text-xs z-10 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <div>
            <span className="text-muted text-[9px] uppercase block leading-none">Score</span>
            <span className="text-yellow font-bold text-xs">{score.toString().padStart(6, "0")}</span>
          </div>
          <div>
            <span className="text-muted text-[9px] uppercase block leading-none">High</span>
            <span className="text-green font-bold text-xs">{highScore.toString().padStart(6, "0")}</span>
          </div>
          <div>
            <span className="text-muted text-[9px] uppercase block leading-none">Wave</span>
            <span className="text-orange font-bold text-xs">{wave}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Shields */}
          {shield > 0 && (
            <div className="flex items-center gap-0.5 text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/60 text-[11px]">
              <span>🛡️</span>
              <span className="font-bold">{shield}</span>
            </div>
          )}

          {/* Triple shot indicator */}
          {tripleShotTimer > 0 && (
            <div className="flex items-center gap-0.5 text-yellow bg-yellow-950/60 px-1.5 py-0.5 rounded border border-yellow-800/60 animate-pulse text-[11px]">
              <span>⚡</span>
              <span className="font-bold">{tripleShotTimer}s</span>
            </div>
          )}

          {/* Bombs */}
          <button
            type="button"
            onClick={triggerBomb}
            disabled={bombs <= 0 || gameOver}
            className="flex items-center gap-0.5 text-orange bg-orange-950/60 px-1.5 py-0.5 rounded border border-orange-800/60 active:scale-95 disabled:opacity-40 text-[11px]"
            title="Detonate Nova Bomb"
          >
            <span>💣</span>
            <span className="font-bold">{bombs}</span>
          </button>

          {/* Lives */}
          <div className="flex items-center text-red-400 text-xs">
            {Array.from({ length: Math.max(0, lives) }).map((_, i) => (
              <span key={i}>❤️</span>
            ))}
          </div>

          {/* Exit Button */}
          <button
            type="button"
            onClick={() => onExit(score, wave)}
            className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-[10px] font-bold uppercase rounded border border-neutral-700 transition"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative flex-1 w-full h-full min-h-[260px] overflow-hidden">
        <canvas
          ref={canvasRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full h-full block cursor-crosshair touch-none"
        />

        {/* Wave Banner Overlay */}
        {waveBanner && !gameOver && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/85 border-2 border-yellow px-3 py-1.5 text-center pointer-events-none shadow-[0_0_15px_rgba(247,201,72,0.4)] animate-bounce z-20 max-w-[90%]">
            <span className="text-yellow font-bold text-[11px] tracking-wider block">{waveBanner}</span>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center z-30">
            <h2 className="text-2xl md:text-3xl font-bold text-orange mb-1 tracking-wider animate-pulse">
              GAME OVER
            </h2>
            <p className="text-muted text-[11px] mb-3">Fighter ship destroyed in deep space.</p>

            <div className="bg-[#16181d] border border-neutral-700 p-3 rounded mb-4 w-56 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Final Score:</span>
                <span className="text-yellow font-bold">{score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Sector Wave:</span>
                <span className="text-orange font-bold">{wave}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">High Score:</span>
                <span className="text-green font-bold">{highScore}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={restartGame}
                className="px-3 py-2 bg-yellow text-ink font-bold text-xs uppercase hover:bg-yellow/90 border border-ink shadow-[2px_2px_0_0_#ffffff] active:translate-x-0.5 active:translate-y-0.5"
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={() => onExit(score, wave)}
                className="px-3 py-2 bg-neutral-800 text-cream font-bold text-xs uppercase hover:bg-neutral-700 border border-neutral-600 shadow-[2px_2px_0_0_#ffffff] active:translate-x-0.5 active:translate-y-0.5"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Touch On-Screen Controls for Mobile (Dual-thumb Arcade Pad) */}
      <div className="md:hidden flex items-center justify-between p-2.5 bg-[#121318] border-t border-ink/80 z-20 shrink-0">
        {/* Left Side: Directional D-Pad Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onTouchStart={() => handleButtonDir("ArrowLeft", true)}
            onTouchEnd={() => handleButtonDir("ArrowLeft", false)}
            onMouseDown={() => handleButtonDir("ArrowLeft", true)}
            onMouseUp={() => handleButtonDir("ArrowLeft", false)}
            className="w-11 h-11 bg-neutral-800/90 border-2 border-neutral-600 active:bg-yellow active:text-ink active:border-yellow text-cream font-bold text-lg rounded-md flex items-center justify-center shadow-[1px_1px_0_0_#000]"
          >
            ◀
          </button>
          <button
            type="button"
            onTouchStart={() => handleButtonDir("ArrowRight", true)}
            onTouchEnd={() => handleButtonDir("ArrowRight", false)}
            onMouseDown={() => handleButtonDir("ArrowRight", true)}
            onMouseUp={() => handleButtonDir("ArrowRight", false)}
            className="w-11 h-11 bg-neutral-800/90 border-2 border-neutral-600 active:bg-yellow active:text-ink active:border-yellow text-cream font-bold text-lg rounded-md flex items-center justify-center shadow-[1px_1px_0_0_#000]"
          >
            ▶
          </button>
        </div>

        {/* Center: Hint */}
        <div className="text-[9px] text-muted text-center px-1">
          Drag / Buttons
        </div>

        {/* Right Side: Action Buttons (Fire & Nova Bomb) */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={triggerBomb}
            disabled={bombs <= 0 || gameOver}
            className="px-2.5 h-11 bg-orange/20 border-2 border-orange text-orange active:bg-orange active:text-cream font-bold text-xs rounded-md flex items-center justify-center disabled:opacity-30 shadow-[1px_1px_0_0_#000]"
          >
            💣 BOMB
          </button>
          <button
            type="button"
            onTouchStart={() => handleButtonDir("Space", true)}
            onTouchEnd={() => handleButtonDir("Space", false)}
            onMouseDown={() => handleButtonDir("Space", true)}
            onMouseUp={() => handleButtonDir("Space", false)}
            className="px-4 h-11 bg-green/20 border-2 border-green text-green active:bg-green active:text-ink font-bold text-sm rounded-md flex items-center justify-center shadow-[1px_1px_0_0_#000]"
          >
            ⚡ FIRE
          </button>
        </div>
      </div>

      {/* Desktop Controls Legend */}
      <div className="hidden md:flex items-center justify-between px-3 py-1 bg-[#111216] border-t border-ink/40 text-[10px] text-muted">
        <div>
          <span className="text-yellow">WASD / Arrow Keys</span>: Move &bull;{" "}
          <span className="text-yellow">Space</span>: Fire Laser &bull;{" "}
          <span className="text-yellow">B</span>: Nova Bomb &bull;{" "}
          <span className="text-yellow">P</span>: Pause &bull;{" "}
          <span className="text-yellow">ESC</span>: Exit to Terminal
        </div>
        <div className="text-green font-mono">RETRO CRT ENGINE v1.2</div>
      </div>
    </div>
  );
}
