"use client";

import { useLayoutEffect } from "react";

let lockCount = 0;
let saved: {
  overflow: string;
  position: string;
  top: string;
  width: string;
  htmlOverflow: string;
  scrollY: number;
} | null = null;

function lockBody() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    const { style } = document.body;
    saved = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
      htmlOverflow: document.documentElement.style.overflow,
      scrollY: window.scrollY,
    };
    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${saved.scrollY}px`;
    style.width = "100%";
    document.documentElement.style.overflow = "hidden";
  }
  lockCount += 1;
}

function unlockBody() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount > 0 || !saved) return;
  const { style } = document.body;
  style.overflow = saved.overflow;
  style.position = saved.position;
  style.top = saved.top;
  style.width = saved.width;
  document.documentElement.style.overflow = saved.htmlOverflow;
  window.scrollTo({ top: saved.scrollY, left: 0, behavior: "auto" });
  saved = null;
}

/** Nested-safe body scroll lock. Unlock only when the last overlay closes. */
export function useBodyScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;
    lockBody();
    return () => unlockBody();
  }, [locked]);
}
