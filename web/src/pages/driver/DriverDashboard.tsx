import { useAuth } from '../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, MapPin, Truck, Clock } from 'lucide-react';

export default function DriverDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-10">
                <div className="flex justify-between items-center max-w-lg mx-auto">
                    <div>
                        <h1 className="text-lg font-bold">Olá, {user?.name || 'Motorista'}</h1>
                        <p className="text-xs text-blue-100">CPF: 123.***.***-**</p>
                    </div>
                    <button onClick={handleLogout} className="p-2 hover:bg-blue-700 rounded-full transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 space-y-6">

                {/* Status Card - Sem Agendamento (Mock) */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                        <Truck size={32} />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Sem agendamento ativo</h2>
                        <p className="text-sm text-gray-500">Você não está na fila no momento.</p>
                    </div>
                    <button
                        onClick={() => navigate('/driver/new-schedule')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <PlusCircle size={20} />
                        Entrar na Fila
                    </button>
                </div>

                {/* Histórico Recente (Mock) */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Histórico Recente</h3>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex justify-between items-center opacity-75">
                            <div className="flex gap-3 items-center">
                                <div className="p-2 bg-green-100 text-green-600 rounded-full">
                                    <Clock size={16} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Filial Matriz</p>
                                    <p className="text-xs text-gray-500">10 Fev - Concluído</p>
                                </div>
                            </div>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">COMPLETED</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
