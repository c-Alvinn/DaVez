import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import {
    ArrowLeft,
    User,
    Settings,
    Key,
    LogOut,
    ChevronRight,
    Mail,
    Phone
} from 'lucide-react';

interface ProfileItem {
    icon: React.ReactNode;
    label: string;
    value?: string | null;
    action?: () => void;
    showChevron?: boolean;
    status?: string;
}

interface ProfileSection {
    title: string;
    items: ProfileItem[];
}

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const sections: ProfileSection[] = [
        {
            title: 'Dados Pessoais',
            items: [
                { icon: <User size={18} />, label: 'Nome Completo', value: user?.name || 'Não informado' },
                { icon: <Mail size={18} />, label: 'E-mail', value: 'motorista@exemplo.com' },
                { icon: <Phone size={18} />, label: 'Telefone', value: '(11) 99999-8888' },
            ]
        },
        {
            title: 'Configurações',
            items: [
                {
                    icon: <Settings size={18} />,
                    label: 'Editar Perfil',
                    action: () => navigate('/driver/profile/edit'),
                    showChevron: true
                },
                {
                    icon: <Key size={18} />,
                    label: 'Trocar Senha',
                    action: () => console.log('Trocar senha'),
                    status: 'Em breve',
                    showChevron: true
                },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 text-center relative">
                <button
                    onClick={() => navigate('/driver')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full text-gray-600"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Meu Perfil</h1>
            </header>

            <main className="max-w-lg mx-auto p-4 space-y-8 mt-4">
                {/* Profile Card */}
                <div className="text-center px-4">
                    <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm overflow-hidden">
                        <User size={48} />
                    </div>
                    <h2 className="text-xl font-black text-gray-900">{user?.name}</h2>
                    <p className="text-sm text-gray-500 font-medium">Motorista Profissional</p>
                </div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] px-2">
                                {section.title}
                            </h3>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                {section.items.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={item.action}
                                        className={`w-full flex items-center gap-4 p-4 text-left active:bg-gray-50 transition-colors ${i !== section.items.length - 1 ? 'border-b border-gray-50' : ''
                                            }`}
                                        disabled={!item.action}
                                    >
                                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-500">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">
                                                {item.label}
                                            </p>
                                            <p className="font-bold text-gray-900">
                                                {item.value || (item.status && <span className="text-orange-500 text-xs">{item.status}</span>)}
                                            </p>
                                        </div>
                                        {item.showChevron && <ChevronRight size={16} className="text-gray-300" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-white border border-red-100 text-red-500 font-black text-sm rounded-2xl shadow-sm active:bg-red-50 transition-colors mt-8"
                >
                    <LogOut size={18} />
                    SAIR DA CONTA
                </button>
            </main>
        </div>
    );
}
