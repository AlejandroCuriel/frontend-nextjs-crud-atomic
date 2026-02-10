import { forwardRef } from "react";

type Variant = "primary" | "secondary";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  disabled?: boolean;
  children: React.ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary: "btn btn--primario",
  secondary: "btn btn--secundario"
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", disabled, children, className = "", ...props }, ref) => {
    const base = variantClasses[variant];
    const inactive = disabled ? " btn--inactivo" : "";
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${base}${inactive} ${className}`.trim()}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
