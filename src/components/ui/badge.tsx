import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-none border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-500",
        {
          "border-transparent bg-foreground text-background": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground": variant === "destructive",
          "border-border text-muted-foreground": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
