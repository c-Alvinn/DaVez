
interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'white' | 'dark';
    className?: string;
}

export function Spinner({ size = 'md', color = 'primary', className = '' }: SpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-10 h-10 border-3'
    };

    const colorClasses = {
        primary: 'border-primary/20 border-t-primary',
        white: 'border-white/20 border-t-white',
        dark: 'border-background-dark/20 border-t-background-dark'
    };

    return (
        <div
            className={`rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
            role="status"
        >
            <span className="sr-only">Carregando...</span>
        </div>
    );
}
