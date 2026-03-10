import { useState } from 'react';
import {
    User,
    UserPlus,
    Lock,
    CheckCircle2,
    UserCircle
} from 'lucide-react';
import { Spinner } from '../../../components/common/Spinner';

interface FormState {
    name: string;
    username: string;
    password: '';
}

const INITIAL_STATE: FormState = {
    name: '',
    username: '',
    password: ''
};

export default function CarrierRegisterUser() {
    const [form, setForm] = useState<FormState>(INITIAL_STATE);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulando criação de usuário
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setForm(INITIAL_STATE);

            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const isFormValid =
        form.name.trim() &&
        form.username.trim() &&
        form.password.length >= 6;

    const inputClass = "w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700";
    const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2";

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Page Header */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white tracking-tight">Cadastrar Usuário</h2>
                <p className="text-slate-400 font-medium">Adicione um novo usuário ao sistema sob a mesma transportadora.</p>
            </div>

            <div className="max-w-4xl w-full mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
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
                                    Salvar Usuário
                                </>
                            )}
                        </button>

                        {showSuccess && (
                            <div className="flex items-center gap-3 text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CheckCircle2 size={24} />
                                <span className="font-bold">Usuário cadastrado com sucesso!</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
