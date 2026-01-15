'use client';

import Link from 'next/link';
import { css, keyframes } from '@emotion/react';
import { useRef, useState } from 'react';

const particleFloat = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate(0, 0) scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'translate(var(--tx), var(--ty)) scale(0)',
  },
});

const navBarStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.5rem 2rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
});

const logoContainerStyles = css({
  position: 'relative',
  overflow: 'visible',
});

const logoStyles = css({
  width: '48px',
  height: '48px',
  display: 'block',
});

const titleContainerStyles = css({
  position: 'relative',
  overflow: 'visible',
  
  '&:hover .title-bg': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
});

const titleBgStyles = css({
  position: 'absolute',
  inset: 0,
  borderRadius: '999px',
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease',
  zIndex: 0,
  height: '42px',
});

const titleStyles = css({
  fontSize: '1.5rem',
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: '#fff',
  position: 'relative',
  padding: '0.375rem 1.5rem',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  display: 'inline-block',
  borderRadius: '999px',
  zIndex: 1,
  lineHeight: 1.2,
  '&:hover': {
    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
});

const particleStyles = css({
  position: 'absolute',
  width: '3px',
  height: '3px',
  borderRadius: '50%',
  background: '#00d4ff',
  pointerEvents: 'none',
  animation: `${particleFloat} 1.5s ease-out forwards`,
});

export default function NavBar() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);
  const [logoParticles, setLogoParticles] = useState<Array<{ id: number; x: number; y: number; tx: number; ty: number }>>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logoIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    intervalRef.current = setInterval(() => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      const particle = {
        id: particleIdRef.current++,
        x,
        y,
        tx,
        ty,
      };

      setParticles(prev => [...prev, particle]);

      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 1500);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleLogoMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    logoIntervalRef.current = setInterval(() => {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      const particle = {
        id: particleIdRef.current++,
        x,
        y,
        tx,
        ty,
      };

      setLogoParticles(prev => [...prev, particle]);

      // Remove particle after animation
      setTimeout(() => {
        setLogoParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 1500);
    }, 150);
  };

  const handleLogoMouseLeave = () => {
    if (logoIntervalRef.current) {
      clearInterval(logoIntervalRef.current);
      logoIntervalRef.current = null;
    }
  };

  return (
    <nav css={navBarStyles}>
      <div css={logoContainerStyles}>
        <Link
          href="/"
          onMouseEnter={handleLogoMouseEnter}
          onMouseLeave={handleLogoMouseLeave}
        >
          <img src="/favicon.svg" alt="JG Logo" css={logoStyles} />
        </Link>
        {logoParticles.map(particle => (
          <div
            key={particle.id}
            css={particleStyles}
            style={{
              left: particle.x,
              top: particle.y,
              '--tx': `${particle.tx}px`,
              '--ty': `${particle.ty}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div css={titleContainerStyles}>
        <div className="title-bg" css={titleBgStyles} />
        <Link
          href="/"
          css={titleStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Jay Griffin
        </Link>
        {particles.map(particle => (
          <div
            key={particle.id}
            css={particleStyles}
            style={{
              left: particle.x,
              top: particle.y,
              '--tx': `${particle.tx}px`,
              '--ty': `${particle.ty}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </nav>
  );
}
