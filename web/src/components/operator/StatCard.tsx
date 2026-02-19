import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    colorClass: string;
    glowClass: string;
    borderClass: string;
    bgIcon: string;
}

export function StatCard({
    label,
    value,
    icon,
    colorClass,
    glowClass,
    borderClass,
    bgIcon
}: StatCardProps) {
    return (
        <div className={`relative group overflow-hidden bg-forest/10 dark:bg-card-dark p-8 rounded-[2.5rem] border ${borderClass} shadow-2xl ${glowClass} transition-all hover:-translate-y-1`}>
            <div className="relative z-10 flex flex-col gap-4">
                <div className={`w-14 h-14 ${bgIcon} ${colorClass} rounded-2xl flex items-center justify-center border border-white/5`}>
                    {icon}
                </div>
                <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</p>
                    <p className={`text-4xl font-black ${colorClass} tracking-tighter`}>{value}</p>
                </div>
            </div>
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
        </div>
    );
}
