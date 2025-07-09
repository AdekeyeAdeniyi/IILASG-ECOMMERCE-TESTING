import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "bg-yellow-500 text-white hover:bg-yellow-600",
        orange: "bg-orange-500 text-white hover:bg-orange-600",
        outline: "border border-yellow-500 text-yellow-600 hover:bg-yellow-50",
        ghost: "bg-transparent text-yellow-500 hover:bg-yellow-100",
        disabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-6 text-base",
        lg: "h-12 px-8 text-lg",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      icon: {
        none: "",
        left: "flex-row-reverse gap-2",
        right: "gap-2",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
      radius: "full",
      icon: "right",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, radius, icon, iconLeft, iconRight, asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, radius, icon, className }))}
        ref={ref}
        {...props}
      >
        {icon === "left" && iconLeft}
        {children}
        {icon === "right" && iconRight}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
