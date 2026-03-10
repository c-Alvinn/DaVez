import { useState } from 'react';
import {
    Calendar,
    BarChart3,
    CalendarDays,
    Clock,
    CheckCircle2,
    XCircle,
    FileDown
} from 'lucide-react';
import { ReportPeriod, ReportPeriodLabels } from '../../../types/enums';

export default function OperatorReports() {
    const [period, setPeriod] = useState<ReportPeriod>(ReportPeriod.TODAY);

    const periods = [
        { id: ReportPeriod.TODAY, icon: <Clock size={18} /> },
        { id: ReportPeriod.YESTERDAY, icon: <Calendar size={18} /> },
        { id: ReportPeriod.LAST_7_DAYS, icon: <CalendarDays size={18} /> }
    ];

    // Mock de dados baseado no período
    const stats = {
        totalSchedules: period === ReportPeriod.LAST_7_DAYS ? 450 : period === ReportPeriod.YESTERDAY ? 62 : 45,
        inService: period === ReportPeriod.LAST_7_DAYS ? 120 : period === ReportPeriod.YESTERDAY ? 18 : 12,
        completed: period === ReportPeriod.LAST_7_DAYS ? 410 : period === ReportPeriod.YESTERDAY ? 58 : 38,
        canceled: period === ReportPeriod.LAST_7_DAYS ? 40 : period === ReportPeriod.YESTERDAY ? 4 : 7
    };

    const handleDownloadPDF = () => {
        alert('Gerando relatório PDF...');
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">Relatórios</h2>
                    <p className="text-slate-400 font-medium">Análise de desempenho e fluxo do pátio.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Period Selectors */}
                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                        {periods.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPeriod(p.id)}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${period === p.id
                                    ? 'bg-primary text-background-dark shadow-lg shadow-primary/20 scale-[1.02]'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {p.icon}
                                {ReportPeriodLabels[p.id]}
                            </button>
                        ))}
                    </div>

                    {/* Export Button */}
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm font-bold hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                    >
                        <FileDown size={20} className="text-primary" />
                        Exportar PDF
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    label="Agendados"
                    value={stats.totalSchedules.toString()}
                    icon={<BarChart3 size={24} />}
                    color="blue"
                />
                <StatCard
                    label="Atendidos"
                    value={stats.inService.toString()}
                    icon={<Clock size={24} />}
                    color="amber"
                />
                <StatCard
                    label="Concluídos"
                    value={stats.completed.toString()}
                    icon={<CheckCircle2 size={24} />}
                    color="primary"
                />
                <StatCard
                    label="Cancelados"
                    value={stats.canceled.toString()}
                    icon={<XCircle size={24} />}
                    color="red"
                />
            </div>
        </div>
    );
}

interface StatCardProps {
    label: string;
    value: string;
    icon: any;
    color?: 'primary' | 'red' | 'blue' | 'amber' | 'default';
}

function StatCard({ label, value, icon, color = 'default' }: StatCardProps) {
    const colorClasses = {
        primary: 'text-primary bg-primary/10 border-primary/20 shadow-primary/5',
        red: 'text-red-400 bg-red-400/10 border-red-500/20 shadow-red-500/5',
        blue: 'text-blue-400 bg-blue-400/10 border-blue-500/20 shadow-blue-500/5',
        amber: 'text-amber-400 bg-amber-400/10 border-amber-500/20 shadow-amber-500/5',
        default: 'text-slate-400 bg-white/5 border-white/5 shadow-none'
    };

    return (
        <div className={`border p-8 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-300 group shadow-lg ${colorClasses[color]}`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 duration-500 bg-white/5`}>
                    {icon}
                </div>
            </div>
            <div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
                <h4 className="text-4xl font-black text-white tracking-tighter">{value}</h4>
            </div>
        </div>
    );
}
