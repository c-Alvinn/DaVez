import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import {
    Truck,
    Search,
    History,
    User,
    ShieldCheck
} from 'lucide-react';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';
import DriverDashboardImage from '../../../assets/driver-dashboard.avif';

export default function DriverDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        {
            title: 'Agendar Embarque',
            icon: <Truck size={32} />,
            path: '/driver/shipment',
        },
        {
            title: 'Consultar Agendamento',
            icon: <Search size={32} />,
            path: '/driver/active',
        },
        {
            title: 'Histórico de Viagens',
            icon: <History size={32} />,
            path: '/driver/history',
        },
        {
            title: 'Meu Perfil Profissional',
            icon: <User size={32} />,
            path: '/driver/profile',
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <DriverHeader title="Painel" />

            <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col gap-8">
                {/* Welcome Section */}
                <section className="space-y-1">
                    <p className="text-emerald-agro dark:text-lime-agro font-bold text-[10px] sm:text-xs uppercase tracking-widest">Painel do Motorista</p>
                    <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                        Bem-vindo de volta, <br />
                        <span className="text-emerald-agro dark:text-primary">
                            {user?.name || 'Motorista'}
                        </span>
                    </h2>
                    <div className="h-1.5 w-12 bg-primary rounded-full mt-2"></div>
                </section>

                {/* Menu Grid */}
                <section className="grid grid-cols-2 gap-4">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => navigate(item.path)}
                            className="bg-white dark:bg-primary/5 border border-slate-200 dark:border-white/5 p-5 sm:p-6 rounded-2xl flex flex-col items-start gap-3 sm:gap-4 transition-all active:scale-95 text-left shadow-sm hover:shadow-md group cursor-pointer"
                        >
                            <div className="bg-primary/10 dark:bg-primary/20 p-2.5 sm:p-3 rounded-xl group-hover:bg-primary/30 transition-colors text-primary">
                                {item.icon}
                            </div>
                            <span className="font-bold text-sm sm:text-base leading-tight dark:text-white/90">
                                {item.title}
                            </span>
                        </button>
                    ))}
                </section>

                {/* Security Tip Card */}
                <section className="bg-primary/5 border border-primary/10 p-5 rounded-2xl flex items-start gap-4">
                    <div className="mt-1 text-primary">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-primary text-[10px] sm:text-xs uppercase tracking-wide mb-1">Dica de Segurança</h4>
                        <p className="text-xs sm:text-sm opacity-80 leading-relaxed italic">
                            "Mantenha seus documentos em mãos ao chegar na unidade. Isso agiliza o seu processo de entrada."
                        </p>
                    </div>
                </section>

                {/* Visual Decorative Element */}
                <div className="relative h-40 w-full rounded-2xl overflow-hidden mt-2 shadow-inner border border-white/5">
                    <img
                        alt="Logística Agro"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
                        src={DriverDashboardImage}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                        Eficiência no Campo • Logística 4.0
                    </div>
                </div>
            </main>

            <DriverFooter />
        </div>
    );
}
