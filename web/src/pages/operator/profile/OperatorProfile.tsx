import { useState } from 'react';
import {
    User,
    UserCircle,
    Lock,
    ChevronLeft,
    Save,
    CheckCircle2,
    ShieldCheck,
    KeyRound
} from 'lucide-react';
import { Spinner } from '../../../components/common/Spinner';

type SubPage = 'view' | 'edit' | 'password';

interface UserData {
    name: string;
    username: string;
    role: string;
}

export default function OperatorProfile() {
    const [subPage, setSubPage] = useState<SubPage>('view');
    const [userData, setUserData] = useState<UserData>({
        name: 'Ricardo Silva',
        username: 'ricardo.silva',
        role: 'Operador Sênior'
    });

    const [editForm, setEditForm] = useState({
        name: userData.name,
        username: userData.username
    });

    const [passwordForm, setPasswordForm] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setUserData({ ...userData, ...editForm });
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setSubPage('view');
            }, 1500);
        }, 1000);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setPasswordForm({ current: '', new: '', confirm: '' });
            setTimeout(() => {
                setShowSuccess(false);
                setSubPage('view');
            }, 1500);
        }, 1000);
    };

    const inputClass = "w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700";
    const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2";
    const buttonBaseClass = "w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed cursor-pointer shadow-lg";

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">
                        {subPage === 'view' && 'Meu Perfil'}
                        {subPage === 'edit' && 'Editar Perfil'}
                        {subPage === 'password' && 'Alterar Senha'}
                    </h2>
                    <p className="text-slate-400 font-medium">
                        {subPage === 'view' && 'Visualize e gerencie suas informações de acesso.'}
                        {subPage === 'edit' && 'Atualize seu nome e identificação de usuário.'}
                        {subPage === 'password' && 'Mantenha sua conta segura trocando sua senha periodicamente.'}
                    </p>
                </div>

                {subPage !== 'view' && (
                    <button
                        onClick={() => setSubPage('view')}
                        className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-sm font-bold hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <ChevronLeft size={18} />
                        Voltar
                    </button>
                )}
            </div>

            <div className="max-w-2xl mx-auto w-full">
                {subPage === 'view' && (
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10 space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                                        <UserCircle size={40} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Operador Logístico</p>
                                        <h3 className="text-3xl font-black text-white tracking-tight italic">{userData.name}</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/5">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Username</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <User size={16} className="text-primary" />
                                            {userData.username}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Cargo / Função</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-primary" />
                                            {userData.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                onClick={() => setSubPage('edit')}
                                className={`${buttonBaseClass} bg-white/5 text-white border border-white/10 hover:bg-white/10`}
                            >
                                <UserCircle size={20} />
                                Editar Perfil
                            </button>
                            <button
                                onClick={() => setSubPage('password')}
                                className={`${buttonBaseClass} bg-white/5 text-white border border-white/10 hover:bg-white/10`}
                            >
                                <KeyRound size={20} />
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                )}

                {subPage === 'edit' && (
                    <form onSubmit={handleEditSubmit} className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] shadow-2xl backdrop-blur-xl space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <User size={12} className="text-primary" />
                                    Nome Completo
                                </label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                    className={inputClass}
                                    placeholder="Seu nome"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <UserCircle size={12} className="text-primary" />
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={editForm.username}
                                    onChange={e => setEditForm({ ...editForm, username: e.target.value.toLowerCase() })}
                                    className={inputClass}
                                    placeholder="seu.usuario"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || !editForm.name || !editForm.username}
                                className={`${buttonBaseClass} bg-primary text-background-dark hover:bg-primary/90 shadow-primary/20`}
                            >
                                {isSubmitting ? <Spinner size="sm" color="dark" /> : (
                                    <>
                                        <Save size={20} />
                                        Salvar Alterações
                                    </>
                                )}
                            </button>

                            {showSuccess && (
                                <div className="flex items-center justify-center gap-3 text-primary animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <CheckCircle2 size={24} />
                                    <span className="font-bold">Perfil atualizado com sucesso!</span>
                                </div>
                            )}
                        </div>
                    </form>
                )}

                {subPage === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] shadow-2xl backdrop-blur-xl space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <Lock size={12} className="text-primary" />
                                    Senha Atual
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.current}
                                    onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })}
                                    className={inputClass}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="h-px bg-white/5" />

                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <KeyRound size={12} className="text-primary" />
                                    Nova Senha
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.new}
                                    onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })}
                                    className={inputClass}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className={labelClass}>
                                    <KeyRound size={12} className="text-primary" />
                                    Confirmar Nova Senha
                                </label>
                                <input
                                    type="password"
                                    value={passwordForm.confirm}
                                    onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                                    className={inputClass}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || !passwordForm.current || !passwordForm.new || passwordForm.new !== passwordForm.confirm}
                                className={`${buttonBaseClass} bg-primary text-background-dark hover:bg-primary/90 shadow-primary/20`}
                            >
                                {isSubmitting ? <Spinner size="sm" color="dark" /> : (
                                    <>
                                        <Lock size={20} />
                                        Alterar Senha
                                    </>
                                )}
                            </button>

                            {showSuccess && (
                                <div className="flex items-center justify-center gap-3 text-primary animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <CheckCircle2 size={24} />
                                    <span className="font-bold">Senha alterada com sucesso!</span>
                                </div>
                            )}

                            {passwordForm.new && passwordForm.confirm && passwordForm.new !== passwordForm.confirm && (
                                <p className="text-center text-red-400 text-xs font-bold uppercase tracking-widest italic animate-in fade-in duration-300">
                                    As senhas não coincidem.
                                </p>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
