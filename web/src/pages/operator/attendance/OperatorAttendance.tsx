import { useState } from 'react';
import {
    Search,
    CheckCircle2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
    ArrowDownLeft
} from 'lucide-react';

// Mock de atendimentos ativos
const ACTIVE_ATTENDANCES = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    driver: {
        name: i % 2 === 0 ? 'Marcos Oliveira' : 'Felipe Santos',
        cpf: '456.789.012-0' + (i % 9),
        phone: '(11) 9' + (80000000 + i) + '-00'
    },
    plate: 'GHI-' + (3000 + i),
    grain: i % 2 === 0 ? 'SOJA' : 'MILHO',
    operation: i % 2 === 0 ? 'EMBARQUE' : 'DESEMBARQUE',
    carrier: 'AgroLog Express ' + (i % 3 + 1),
}));

export default function OperatorAttendance() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;
    const filteredSchedules = ACTIVE_ATTENDANCES.filter(s =>
        s.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.plate.includes(searchTerm.toUpperCase())
    );

    const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);


    const handleAction = (label: string) => {
        alert(`Atendimento ${label} com sucesso!`);
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Em Atendimento</h2>
                    <p className="text-slate-400 font-medium">Controle de operações em execução no pátio.</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por placa ou motorista..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col min-h-0">
                <div className="flex-1 overflow-x-auto min-h-0 custom-scrollbar">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Motorista</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Placa</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Grão</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Operação</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Transportadora</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedSchedules.map((item) => (
                                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-200">{item.driver.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">{item.plate}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-primary/80">{item.grain}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black tracking-widest uppercase ${item.operation === 'EMBARQUE'
                                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            }`}>
                                            {item.operation === 'EMBARQUE' ? <ArrowUpRight size={12} /> : <ArrowDownLeft size={12} />}
                                            {item.operation}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-medium text-slate-500">{item.carrier}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <ActionButton
                                                icon={<CheckCircle2 size={18} />}
                                                tooltip="Concluir"
                                                onClick={() => handleAction('concluído')}
                                                variant="primary"
                                            />
                                            <ActionButton
                                                icon={<Trash2 size={18} />}
                                                tooltip="Excluir"
                                                onClick={() => handleAction('Exclusão')}
                                                variant="danger"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-6 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                        Página {currentPage} de {totalPages}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 transition-all hover:bg-white/10 cursor-pointer"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 transition-all hover:bg-white/10 cursor-pointer"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

function ActionButton({ icon, tooltip, onClick, variant }: { icon: any, tooltip: string, onClick: () => void, variant: 'primary' | 'secondary' | 'danger' }) {
    const variants = {
        primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-background-dark',
        secondary: 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white',
        danger: 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white'
    };

    return (
        <button
            title={tooltip}
            onClick={onClick}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 cursor-pointer ${variants[variant]}`}
        >
            {icon}
        </button>
    );
}
