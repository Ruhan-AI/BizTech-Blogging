"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);

    const update = (e) => setReduced(e.matches);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export function useShouldEnable3D() {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Defer 3D canvas mount until idle or visible
    const timer = window.requestIdleCallback
      ? window.requestIdleCallback(() => setVisible(true))
      : window.setTimeout(() => setVisible(true), 300);

    return () => {
      if (window.cancelIdleCallback && typeof timer === "number") {
        window.cancelIdleCallback(timer);
      } else {
        window.clearTimeout(timer);
      }
    };
  }, []);

  const lowEndDevice = useMemo(() => {
    if (typeof window === "undefined") return false;
    const memory = (navigator).deviceMemory;
    const cores = navigator.hardwareConcurrency ?? 8;
    return (typeof memory === "number" && memory <= 4) || cores <= 4;
  }, []);

  return visible && !reducedMotion && !lowEndDevice;
}

export default function SceneShell({
  children,
  fallbackPoster = "/images/knowledge-orb-poster.webp",
  fallbackTitle = "BizTech Knowledge Ecosystem",
  fallbackSubtitle = "Human-curated editorial pillars",
  height = "420px",
}) {
  const enable3D = useShouldEnable3D();
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const hasWebGL = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebglSupported(hasWebGL);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!enable3D || !webglSupported) {
    return (
      <div
        role="region"
        aria-label={fallbackTitle}
        style={{
          width: "100%",
          height: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          background:
            "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(5,5,15,0.9) 80%)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <div>
          <strong style={{ display: "block", color: "#fff", fontSize: "18px", marginBottom: "8px" }}>
            {fallbackTitle}
          </strong>
          <span style={{ fontSize: "13px", color: "var(--muted)", display: "block" }}>
            {fallbackSubtitle}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: height, position: "relative" }}>
      {children}
    </div>
  );
}
