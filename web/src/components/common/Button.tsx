import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'outline' | 'access' | 'footer';
    to?: string;
    onClick?: () => void;
    className?: string;
    icon?: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function Button({
    children,
    variant = 'primary',
    to,
    onClick,
    className = '',
    icon,
    type = 'button'
}: ButtonProps) {
    const baseStyles = "transition-all duration-300 ease-out flex items-center justify-center gap-3 font-bold no-underline active:scale-95 accent-glow";

    const variants = {
        primary: "bg-primary text-background-dark px-8 py-4 rounded-xl text-lg hover:bg-primary/90 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40",
        outline: "bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-xl text-lg backdrop-blur-sm",
        access: "bg-primary text-background-dark p-6 rounded-lg hover:bg-primary/90 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40",
        footer: "bg-primary text-background-dark py-3 px-6 rounded-lg hover:bg-primary/90 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30"
    };

    const content = (
        <>
            {icon && <span className="material-icons">{icon}</span>}
            {children}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
                {content}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {content}
        </button>
    );
}
