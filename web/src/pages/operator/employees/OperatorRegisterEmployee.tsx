import { useState } from 'react';
import {
    User,
    UserPlus,
    Building2,
    Lock,
    ArrowRight,
    CheckCircle2,
    UserCircle
} from 'lucide-react';
import { Spinner } from '../../../components/common/Spinner';

interface FormState {
    role: string;
    branchId: string;
    name: string;
    username: string;
    password: '';
}

const INITIAL_STATE: FormState = {
    role: '',
    branchId: '',
    name: '',
    username: '',
    password: ''
};

const ROLES = [
    { label: 'Porteiro', value: 'GATE_KEEPER' },
    { label: 'Balanceiro', value: 'SCALE_OPERATOR' },
    { label: 'Gerente', value: 'MANAGER' },
];

const BRANCHES = [
    { id: '1', name: 'Filial Cascavel - PR' },
    { id: '2', name: 'Filial Paranaguá - PR' },
    { id: '3', name: 'Filial Cuiabá - MT' },
];

export default function OperatorRegisterEmployee() {
    const [form, setForm] = useState<FormState>(INITIAL_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulando criação de funcionário
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setForm(INITIAL_STATE);

            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const isFormValid =
        form.role &&
        form.branchId &&
        form.name.trim() &&
        form.username.trim() &&
        form.password.length >= 6;

    const selectClass = "w-full bg-[#1A3C34] text-slate-100 border border-emerald/50 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer pr-12 font-bold";
    const inputClass = "w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700";
    const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2";

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Page Header */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white tracking-tight">Cadastrar Funcionário</h2>
                <p className="text-slate-400 font-medium">Adicione um novo colaborador interno ao sistema DaVez.</p>
            </div>

            <div className="max-w-4xl w-full mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Role and Branch Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2">
                            <label className={labelClass}>
                                <UserPlus size={12} className="text-primary" />
                                Tipo de Usuário
                            </label>
                            <div className="relative">
                                <select
                                    value={form.role}
                                    onChange={e => setForm({ ...form, role: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione o Cargo</option>
                                    {ROLES.map(role => (
                                        <option key={role.value} value={role.value} className="bg-[#1A3C34] text-slate-100">
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2">
                            <label className={labelClass}>
                                <Building2 size={12} className="text-primary" />
                                Filial de Alocação
                            </label>
                            <div className="relative">
                                <select
                                    value={form.branchId}
                                    onChange={e => setForm({ ...form, branchId: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione a Filial</option>
                                    {BRANCHES.map(branch => (
                                        <option key={branch.id} value={branch.id} className="bg-[#1A3C34] text-slate-100">
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal and Auth Info */}
                    <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl space-y-6">
                        <div className="space-y-2">
                            <label className={labelClass}>
                                <User size={12} className="text-primary" />
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: Ana Souza"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className={inputClass}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <UserCircle size={12} className="text-primary" />
                                    Username para Login
                                </label>
                                <input
                                    type="text"
                                    placeholder="ana.souza"
                                    value={form.username}
                                    onChange={e => setForm({ ...form, username: e.target.value.toLowerCase() })}
                                    className={inputClass}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <Lock size={12} className="text-primary" />
                                    Senha Inicial
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={e => setForm({ ...form, password: e.target.value as any })}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className="w-full md:w-auto px-12 py-5 bg-primary text-background-dark rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(19,236,109,0.2)] mx-auto cursor-pointer"
                        >
                            {isSubmitting ? <Spinner size="sm" color="dark" /> : (
                                <>
                                    <UserPlus size={20} />
                                    Salvar Funcionário
                                </>
                            )}
                        </button>

                        {showSuccess && (
                            <div className="flex items-center gap-3 text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CheckCircle2 size={24} />
                                <span className="font-bold">Funcionário cadastrado com sucesso!</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
