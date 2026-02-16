import './AboutUs.css';
import '../Landing/Landing.css';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/common/Button';
import aboutImage from '../../../assets/about-image.png';

export default function AboutUs() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen">
            <Header />

            <main>
                {/* 1. Hero Section */}
                <section className="bg-forest pt-40 pb-20 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald/10 rounded-full blur-[80px] pointer-events-none"></div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
                            <span className="material-icons text-sm">business</span>
                            INSTITUCIONAL
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight">
                            Sobre a <span className="text-primary">DaVez</span>
                        </h1>
                        <div className="space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                            <p>
                                Fundada com a missão de modernizar a infraestrutura logística do agronegócio brasileiro, a DaVez surgiu da necessidade de conectar o campo à indústria de forma inteligente.
                            </p>
                            <p>
                                Nossos algoritmos proprietários não apenas organizam filas; eles devolvem tempo e dignidade aos motoristas, enquanto maximizam a eficiência operacional de armazéns e portos. Somos a tecnologia invisível que mantém o agro em movimento contínuo.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. Mission & Vision Cards */}
                <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-6 pb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-forest border border-white/10 rounded-2xl shadow-2xl p-10 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-emerald/50 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                                    <span className="material-icons text-lime-accent text-3xl">flag</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Nossa Missão</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Devolver dignidade ao motorista e eficiência à transportadora. Acreditamos que o tempo parado é um desperdício de potencial humano e econômico. Trabalhamos para que cada viagem seja produtiva e respeitosa.
                                </p>
                            </div>
                        </div>

                        <div className="bg-forest border border-white/10 rounded-2xl shadow-2xl p-10 relative overflow-hidden group hover:border-primary/30 transition-all duration-300">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-lime-accent/10 rounded-full blur-2xl group-hover:bg-lime-accent/20 transition-all"></div>
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-emerald/50 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                                    <span className="material-icons text-lime-accent text-3xl">visibility</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Nossa Visão</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Ser o padrão ouro em agro-logística global. Visualizamos um futuro onde armazéns e frotas operam em sincronia perfeita, impulsionados por dados auditáveis e transparência total.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Pillars */}
                <section className="py-20 px-6 bg-background-light dark:bg-background-dark">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pilares Fundamentais</h2>
                            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <span className="material-icons text-4xl text-primary mb-4 group-hover:scale-110 transition-transform block">speed</span>
                                <h3 className="text-xl font-bold text-white mb-3">Eficiência Digital</h3>
                                <p className="text-sm text-slate-400">Algoritmos proprietários que calculam o fluxo em tempo real, eliminando gargalos operacionais.</p>
                            </div>
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <span className="material-icons text-4xl text-primary mb-4 group-hover:scale-110 transition-transform block">verified_user</span>
                                <h3 className="text-xl font-bold text-white mb-3">Transparência Total</h3>
                                <p className="text-sm text-slate-400">Motoristas e gestores sabem exatamente sua posição na fila e a previsão de atendimento.</p>
                            </div>
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <span className="material-icons text-4xl text-primary mb-4 group-hover:scale-110 transition-transform block">sentiment_satisfied_alt</span>
                                <h3 className="text-xl font-bold text-white mb-3">Valorização</h3>
                                <p className="text-sm text-slate-400">Foco total no motorista: menos tempo parado no pátio, mais tempo rodando e faturando.</p>
                            </div>
                            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <span className="material-icons text-4xl text-primary mb-4 group-hover:scale-110 transition-transform block">lock</span>
                                <h3 className="text-xl font-bold text-white mb-3">Segurança</h3>
                                <p className="text-sm text-slate-400">Dados protegidos de ponta a ponta e processos auditáveis para garantir a integridade da operação.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Why DaVez? */}
                <section className="relative py-24 bg-forest/30 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <img
                                    src={aboutImage}
                                    alt="Atendimento DaVez"
                                    className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-background-dark/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                        <p className="text-primary font-bold text-sm mb-1">ATENDIMENTO HUMANIZADO</p>
                                        <p className="text-white text-xs">Suporte dedicado em cada etapa da jornada.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Por que <span className="text-primary">DaVez</span>?</h2>
                            <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                                O nome "DaVez" não é por acaso. Ele simboliza o momento de virada, a hora certa de agir. No campo, saber "de quem é a vez" significa organização, justiça e respeito.
                            </p>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Nossa plataforma foi construída ouvindo quem realmente move o país: os caminhoneiros e os gestores de armazém. Entendemos as dores de esperar dias em uma fila sob sol e chuva, e a complexidade de gerir milhares de toneladas de grãos simultaneamente. Somos a ponte digital que une essas duas pontas.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <span className="material-icons text-primary text-xl">check_circle</span>
                                    <span>Redução drástica de custos operacionais</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <span className="material-icons text-primary text-xl">check_circle</span>
                                    <span>Aumento da capacidade de escoamento</span>
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <span className="material-icons text-primary text-xl">check_circle</span>
                                    <span>Melhoria na qualidade de vida dos parceiros</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. CTA Section */}
                <section className="py-24 px-6 bg-background-light dark:bg-background-dark text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Pronto para inovar sua logística?</h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                            Junte-se a mais de 50 filiais que já transformaram a gestão de pátio com a DaVez. O futuro do agro começa agora.
                        </p>
                        <Button to="/contact" variant="primary" className="px-10 py-5 text-xl">
                            Falar com Consultor
                            <span className="material-icons ml-3">arrow_forward</span>
                        </Button>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
