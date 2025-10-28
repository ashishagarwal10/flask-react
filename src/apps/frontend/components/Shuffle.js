import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';

const Shuffle = ({
  text,
  shuffleDirection = 'right',
  duration = 0.35,
  animationMode = 'evenodd',
  shuffleTimes = 1,
  ease = 'power3.out',
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = true,
  respectReducedMotion = true,
}) => {
  const containerRef = useRef(null);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView) {
      const chars = containerRef.current.querySelectorAll('.char');
      const timeline = gsap.timeline();

      timeline.fromTo(
        chars,
        {
          opacity: 0,
          y: shuffleDirection === 'right' ? 20 : -20,
          rotateX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration,
          stagger: {
            each: stagger,
            from: shuffleDirection === 'right' ? 'start' : 'end',
          },
          ease,
        }
      );
    }
  }, [inView, shuffleDirection, duration, stagger, ease]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      const chars = containerRef.current.querySelectorAll('.char');
      gsap.to(chars, {
        rotateY: 360,
        duration: 0.5,
        stagger: {
          each: 0.02,
          from: shuffleDirection === 'right' ? 'start' : 'end',
        },
        ease: 'back.out(1.7)',
      });
    }
  };

  const characters = text.split('').map((char, index) => (
    <span
      key={index}
      className="char"
      style={{
        display: 'inline-block',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div
      ref={(element) => {
        containerRef.current = element;
        ref(element);
      }}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: '1000px',
      }}
    >
      {characters}
    </div>
  );
};

export default Shuffle;