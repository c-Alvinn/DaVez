import { X, User, CreditCard, Phone, Mail } from 'lucide-react';

interface Driver {
    name: string;
    cpf: string;
    phone: string;
    email?: string;
}

interface DriverDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    driver: Driver | null;
}

export function DriverDetailsModal({ isOpen, onClose, driver }: DriverDetailsModalProps) {
    if (!isOpen || !driver) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background-dark/80 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-[#102218] rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                            <User size={20} />
                        </div>
                        <h3 className="text-xl font-black text-white tracking-tight">Dados do Motorista</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <DetailItem
                        icon={<User size={18} />}
                        label="Nome Completo"
                        value={driver.name}
                    />
                    <DetailItem
                        icon={<CreditCard size={18} />}
                        label="CPF"
                        value={driver.cpf}
                    />
                    <DetailItem
                        icon={<Phone size={18} />}
                        label="Telefone / WhatsApp"
                        value={driver.phone}
                    />
                    <DetailItem
                        icon={<Mail size={18} />}
                        label="E-mail"
                        value={driver.email || 'Não informado'}
                    />
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-white/5 bg-white/[0.02]">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-primary text-background-dark font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
                    >
                        Fechar Detalhes
                    </button>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-primary/70 border border-white/5 group-hover:border-primary/20 transition-colors shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-bold truncate">{value}</p>
            </div>
        </div>
    );
}
