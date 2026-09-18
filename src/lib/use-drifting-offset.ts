import { useEffect, useRef, useState } from "react";

export function useDriftingOffset(seed = 0) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000 + seed;
      setOffset({
        x: Math.sin(t * 0.25) * 0.35 + Math.sin(t * 0.11) * 0.1,
        y: Math.cos(t * 0.18) * 0.3 + Math.sin(t * 0.07) * 0.12,
      });
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [seed]);

  return offset;
}
