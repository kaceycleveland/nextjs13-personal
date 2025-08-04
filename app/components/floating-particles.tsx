"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  velocityX: number;
  velocityY: number;
  fadeDirection: number;
  age: number;
  maxAge: number;
  spawning: boolean;
  despawning: boolean;
}

interface FloatingParticlesProps {
  className?: string;
}

export default function FloatingParticles({
  className,
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const { scrollY } = useScroll();
  const canvasOpacity = useTransform(scrollY, [0, 300], [1, 0.2]);
  const canvasY = useTransform(scrollY, [0, 300], [0, 150]);
  const canvasScale = useTransform(scrollY, [0, 300], [1, 1.4]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      "rgba(147, 197, 253, 0.5)", // blue-300/50
      "rgba(196, 181, 253, 0.5)", // purple-300/50
      "rgba(249, 168, 212, 0.5)", // pink-300/50
      "rgba(110, 231, 183, 0.5)", // emerald-300/50
      "rgba(252, 211, 77, 0.5)", // amber-300/50
      "rgba(253, 164, 175, 0.5)", // rose-300/50
      "rgba(165, 180, 252, 0.5)", // indigo-300/50
      "rgba(94, 234, 212, 0.5)", // teal-300/50
      "rgba(103, 232, 249, 0.5)", // cyan-300/50
      "rgba(196, 181, 253, 0.5)", // violet-300/50
      "rgba(190, 242, 100, 0.5)", // lime-300/50
      "rgba(253, 186, 116, 0.5)", // orange-300/50
    ];

    const createParticle = (): Particle => {
      const centerX = canvas.width / 2;
      const centerY = 0; // Fixed to top of page
      const maxRadius = Math.max(canvas.height * 0.6, 300); // Ensure minimum spawn area

      let startX, startY;

      // Distribute particles across the allowed radius (bottom 180 degrees only)
      const spawnAngle = Math.random() * Math.PI; // 0 to π (bottom half)
      const spawnDistance = Math.random() * maxRadius;
      startX = centerX + Math.cos(spawnAngle) * spawnDistance;
      startY = centerY + Math.sin(spawnAngle) * spawnDistance;

      // Create radial velocity - particles move outward from top center (bottom 180 degrees only)
      const angle = Math.random() * Math.PI; // 0 to π (downward directions only)
      // Consistent speed across all viewport sizes for better visibility
      const baseSpeed = Math.random() * 0.4 + 0.2; // Slightly faster base speed

      const maxOpacity = Math.random() * 0.6 + 0.4; // Higher base opacity for better visibility

      return {
        x: startX,
        y: startY,
        size: Math.random() * 8 + 4, // Slightly larger minimum size
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0, // Start at 0 opacity
        velocityX: Math.cos(angle) * baseSpeed,
        velocityY: Math.sin(angle) * baseSpeed,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        age: 0,
        maxAge: maxOpacity, // Store target opacity as maxAge for fade-in
        spawning: true,
        despawning: false,
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.max(
        25,
        Math.floor((canvas.width * canvas.height) / 12000)
      ); // Higher density and minimum particles
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    const updateParticle = (particle: Particle) => {
      // Handle spawning fade-in
      if (particle.spawning) {
        particle.opacity += 0.02; // Fade in speed
        if (particle.opacity >= particle.maxAge) {
          particle.opacity = particle.maxAge;
          particle.spawning = false;
        }
        // Don't move while spawning
        return;
      }

      // Handle despawning fade-out
      if (particle.despawning) {
        particle.opacity -= 0.03; // Fade out speed (faster than fade in)
        if (particle.opacity <= 0) {
          // Reset particle for respawn
          const centerX = canvas.width / 2;
          const centerY = 0; // Fixed to top of page
          const spawnRadius = 50; // Increased spawn radius
          const spawnAngle = Math.random() * Math.PI; // 0 to π (bottom half only)
          const spawnDistance = Math.random() * spawnRadius;

          particle.x = centerX + Math.cos(spawnAngle) * spawnDistance;
          particle.y = centerY + Math.sin(spawnAngle) * spawnDistance;

          // Give new radial velocity (bottom 180 degrees only)
          const angle = Math.random() * Math.PI; // 0 to π (downward directions only)
          // Consistent speed across all viewport sizes for better visibility
          const baseSpeed = Math.random() * 0.4 + 0.2; // Slightly faster base speed
          particle.velocityX = Math.cos(angle) * baseSpeed;
          particle.velocityY = Math.sin(angle) * baseSpeed;

          // Reset properties for new spawn
          const maxOpacity = Math.random() * 0.6 + 0.4; // Higher base opacity for better visibility
          particle.opacity = 0;
          particle.maxAge = maxOpacity;
          particle.spawning = true;
          particle.despawning = false;
          particle.fadeDirection = Math.random() > 0.5 ? 1 : -1;
        }
        return;
      }

      // Normal movement and opacity oscillation
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      // Gentle opacity oscillation around the base opacity
      const baseOpacity = particle.maxAge;
      particle.opacity += particle.fadeDirection * 0.003;
      if (
        particle.opacity <= baseOpacity * 0.6 ||
        particle.opacity >= baseOpacity
      ) {
        particle.fadeDirection *= -1;
      }

      const centerX = canvas.width / 2;
      const centerY = 0; // Fixed to top of page
      const maxRadius = Math.max(canvas.height * 0.6, 300); // Ensure minimum spawn area

      // Calculate distance from top center
      const distanceFromCenter = Math.sqrt(
        Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
      );

      // If particle reaches the radial limit or leaves screen, start despawning
      if (
        distanceFromCenter > maxRadius ||
        particle.x < -20 ||
        particle.x > canvas.width + 20 ||
        particle.y > canvas.height + 20 || // Only check bottom boundary
        particle.y < -20 // Keep top boundary check for edge cases
      ) {
        particle.despawning = true;
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;

      // Create a soft glow effect with multiple draws instead of blur filter
      const glowSize = particle.size * 2;
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        glowSize
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(0.4, particle.color.replace("0.5)", "0.2)"));
      gradient.addColorStop(1, particle.color.replace("0.5)", "0)"));

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw solid center
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    let lastFrameTime = 0;
    const targetFPS = 30; // Limit to 30 FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const animateParticles = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animateParticles);
        return;
      }

      lastFrameTime = currentTime;

      const opacity = canvasOpacity.get();
      // Skip rendering if opacity is very low to save resources
      if (opacity < 0.01) {
        animationRef.current = requestAnimationFrame(animateParticles);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalAlpha = opacity;

      particlesRef.current.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(animateParticles);
    };

    resizeCanvas();
    initParticles();
    animateParticles(0);

    // Canvas opacity is now controlled by scroll position

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
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`pointer-events-none -z-10 ${className || ""}`}
      style={{
        background: "transparent",
        opacity: canvasOpacity,
        y: canvasY,
        scale: canvasScale,
      }}
    />
  );
}
