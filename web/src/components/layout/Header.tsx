import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/Logo';
import { useAuth } from '../../context/useAuth';

export default function Header() {
    const location = useLocation();
    const { user, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const linkClass = (path: string) => {
        return `text-sm font-medium transition-colors no-underline ${isActive(path) ? 'text-primary' : 'text-white hover:text-primary'
            }`;
    };

    const mobileLinkClass = (path: string) => {
        return `text-lg font-semibold py-4 border-b border-white/5 no-underline transition-colors ${isActive(path) ? 'text-primary' : 'text-white'
            }`;
    };

    const getDashboardPath = () => {
        if (!user) return '/login';
        if (user.role === 'DRIVER') return '/driver';
        if (['SCALE_OPERATOR', 'GATE_KEEPER', 'MANAGER', 'ADMIN'].includes(user.role)) return '/dashboard';
        if (user.role === 'CARRIER') return '/carrier';
        return '/';
    };

    const getBotaoLabel = () => {
        if (!isAuthenticated()) return 'Área do Cliente';
        if (user?.role === 'DRIVER') return 'Área do Motorista';
        return 'Dashboard';
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
                <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Logo />

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link className={linkClass('/')} to="/">Início</Link>
                        <Link className={linkClass('/sobre')} to="/sobre">Sobre</Link>
                        <Link className={linkClass('/servicos')} to="/servicos">Serviços</Link>
                        <Link className={linkClass('/contato')} to="/contato">Contato</Link>
                    </div>

                    {/* Action / Spacer Desktop */}
                    <div className="hidden md:flex min-w-[180px] justify-end">
                        <Link to={getDashboardPath()} className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all cursor-pointer whitespace-nowrap">
                            {getBotaoLabel()}
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-white p-2 cursor-pointer focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        <span className="material-icons text-3xl">
                            {isMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Backdrop */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu Drawer - Abre abaixo do header e não ocupa a tela inteira */}
            <div
                className={`
                    fixed top-20 right-0 bottom-0 z-50 w-4/5 max-w-[300px] bg-[#102218] border-l border-white/10 md:hidden transition-transform duration-300 ease-in-out shadow-2xl
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex flex-col p-8 gap-2">
                    <Link className={mobileLinkClass('/')} to="/">Início</Link>
                    <Link className={mobileLinkClass('/sobre')} to="/sobre">Sobre</Link>
                    <Link className={mobileLinkClass('/servicos')} to="/servicos">Serviços</Link>
                    <Link className={mobileLinkClass('/contato')} to="/contato">Contato</Link>
                    <div className="mt-8">
                        <Link
                            to={getDashboardPath()}
                            className="flex items-center justify-center w-full bg-primary text-background-dark py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-primary/90 transition-all"
                        >
                            {isAuthenticated() ? 'Acessar Painel' : 'Acessar Sistema'}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
