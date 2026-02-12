import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Truck, MapPin, Package, Building2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { formatPlate } from '../../utils/masks';
import { GrainType, GrainTypeLabels, TruckType, TruckTypeLabels } from '../../types';

// Mock data
const COMPANIES = [
    { id: '1', name: 'AgroSul S/A' },
    { id: '2', name: 'Fazenda Rio Verde' },
    { id: '3', name: 'Cooperativa Grão de Ouro' },
];

const BRANCHES: Record<string, { id: string, name: string }[]> = {
    '1': [
        { id: '101', name: 'Filial Matriz - Cascavel' },
        { id: '102', name: 'Unidade de Recebimento - Toledo' },
    ],
    '2': [
        { id: '201', name: 'Armazém 01 - Maringá' },
        { id: '202', name: 'Porto Seco - Londrina' },
    ],
    '3': [
        { id: '301', name: 'Silo Central' },
    ]
};

const TRUCK_TYPES = Object.values(TruckType).map(value => ({
    label: TruckTypeLabels[value],
    value
}));

const GRAIN_TYPES = Object.values(GrainType).map(value => ({
    label: GrainTypeLabels[value],
    value
}));

const CARRIERS = [
    { label: 'Autônomo', value: 'AUTONOMO' },
    { label: 'TransLogística Brasil', value: 'TRANS_LOG' },
    { label: 'Expresso Grãos', value: 'EXPRESSO_GRAO' },
    { label: 'Rápido Rodoviário', value: 'RAPIDO_RODO' },
];

export default function NewSchedule() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyId: '',
        branchId: '',
        licensePlate: '',
        truckType: '',
        grainType: '',
        carrierId: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    // Reset Filial when Empresa changes
    useEffect(() => {
        setFormData(prev => ({ ...prev, branchId: '' }));
    }, [formData.companyId]);

    const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPlate(e.target.value);
        setFormData({ ...formData, licensePlate: formatted });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulação de delay de rede
        setTimeout(() => {
            setIsLoading(false);
            // TODO: Integrar com API real futuramente
            navigate('/driver/active');
        }, 1500);
    };

    const isFormValid =
        formData.companyId &&
        formData.branchId &&
        formData.licensePlate.length >= 7 &&
        formData.truckType &&
        formData.grainType &&
        formData.carrierId;

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10">
                <div className="max-w-lg mx-auto flex items-center gap-4">
                    <button onClick={() => navigate('/driver')} className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">Agendar Embarque</h1>
                </div>
            </header>

            <main className="max-w-lg mx-auto p-4 space-y-6 mt-4">
                {/* Hero Card Visual */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-100 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-xl font-black mb-1">Novo Agendamento</h2>
                        <p className="text-blue-100 text-sm">Preencha os dados abaixo para entrar na fila.</p>
                    </div>
                    <Truck className="absolute -right-6 -bottom-6 opacity-20 rotate-12" size={140} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                <Building2 size={16} />
                            </div>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Localidade</h3>
                        </div>

                        <Select
                            label="Empresa"
                            value={formData.companyId}
                            onChange={e => setFormData({ ...formData, companyId: e.target.value })}
                            options={COMPANIES.map(c => ({ label: c.name, value: c.id }))}
                            placeholder="Selecione a empresa"
                        />

                        <Select
                            label="Filial"
                            value={formData.branchId}
                            onChange={e => setFormData({ ...formData, branchId: e.target.value })}
                            options={formData.companyId ? (BRANCHES[formData.companyId] || []).map(b => ({ label: b.name, value: b.id })) : []}
                            disabled={!formData.companyId}
                            placeholder={formData.companyId ? "Selecione a filial" : "Selecione uma empresa primeiro"}
                        />
                    </div>

                    <div className="h-px bg-gray-50 my-6" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                <Truck size={16} />
                            </div>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Veículo</h3>
                        </div>

                        <Input
                            label="Placa do Caminhão"
                            placeholder="ABC-1234 ou ABC-1D23"
                            value={formData.licensePlate}
                            onChange={handlePlateChange}
                            maxLength={8}
                        />

                        <Select
                            label="Tipo de Caminhão"
                            value={formData.truckType}
                            onChange={e => setFormData({ ...formData, truckType: e.target.value })}
                            options={TRUCK_TYPES}
                            placeholder="Selecione o tipo"
                        />
                    </div>

                    <div className="h-px bg-gray-50 my-6" />

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                                <Package size={16} />
                            </div>
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-wider">Carga</h3>
                        </div>

                        <Select
                            label="Tipo de Grão"
                            value={formData.grainType}
                            onChange={e => setFormData({ ...formData, grainType: e.target.value })}
                            options={GRAIN_TYPES}
                            placeholder="Selecione o grão"
                        />

                        <Select
                            label="Transportadora"
                            value={formData.carrierId}
                            onChange={e => setFormData({ ...formData, carrierId: e.target.value })}
                            options={CARRIERS}
                            placeholder="Selecione a transportadora"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-6 py-4 rounded-2xl shadow-lg shadow-blue-50 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200"
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processando...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
                                Confirmar Agendamento <CheckCircle size={18} />
                            </span>
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs text-gray-400 px-6">
                    Ao confirmar, você está ciente de que deve respeitar o horário e as normas de segurança da unidade.
                </p>
            </main>
        </div>
    );
}
