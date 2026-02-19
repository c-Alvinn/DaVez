import { useNavigate } from 'react-router-dom';
import {
    Clock,
    RefreshCcw,
    Store,
    Trash2,
    Calendar,
    MapPin
} from 'lucide-react';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';

export default function ActiveAppointment() {
    const navigate = useNavigate();

    // Mock de agendamento ativo (dados integrados com o design)
    const activeAppointment = {
        id: 'DZ-8842',
        position: '04',
        lastUpdate: '16:37:14',
        nextUpdateSeconds: 6,
        branch: 'Unidade de Rondonópolis',
        plate: 'QAP-2024',
        type: 'Bitrem (9 eixos)',
        grain: 'Soja',
        company: 'Agro Cargas Express',
        date: '14 Out 2024',
        address: 'Rodovia BR-163, Km 120 - Sorriso, MT'
    };

    const handleCancel = () => {
        if (window.confirm('Tem certeza que deseja cancelar seu agendamento?')) {
            // Em produção aqui haveria a chamada de API
            navigate('/driver');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors">
            <DriverHeader title="Consulta de Posição" />

            <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col items-center gap-8">

                {/* Queue Position Section */}
                <section className="w-full text-center space-y-6 relative py-4">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Sua posição na fila</h2>

                    <div className="relative flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 mx-auto rounded-full border-[6px] border-primary/10 bg-gradient-to-br from-white/5 to-transparent shadow-[0_0_40px_rgba(19,236,109,0.15)] backdrop-blur-sm group">
                        {/* Spinning Border Effect */}
                        <div className="absolute inset-[-6px] rounded-full border-t-[6px] border-primary opacity-80 animate-spin" style={{ animationDuration: '3s' }}></div>

                        <div className="flex flex-col items-center">
                            <span className="text-6xl sm:text-8xl font-black text-primary drop-shadow-[0_0_15px_rgba(19,236,109,0.4)] tracking-tighter">
                                {activeAppointment.position}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
                            <Clock size={14} className="opacity-70 text-primary" />
                            <span>Última atualização: <span className="font-mono text-slate-200">{activeAppointment.lastUpdate}</span></span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-slate-500 text-[10px] uppercase tracking-wider">
                            <RefreshCcw size={12} className="text-primary animate-reverse-spin" />
                            <span>Próxima atualização em: <span className="font-mono text-primary font-bold">{activeAppointment.nextUpdateSeconds}s</span></span>
                        </div>
                    </div>
                </section>

                {/* Details Card */}
                <section className="w-full bg-forest/40 dark:bg-card-dark border border-white/5 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>

                    <div className="space-y-6 relative z-10">
                        {/* Branch Info */}
                        <div className="flex justify-between items-start border-b border-white/5 pb-5">
                            <div className="space-y-1">
                                <p className="text-[10px] text-primary uppercase font-black tracking-widest">Filial</p>
                                <h3 className="text-white font-bold text-lg sm:text-xl leading-tight">{activeAppointment.branch}</h3>
                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] sm:text-xs mt-1">
                                    <MapPin size={12} className="text-primary/70 shrink-0" />
                                    <span className="truncate max-w-[150px] sm:max-w-[200px]">{activeAppointment.address}</span>
                                </div>
                            </div>
                            <div className="bg-primary/10 p-2 sm:p-2.5 rounded-2xl text-primary border border-primary/20 shrink-0 ml-2">
                                <Store size={20} className="sm:w-[22px] sm:h-[22px]" />
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div className="space-y-1">
                                <p className="text-[10px] text-primary uppercase font-black tracking-widest">Placa</p>
                                <p className="text-white font-bold text-base tracking-widest font-mono">{activeAppointment.plate}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-primary uppercase font-black tracking-widest">Veículo</p>
                                <p className="text-white font-bold text-sm truncate">{activeAppointment.type}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-primary uppercase font-black tracking-widest">Grão</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,236,109,0.8)]"></span>
                                    <p className="text-white font-bold text-sm">{activeAppointment.grain}</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] text-primary uppercase font-black tracking-widest">Empresa</p>
                                <p className="text-white font-bold text-sm truncate">{activeAppointment.company}</p>
                            </div>
                        </div>

                        {/* Date info footer */}
                        <div className="pt-4 border-t border-white/5 flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={12} className="text-primary/50" />
                                <span>Agendado para: {activeAppointment.date}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Actions */}
                <div className="w-full space-y-4 pt-2">
                    <button
                        onClick={handleCancel}
                        className="w-full py-4 px-4 rounded-2xl border border-red-500/20 text-red-500/80 font-bold text-xs hover:bg-red-500/5 hover:border-red-500/40 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.15em] active:scale-[0.98] group"
                    >
                        <Trash2 size={18} className="group-hover:shake transition-transform" />
                        Cancelar Agendamento
                    </button>

                    <p className="text-[9px] text-center text-slate-500 uppercase tracking-tighter font-medium px-8 leading-relaxed">
                        Mantenha esta tela aberta para acompanhar sua posição em tempo real. Você receberá uma notificação quando chegar sua vez.
                    </p>
                </div>

            </main>

            <DriverFooter />
        </div>
    );
}
