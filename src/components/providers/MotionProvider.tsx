"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * LazyMotion + domAnimation loads only the animation/exit/gesture features we use.
 * The full `motion` component pulls in drag and layout features we never touch.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
