import { Link } from 'react-router-dom';
import logoDavez from '../../assets/logo-davez.png';

interface LogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showText?: boolean;
}

export default function Logo({ className = '', size = 'md', showText = true }: LogoProps) {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const textClasses = {
        sm: 'text-xl',
        md: 'text-2xl',
        lg: 'text-3xl',
        xl: 'text-4xl'
    };

    return (
        <Link to="/" className={`flex items-center gap-2 group cursor-pointer no-underline ${className}`}>
            <img
                src={logoDavez}
                alt="DaVez Logo"
                className={`${sizeClasses[size]} object-contain rounded-lg transition-transform group-hover:scale-105`}
            />
            {showText && (
                <span className={`${textClasses[size]} font-extrabold tracking-tighter text-white`}>
                    Da<span className="text-primary">Vez</span>
                </span>
            )}
        </Link>
    );
}
