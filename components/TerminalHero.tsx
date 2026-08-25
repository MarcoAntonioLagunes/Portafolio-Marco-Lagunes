"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CommandLine = { cmd: string; resp: string };

const COMMANDS: CommandLine[] = [
  { cmd: "whoami", resp: "Marco Lagunes — Full Stack Developer" },
  { cmd: "ls projects/", resp: "asommmn/   ultranube/   mkdevsoft/" },
  { cmd: "cat skills.txt", resp: "React · Next.js · NestJS · MongoDB · JWT" },
  { cmd: "./disponible --trabajo", resp: "true ✓ Open to work" },
];

const TYPE_SPEED_MS = 45;
const PAUSE_BEFORE_RESPONSE_MS = 1200;
const PAUSE_BEFORE_NEXT_MS = 2000;

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="animate-blink inline-block text-[#7C6FE0]"
    >
      _
    </span>
  );
}

export function TerminalHero() {
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<CommandLine[]>([]);
  const [currentCmd, setCurrentCmd] = useState("");
  const [currentResp, setCurrentResp] = useState("");
  const [phase, setPhase] = useState<"cmd" | "resp">("cmd");

  useEffect(() => {
    if (reduced) {
      setLines(COMMANDS);
      return;
    }

    let cancelled = false;
    const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

    async function run() {
      while (!cancelled) {
        for (const line of COMMANDS) {
          setPhase("cmd");
          setCurrentCmd("");
          setCurrentResp("");

          for (let i = 1; i <= line.cmd.length; i++) {
            if (cancelled) return;
            setCurrentCmd(line.cmd.slice(0, i));
            await wait(TYPE_SPEED_MS);
          }
          if (cancelled) return;

          await wait(PAUSE_BEFORE_RESPONSE_MS);
          if (cancelled) return;

          setPhase("resp");
          for (let i = 1; i <= line.resp.length; i++) {
            if (cancelled) return;
            setCurrentResp(line.resp.slice(0, i));
            await wait(TYPE_SPEED_MS);
          }
          if (cancelled) return;

          setLines((prev) => [...prev, line]);
          setCurrentCmd("");
          setCurrentResp("");
          await wait(PAUSE_BEFORE_NEXT_MS);
        }
        if (cancelled) return;
        setLines([]);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-[#0d1117]/90 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 truncate font-mono text-[11px] text-white/40">
          marco@portfolio:~
        </span>
      </div>

      <div className="min-h-[210px] px-4 py-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <div key={i} className="mb-2.5">
            <p className="text-[#7C6FE0]">
              <span className="text-[#7C6FE0]/60">$</span> {line.cmd}
            </p>
            <p className="whitespace-pre-wrap text-emerald-400">{line.resp}</p>
          </div>
        ))}

        {!reduced && (
          <div className="mb-2.5">
            <p className="text-[#7C6FE0]">
              <span className="text-[#7C6FE0]/60">$</span> {currentCmd}
              {phase === "cmd" && <Cursor />}
            </p>
            {phase === "resp" && (
              <p className="whitespace-pre-wrap text-emerald-400">
                {currentResp}
                <Cursor />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
