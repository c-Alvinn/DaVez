import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Save } from 'lucide-react';
import { useAuth } from '../../../context/useAuth';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export default function EditProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: 'motorista@exemplo.com', // Mocked as per Profile.tsx
        phone: '(11) 99999-8888', // Mocked as per Profile.tsx
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulation
        setTimeout(() => {
            setIsLoading(false);
            navigate('/driver/profile');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <button
                        onClick={() => navigate('/driver/profile')}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">Editar Perfil</h1>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 space-y-6 mt-4">
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                <User size={16} />
                            </div>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Identificação</h3>
                        </div>

                        <Input
                            label="Nome Completo"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Seu nome completo"
                            required
                        />

                        <Input
                            label="E-mail"
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="seu@email.com"
                            required
                        />

                        <Input
                            label="Telefone"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>

                    <div className="pt-4 space-y-3">
                        <Button
                            type="submit"
                            className="w-full py-4 rounded-2xl shadow-lg shadow-blue-50 bg-blue-600 hover:bg-blue-700 font-bold uppercase tracking-widest text-xs"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Salvando...' : (
                                <span className="flex items-center gap-2 justify-center">
                                    Salvar Alterações <Save size={18} />
                                </span>
                            )}
                        </Button>

                        <button
                            type="button"
                            onClick={() => navigate('/driver/profile')}
                            className="w-full py-4 text-gray-400 font-bold uppercase tracking-widest text-[10px] hover:text-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
