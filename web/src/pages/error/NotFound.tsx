import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-background-dark text-white font-display">
            <Header />

            <main className="flex-grow pt-20">
                <section className="not-found-container bg-forest">
                    {/* Background Elements */}
                    <div className="grid-background"></div>
                    <div className="glow-orb-1"></div>
                    <div className="glow-orb-2"></div>

                    {/* Content Card */}
                    <div className="glass-card animate-in fade-in zoom-in duration-700">
                        <div className="error-badge">
                            <span className="material-icons text-sm">warning</span>
                            ERRO DE ROTA
                        </div>

                        <h1 className="not-found-title text-glow animate-float">
                            404
                        </h1>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                            Página não encontrada
                        </h2>

                        <p className="text-base sm:text-lg text-slate-300 mb-10 leading-relaxed max-w-xl mx-auto">
                            A página que você está procurando parece ter sido movida ou nunca existiu em nosso terminal digital.
                        </p>

                        <div className="flex justify-center">
                            <Button
                                to="/"
                                variant="primary"
                                className="px-10 py-4 text-lg flex items-center gap-3 shadow-[0_0_20px_rgba(19,236,109,0.3)]"
                            >
                                <span className="material-icons">home</span>
                                VOLTAR PARA A HOME
                            </Button>
                        </div>

                        <div className="mt-8">
                            <button
                                onClick={() => navigate('/contato')}
                                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-semibold group cursor-pointer bg-transparent border-none outline-none"
                            >
                                <span className="material-icons text-lg group-hover:-translate-x-1 transition-transform">help_outline</span>
                                Precisa de ajuda? Acesse nossa Central de Ajuda
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
