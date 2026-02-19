import { useState } from 'react';
import {
    Search,
    Calendar,
    MapPin,
    Filter,
} from 'lucide-react';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';

export default function AppointmentHistory() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock de histórico (dados integrados com o design)
    const history = [
        {
            id: 'DZ-8842',
            company: 'AgroSul',
            branch: 'Matriz - Cascavel, PR',
            grain: 'Soja',
            weight: '32 Toneladas',
            date: '14 Out 2024',
            time: '08:30',
            status: 'CONCLUÍDO',
            address: 'Rodovia BR-163, Km 120'
        },
        {
            id: 'DZ-8109',
            company: 'Fazenda Boa Esperança',
            branch: 'Silo Central - Sinop, MT',
            grain: 'Milho',
            weight: '28 Toneladas',
            date: '10 Out 2024',
            time: '14:15',
            status: 'CONCLUÍDO',
            address: 'Estrada Vicinal 4, Setor Norte'
        },
        {
            id: 'DZ-7992',
            company: 'Cooperativa Central',
            branch: 'Unidade 05 - Lucas do Rio Verde, MT',
            grain: 'Soja',
            weight: '30 Toneladas',
            date: '05 Out 2024',
            time: '09:00',
            status: 'CONCLUÍDO',
            address: 'Av. das Indústrias, 500'
        },
    ];

    const filteredHistory = history.filter(item =>
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.grain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors">
            <DriverHeader title="Histórico de Viagens" />

            <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col gap-8">

                {/* Header Section */}
                <section className="space-y-1">
                    <h2 className="text-2xl font-bold dark:text-white tracking-tight">Suas Viagens</h2>
                    <p className="text-primary font-bold text-sm leading-relaxed">
                        {history.length} viagens concluídas com sucesso
                    </p>
                    <div className="h-1.5 w-12 bg-primary rounded-full mt-2"></div>
                </section>

                {/* Search Bar */}
                <section className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary z-10">
                        <Search size={18} strokeWidth={2.5} />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por local, data ou carga..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-forest/40 dark:bg-card-dark border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all shadow-xl backdrop-blur-md relative z-0"
                    />
                    <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-primary transition-colors z-10">
                        <Filter size={18} />
                    </button>
                </section>

                {/* History List */}
                <section className="flex flex-col gap-5">
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item) => (
                            <div
                                key={item.id}
                                className="bg-forest/10 dark:bg-card-dark border border-white/5 rounded-3xl p-5 shadow-lg hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden active:scale-[0.98]"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-primary transition-colors">{item.company}</h3>
                                    <span className="bg-emerald/20 text-primary border border-primary/20 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                        {item.status}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-5 relative z-10">
                                    <span className="bg-primary/10 text-primary border border-primary/10 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-tighter">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                                        {item.grain}
                                    </span>
                                    <span className="bg-white/5 text-slate-300 border border-white/10 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                                        {item.weight}
                                    </span>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-white/5 relative z-10">
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <MapPin size={14} className="text-primary/70" />
                                        <span className="truncate">{item.address}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <Calendar size={14} className="text-primary/70" />
                                            <span className="font-medium text-slate-300">{item.date} • {item.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center space-y-4 bg-forest/5 rounded-3xl border border-dashed border-white/10">
                            <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-600">
                                <Search size={32} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-white font-bold">Nenhuma viagem encontrada</p>
                                <p className="text-slate-500 text-xs">Tente buscar por termos diferentes.</p>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            <DriverFooter />
        </div>
    );
}
