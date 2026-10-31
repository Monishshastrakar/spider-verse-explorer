import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-accent-magenta text-white hover:bg-pink-600 shadow-lg shadow-accent-magenta/20 hover:shadow-accent-magenta/40",
    ghost: "bg-transparent text-accent-cyan hover:bg-accent-cyan/10 hover:text-accent-cyan",
    outline: "border border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-black",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ArrowButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="primary" size="md" className={className} {...props}>
      {children} <ArrowRight className="ml-2 w-4 h-4" />
    </Button>
  );
}