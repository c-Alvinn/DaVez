import Logo from '../common/Logo';

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10">
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Logo />
                <div className="hidden md:flex items-center gap-8 text-white">
                    <a className="text-sm font-medium hover:text-primary transition-colors no-underline" href="#inicio">Início</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors no-underline" href="#sobre">Sobre</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors no-underline" href="#servicos">Serviços</a>
                    <a className="text-sm font-medium hover:text-primary transition-colors no-underline" href="#faq">FAQ</a>
                </div>
                <div className="w-[180px] hidden md:block">
                    {/* Espaçador para manter o logo centralizado ou equilibrar o layout */}
                </div>
            </nav>
        </header>
    );
}
