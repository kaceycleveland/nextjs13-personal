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
      getTailwindColor("text-blue-300/50"),
      getTailwindColor("text-purple-300/50"),
      getTailwindColor("text-pink-300/50"),
      getTailwindColor("text-emerald-300/50"),
      getTailwindColor("text-amber-300/50"),
      getTailwindColor("text-rose-300/50"),
      getTailwindColor("text-indigo-300/50"),
      getTailwindColor("text-teal-300/50"),
      getTailwindColor("text-cyan-300/50"),
      getTailwindColor("text-violet-300/50"),
      getTailwindColor("text-lime-300/50"),
      getTailwindColor("text-orange-300/50"),
    ];

    const createParticle = (initialSpawn = false): Particle => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4; // 40% of smaller dimension

      let startX, startY;

      if (initialSpawn) {
        // For initial spawn, distribute particles across the allowed radius
        const spawnAngle = Math.random() * Math.PI * 2;
        const spawnDistance = Math.random() * maxRadius;
        startX = centerX + Math.cos(spawnAngle) * spawnDistance;
        startY = centerY + Math.sin(spawnAngle) * spawnDistance;
      } else {
        // For respawned particles, start near center
        const spawnRadius = 30;
        const spawnAngle = Math.random() * Math.PI * 2;
        const spawnDistance = Math.random() * spawnRadius;
        startX = centerX + Math.cos(spawnAngle) * spawnDistance;
        startY = centerY + Math.sin(spawnAngle) * spawnDistance;
      }

      // Create radial velocity - particles move outward from center
      const angle = Math.random() * Math.PI * 2;
      // Scale speed based on viewport size to prevent fast movement on mobile
      const baseSpeed = Math.random() * 0.3 + 0.1;
      const viewportScale = Math.min(canvas.width, canvas.height) / 800; // Normalize to 800px reference
      const speed = baseSpeed * Math.max(0.3, Math.min(1, viewportScale)); // Clamp between 0.3x and 1x speed

      const maxOpacity = (Math.random() * 0.5 + 0.3) * 0.85; // Target opacity reduced by 15%

      return {
        x: startX,
        y: startY,
        size: Math.random() * 12 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0, // Start at 0 opacity
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        age: 0,
        maxAge: maxOpacity, // Store target opacity as maxAge for fade-in
        spawning: true,
        despawning: false,
      };
    };

    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(true)); // true for initial spawn distribution
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
          const centerY = canvas.height / 2;
          const spawnRadius = 30;
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnDistance = Math.random() * spawnRadius;

          particle.x = centerX + Math.cos(spawnAngle) * spawnDistance;
          particle.y = centerY + Math.sin(spawnAngle) * spawnDistance;

          // Give new radial velocity
          const angle = Math.random() * Math.PI * 2;
          // Scale speed based on viewport size to prevent fast movement on mobile
          const baseSpeed = Math.random() * 0.3 + 0.1;
          const viewportScale = Math.min(canvas.width, canvas.height) / 800; // Normalize to 800px reference
          const speed = baseSpeed * Math.max(0.3, Math.min(1, viewportScale)); // Clamp between 0.3x and 1x speed
          particle.velocityX = Math.cos(angle) * speed;
          particle.velocityY = Math.sin(angle) * speed;

          // Reset properties for new spawn
          const maxOpacity = (Math.random() * 0.5 + 0.3) * 0.85; // Target opacity reduced by 15%
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
      const centerY = canvas.height / 2;
      const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;

      // Calculate distance from center
      const distanceFromCenter = Math.sqrt(
        Math.pow(particle.x - centerX, 2) + Math.pow(particle.y - centerY, 2)
      );

      // If particle reaches the radial limit or leaves screen, start despawning
      if (
        distanceFromCenter > maxRadius ||
        particle.x < -20 ||
        particle.x > canvas.width + 20 ||
        particle.y < -20 ||
        particle.y > canvas.height + 20
      ) {
        particle.despawning = true;
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.fillStyle = particle.color;
      const blurAmount = Math.max(2, particle.size * 0.5 * 1.15); // Increase blur by 15%
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

  console.log("transformY", canvasY);
  return (
    <motion.canvas
      ref={canvasRef}
      className={`pointer-events-none -z-10 ${className || ""}`}
      style={{
        background: "transparent",
        opacity: canvasOpacity,
        y: canvasY,
        x: "-50%",
        scale: canvasScale,
      }}
    />
  );
}
