import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isCPF } from 'brazilian-values';
import Button from '../../../components/common/Button';
import Logo from '../../../components/common/Logo';
import { authService } from '../../../services/authService';
import { formatCPF, formatPhone } from '../../../utils/masks';
import '../../auth/login/Login.css';

export default function DriverRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        cpf: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setApiError('');
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nome completo é obrigatório';
        }

        if (!isCPF(formData.cpf)) {
            newErrors.cpf = 'CPF inválido';
        }

        if (formData.phone.replace(/\D/g, '').length < 10) {
            newErrors.phone = 'Telefone inválido';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'As senhas não coincidem';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            await authService.register({
                fullName: formData.fullName,
                cpf: formData.cpf.replace(/\D/g, ''),
                phone: formData.phone.replace(/\D/g, ''),
                password: formData.password
            });

            navigate('/login?role=driver');
        } catch (err: any) {
            console.error('Erro no cadastro:', err);
            setApiError(err.response?.data?.message || 'Falha ao realizar cadastro. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        let formattedValue = value;
        if (field === 'cpf') formattedValue = formatCPF(value);
        if (field === 'phone') formattedValue = formatPhone(value);

        setFormData(prev => ({ ...prev, [field]: formattedValue }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="login-container relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden">
            {/* Ambient Glows */}
            <div className="login-glow top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
            <div className="login-glow bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></div>

            <div className="login-card relative z-10 p-8 md:p-10 rounded-2xl w-full max-w-[500px]">
                <div className="mb-10 text-center">
                    <div className="flex justify-center mb-6">
                        <Logo size="lg" />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Crie sua conta</h1>
                    <p className="text-slate-400 mt-2">Dados para acesso como Motorista</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {apiError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                            {apiError}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-300 ml-1">Nome Completo</label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            placeholder="Seu nome completo"
                            className={`w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all ${errors.fullName ? 'border-red-500/50' : ''}`}
                            required
                            disabled={isLoading}
                        />
                        {errors.fullName && <span className="text-xs text-red-400 ml-1">{errors.fullName}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">CPF</label>
                            <input
                                type="text"
                                value={formData.cpf}
                                onChange={(e) => handleChange('cpf', e.target.value)}
                                placeholder="000.000.000-00"
                                className={`w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all ${errors.cpf ? 'border-red-500/50' : ''}`}
                                required
                                disabled={isLoading}
                            />
                            {errors.cpf && <span className="text-xs text-red-400 ml-1">{errors.cpf}</span>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">Telefone</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="(00) 00000-0000"
                                className={`w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all ${errors.phone ? 'border-red-500/50' : ''}`}
                                required
                                disabled={isLoading}
                            />
                            {errors.phone && <span className="text-xs text-red-400 ml-1">{errors.phone}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">Senha</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="••••••••"
                                className={`w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all ${errors.password ? 'border-red-500/50' : ''}`}
                                required
                                disabled={isLoading}
                            />
                            {errors.password && <span className="text-xs text-red-400 ml-1">{errors.password}</span>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-300 ml-1">Confirmar Senha</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                                className={`w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all ${errors.confirmPassword ? 'border-red-500/50' : ''}`}
                                required
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && <span className="text-xs text-red-400 ml-1">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="cursor-pointer w-full py-4 text-background-dark font-bold rounded-xl mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
                                <span>Cadastrando...</span>
                            </div>
                        ) : 'Finalizar Cadastro'}
                    </Button>
                </form>

                <div className="mt-8 flex flex-col gap-4">
                    <div className="text-center">
                        <span className="text-sm text-slate-500">Já possui uma conta? </span>
                        <button
                            onClick={() => navigate('/login?role=driver')}
                            className="cursor-pointer text-sm text-primary font-bold hover:underline"
                        >
                            Fazer Login
                        </button>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="cursor-pointer text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1"
                    >
                        <span className="material-icons text-base">arrow_back</span>
                        Voltar ao início
                    </button>
                </div>
            </div>
        </div>
    );
}
