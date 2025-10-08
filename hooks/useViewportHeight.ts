"use client";
import { useEffect } from "react";

export function useViewportHeight() {
  useEffect(() => {
    const set = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${h}px`);
    };
    set();
    const vv = window.visualViewport;
    window.addEventListener("resize", set, { passive: true });
    vv?.addEventListener("resize", set);
    vv?.addEventListener("scroll", set);
    return () => {
      window.removeEventListener("resize", set);
      vv?.removeEventListener("resize", set);
      vv?.removeEventListener("scroll", set);
    };
  }, []);
}



