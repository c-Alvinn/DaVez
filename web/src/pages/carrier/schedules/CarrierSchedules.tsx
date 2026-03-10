import { useState } from 'react';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Building2,
    MapPin
} from 'lucide-react';

// Mock estendido 
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
    branch: i % 2 === 0 ? 'Cascavel - PR' : 'Paranaguá - PR',
    status: 'SCHEDULED'
}));

export default function CarrierSchedules({ title = 'Agendamentos' }: { title?: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 8;
    
    // Filtering logic
    const filteredSchedules = ALL_SCHEDULES.filter(s => {
        const matchesSearch = s.driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.plate.includes(searchTerm.toUpperCase());
        const matchesCompany = selectedCompany ? s.carrier === selectedCompany : true;
        const matchesBranch = selectedBranch ? s.branch === selectedBranch : true;
        
        return matchesSearch && matchesCompany && matchesBranch;
    });

    const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage);

    const selectClass = "bg-white/5 border border-white/10 rounded-2xl py-4 px-4 pl-12 text-white outline-none focus:border-primary/50 transition-all font-medium appearance-none cursor-pointer";

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{title}</h2>
                    <p className="text-slate-400 font-medium">Visualização da fila de espera.</p>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar placa ou motorista..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    
                    <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
                        <select
                            value={selectedCompany}
                            onChange={(e) => {
                                setSelectedCompany(e.target.value);
                                setCurrentPage(1);
                            }}
                            className={`w-full ${selectClass}`}
                        >
                            <option value="" className="bg-[#102218] text-white">Todas as Empresas</option>
                            <option value="TransLog 1" className="bg-[#102218] text-white">TransLog 1</option>
                            <option value="TransLog 2" className="bg-[#102218] text-white">TransLog 2</option>
                            <option value="TransLog 3" className="bg-[#102218] text-white">TransLog 3</option>
                        </select>
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
                        <select
                            value={selectedBranch}
                            onChange={(e) => {
                                setSelectedBranch(e.target.value);
                                setCurrentPage(1);
                            }}
                            className={`w-full ${selectClass}`}
                        >
                            <option value="" className="bg-[#102218] text-white">Todas as Filiais</option>
                            <option value="Cascavel - PR" className="bg-[#102218] text-white">Cascavel - PR</option>
                            <option value="Paranaguá - PR" className="bg-[#102218] text-white">Paranaguá - PR</option>
                        </select>
                    </div>
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
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Filial</th>
                                <th className="px-8 py-6 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Transportadora</th>
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
                                        <span className="text-sm font-bold text-slate-300">{item.branch}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-medium text-slate-500">{item.carrier}</span>
                                    </td>
                                </tr>
                            ))}
                            {paginatedSchedules.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center text-slate-500 font-medium">
                                        Nenhum agendamento encontrado para os filtros selecionados.
                                    </td>
                                </tr>
                            )}
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
                            className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 transition-all hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="p-2 bg-white/5 border border-white/5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 transition-all hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
