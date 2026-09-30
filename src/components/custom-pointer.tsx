import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "link" | "view" | "flip";

type Point = { x: number; y: number };

export function CustomPointer({ mode = "default" }: { mode?: CursorMode }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [autoMode, setAutoMode] = useState<CursorMode>("default");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);

    const target: Point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let visible = false;

    const show = (value: boolean) => {
      visible = value;
      const opacity = value ? "1" : "0";
      dotRef.current?.style.setProperty("opacity", opacity);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
      if (!visible) {
        show(true);
      }
    };

    const over = (event: PointerEvent) => {
      const node = event.target instanceof Element ? event.target : null;
      const explicit = node?.closest<HTMLElement>("[data-cursor]")?.dataset["cursor"] as
        CursorMode | undefined;
      if (explicit) {
        setAutoMode(explicit);
        return;
      }
      setAutoMode(node?.closest("a, button, [role='button'], label, summary") ? "link" : "default");
    };

    let frame = window.requestAnimationFrame(function tick() {
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(tick);
    });

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const hide = () => show(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.cancelAnimationFrame(frame);
      fine.removeEventListener("change", sync);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("has-custom-pointer", enabled);
    return () => document.documentElement.classList.remove("has-custom-pointer");
  }, [enabled]);

  if (!enabled) return null;

  const active: CursorMode = mode !== "default" ? mode : autoMode;
  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-dot pointer-dot-${active}${pressed ? " is-pressed" : ""}`}
    />
  );
}
