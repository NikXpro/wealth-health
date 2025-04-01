import React from "react";
import "./Button.scss";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  size = "medium",
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`button button--${variant} button--${size}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
