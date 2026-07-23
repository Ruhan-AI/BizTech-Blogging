"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import SceneShell, { useReducedMotion } from "./SceneShell";

const CATEGORIES = [
  { name: "SEO & Growth", slug: "seo-digital-growth", color: "#00d8bd", angle: 0 },
  { name: "People Operations", slug: "hr-people-operations", color: "#8b5cf6", angle: (Math.PI * 2) / 6 },
  { name: "Branding", slug: "social-media-branding", color: "#ff2ea6", angle: ((Math.PI * 2) / 6) * 2 },
  { name: "Web & Design", slug: "website-development-design", color: "#34d399", angle: ((Math.PI * 2) / 6) * 3 },
  { name: "Startup Strategy", slug: "startup-business-strategy", color: "#ffe66b", angle: ((Math.PI * 2) / 6) * 4 },
  { name: "Career Development", slug: "vocational-career-development", color: "#38bdf8", angle: ((Math.PI * 2) / 6) * 5 },
];

function OrbCanvas() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.5);
    
    let parentWidth = canvas.parentElement?.offsetWidth || 500;
    let parentHeight = canvas.parentElement?.offsetHeight || 420;

    canvas.width = parentWidth * dpr;
    canvas.height = parentHeight * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      parentWidth = canvas.parentElement.offsetWidth || 500;
      parentHeight = canvas.parentElement.offsetHeight || 420;
      canvas.width = parentWidth * dpr;
      canvas.height = parentHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener("resize", handleResize);

    let rotationAngle = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - parentWidth / 2) / (parentWidth / 2);
      mouseY = (e.clientY - rect.top - parentHeight / 2) / (parentHeight / 2);
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const orbObj = { pulse: 1 };
    const gsapTween = gsap.to(orbObj, {
      pulse: 1.12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const render = () => {
      ctx.clearRect(0, 0, parentWidth, parentHeight);

      const centerX = parentWidth / 2;
      const centerY = parentHeight / 2;
      const radiusX = Math.min(parentWidth, parentHeight) * 0.35;
      const radiusY = radiusX * 0.45;

      rotationAngle += 0.005;

      // Draw central 3D orb
      const gradient = ctx.createRadialGradient(
        centerX + mouseX * 20,
        centerY + mouseY * 20,
        10,
        centerX,
        centerY,
        70 * orbObj.pulse
      );
      gradient.addColorStop(0, "#a98aff");
      gradient.addColorStop(0.5, "#6041db");
      gradient.addColorStop(1, "rgba(96, 65, 219, 0.05)");

      ctx.beginPath();
      ctx.arc(centerX + mouseX * 15, centerY + mouseY * 15, 65 * orbObj.pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowColor = "#6041db";
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw orbital ring
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI / 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render category nodes
      CATEGORIES.forEach((cat) => {
        const currentAngle = cat.angle + rotationAngle;
        const x = centerX + Math.cos(currentAngle) * radiusX + mouseX * 25;
        const y = centerY + Math.sin(currentAngle) * radiusY + mouseY * 25;
        const scale = (Math.sin(currentAngle) + 2) / 3;

        ctx.beginPath();
        ctx.arc(x, y, 12 * scale, 0, Math.PI * 2);
        ctx.fillStyle = cat.color;
        ctx.shadowColor = cat.color;
        ctx.shadowBlur = 20 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = `${Math.round(11 * scale)}px Inter, sans-serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillText(cat.name, x + 16 * scale, y + 4 * scale);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gsapTween.kill();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <div style={{ width: "100%", height: "420px", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", cursor: "pointer" }} />
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.5)",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        ✦ 3D Knowledge Orb • Hover to tilt perspective
      </div>
    </div>
  );
}

export default function KnowledgeOrb() {
  return (
    <SceneShell
      fallbackTitle="The BizTech Editorial Universe"
      fallbackSubtitle="6 Interconnected Knowledge Pillars"
      height="420px"
    >
      <OrbCanvas />
    </SceneShell>
  );
}
