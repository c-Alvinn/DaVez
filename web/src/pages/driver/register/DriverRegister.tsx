import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { isCPF } from 'brazilian-values';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { authService } from '../../../services/authService';
import { formatCPF, formatPhone } from '../../../utils/masks';

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/login?role=driver')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        Voltar
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">Cadastro de Motorista</h1>
                    <p className="text-gray-500 mt-2">Preencha seus dados para criar sua conta</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {apiError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {apiError}
                        </div>
                    )}

                    <Input
                        label="Nome Completo"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Digite seu nome completo"
                        error={errors.fullName}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        label="CPF"
                        value={formData.cpf}
                        onChange={(e) => handleChange('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        error={errors.cpf}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        label="Telefone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(00) 00000-0000"
                        error={errors.phone}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        error={errors.password}
                        required
                        disabled={isLoading}
                    />

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder="Digite a senha novamente"
                        error={errors.confirmPassword}
                        required
                        disabled={isLoading}
                    />

                    <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                        {isLoading ? (
                            'Criando conta...'
                        ) : (
                            <>
                                <UserPlus size={18} className="mr-2" />
                                Criar Conta
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
