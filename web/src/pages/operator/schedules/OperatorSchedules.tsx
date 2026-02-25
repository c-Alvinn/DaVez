import { useState } from 'react';
import {
    Search,
    MoreHorizontal,
    Bell,
    Play,
    Trash2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { DriverDetailsModal } from '../../../components/operator/DriverDetailsModal';

// Mock estendido para comportar detalhes do motorista e paginação
const ALL_SCHEDULES = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    position: i + 1,
    driver: {
        name: i % 2 === 0 ? 'João Silva' : i % 3 === 0 ? 'Carlos Oliveira' : 'Ricardo Souza',
        cpf: '123.456.789-0' + (i % 9),
        phone: '(11) 9' + (90000000 + i) + '-00'
    },
    plate: 'DEF-' + (5000 + i),
    grain: i % 2 === 0 ? 'SOJA' : 'MILHO',
    carrier: 'TransLog ' + (i % 5 + 1),
    status: 'SCHEDULED'
}));

export default function OperatorSchedules({ title = 'Agendamentos' }: { title?: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDriver, setSelectedDriver] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const itemsPerPage = 8;
    const filteredSchedules = ALL_SCHEDULES.filter(s =>
        s.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.plate.includes(searchTerm.toUpperCase())
    );

    const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);

    const handleViewDriver = (driver: any) => {
        setSelectedDriver(driver);
        setIsModalOpen(true);
    };

    const handleAction = (label: string) => {
        alert(`Ação de ${label} simulada com sucesso!`);
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
                    <p className="text-slate-400 font-medium">Gestão da fila de espera e triagem.</p>
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
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Posição</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Motorista</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Placa</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Grão</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Transportadora</th>
                                <th className="px-8 py-6 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {paginatedSchedules.map((item) => (
                                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-8 py-6">
                                        <span className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors">#{item.position.toString().padStart(3, '0')}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-slate-200">{item.driver.name}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">{item.plate}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-primary/80">{item.grain}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-medium text-slate-500">{item.carrier}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <ActionButton
                                                icon={<MoreHorizontal size={18} />}
                                                tooltip="Dados do Motorista"
                                                onClick={() => handleViewDriver(item.driver)}
                                                variant="secondary"
                                            />
                                            <ActionButton
                                                icon={<Bell size={18} />}
                                                tooltip="Notificar"
                                                onClick={() => handleAction('Notificação')}
                                                variant="secondary"
                                            />
                                            <ActionButton
                                                icon={<Play size={18} />}
                                                tooltip="Atender"
                                                onClick={() => handleAction('Atendimento')}
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

            {/* Modal de Detalhes */}
            <DriverDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                driver={selectedDriver}
            />
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
