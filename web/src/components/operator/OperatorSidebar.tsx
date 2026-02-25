import React from 'react';
import { LogOut, ChevronRight } from 'lucide-react';
import Logo from '../common/Logo';

export interface MenuItem {
    id?: string;
    label: string;
    icon?: React.ReactNode;
    type?: 'divider' | 'item';
}

interface OperatorSidebarProps {
    activePage: string;
    onPageChange: (page: string) => void;
    onLogout: () => void;
    menuItems: MenuItem[];
}

export function OperatorSidebar({
    activePage,
    onPageChange,
    onLogout,
    menuItems
}: OperatorSidebarProps) {
    return (
        <aside className="w-full md:w-80 bg-[#0a140f] border-r border-white/5 flex flex-col p-8 z-20">
            <div className="mb-10">
                <button
                    onClick={() => onPageChange('inicio')}
                    className="hover:opacity-80 transition-opacity active:scale-[0.98] transition-transform cursor-pointer"
                >
                    <Logo size="md" as="div" />
                </button>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2 ml-1">PAINEL OPERACIONAL</p>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto pr-2 custom-scrollbar">
                {menuItems.map((item, idx) => {
                    if (item.type === 'divider') {
                        return (
                            <p key={idx} className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-8 mb-3 px-4">
                                {item.label}
                            </p>
                        );
                    }

                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => item.id && onPageChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group cursor-pointer ${isActive
                                ? 'bg-primary text-background-dark font-bold shadow-lg shadow-primary/20'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <span className={`${isActive ? 'text-background-dark' : 'text-primary/70 group-hover:text-primary'} transition-colors`}>
                                {item.icon}
                            </span>
                            <span className="text-xs">{item.label}</span>
                            {isActive && <ChevronRight size={16} className="ml-auto" />}
                        </button>
                    );
                })}
            </nav>

            <button
                onClick={onLogout}
                className="mt-8 flex items-center gap-3 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold text-sm w-full border border-transparent hover:border-red-500/20 cursor-pointer"
            >
                <LogOut size={20} />
                Sair da Conta
            </button>
        </aside>
    );
}
