
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

// Glass Card Component
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  withHover?: boolean;
}

export const GlassCard = ({ 
  children, 
  className, 
  withHover = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl glass p-5 shadow-sm",
        withHover && "feature-card",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Basic Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

export const Input = ({ 
  label, 
  error, 
  className,
  ...props 
}: InputProps) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-genz-gray-dark">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-genz-gray bg-white/70 backdrop-blur-sm placeholder:text-genz-gray-medium focus:border-genz-blue transition-all duration-200",
          error && "border-red-400",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

// Button Component with variants
const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-genz-blue/40 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed btn-hover",
  {
    variants: {
      variant: {
        default: 
          "bg-genz-blue text-white shadow hover:bg-genz-blue-dark",
        outline: 
          "border border-genz-blue text-genz-blue bg-transparent hover:bg-genz-blue/10",
        ghost: 
          "bg-transparent text-genz-gray-dark hover:bg-genz-gray/20",
        subtle: 
          "bg-genz-blue/10 text-genz-blue hover:bg-genz-blue/20",
        destructive: 
          "bg-red-500 text-white hover:bg-red-600",
        success: 
          "bg-green-500 text-white hover:bg-green-600",
        warning: 
          "bg-amber-500 text-white hover:bg-amber-600",
      },
      size: {
        xs: "text-xs px-2.5 py-1.5 rounded-lg",
        sm: "text-sm px-3 py-2 rounded-lg",
        default: "px-4 py-2.5",
        lg: "text-lg px-6 py-3 rounded-xl",
        icon: "p-2",
      },
      width: {
        default: "",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = ({
  className,
  children,
  variant,
  size,
  width,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, width, className }))}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

// Animated components
export const AnimatedContainer = motion.div;

export const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Avatar Component
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar = ({ 
  src, 
  alt = "User avatar", 
  size = 'md',
  className 
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  return (
    <div 
      className={cn(
        "rounded-full bg-genz-gray flex items-center justify-center overflow-hidden border-2 border-white",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="text-genz-gray-dark font-medium">
          {alt.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

// Badge Component
export const Badge = ({ 
  children,
  variant = 'default',
  className,
  ...props
}: {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'error';
  className?: string;
  [key: string]: any;
}) => {
  const variantClasses = {
    default: 'bg-genz-blue/10 text-genz-blue',
    outline: 'border border-genz-blue/30 text-genz-blue bg-transparent',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
