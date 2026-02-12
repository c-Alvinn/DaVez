import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

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

    const validateCPF = (cpf: string): boolean => {
        const cleanCPF = cpf.replace(/\D/g, '');
        return cleanCPF.length === 11;
    };

    const validatePhone = (phone: string): boolean => {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Nome completo é obrigatório';
        }

        if (!validateCPF(formData.cpf)) {
            newErrors.cpf = 'CPF inválido (deve conter 11 dígitos)';
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Telefone inválido (10 ou 11 dígitos)';
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

        // TODO: Integrar com API de cadastro
        console.log('Cadastro realizado:', formData);
        alert('Cadastro realizado com sucesso! (Simulação)');
        navigate('/login?role=driver');
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
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
                    <Input
                        label="Nome Completo"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        placeholder="Digite seu nome completo"
                        error={errors.fullName}
                        required
                    />

                    <Input
                        label="CPF"
                        value={formData.cpf}
                        onChange={(e) => handleChange('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        error={errors.cpf}
                        required
                    />

                    <Input
                        label="Telefone"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="(00) 00000-0000"
                        error={errors.phone}
                        required
                    />

                    <Input
                        label="Senha"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        error={errors.password}
                        required
                    />

                    <Input
                        label="Confirmar Senha"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        placeholder="Digite a senha novamente"
                        error={errors.confirmPassword}
                        required
                    />

                    <Button type="submit" className="w-full mt-4">
                        <UserPlus size={18} className="mr-2" />
                        Criar Conta
                    </Button>
                </form>
            </div>
        </div>
    );
}
