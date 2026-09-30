import { Ghost, RotateCcw, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";

const maze = [
  "#########",
  "#.......#",
  "#.#.#.#.#",
  "#.......#",
  "#.###.#.#",
  "#.......#",
  "#.#.#.#.#",
  "#.......#",
  "#########",
];

const start = { x: 1, y: 1 };
const ghostStart = { x: 7, y: 7 };
const ghostPath = [
  ghostStart,
  { x: 7, y: 6 },
  { x: 7, y: 5 },
  { x: 7, y: 4 },
  { x: 7, y: 3 },
  { x: 7, y: 2 },
  { x: 7, y: 1 },
  { x: 6, y: 1 },
  { x: 5, y: 1 },
  { x: 4, y: 1 },
  { x: 3, y: 1 },
  { x: 2, y: 1 },
  start,
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 3, y: 3 },
  { x: 4, y: 3 },
  { x: 5, y: 3 },
  { x: 6, y: 3 },
  { x: 7, y: 3 },
  { x: 7, y: 4 },
  { x: 7, y: 5 },
  { x: 6, y: 5 },
  { x: 5, y: 5 },
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 },
  { x: 1, y: 5 },
  { x: 1, y: 6 },
  { x: 1, y: 7 },
  { x: 2, y: 7 },
  { x: 3, y: 7 },
  { x: 4, y: 7 },
  { x: 5, y: 7 },
  { x: 6, y: 7 },
];

const directions: Record<string, { x: number; y: number }> = {
  ArrowUp: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

function collectableTiles() {
  return new Set(
    maze.flatMap((row, y) =>
      [...row].flatMap((tile, x) =>
        tile === "." && (x !== start.x || y !== start.y) ? [`${x},${y}`] : [],
      ),
    ),
  );
}

type PacmanMiniGameProps = {
  triggerClassName?: string;
  triggerContent?: ReactNode;
  onTriggerMouseEnter?: () => void;
  onTriggerClick?: () => void;
};

export function PacmanMiniGame({
  triggerClassName,
  triggerContent,
  onTriggerMouseEnter,
  onTriggerClick,
}: PacmanMiniGameProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [player, setPlayer] = useState(start);
  const [ghostIndex, setGhostIndex] = useState(0);
  const [pellets, setPellets] = useState(collectableTiles);
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#game") setIsOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const resetGame = useCallback(() => {
    setPlayer(start);
    setGhostIndex(0);
    setPellets(collectableTiles());
    setCaught(false);
  }, []);

  const movePlayer = useCallback(
    (key: string) => {
      if (caught || pellets.size === 0) return;
      const direction = directions[key] ?? directions[key.toLowerCase()];
      if (!direction) return;
      const next = { x: player.x + direction.x, y: player.y + direction.y };
      if (maze[next.y]?.[next.x] === "#" || !maze[next.y]) return;
      const currentGhost = ghostPath[ghostIndex] ?? ghostStart;
      const nextGhost = ghostPath[(ghostIndex + 1) % ghostPath.length] ?? ghostStart;
      setPlayer(next);
      setPellets((currentPellets) => {
        const nextPellets = new Set(currentPellets);
        nextPellets.delete(`${next.x},${next.y}`);
        return nextPellets;
      });
      if (
        (next.x === currentGhost.x && next.y === currentGhost.y) ||
        (next.x === nextGhost.x && next.y === nextGhost.y) ||
        (player.x === nextGhost.x && player.y === nextGhost.y)
      ) {
        setCaught(true);
      }
      setGhostIndex((current) => (current + 1) % ghostPath.length);
    },
    [caught, ghostIndex, pellets.size, player],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (!directions[event.key] && !directions[event.key.toLowerCase()]) return;
      event.preventDefault();
      movePlayer(event.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, movePlayer]);

  useEffect(() => {
    if (!isOpen || caught || pellets.size === 0) return;
    const timer = window.setInterval(() => {
      setGhostIndex((current) => (current + 1) % ghostPath.length);
    }, 500);
    return () => window.clearInterval(timer);
  }, [caught, isOpen, pellets.size]);

  useEffect(() => {
    const ghost = ghostPath[ghostIndex];
    if (!ghost) return;
    if (player.x === ghost.x && player.y === ghost.y) setCaught(true);
  }, [ghostIndex, player]);

  const score = collectableTiles().size - pellets.size;
  const won = pellets.size === 0;
  const isFinished = caught || won;

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={() => {
          resetGame();
          setIsOpen(true);
          onTriggerClick?.();
        }}
        onMouseEnter={onTriggerMouseEnter}
        className={
          triggerClassName ??
          "inline-flex h-10 shrink-0 items-center gap-2 border border-gridline px-3 text-xs font-bold uppercase transition-colors hover:border-flame hover:text-flame"
        }
      >
        {triggerContent ?? (
          <>
            <span aria-hidden="true" className="pacman-icon" />
            <span className="hidden sm:inline">Play</span>
          </>
        )}
      </button>
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-cocoa/90 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            aria-label="Pocket maze mini game"
            aria-modal="true"
            className="w-full max-w-sm border border-gridline bg-paper p-5 text-foreground shadow-[0_24px_80px_var(--shadow-tint)] sm:p-7"
            role="dialog"
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-flame">
                  Pocket arcade
                </p>
                <h2 className="mt-1 font-display text-4xl leading-none">Maze munch</h2>
              </div>
              <button
                type="button"
                aria-label="Close game"
                onClick={() => setIsOpen(false)}
                className="grid size-9 shrink-0 place-items-center border border-gridline transition-colors hover:bg-flame hover:text-flame-foreground"
              >
                <X className="size-4" />
              </button>
            </header>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              Collect every dot. Dodge the ghost. Use arrow keys or WASD.
            </p>
            <div className="relative mx-auto mt-5 aspect-square w-full max-w-[18rem]">
              <div
                className="grid size-full grid-cols-9 overflow-hidden border-2 border-ocean bg-ocean"
                role="grid"
                aria-label="Game maze"
              >
                {maze.flatMap((row, y) =>
                  [...row].map((tile, x) => {
                    const isPlayer = player.x === x && player.y === y;
                    const ghost = ghostPath[ghostIndex] ?? ghostStart;
                    const isGhost = ghost.x === x && ghost.y === y;
                    const hasPellet = pellets.has(`${x},${y}`);
                    return (
                      <div
                        key={`${x},${y}`}
                        role="gridcell"
                        aria-label={
                          isPlayer
                            ? "Player"
                            : isGhost
                              ? "Ghost"
                              : hasPellet
                                ? "Pellet"
                                : tile === "#"
                                  ? "Wall"
                                  : "Path"
                        }
                        className={`grid aspect-square place-items-center ${tile === "#" ? "bg-ocean" : "bg-paper"} border-[.5px] border-gridline/40`}
                      >
                        {isPlayer ? (
                          <span className="pacman-icon game-pacman-icon" aria-hidden="true" />
                        ) : null}
                        {isGhost ? (
                          <Ghost className="size-4 text-ocean" aria-hidden="true" />
                        ) : null}
                        {hasPellet && !isPlayer && !isGhost ? (
                          <span className="size-1 rounded-full bg-flame" aria-hidden="true" />
                        ) : null}
                      </div>
                    );
                  }),
                )}
              </div>
              {isFinished ? (
                <div
                  className="absolute inset-0 grid place-items-center bg-cocoa/85 p-5 text-center text-cocoa-foreground backdrop-blur-sm"
                  role="alert"
                >
                  <div>
                    <Ghost className="mx-auto size-9 text-flame" aria-hidden="true" />
                    <p className="mt-3 font-display text-4xl leading-none">
                      {won ? "Maze cleared!" : "Game over"}
                    </p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-[.12em]">
                      {won ? "You collected every dot." : "The ghost caught you."}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold uppercase">
              <span>
                Dots{" "}
                <span className="text-flame">
                  {score}/{collectableTiles().size}
                </span>
              </span>
              {isFinished ? (
                <span className={won ? "text-flame" : "text-muted-foreground"}>
                  {won ? "You win!" : "Game over"}
                </span>
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="grid grid-cols-3 gap-1" aria-label="Touch controls">
                <span />
                <ControlButton label="Move up" symbol="↑" onClick={() => movePlayer("ArrowUp")} />
                <span />
                <ControlButton
                  label="Move left"
                  symbol="←"
                  onClick={() => movePlayer("ArrowLeft")}
                />
                <ControlButton
                  label="Move down"
                  symbol="↓"
                  onClick={() => movePlayer("ArrowDown")}
                />
                <ControlButton
                  label="Move right"
                  symbol="→"
                  onClick={() => movePlayer("ArrowRight")}
                />
              </div>
              <button
                type="button"
                onClick={resetGame}
                className="inline-flex items-center gap-2 border border-gridline px-3 py-2 text-xs font-bold uppercase transition-colors hover:border-flame hover:text-flame"
              >
                <RotateCcw className="size-3.5" /> {isFinished ? "Play again" : "Restart"}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

function ControlButton({
  label,
  symbol,
  onClick,
}: {
  label: string;
  symbol: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-9 place-items-center border border-gridline text-lg font-bold transition-colors hover:border-flame hover:bg-flame hover:text-flame-foreground"
    >
      {symbol}
    </button>
  );
}
