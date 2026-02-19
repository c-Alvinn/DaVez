import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import {
    User,
    Settings,
    Key,
    LogOut,
    ChevronRight,
    Mail,
    Phone,
    Award
} from 'lucide-react';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';

interface ProfileItem {
    icon: React.ReactNode;
    label: string;
    value?: string | null;
    action?: () => void;
    showChevron?: boolean;
    status?: string;
    isDanger?: boolean;
}

interface ProfileSection {
    title: string;
    items: ProfileItem[];
}

export default function Profile() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        setIsLogoutModalOpen(true);
    };

    const confirmLogout = () => {
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
                    label: 'Segurança e Senha',
                    action: () => console.log('Trocar senha'),
                    status: 'Em breve',
                    showChevron: true
                },
            ]
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors">
            <DriverHeader title="Meu Perfil" />

            <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col gap-8">

                {/* Profile Header Card */}
                <section className="text-center space-y-4 pt-4 relative">
                    <div className="relative inline-block group">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all opacity-60"></div>
                        <div className="w-28 h-28 bg-forest/40 dark:bg-card-dark text-primary rounded-full flex items-center justify-center mx-auto mb-2 border-4 border-white/5 shadow-2xl overflow-hidden relative z-10">
                            <User size={56} strokeWidth={1.5} />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-primary text-background-dark p-1.5 rounded-full z-20 shadow-lg border-2 border-background-dark">
                            <Award size={14} />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-2xl font-black text-white tracking-tight">{user?.name || 'Perfil do Motorista'}</h2>
                        <div className="flex items-center justify-center gap-2">
                            <span className="bg-primary/10 text-primary text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border border-primary/20">
                                Motorista Profissional
                            </span>
                        </div>
                    </div>
                </section>

                {/* Sections */}
                <section className="space-y-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] px-2 opacity-80">
                                {section.title}
                            </h3>
                            <div className="bg-forest/10 dark:bg-card-dark rounded-3xl border border-white/5 overflow-hidden shadow-xl">
                                {section.items.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={item.action}
                                        className={`w-full flex items-center gap-4 p-5 text-left active:bg-white/5 transition-all ${i !== section.items.length - 1 ? 'border-b border-white/5' : ''
                                            } ${item.action ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'}`}
                                        disabled={!item.action}
                                    >
                                        <div className="p-3 bg-primary/5 rounded-2xl text-primary border border-primary/10 shrink-0">
                                            {item.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">
                                                {item.label}
                                            </p>
                                            <p className="font-bold text-white text-sm truncate">
                                                {item.value || (item.status && <span className="text-primary/50 text-xs italic">{item.status}</span>)}
                                            </p>
                                        </div>
                                        {item.showChevron && <ChevronRight size={18} className="text-primary/30 group-hover:text-primary transition-colors" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Logout Action */}
                <section className="pt-2">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 py-4.5 px-6 bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-red-500 font-black text-xs rounded-2xl shadow-sm hover:bg-red-500/15 active:scale-[0.98] transition-all uppercase tracking-widest"
                    >
                        <LogOut size={18} />
                        Sair da Conta
                    </button>
                </section>
            </main>

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsLogoutModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-sm bg-forest/40 dark:bg-card-dark border border-white/10 rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20">
                                <LogOut size={32} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-black text-white tracking-tight">Sair da Conta?</h3>
                                <p className="text-sm text-slate-400 font-medium">Você precisará fazer login novamente para acessar seus dados.</p>
                            </div>

                            <div className="flex flex-col gap-3 pt-2">
                                <button
                                    onClick={confirmLogout}
                                    className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-black text-xs rounded-2xl shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer"
                                >
                                    Sim, Sair agora
                                </button>
                                <button
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className="w-full py-4 bg-white/5 hover:bg-white/10 text-slate-300 font-black text-xs rounded-2xl border border-white/5 active:scale-[0.98] transition-all uppercase tracking-widest cursor-pointer"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DriverFooter />
        </div>
    );
}
