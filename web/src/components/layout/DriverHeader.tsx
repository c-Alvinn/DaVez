import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Logo from '../common/Logo';

interface DriverHeaderProps {
    title?: string;
}

export default function DriverHeader({ title }: DriverHeaderProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const showBackButton = location.pathname !== '/driver';

    return (
        <header className="bg-background-dark sticky top-0 z-50 px-6 h-20 flex items-center justify-between shadow-lg border-b border-white/5">
            <div className="w-10">
                {showBackButton && (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 -ml-2 text-white/80 hover:text-white transition-colors cursor-pointer"
                        aria-label="Voltar"
                    >
                        <ChevronLeft size={28} />
                    </button>
                )}
            </div>

            <div
                className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
                onClick={() => navigate('/driver')}
            >
                <Logo size="sm" />
                {title && (
                    <h1 className="text-white text-xl font-bold tracking-tight uppercase hidden xs:block">
                        {title}
                    </h1>
                )}
            </div>

            <div className="w-10">
                {/* Espaçador para manter centralização equilibrada */}
            </div>
        </header>
    );
}
