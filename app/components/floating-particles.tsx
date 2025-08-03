"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  velocityX: number;
  velocityY: number;
  fadeDirection: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const canvasOpacity = useMotionValue(0);

  // Use intersection observer to detect if we're at the top of the page
  const { ref: observerRef, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getTailwindColor = (className: string) => {
      const div = document.createElement("div");
      div.className = className;
      div.style.display = "none";
      document.body.appendChild(div);
      const color = getComputedStyle(div).color;
      document.body.removeChild(div);
      return color || "rgb(59, 130, 246)"; // fallback to blue
    };

    const colors = [
      getTailwindColor("text-blue-300"),
      getTailwindColor("text-purple-300"),
      getTailwindColor("text-pink-300"),
      getTailwindColor("text-emerald-300"),
      getTailwindColor("text-amber-300"),
      getTailwindColor("text-rose-300"),
      getTailwindColor("text-indigo-300"),
      getTailwindColor("text-teal-300"),
      getTailwindColor("text-cyan-300"),
      getTailwindColor("text-violet-300"),
      getTailwindColor("text-lime-300"),
      getTailwindColor("text-orange-300"),
      // Add some darker variants for better light mode visibility
      getTailwindColor("text-blue-400"),
      getTailwindColor("text-purple-400"),
      getTailwindColor("text-pink-400"),
      getTailwindColor("text-emerald-400"),
      getTailwindColor("text-indigo-400"),
      getTailwindColor("text-teal-400"),
    ];

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.5 + 0.1, // Increased base opacity for better visibility
      velocityX: (Math.random() - 0.5) * 0.2,
      velocityY: (Math.random() - 0.5) * 0.2,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
    });

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticle = (particle: Particle) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      particle.opacity += particle.fadeDirection * 0.005;
      if (particle.opacity <= 0.1 || particle.opacity >= 0.6) {
        particle.fadeDirection *= -1;
      }

      if (particle.x < -10) particle.x = canvas.width + 10;
      if (particle.x > canvas.width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = canvas.height + 10;
      if (particle.y > canvas.height + 10) particle.y = -10;
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      const blurAmount = Math.max(2, particle.size * 0.5);
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalAlpha = canvasOpacity.get();

      particlesRef.current.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    initParticles();
    animateParticles();

    // Initial fade in animation - will be overridden by scroll observer
    animate(canvasOpacity, 1, { duration: 2, ease: "easeInOut" });

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [canvasOpacity]);

  // Handle scroll-based opacity changes
  useEffect(() => {
    if (inView) {
      // When in view (at top of page), animate to full opacity
      animate(canvasOpacity, 1, { duration: 0.8, ease: "easeOut" });
    } else {
      // When scrolled down, reduce opacity significantly
      animate(canvasOpacity, 0.2, { duration: 0.6, ease: "easeOut" });
    }
  }, [inView, canvasOpacity]);

  return (
    <>
      {/* Hidden element for intersection observer */}
      <div
        ref={observerRef}
        className="pointer-events-none absolute left-0 top-0 h-96 w-full"
        style={{ zIndex: -20 }}
      />

      {/* Canvas for particles */}
      <motion.canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: "transparent",
          opacity: canvasOpacity,
        }}
      />
    </>
  );
}
