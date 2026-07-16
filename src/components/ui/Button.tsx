import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "gradient" | "outline" | "ghost" | "white" | "primary-stroke";
  size?: "default" | "sm" | "lg" | "icon" | "exact";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"; // Simple fallback for asChild if not using Radix Slot

    const variants = {
      default: "bg-[var(--color-brand-dark)] text-white hover:bg-[var(--color-brand-dark)]/90",
      gradient: "bg-gradient-to-b from-[#F9FF99] to-[#E5ED64] text-black hover:opacity-90 font-medium",
      white: "bg-white text-black hover:bg-gray-50",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      ghost: "hover:bg-accent hover:text-accent-foreground text-sm font-medium",
      "primary-stroke": "bg-transparent border border-[#E5ED64] text-black hover:bg-[#E5ED64]/10",
    };

    const sizes = {
      default: "h-11 px-6 py-2 rounded-full",
      sm: "h-9 rounded-full px-4",
      lg: "h-12 rounded-full px-8 text-base",
      icon: "h-10 w-10",
      exact: "w-[120px] h-[40px] rounded-full text-base font-[12px] leading-[16px] tracking-[0.02em]",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center cursor-pointer whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
