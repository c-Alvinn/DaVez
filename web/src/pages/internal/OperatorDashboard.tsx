import { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { BadgeCheck, Clock, XCircle, Search, PlayCircle, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

// Mock Data
const MOCK_SCHEDULES = [
    { id: 1, plate: 'ABC-1234', grain: 'SOJA', operation: 'LOADING', carrier: 'TransLog A', driver: 'João Silva', status: 'SCHEDULED', arrivedAt: '10:00' },
    { id: 2, plate: 'XYZ-9876', grain: 'MILHO', operation: 'UNLOADING', carrier: 'Rápido Grãos', driver: 'Maria Souza', status: 'SCHEDULED', arrivedAt: '10:15' },
    { id: 3, plate: 'DEF-5678', grain: 'SOJA', operation: 'LOADING', carrier: 'Autônomo', driver: 'Carlos Lima', status: 'IN_SERVICE', arrivedAt: '09:45' },
    { id: 4, plate: 'GHI-3456', grain: 'TRIGO', operation: 'UNLOADING', carrier: 'TransLog B', driver: 'Ana Paula', status: 'COMPLETED', arrivedAt: '08:30' },
    { id: 5, plate: 'JKL-7890', grain: 'SOJA', operation: 'LOADING', carrier: 'TransLog A', driver: 'Pedro Santos', status: 'CANCELED', arrivedAt: '09:00' },
];

export default function OperatorDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    // KPIs Mock
    const kpis = {
        scheduled: MOCK_SCHEDULES.filter(s => s.status === 'SCHEDULED').length,
        inService: MOCK_SCHEDULES.filter(s => s.status === 'IN_SERVICE').length,
        completed: MOCK_SCHEDULES.filter(s => s.status === 'COMPLETED').length,
        canceled: MOCK_SCHEDULES.filter(s => s.status === 'CANCELED').length,
    };

    const handleAction = (id: number, action: 'IN_SERVICE' | 'COMPLETED' | 'CANCELED') => {
        // TODO: Call API
        console.log(`Action ${action} on Schedule ${id}`);
        alert(`Ação ${action} simulada para ID ${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-800">DaVez Operacional</h1>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                        {user?.role === 'GATE_KEEPER' ? 'PORTARIA' : 'BALANÇA / OPERAÇÃO'}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">Filial: Matriz</span>
                    <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/'); }}>
                        <LogOut size={16} className="mr-2" /> Sair
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <KpiCard title="Na Fila (Scheduled)" value={kpis.scheduled} icon={Clock} color="text-blue-600" bg="bg-blue-50" />
                    <KpiCard title="Em Atendimento" value={kpis.inService} icon={PlayCircle} color="text-yellow-600" bg="bg-yellow-50" />
                    <KpiCard title="Concluídos (Hoje)" value={kpis.completed} icon={BadgeCheck} color="text-green-600" bg="bg-green-50" />
                    <KpiCard title="Cancelados (Hoje)" value={kpis.canceled} icon={XCircle} color="text-red-600" bg="bg-red-50" />
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-end md:items-center">
                    <div className="flex-1 w-full md:w-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar placa, motorista ou transportadora..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tables Section */}
                <div className="space-y-8">

                    {/* Tabela: Fila de Espera (SCHEDULED) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-blue-50 flex justify-between items-center">
                            <h2 className="font-semibold text-blue-800 flex items-center gap-2">
                                <Clock size={18} />
                                Fila de Espera (Aguardando Entrada)
                            </h2>
                            <span className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                                {MOCK_SCHEDULES.filter(s => s.status === 'SCHEDULED').length} Veículos
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <ScheduleTable
                                schedules={MOCK_SCHEDULES.filter(s => s.status === 'SCHEDULED' && (searchTerm === '' || s.plate.includes(searchTerm.toUpperCase())))}
                                userRole={user?.role}
                                onAction={handleAction}
                                showActions={true}
                            />
                        </div>
                    </div>

                    {/* Tabela: Em Atendimento (IN_SERVICE) - Apenas para Operadores/Gerentes */}
                    {user?.role !== 'GATE_KEEPER' && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-yellow-50 flex justify-between items-center">
                                <h2 className="font-semibold text-yellow-800 flex items-center gap-2">
                                    <PlayCircle size={18} />
                                    Em Atendimento (Pátio/Balança)
                                </h2>
                                <span className="bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                    {MOCK_SCHEDULES.filter(s => s.status === 'IN_SERVICE').length} Veículos
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <ScheduleTable
                                    schedules={MOCK_SCHEDULES.filter(s => s.status === 'IN_SERVICE' && (searchTerm === '' || s.plate.includes(searchTerm.toUpperCase())))}
                                    userRole={user?.role}
                                    onAction={handleAction}
                                    showActions={true}
                                />
                            </div>
                        </div>
                    )}

                    {/* Histórico Recente (Opcional ou em outra aba) */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden opacity-80">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="font-semibold text-gray-600 flex items-center gap-2">
                                <BadgeCheck size={18} />
                                Últimos Concluídos/Cancelados
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <ScheduleTable
                                schedules={MOCK_SCHEDULES.filter(s => ['COMPLETED', 'CANCELED'].includes(s.status) && (searchTerm === '' || s.plate.includes(searchTerm.toUpperCase())))}
                                userRole={user?.role}
                                onAction={handleAction}
                                showActions={false}
                            />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

// Subcomponente de Tabela para evitar repetição
function ScheduleTable({ schedules, userRole, onAction, showActions }: any) {
    if (schedules.length === 0) {
        return <div className="p-6 text-center text-gray-500 italic">Nenhum agendamento nesta lista.</div>
    }

    return (
        <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                <tr>
                    <th className="px-6 py-3">Placa</th>
                    <th className="px-6 py-3">Motorista</th>
                    <th className="px-6 py-3">Transportadora</th>
                    <th className="px-6 py-3">Operação</th>
                    <th className="px-6 py-3">Grão</th>
                    <th className="px-6 py-3">Chegada</th>
                    <th className="px-6 py-3 text-right">Ações</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {schedules.map((schedule: any) => (
                    <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-gray-900 border-l-4 border-transparent hover:border-blue-500">{schedule.plate}</td>
                        <td className="px-6 py-4 text-gray-600">{schedule.driver}</td>
                        <td className="px-6 py-4 text-gray-600">{schedule.carrier}</td>
                        <td className="px-6 py-4">
                            <span className={`font-medium ${schedule.operation === 'LOADING' ? 'text-blue-600' : 'text-orange-600'}`}>
                                {schedule.operation === 'LOADING' ? 'Carregamento' : 'Descarregamento'}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{schedule.grain}</td>
                        <td className="px-6 py-4 text-gray-500">{schedule.arrivedAt}</td>
                        <td className="px-6 py-4 text-right">
                            {showActions && (userRole === 'SCALE_OPERATOR' || userRole === 'MANAGER') ? (
                                <div className="flex justify-end gap-2">
                                    {schedule.status === 'SCHEDULED' && (
                                        <Button size="sm" onClick={() => onAction(schedule.id, 'IN_SERVICE')}>
                                            Chamar
                                        </Button>
                                    )}
                                    {schedule.status === 'IN_SERVICE' && (
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onAction(schedule.id, 'COMPLETED')}>
                                            Finalizar
                                        </Button>
                                    )}
                                    {(schedule.status === 'SCHEDULED' || schedule.status === 'IN_SERVICE') && (
                                        <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => onAction(schedule.id, 'CANCELED')}>
                                            Cancelar
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${schedule.status === 'COMPLETED' ? 'text-green-600 bg-green-50' :
                                    schedule.status === 'CANCELED' ? 'text-red-600 bg-red-50' : 'text-gray-400'
                                    }`}>
                                    {schedule.status === 'SCHEDULED' ? 'Aguardando' :
                                        schedule.status === 'IN_SERVICE' ? 'Em Atendimento' :
                                            schedule.status}
                                </span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function KpiCard({ title, value, icon: Icon, color, bg }: any) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg} ${color}`}>
                <Icon size={24} />
            </div>
        </div>
    )
}
