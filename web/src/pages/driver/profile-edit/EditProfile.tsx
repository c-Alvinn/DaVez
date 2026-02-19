import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, User, Mail, Phone, Camera } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';

export default function EditProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: 'motorista@exemplo.com',
        phone: '(11) 99999-8888',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            navigate('/driver/profile');
        }, 1200);
    };

    const inputClass = "w-full bg-forest/20 dark:bg-card-dark text-white border border-white/5 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-primary/50 focus:border-transparent outline-none transition-all placeholder-slate-600 shadow-sm text-sm font-bold";
    const labelClass = "block text-[10px] font-black text-primary uppercase tracking-[0.2em] ml-1 mb-2 opacity-80";

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display transition-colors">
            <DriverHeader title="Editar Perfil" />

            <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col gap-8">

                {/* Photo Section */}
                <section className="text-center space-y-4">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 bg-forest/40 dark:bg-card-dark text-primary/40 rounded-full flex items-center justify-center mx-auto border-4 border-white/5 shadow-2xl overflow-hidden relative">
                            <User size={48} strokeWidth={1} />
                        </div>
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="relative group">
                        <label className={labelClass}>Nome Completo</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50 group-focus-within:text-primary transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className={inputClass}
                                placeholder="Seu nome completo"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <label className={labelClass}>E-mail Profissional</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50 group-focus-within:text-primary transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className={inputClass}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div className="relative group">
                        <label className={labelClass}>Telefone / WhatsApp</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary/50 group-focus-within:text-primary transition-colors">
                                <Phone size={18} />
                            </div>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className={inputClass}
                                placeholder="(00) 00000-0000"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-background-dark font-black text-sm py-4.5 rounded-2xl shadow-xl hover:shadow-primary/10 active:scale-[0.98] transition-all uppercase tracking-[0.2em] flex justify-center items-center gap-3 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin" />
                                    <span>Salvando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Salvar Alterações</span>
                                    <Save size={18} />
                                </>
                            )}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/driver/profile')}
                        className="w-full text-center text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors py-2"
                    >
                        Descartar alterações
                    </button>
                </form>
            </main>

            <DriverFooter />
        </div>
    );
}
