import { motion, HTMLMotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>> {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'quiz';
  disabled?: boolean;
  fullWidth?: boolean;
  isCorrect?: boolean | null;
  isWrong?: boolean | null;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  isCorrect,
  isWrong,
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 text-center';
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50 disabled:text-gray-400',
    success: 'bg-green-500 hover:bg-green-600 text-white disabled:bg-green-300',
    error: 'bg-red-500 hover:bg-red-600 text-white disabled:bg-red-300',
    quiz: isCorrect 
      ? 'bg-green-500 text-white'
      : isWrong
        ? 'bg-red-500 text-white'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
