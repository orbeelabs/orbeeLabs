'use client';

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  initialY: number;
}

export default function ParticleFieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Criar partículas (100 partículas)
    const createParticles = (): Particle[] => {
      const particles: Particle[] = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1, // 1-4px
          speedX: (Math.random() - 0.5) * 0.5, // Movimento horizontal suave
          speedY: -Math.random() * 2 - 1, // Movimento vertical para cima
          opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
          initialY: Math.random() * canvas.height,
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    // Variável para controlar pausa
    let isPaused = false;

    // Pausar quando a página não está visível
    const handleVisibilityChange = () => {
      isPaused = document.hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Função de animação
    const animate = () => {
      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualizar e desenhar partículas
      particlesRef.current.forEach((particle) => {
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Resetar partícula quando sair da tela
        if (particle.y < -particle.size) {
          particle.y = canvas.height + particle.size;
          particle.x = Math.random() * canvas.width;
        }

        // Resetar se sair horizontalmente
        if (particle.x < -particle.size) {
          particle.x = canvas.width + particle.size;
        } else if (particle.x > canvas.width + particle.size) {
          particle.x = -particle.size;
        }

        // Desenhar partícula com glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(253, 183, 20, 0.8)'; // Amarelo da marca com glow
        ctx.fillStyle = 'rgba(253, 183, 20, particle.opacity)'; // #FDB714
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animação
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

