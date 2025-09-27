'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ParticleField() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particles = Array.from({ length: 30 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute bg-primary rounded-full opacity-60"
      style={{
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
        left: Math.random() * 100 + '%',
        top: '100%',
        boxShadow: '0 0 6px rgba(253, 183, 20, 0.8)',
      }}
      animate={{
        y: -window.innerHeight - 100,
        x: Math.random() * 200 - 100,
        scale: [1, 1.2, 1],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: Math.random() * 15 + 10,
        repeat: Infinity,
        ease: 'linear',
        delay: Math.random() * 15,
      }}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles}
    </div>
  );
}
