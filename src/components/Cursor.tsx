import { useEffect, useRef } from "react";

export const Cursor = () => {
  const curRef = useRef<HTMLDivElement>(null);
  const cur2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = curRef.current!;
    const cur2 = cur2Ref.current!;
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + "px";
      cur.style.top = my + "px";
    };
    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      cur2.style.left = rx + "px";
      cur2.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    const handleEnter = () => {
      cur.style.width = "18px"; cur.style.height = "18px";
      cur2.style.width = "58px"; cur2.style.height = "58px";
    };
    const handleLeave = () => {
      cur.style.width = "8px"; cur.style.height = "8px";
      cur2.style.width = "40px"; cur2.style.height = "40px";
    };
    const targets = document.querySelectorAll("a, button, .cyber-card, .chip, .interactive");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none">
      <div id="cur" ref={curRef} />
      <div id="cur2" ref={cur2Ref} />
    </div>
  );
};
