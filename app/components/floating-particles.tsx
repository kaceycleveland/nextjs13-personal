'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  color: string
  opacity: number
  velocityX: number
  velocityY: number
  fadeDirection: number
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const getTailwindColor = (className: string) => {
      const div = document.createElement('div')
      div.className = className
      div.style.display = 'none'
      document.body.appendChild(div)
      const color = getComputedStyle(div).color
      document.body.removeChild(div)
      return color || 'rgb(59, 130, 246)' // fallback to blue
    }

    const colors = [
      getTailwindColor('text-blue-500'),
      getTailwindColor('text-purple-500'),
      getTailwindColor('text-pink-500'),
      getTailwindColor('text-emerald-500'),
      getTailwindColor('text-amber-500'),
      getTailwindColor('text-red-500'),
      getTailwindColor('text-indigo-500'),
      getTailwindColor('text-teal-500'),
    ]

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.7 + 0.1,
      velocityX: (Math.random() - 0.5) * 0.5,
      velocityY: (Math.random() - 0.5) * 0.5,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
    })

    const initParticles = () => {
      particlesRef.current = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticle = (particle: Particle) => {
      particle.x += particle.velocityX
      particle.y += particle.velocityY

      particle.opacity += particle.fadeDirection * 0.005
      if (particle.opacity <= 0.1 || particle.opacity >= 0.8) {
        particle.fadeDirection *= -1
      }

      if (particle.x < -10) particle.x = canvas.width + 10
      if (particle.x > canvas.width + 10) particle.x = -10
      if (particle.y < -10) particle.y = canvas.height + 10
      if (particle.y > canvas.height + 10) particle.y = -10
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        updateParticle(particle)
        drawParticle(particle)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  )
}