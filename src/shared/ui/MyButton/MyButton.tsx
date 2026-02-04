import type { FC, ButtonHTMLAttributes } from "react";
import s from "./MyButton.module.scss";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const MyButton: FC<ButtonProps> = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className, 
    ...props 
}) => {

    const buttonClasses = clsx(
        s.btn,
        s[`btn--${variant}`],
        s[`btn--${size}`],
        className
    )

    return (

        <button 
            className={buttonClasses} 
            {...props}
        >
            {children}
        </button>
    );
};