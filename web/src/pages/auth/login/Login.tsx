import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/useAuth';
import authService from '../../../services/authService';
import { formatCPF } from '../../../utils/masks';
import Button from '../../../components/common/Button';
import Logo from '../../../components/common/Logo';
import './Login.css';

export default function Login() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const roleParam = searchParams.get('role');

    const role = roleParam === 'driver' ? 'DRIVER'
        : roleParam === 'carrier' ? 'CARRIER'
            : roleParam === 'internal' ? 'SCALE_OPERATOR'
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
            const loginResponse = await authService.login(
                cleanUsername,
                password
            );

            const userToStore: any = {
                id: 0, // Mock id or get from another profile call if needed, but LoginResponseDTO has the data
                name: loginResponse.user.name,
                role: loginResponse.user.role,
                token: loginResponse.token,
            };

            login(userToStore);

            if (userToStore.role === 'DRIVER') navigate('/driver');
            else if (['SCALE_OPERATOR', 'GATE_KEEPER', 'MANAGER', 'ADMIN'].includes(userToStore.role)) navigate('/dashboard');
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
        <div className="login-container relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">
            {/* Ambient Glows */}
            <div className="login-glow top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="login-glow bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>

            <div className="login-card relative z-10 p-8 md:p-10 rounded-2xl w-full max-w-[440px]">
                <div className="mb-10 text-center">
                    <div className="flex justify-center mb-6">
                        <Logo size="lg" />
                    </div>

                    {!roleParam ? (
                        <>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Como deseja acessar?</h1>
                            <p className="text-slate-400 mt-2">Selecione seu perfil para continuar</p>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Bem-vindo</h1>
                            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                    Acesso: {roleParam === 'driver' ? 'Motorista' : roleParam === 'carrier' ? 'Transportadora' : 'Colaborador'}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {!roleParam ? (
                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={() => navigate('/login?role=driver')}
                            variant="primary"
                            className="cursor-pointer w-full py-4 justify-start px-6 group"
                        >
                            <span className="material-icons text-background-dark group-hover:scale-110 transition-transform">local_shipping</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-background-dark">Sou Motorista</div>
                                <div className="text-xs text-background-dark/70 font-normal">Agendamentos e Cargas</div>
                            </div>
                        </Button>

                        <Button
                            onClick={() => navigate('/login?role=carrier')}
                            variant="primary"
                            className="cursor-pointer w-full py-4 justify-start px-6 group"
                        >
                            <span className="material-icons text-background-dark group-hover:scale-110 transition-transform">domain</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-background-dark">Sou Transportadora</div>
                                <div className="text-xs text-background-dark/70 font-normal">Gestão de Frota e Monitoramento</div>
                            </div>
                        </Button>

                        <Button
                            onClick={() => navigate('/login?role=internal')}
                            variant="primary"
                            className="cursor-pointer w-full py-4 justify-start px-6 group"
                        >
                            <span className="material-icons text-background-dark group-hover:scale-110 transition-transform">warehouse</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-background-dark">Sou Colaborador</div>
                                <div className="text-xs text-background-dark/70 font-normal">Operação interna e Gestão</div>
                            </div>
                        </Button>

                        <button
                            onClick={() => navigate('/')}
                            className="cursor-pointer mt-6 text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1"
                        >
                            <span className="material-icons text-base">arrow_back</span>
                            Voltar ao início
                        </button>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleLogin} className="flex flex-col gap-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300 ml-1">
                                    {role === 'DRIVER' ? 'CPF' : 'Usuário'}
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => handleUsernameChange(e.target.value)}
                                    placeholder={role === 'DRIVER' ? '000.000.000-00' : 'Nome de usuário'}
                                    className="w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-medium text-slate-300">Senha</label>
                                    <button type="button" className="cursor-pointer text-xs text-primary/70 hover:text-primary transition-colors">Esqueceu a senha?</button>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full p-4 login-input rounded-xl text-white placeholder:text-slate-600 focus:outline-none transition-all"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="cursor-pointer w-full py-4 text-background-dark font-bold rounded-xl mt-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
                                        <span>Autenticando...</span>
                                    </div>
                                ) : 'Entrar na Plataforma'}
                            </Button>
                        </form>

                        <div className="mt-8 flex flex-col gap-4">
                            {role === 'DRIVER' && (
                                <div className="text-center">
                                    <span className="text-sm text-slate-500">Ainda não tem uma conta? </span>
                                    <button
                                        onClick={() => navigate('/register/driver')}
                                        className="cursor-pointer text-sm text-primary font-bold hover:underline"
                                    >
                                        Criar conta
                                    </button>
                                </div>
                            )}

                            <button
                                onClick={() => navigate('/login')}
                                className="cursor-pointer text-sm text-primary/70 hover:text-primary transition-colors flex items-center justify-center gap-1"
                            >
                                <span className="material-icons text-base">swap_horiz</span>
                                Alterar perfil de acesso
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="cursor-pointer text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-1"
                            >
                                <span className="material-icons text-base">arrow_back</span>
                                Voltar ao início
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
