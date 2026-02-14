import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import {
    LogOut,
    Truck,
    Search,
    History,
    User,
    ChevronRight
} from 'lucide-react';

export default function DriverDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const menuItems = [
        {
            title: 'Embarque',
            description: 'Agendar novo carregamento',
            icon: <Truck size={24} className="text-blue-600" />,
            path: '/driver/shipment',
            color: 'bg-blue-50'
        },
        {
            title: 'Consultar Agendamento',
            description: 'Ver agendamento ativo e fila',
            icon: <Search size={24} className="text-emerald-600" />,
            path: '/driver/active',
            color: 'bg-emerald-50'
        },
        {
            title: 'Histórico de Agendamentos',
            description: 'Ver viagens concluídas',
            icon: <History size={24} className="text-purple-600" />,
            path: '/driver/history',
            color: 'bg-purple-50'
        },
        {
            title: 'Perfil',
            description: 'Meus dados e configurações',
            icon: <User size={24} className="text-orange-600" />,
            path: '/driver/profile',
            color: 'bg-orange-50'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 p-6 sticky top-0 z-10">
                <div className="max-w-lg mx-auto flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Bem-vindo de volta,</p>
                        <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Motorista'}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Sair"
                    >
                        <LogOut size={22} />
                    </button>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 text-left active:scale-[0.98] transition-all hover:border-blue-200 group"
                        >
                            <div className={`${item.color} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{item.title}</h3>
                                <p className="text-sm text-gray-500">{item.description}</p>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>

                {/* Info Card */}
                <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-100 mt-6 overflow-hidden relative">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold mb-2">Dica de Segurança</h3>
                        <p className="text-blue-100 text-sm leading-relaxed">
                            Mantenha sempre seus documentos em mãos ao chegar na unidade. Isso agiliza o seu processo de entrada.
                        </p>
                    </div>
                    <div className="absolute -right-6 -bottom-6 opacity-10 rotate-12">
                        <Truck size={120} />
                    </div>
                </div>
            </main>
        </div>
    );
}
