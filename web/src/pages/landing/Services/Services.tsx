import './Services.css';
import '../Landing/Landing.css';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/common/Button';
import servicoMotorista from '../../../assets/servico-motorista.png';
import servicoTransportadora from '../../../assets/servico-transportadora.png';
import servicoArmazem from '../../../assets/servico-armazem.png';

export default function Services() {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-display transition-colors duration-300 min-h-screen pt-20">
            <Header />

            <main>
                <section className="py-24 px-6 bg-background-dark">
                    <div className="max-w-7xl mx-auto space-y-20">
                        {/* 1. Header Section */}
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Soluções que Impulsionam a <br /><span className="text-primary">Logística do Campo</span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                                Conectamos motoristas, transportadoras e armazéns com tecnologia de ponta para otimizar cada etapa do escoamento de grãos.
                            </p>
                        </div>

                        {/* 2. For Drivers */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative order-2 lg:order-1 group">
                                <div className="service-card-glow opacity-50 group-hover:opacity-100"></div>
                                <div className="service-image-container group">
                                    <img
                                        src={servicoMotorista}
                                        alt="Motorista utilizando o sistema DaVez"
                                        className="w-full h-full object-cover transform transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="material-icons text-primary">verified</span>
                                            <span className="text-white font-bold">Status: Em trânsito</span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div className="bg-primary h-2 rounded-full w-3/4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="w-12 h-12 bg-lime-accent/10 rounded-lg flex items-center justify-center mb-6">
                                    <span className="material-icons text-lime-accent text-2xl">local_shipping</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Para Motoristas</h2>
                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                    Chega de esperar dias em filas improdutivas. Com o app DaVez, o motorista tem total controle sobre sua jornada, agendando horários de carga e descarga com precisão.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-primary text-sm">check_circle</span>
                                        <span>Acompanhamento de fila em tempo real</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-primary text-sm">check_circle</span>
                                        <span>Agendamento digital sem papelada</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-primary text-sm">check_circle</span>
                                        <span>Previsibilidade de ganhos e rotas</span>
                                    </li>
                                </ul>
                                <Button to="/register/driver" variant="primary">
                                    Cadastrar-se como motorista
                                    <span className="material-icons ml-2 text-sm">arrow_forward</span>
                                </Button>
                            </div>
                        </div>

                        {/* 3. For Carriers */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">
                            <div>
                                <div className="w-12 h-12 bg-emerald/20 rounded-lg flex items-center justify-center mb-6">
                                    <span className="material-icons text-emerald-400 text-2xl">insights</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Para Transportadoras</h2>
                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                    Maximize o giro da sua frota com dados em tempo real. Nossa dashboard oferece visibilidade completa da operação, eliminando gargalos e custos ocultos de ociosidade.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-emerald-400 text-sm">check_circle</span>
                                        <span>Monitoramento centralizado de veículos</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-emerald-400 text-sm">check_circle</span>
                                        <span>Relatórios de performance e tempos de ciclo</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-emerald-400 text-sm">check_circle</span>
                                        <span>Integração via API com seu ERP</span>
                                    </li>
                                </ul>
                                <Button to="/login?role=carrier" variant="access" className="border-emerald-400 text-black hover:bg-emerald-400/10">
                                    Cadastre sua Transportadora
                                    <span className="material-icons ml-2 text-sm">play_circle</span>
                                </Button>
                            </div>
                            <div className="relative group">
                                <div className="service-card-glow opacity-30 group-hover:opacity-60 bg-emerald/20"></div>
                                <div className="service-image-container bg-[#0f1914]">
                                    <img
                                        src={servicoTransportadora}
                                        alt="Dashboard para transportadoras"
                                        className="w-full h-full object-cover transform transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                                <div className="text-slate-300 text-xs uppercase mb-1">Frota Ativa</div>
                                                <div className="text-2xl font-bold text-white">124 <span className="text-sm font-normal text-emerald-400">/ 130</span></div>
                                            </div>
                                            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                                <div className="text-slate-300 text-xs uppercase mb-1">Eficiência</div>
                                                <div className="text-2xl font-bold text-white">+22% <span className="text-sm material-icons text-emerald-400 align-middle">trending_up</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. For Warehouses */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">
                            <div className="relative order-2 lg:order-1 group">
                                <div className="service-card-glow opacity-40 group-hover:opacity-80 bg-forest/20"></div>
                                <div className="service-image-container">
                                    <img
                                        src={servicoArmazem}
                                        alt="Gestão de Armazém e Silos"
                                        className="w-full h-full object-cover transform transition duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <div className="flex gap-4">
                                            <div className="flex-1 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                                                <div className="text-3xl font-bold text-white mb-1">0</div>
                                                <div className="text-xs text-slate-300 uppercase tracking-wider">Filas Físicas</div>
                                            </div>
                                            <div className="flex-1 bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/10 text-center">
                                                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                                                <div className="text-xs text-slate-300 uppercase tracking-wider">Digital</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <div className="w-12 h-12 bg-forest rounded-lg flex items-center justify-center mb-6 border border-white/10">
                                    <span className="material-icons text-white text-2xl">warehouse</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Para Armazéns</h2>
                                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                    Elimine gargalos na recepção e expedição. Nossa plataforma organiza o fluxo de entrada automaticamente, garantindo que sua infraestrutura opere na capacidade máxima sem caos.
                                </p>
                                <ul className="space-y-4 mb-8">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-primary text-sm">check_circle</span>
                                        <span>Agendamento de slots (Janelas de tempo)</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-primary text-sm">check_circle</span>
                                        <span>Validação automatizada de documentos</span>
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="material-icons text-primary text-sm">check_circle</span>
                                        <span>Check-in digital via QR Code</span>
                                    </li>
                                </ul>
                                <Button to="/login?role=internal" variant="primary" className="bg-white text-background-dark hover:bg-slate-200">
                                    Entre em contato
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
