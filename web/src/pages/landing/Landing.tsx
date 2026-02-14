import './Landing.css';

// Layout Components
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

// Common Components
import Button from '../../components/common/Button';

// Specialized Components
import ServiceCard from '../../components/landing/ServiceCard';

// Assets
import lp1 from '../../assets/lp-1.png';
import lp1Mobile from '../../assets/lp-1-mobile.png';
import lp2 from '../../assets/lp-2.png';
import lp2Mobile from '../../assets/lp-2-mobile.png';

export default function Landing() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen">
            <Header />

            <main>
                {/* 1. Hero Section */}
                <section className="relative min-h-screen flex items-center overflow-hidden" id="inicio">
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
                    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                LOGÍSTICA 4.0
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                                Sua Vez de <br /><span className="text-primary">Inovar</span> na Logística Agrícola
                            </h1>
                            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
                                Agendamento inteligente e gestão eficiente para o transporte de grãos. Reduza filas, otimize o tempo e aumente a produtividade do seu terminal.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button to="/login" variant="primary">
                                    Saiba Mais
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Global Access Bar */}
                <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-6">
                    <div className="bg-emerald dark:bg-forest border border-white/5 rounded-2xl shadow-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button to="/login?role=driver" variant="access" icon="local_shipping">
                            ACESSO MOTORISTA
                        </Button>
                        <Button to="/login?role=carrier" variant="access" icon="domain">
                            ACESSO TRANSPORTADORA
                        </Button>
                        <Button to="/login?role=internal" variant="access" icon="warehouse">
                            ACESSO ARMAZÉM
                        </Button>
                    </div>
                </section>

                {/* 3. Services Grid */}
                <section className="py-24 px-6 bg-background-light dark:bg-background-dark" id="servicos">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Soluções Especializadas</h2>
                            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ServiceCard
                                icon="calendar_today"
                                title="Agendamento Digital"
                                description="Agende seu embarque em poucos cliques. Elimine a papelada e tenha previsibilidade total da sua carga."
                            />
                            <ServiceCard
                                icon="format_list_numbered"
                                title="Gestão de Fila"
                                description="Acompanhe sua posição no terminal em tempo real através do aplicativo. Receba notificações automáticas."
                            />
                            <ServiceCard
                                icon="psychology"
                                title="Logística Inteligente"
                                description="Otimização de fluxo baseada em IA para armazéns e transportadoras, reduzindo o tempo de pátio drasticamente."
                            />
                        </div>
                    </div>
                </section>

                {/* 4. Automation Image */}
                <section className="relative h-[500px] flex items-center justify-center overflow-hidden" id="sobre">
                    <picture className="absolute inset-0">
                        <source media="(max-width: 768px)" srcSet={lp2Mobile} />
                        <img
                            src={lp2}
                            alt="Logistics Technology"
                            className="w-full h-full object-cover"
                        />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div>
                    <div className="relative z-10 text-center max-w-4xl px-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">A Tecnologia que Move o Campo</h2>
                        <p className="text-xl text-slate-300">Integramos hardware e software para criar um ecossistema logístico sem fricção, desde a colheita até o terminal portuário.</p>
                    </div>
                </section>

                {/* 5. FAQ Section */}
                <section className="py-24 px-6 bg-background-light dark:bg-background-dark" id="faq">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold text-white mb-2">Perguntas Frequentes</h2>
                            <p className="text-slate-400">Tudo o que você precisa saber sobre o sistema DaVez</p>
                        </div>
                        <div className="space-y-4">
                            {/* FAQ Item 1 */}
                            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                                <div className="w-full p-6 text-left flex justify-between items-center group cursor-pointer">
                                    <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">Como funciona o agendamento?</span>
                                    <span className="material-icons text-primary">add</span>
                                </div>
                                <div className="px-6 pb-6 text-slate-400">
                                    O motorista acessa a Área do Motorista pelo celular, informa a placa, seleciona a unidade de destino e o tipo de grão. Ao confirmar, o veículo entra automaticamente na fila virtual da unidade, sem necessidade de reservar um horário fixo. O acompanhamento da posição é feito em tempo real pela tela do aplicativo e a liberação na portaria ocorre de forma ágil através da conferência eletrônica da placa.
                                </div>
                            </div>
                            {/* FAQ Item 2 */}
                            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                                <div className="w-full p-6 text-left flex justify-between items-center group cursor-pointer">
                                    <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">Qual o tempo de espera médio nos terminais?</span>
                                    <span className="material-icons text-primary">add</span>
                                </div>
                                <div className="px-6 pb-6 text-slate-400">
                                    Com o sistema DaVez, o tempo de espera em pátio foi reduzido em média 40% em relação aos sistemas convencionais, garantindo maior giro de frota.
                                </div>
                            </div>
                            {/* FAQ Item 3 */}
                            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                                <div className="w-full p-6 text-left flex justify-between items-center group cursor-pointer">
                                    <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">O motorista precisa pagar pelo aplicativo?</span>
                                    <span className="material-icons text-primary">add</span>
                                </div>
                                <div className="px-6 pb-6 text-slate-400">
                                    Não. O acesso para motoristas é totalmente gratuito, permitindo a consulta de agendamentos e status da fila em tempo real.
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
