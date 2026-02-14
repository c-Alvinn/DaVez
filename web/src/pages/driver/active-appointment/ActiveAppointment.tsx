import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Truck, Calendar, Clock, BadgeCheck } from 'lucide-react';

export default function ActiveAppointment() {
    const navigate = useNavigate();

    // Mock de agendamento ativo
    const activeAppointment = {
        id: '12345',
        company: 'AgroSul',
        branch: 'Filial Matriz',
        grain: 'Soja',
        plate: 'ABC-1234',
        type: 'Carregamento',
        date: '12/02/2026',
        queuePosition: 4,
        status: 'EM_ESPERA'
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <button onClick={() => navigate('/driver')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">Agendamento Ativo</h1>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 space-y-6">
                {activeAppointment ? (
                    <>
                        {/* Queue Position */}
                        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center shadow-lg shadow-blue-100 relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-blue-100 text-sm font-medium mb-1">Sua posição na fila</p>
                                <h2 className="text-6xl font-black mb-2">{activeAppointment.queuePosition}º</h2>
                                <div className="inline-flex items-center gap-2 bg-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold border border-blue-400/30">
                                    <BadgeCheck size={14} />
                                    AGENDAMENTO CONFIRMADO
                                </div>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                <Truck size={140} />
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Truck size={18} className="text-blue-600" />
                                    Detalhes do Agendamento
                                </h3>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="flex gap-4">
                                    <div className="p-3 bg-gray-100 rounded-xl text-gray-500 shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Local</p>
                                        <p className="font-bold text-gray-900">{activeAppointment.company} - {activeAppointment.branch}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="flex gap-3">
                                        <div className="p-2.5 bg-gray-100 rounded-xl text-gray-500 shrink-0">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Data</p>
                                            <p className="text-sm font-bold text-gray-900">{activeAppointment.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="p-2.5 bg-gray-100 rounded-xl text-gray-500 shrink-0">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Operação</p>
                                            <p className="text-sm font-bold text-gray-900">{activeAppointment.type}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                                    <p className="text-xs text-orange-700 leading-relaxed font-medium">
                                        Fique atento! Quando sua posição for a 1ª, dirija-se imediatamente à balança de entrada.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 text-red-500 font-bold text-sm bg-red-50 rounded-2xl active:bg-red-100 transition-colors">
                            CANCELAR AGENDAMENTO
                        </button>
                    </>
                ) : (
                    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <Truck size={40} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Sem agendamentos</h3>
                        <p className="text-gray-500 text-sm mt-1">Você não possui nenhum agendamento ativo no momento.</p>
                        <button
                            onClick={() => navigate('/driver/shipment')}
                            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-100"
                        >
                            Agendar Agora
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
