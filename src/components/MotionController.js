"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    const setup = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const updateProgress = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        document.documentElement.style.setProperty(
          "--scroll-progress",
          String(Math.min(Math.max(progress, 0), 1)),
        );
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      if (reducedMotion) {
        teardown = () => window.removeEventListener("scroll", updateProgress);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        const heroTargets = gsap.utils.toArray("[data-hero-reveal]");
        if (heroTargets.length) {
          gsap.from(heroTargets, {
            opacity: 0,
            y: 26,
            duration: 0.9,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "opacity,transform",
          });
        }

        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 28,
            filter: "blur(5px)",
            duration: 0.85,
            ease: "power3.out",
            clearProps: "opacity,transform,filter",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          });
        });

        gsap.utils.toArray("[data-float]").forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 ? 9 : -9,
            duration: 3.4 + index * 0.35,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        const track = document.querySelector("[data-topic-track]");
        if (track) {
          gsap.to(track, {
            xPercent: -50,
            duration: 30,
            ease: "none",
            repeat: -1,
          });
        }
      }, document.body);

      teardown = () => {
        context.revert();
        window.removeEventListener("scroll", updateProgress);
      };
    };

    setup();
    return () => {
      cancelled = true;
      teardown();
    };
  }, [pathname]);

  return null;
}
