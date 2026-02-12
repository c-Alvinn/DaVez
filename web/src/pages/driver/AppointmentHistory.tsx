import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function AppointmentHistory() {
    const navigate = useNavigate();

    // Mock de histórico
    const history = [
        { id: 1, company: 'AgroSul', branch: 'Filial Matriz', grain: 'Soja', date: '10/02/2026', time: '14:30', status: 'CONCLUÍDO' },
        { id: 2, company: 'Fazenda Rio', branch: 'Armazém 02', grain: 'Milho', date: '05/02/2026', time: '09:15', status: 'CONCLUÍDO' },
        { id: 3, company: 'AgroSul', branch: 'Porto', grain: 'Trigo', date: '28/01/2026', time: '16:45', status: 'CONCLUÍDO' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <button onClick={() => navigate('/driver')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">Histórico de Agendamentos</h1>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 space-y-4">
                {history.map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden group hover:border-blue-100 transition-colors">
                        <div className="shrink-0 w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                            <Clock size={24} />
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-gray-900">{item.company}</h3>
                                <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase tracking-tighter">
                                    {item.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                                <MapPin size={12} />
                                {item.branch}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                    {item.grain}
                                </span>
                                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                                    <Calendar size={12} />
                                    {item.date}
                                </div>
                            </div>
                        </div>

                        <ChevronRight size={18} className="text-gray-200 group-hover:text-blue-300 transition-colors" />
                    </div>
                ))}
            </main>
        </div>
    );
}
