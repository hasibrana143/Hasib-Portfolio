"use client";

import { useSyncExternalStore } from "react";

function getScrollY() {
  return typeof window !== "undefined" ? window.scrollY : 0;
}

function getScrollDirection() {
  return "down" as const;
}

function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? window.scrollY / maxScroll : 0;
}

function subscribeScroll(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
        callback();
      });
      ticking = true;
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}

export function useScroll() {
  const scrollY = useSyncExternalStore(subscribeScroll, getScrollY, getScrollY);
  const scrollDirection = useSyncExternalStore(subscribeScroll, getScrollDirection, getScrollDirection);
  const scrollProgress = useSyncExternalStore(subscribeScroll, getScrollProgress, getScrollProgress);

  return { scrollY, scrollDirection, scrollProgress };
}

export function useParallax(speed: number = 0.5) {
  const { scrollY } = useScroll();
  return scrollY * speed;
}

function getReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotion);
}