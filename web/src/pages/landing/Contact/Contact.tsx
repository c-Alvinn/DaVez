import './Contact.css';
import '../Landing/Landing.css';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/common/Button';
import lp1 from '../../../assets/lp-1.png';
import lp1Mobile from '../../../assets/lp-1-mobile.png';

export default function Contact() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen">
            <Header />

            <main className="pb-24">
                {/* 1. Hero Section */}
                <section className="relative h-[500px] md:h-[450px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <picture>
                            <source media="(max-width: 768px)" srcSet={lp1Mobile} />
                            <img
                                src={lp1}
                                alt="Modern grain warehouse"
                                className="w-full h-full object-cover"
                            />
                        </picture>
                        <div className="absolute inset-0 hero-overlay"></div>
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 md:pt-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-accent/10 border border-lime-accent/20 text-lime-accent text-xs font-bold mb-6">
                            <span className="material-icons text-sm">support_agent</span>
                            ATENDIMENTO ESPECIALIZADO
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            Fale com a <span className="text-primary">DaVez</span>
                        </h1>
                        <p className="text-base md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            Estamos prontos para otimizar sua logística. Entre em contato para saber como podemos transformar sua gestão de pátio.
                        </p>
                    </div>
                </section>

                {/* 2. Contact Section */}
                <section className="relative z-20 -mt-10 md:-mt-16 max-w-7xl mx-auto px-6 mb-24">
                    <div className="bg-background-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                        {/* Form Column */}
                        <div className="w-full md:w-3/5 p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-white mb-2">Envie uma mensagem</h2>
                            <p className="text-slate-400 mb-8">Preencha o formulário abaixo e nossa equipe entrará em contato em breve.</p>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300" htmlFor="nome">Nome Completo</label>
                                        <input
                                            className="w-full form-input rounded-lg text-white px-4 py-3 border focus:ring-1 focus:ring-primary transition-colors"
                                            id="nome"
                                            placeholder="Seu nome"
                                            type="text"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300" htmlFor="empresa">Empresa</label>
                                        <input
                                            className="w-full form-input rounded-lg text-white px-4 py-3 border focus:ring-1 focus:ring-primary transition-colors"
                                            id="empresa"
                                            placeholder="Nome da empresa"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300" htmlFor="email">E-mail Corporativo</label>
                                    <input
                                        className="w-full form-input rounded-lg text-white px-4 py-3 border focus:ring-1 focus:ring-primary transition-colors"
                                        id="email"
                                        placeholder="seu@email.com.br"
                                        type="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300" htmlFor="mensagem">Como podemos ajudar?</label>
                                    <textarea
                                        className="w-full form-input rounded-lg text-white px-4 py-3 border focus:ring-1 focus:ring-primary transition-colors h-32 resize-none"
                                        id="mensagem"
                                        placeholder="Descreva sua necessidade logística..."
                                    />
                                </div>
                                <Button type="submit" variant="primary" className="w-full py-4 text-background-dark font-bold rounded-xl flex items-center justify-center gap-2 group cursor-pointer">
                                    <span>Enviar Mensagem</span>
                                    <span className="material-icons group-hover:translate-x-1 transition-transform text-lg">send</span>
                                </Button>
                            </form>
                        </div>

                        {/* Info Column */}
                        <div className="w-full md:w-2/5 bg-forest/30 border-l border-white/5 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
                            <div className="contact-card-glow"></div>

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-8">Informações de Contato</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                            <span className="material-icons text-primary">email</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-medium mb-1">E-mail</p>
                                            <a className="text-white hover:text-primary transition-colors font-medium" href="mailto:contato@davez.com.br">contato@davez.com.br</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                            <span className="material-icons text-primary">phone</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-medium mb-1">Telefone</p>
                                            <a className="text-white hover:text-primary transition-colors font-medium" href="tel:+5511999999999">+55 (11) 99999-9999</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
