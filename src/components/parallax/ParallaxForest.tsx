"use client";

import { useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useScroll";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface ParallaxLayerProps {
  src: string;
  alt: string;
  speed: number;
  yOffset?: number;
  scale?: number;
  className?: string;
  priority?: boolean;
}

function ParallaxLayer({ src, alt, speed, yOffset = 0, scale = 1, className, priority = false }: ParallaxLayerProps) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  const y = useTransform(scrollYProgress, [0, 1], [yOffset, yOffset + speed * 500]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [scale, scale + speed * 0.3]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || reducedMotion) return;

    const updateTransform = () => {
      element.style.transform = `translate3d(0, ${y.get()}px, 0) scale(${scaleTransform.get()})`;
    };

    const unsubscribeY = y.on("change", updateTransform);
    const unsubscribeScale = scaleTransform.on("change", updateTransform);
    updateTransform();

    return () => {
      unsubscribeY();
      unsubscribeScale();
    };
  }, [y, scaleTransform, reducedMotion]);

  if (reducedMotion) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className={className}
        style={{ objectFit: "cover", transform: `translateY(${yOffset}px) scale(${scale})` }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: speed * 10,
        overflow: "hidden",
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover w-full h-full"
      />
    </div>
  );
}

interface ParallaxForestProps {
  className?: string;
}

export function ParallaxForest({ className }: ParallaxForestProps) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const headlineRef = useRef<HTMLDivElement>(null);

  const headlineY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, -100, -300]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const headlineScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  useEffect(() => {
    const element = headlineRef.current;
    if (!element || reducedMotion) return;

    const updateTransform = () => {
      element.style.transform = `translate3d(0, ${headlineY.get()}px, 0) scale(${headlineScale.get()})`;
      element.style.opacity = String(headlineOpacity.get());
    };

    const unsubscribeY = headlineY.on("change", updateTransform);
    const unsubscribeOpacity = headlineOpacity.on("change", updateTransform);
    const unsubscribeScale = headlineScale.on("change", updateTransform);
    updateTransform();

    return () => {
      unsubscribeY();
      unsubscribeOpacity();
      unsubscribeScale();
    };
  }, [headlineY, headlineOpacity, headlineScale, reducedMotion]);

  return (
    <section className={className} aria-labelledby="hero-heading">
      <div className="relative w-full h-screen min-h-[700px] max-h-[1000px] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ParallaxLayer
            src="/images/forest/sun.svg"
            alt="the sun"
            speed={0.05}
            yOffset={-100}
            scale={1.2}
            priority
          />
          <ParallaxLayer
            src="/images/forest/mountains.svg"
            alt="mountains"
            speed={0.15}
            yOffset={50}
          />
          <ParallaxLayer
            src="/images/forest/clouds-1.svg"
            alt="clouds"
            speed={0.25}
            yOffset={-50}
          />
          <ParallaxLayer
            src="/images/forest/clouds-2.svg"
            alt="clouds"
            speed={0.2}
            yOffset={0}
          />
          <ParallaxLayer
            src="/images/forest/clouds-3.svg"
            alt="clouds"
            speed={0.3}
            yOffset={30}
          />
          <ParallaxLayer
            src="/images/forest/forest-4.svg"
            alt="the fourth layer of the coding forest"
            speed={0.4}
            yOffset={100}
          />
          <ParallaxLayer
            src="/images/forest/forest-3.svg"
            alt="the third layer of the coding forest"
            speed={0.5}
            yOffset={150}
          />
          <ParallaxLayer
            src="/images/forest/forest-2.svg"
            alt="the second layer of the coding forest"
            speed={0.6}
            yOffset={200}
          />
          <ParallaxLayer
            src="/images/forest/forest-1.svg"
            alt="first layer of the coding forest"
            speed={0.7}
            yOffset={250}
          />
          <ParallaxLayer
            src="/images/forest/tree-close-1.svg"
            alt="a close up tree of the forest"
            speed={0.85}
            yOffset={300}
            scale={1.1}
          />
          <ParallaxLayer
            src="/images/forest/tree-close-2.svg"
            alt="a close up tree of the forest"
            speed={0.9}
            yOffset={320}
            scale={1.15}
          />
          <ParallaxLayer
            src="/images/forest/tree-close-3.svg"
            alt="a close up tree of the forest"
            speed={0.95}
            yOffset={340}
            scale={1.2}
          />
        </div>

        <div
          ref={headlineRef}
          className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none"
          style={{ willChange: "transform, opacity" }}
          aria-hidden="true"
        >
          <h1
            id="hero-heading"
            className="text-5xl sm:text-7xl lg:text-9xl font-bold text-white text-center leading-tight tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            style={{ textTransform: "lowercase" }}
          >
            web design & development
          </h1>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none" aria-hidden="true">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </section>
  );
}