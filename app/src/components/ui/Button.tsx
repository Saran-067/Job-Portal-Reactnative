import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'ghost' | 'outline' | 'solid' | 'link'; // Add 'link' variant
  className?: string; // Add className prop
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'solid', className }) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-all';
  const variantStyles = {
    solid: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    ghost: 'text-blue-500 hover:bg-blue-50',
    link: 'text-blue-500 hover:underline', // Add styles for 'link' variant
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;