import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import { authService } from '../../../services/authService';
import { formatCPF } from '../../../utils/masks';

export default function Login() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const roleParam = searchParams.get('role');

    // Mapear role da URL para role do sistema (simplificado)
    const role = roleParam === 'driver' ? 'DRIVER'
        : roleParam === 'carrier' ? 'CARRIER'
            : roleParam === 'internal' ? 'SCALE_OPERATOR' // Default internal
                : 'DRIVER';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const cleanUsername = role === 'DRIVER' ? username.replace(/\D/g, '') : username;

        try {
            const user = await authService.login({
                loginIdentifier: cleanUsername,
                password: password,
            });

            login(user);

            // Redirecionar baseado no role
            if (user.role === 'DRIVER') navigate('/driver');
            else if (['SCALE_OPERATOR', 'GATE_KEEPER', 'MANAGER', 'ADMIN'].includes(user.role)) navigate('/dashboard');
            else navigate('/');
        } catch (err: any) {
            console.error('Erro no login:', err);
            setError(err.response?.data?.message || 'Credenciais inválidas. Verifique seus dados e tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUsernameChange = (value: string) => {
        if (role === 'DRIVER') {
            setUsername(formatCPF(value));
        } else {
            setUsername(value);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Bem-vindo ao DaVez</h1>
                    <p className="text-gray-500 mt-2 capitalize">Acesso: {roleParam === 'driver' ? 'Motorista' : roleParam === 'carrier' ? 'Transportadora' : 'Colaborador'}</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            {role === 'DRIVER' ? 'CPF' : 'Usuário'}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => handleUsernameChange(e.target.value)}
                            placeholder={role === 'DRIVER' ? 'Digite seu CPF' : 'Digite seu nome de usuário'}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 active:transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                {role === 'DRIVER' && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-600 text-center mb-3">Ainda não tem uma conta?</p>
                        <button
                            onClick={() => navigate('/register/driver')}
                            className="w-full bg-gray-100 text-gray-700 font-semibold p-3 rounded-lg hover:bg-gray-200 active:transform active:scale-[0.98] transition-all"
                        >
                            Criar Conta de Motorista
                        </button>
                    </div>
                )}

                <button onClick={() => navigate('/')} className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                    Voltar para o início
                </button>
            </div>
        </div>
    );
}
