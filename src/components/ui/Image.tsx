"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
  width?: number;
  height?: number;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, fill = false, priority = false, sizes, className, quality = 85, width, height, ...props }, ref) => {
    if (fill) {
      return (
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes || "100vw"}
          quality={quality}
          className={cn("object-cover", className)}
          {...props}
        />
      );
    }

    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        priority={priority}
        sizes={sizes}
        quality={quality}
        width={width}
        height={height}
        className={cn("max-w-full h-auto", className)}
        {...props}
      />
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";