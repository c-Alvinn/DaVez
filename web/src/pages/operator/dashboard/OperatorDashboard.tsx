import { useState } from 'react';
import { useAuth } from '../../../context/useAuth';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Clock,
    BarChart3,
    UserSearch,
    PlusCircle,
    UserPlus,
    User,
    TrendingUp
} from 'lucide-react';
import { StatCard } from '../../../components/operator/StatCard';
import { OperatorSidebar, type MenuItem } from '../../../components/operator/OperatorSidebar';
import { OperatorLayout } from '../../../components/operator/OperatorLayout';
import OperatorSchedules from '../schedules/OperatorSchedules';
import OperatorAttendance from '../attendance/OperatorAttendance';
import OperatorReports from '../reports/OperatorReports';
import OperatorDriverSearch from '../search/OperatorDriverSearch';

type Page = 'inicio' | 'embarque' | 'desembarque' | 'atendimentos' | 'relatorios' | 'buscar' | 'cadastrar_agendamento' | 'cadastrar_funcionario' | 'perfil';

export default function OperatorDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState<Page>('inicio');

    const handleLogout = () => {
        if (window.confirm('Deseja realmente sair da conta?')) {
            logout();
            navigate('/');
        }
    };

    const menuItems: MenuItem[] = [
        { id: 'inicio', label: 'Início', icon: <LayoutDashboard size={20} /> },
        { id: 'embarque', label: 'Embarque', icon: <Calendar size={20} /> },
        { id: 'desembarque', label: 'Desembarque', icon: <Calendar size={20} /> },
        { id: 'atendimentos', label: 'Em Atendimento', icon: <Clock size={20} /> },
        { id: 'relatorios', label: 'Relatórios', icon: <BarChart3 size={20} /> },
        { id: 'buscar', label: 'Buscar Motorista', icon: <UserSearch size={20} /> },
        { type: 'divider', label: 'Ações' },
        { id: 'cadastrar_agendamento', label: 'Cadastrar Agendamento', icon: <PlusCircle size={20} /> },
        { id: 'cadastrar_funcionario', label: 'Cadastrar Funcionário', icon: <UserPlus size={20} /> },
        { type: 'divider', label: 'Minha Conta' },
        { id: 'perfil', label: 'Perfil', icon: <User size={20} /> },
    ];

    return (
        <OperatorLayout
            sidebar={
                <OperatorSidebar
                    activePage={activePage}
                    onPageChange={(p) => setActivePage(p as Page)}
                    onLogout={handleLogout}
                    menuItems={menuItems}
                />
            }
        >
            {/* Page Content Renderer */}
            {activePage === 'inicio' && <DashboardHome />}
            {activePage === 'embarque' && <OperatorSchedules title="Embarque" />}
            {activePage === 'desembarque' && <OperatorSchedules title="Desembarque" />}
            {activePage === 'atendimentos' && <OperatorAttendance />}
            {activePage === 'relatorios' && <OperatorReports />}
            {activePage === 'buscar' && <OperatorDriverSearch />}
            {activePage !== 'inicio' && activePage !== 'embarque' && activePage !== 'desembarque' && activePage !== 'atendimentos' && activePage !== 'relatorios' && activePage !== 'buscar' && (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.02]">
                    <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                            <PlusCircle size={40} />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Módulo em Desenvolvimento</p>
                    </div>
                </div>
            )}
        </OperatorLayout>
    );
}

function DashboardHome() {
    return (
        <div className="space-y-10 animate-in fade-in duration-500">
            {/* Header Local (SPA style) */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Olá, Operador.</h2>
                    <p className="text-slate-400 font-medium">Bem-vindo ao Painel DaVez.</p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 p-4 rounded-full border border-white/5">
                    <div>
                        <p className="text-sm font-bold text-white leading-none mb-1">Ricardo Silva</p>
                        <p className="text-[10px] font-black text-primary/50 uppercase tracking-widest">Operador Sênior</p>
                    </div>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <StatCard
                    label="Agendados"
                    value="142"
                    icon={<Calendar size={24} />}
                    colorClass="text-blue-400"
                    glowClass="shadow-blue-500/20"
                    borderClass="border-blue-500/20"
                    bgIcon="bg-blue-500/10"
                />
                <StatCard
                    label="Em Atendimento"
                    value="28"
                    icon={<Clock size={24} />}
                    colorClass="text-amber-400"
                    glowClass="shadow-amber-500/20"
                    borderClass="border-amber-500/20"
                    bgIcon="bg-amber-500/10"
                />
                <StatCard
                    label="Concluídos"
                    value="850"
                    icon={<TrendingUp size={24} />}
                    colorClass="text-primary"
                    glowClass="shadow-primary/20"
                    borderClass="border-primary/20"
                    bgIcon="bg-primary/10"
                />
            </div>
        </div>
    );
}
