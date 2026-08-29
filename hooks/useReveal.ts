"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Options = {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useReveal<T extends HTMLElement = HTMLElement>({
  once = true,
  rootMargin = "0px 0px -8% 0px",
  threshold = 0.12,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, reduced, rootMargin, threshold]);

  return { ref, visible: reduced || visible };
}
