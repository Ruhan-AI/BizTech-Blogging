"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";

const CATEGORIES = [
  { name: "SEO & Growth", slug: "seo-digital-growth", color: "#00d8bd", angle: 0 },
  { name: "People Operations", slug: "hr-people-operations", color: "#8b5cf6", angle: (Math.PI * 2) / 6 },
  { name: "Branding", slug: "social-media-branding", color: "#ff2ea6", angle: ((Math.PI * 2) / 6) * 2 },
  { name: "Web & Design", slug: "website-development-design", color: "#34d399", angle: ((Math.PI * 2) / 6) * 3 },
  { name: "Startup Strategy", slug: "startup-business-strategy", color: "#ffe66b", angle: ((Math.PI * 2) / 6) * 4 },
  { name: "Career Development", slug: "vocational-career-development", color: "#38bdf8", angle: ((Math.PI * 2) / 6) * 5 },
];

export default function KnowledgeOrb() {
  const canvasRef = useRef(null);
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || 500);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || 500;
      height = canvas.height = canvas.parentElement.offsetHeight || 500;
    };
    window.addEventListener("resize", handleResize);

    let rotationAngle = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
      mouseY = (e.clientY - rect.top - height / 2) / (height / 2);
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // GSAP floating animation
    const orbObj = { pulse: 1 };
    gsap.to(orbObj, {
      pulse: 1.15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = Math.min(width, height) * 0.35;
      const radiusY = radiusX * 0.45;

      rotationAngle += 0.006;

      // Draw central BizTech 3D orb
      const gradient = ctx.createRadialGradient(
        centerX + mouseX * 20,
        centerY + mouseY * 20,
        10,
        centerX,
        centerY,
        70 * orbObj.pulse,
      );
      gradient.addColorStop(0, "#a98aff");
      gradient.addColorStop(0.5, "#6041db");
      gradient.addColorStop(1, "rgba(96, 65, 219, 0.05)");

      ctx.beginPath();
      ctx.arc(centerX + mouseX * 15, centerY + mouseY * 15, 65 * orbObj.pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.shadowColor = "#6041db";
      ctx.shadowBlur = 35;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw orbital ring
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, Math.PI / 8, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render 3D orbiting category nodes
      CATEGORIES.forEach((cat) => {
        const currentAngle = cat.angle + rotationAngle;
        const x = centerX + Math.cos(currentAngle) * radiusX + mouseX * 25;
        const y = centerY + Math.sin(currentAngle) * radiusY + mouseY * 25;
        const scale = (Math.sin(currentAngle) + 2) / 3; // depth perspective scaling

        ctx.beginPath();
        ctx.arc(x, y, 12 * scale, 0, Math.PI * 2);
        ctx.fillStyle = cat.color;
        ctx.shadowColor = cat.color;
        ctx.shadowBlur = 20 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label tag
        ctx.font = `${Math.round(11 * scale)}px Inter, sans-serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillText(cat.name, x + 16 * scale, y + 4 * scale);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        style={{
          width: "100%",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%)",
        }}
      >
        <div
          style={{
            padding: "24px 36px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <strong style={{ display: "block", color: "#fff", fontSize: "18px" }}>The Editorial Intelligence Universe</strong>
          <span style={{ fontSize: "13px", color: "var(--muted)", marginTop: "6px", display: "block" }}>
            6 Connected Category Pillars
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "420px", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", cursor: "pointer" }} />
      <div
        style={{
          position: "absolute",
          bottom: "10px",
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
