"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.12, // Smoother scroll
      syncTouch: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
