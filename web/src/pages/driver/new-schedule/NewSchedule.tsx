import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ArrowRight } from 'lucide-react';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';
import { formatPlate } from '../../../utils/masks';
import { GrainType, GrainTypeLabels, TruckType, TruckTypeLabels } from '../../../types';

// Dados mockados
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

    // Reseta Filial quando Empresa muda
    useEffect(() => {
        setFormData(prev => ({ ...prev, branchId: '' }));
    }, [formData.companyId]);

    const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPlate(e.target.value);
        setFormData({ ...formData, licensePlate: formatted });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulação de delay de envio
        setTimeout(() => {
            setIsLoading(false);
            navigate('/driver/active');
        }, 1500);
    };

    const isFormValid =
        formData.companyId &&
        formData.branchId &&
        formData.licensePlate.length === 8 &&
        formData.truckType &&
        formData.grainType &&
        formData.carrierId;

    const labelClass = "block text-sm font-semibold text-primary uppercase tracking-wide ml-1 mb-2";
    const selectClass = "w-full bg-forest text-slate-100 border border-emerald/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-500 shadow-sm appearance-none cursor-pointer";

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            <DriverHeader title="Novo Agendamento" />

            <main className="flex-1 max-w-md mx-auto w-full px-6 py-8 flex flex-col gap-6">
                <section className="space-y-2">
                    <h2 className="text-3xl font-bold dark:text-white tracking-tight">Agendar Embarque</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-normal text-base leading-relaxed">
                        Preencha os dados abaixo para entrar na fila de carregamento.
                    </p>
                    <div className="h-1.5 w-16 bg-primary rounded-full mt-3"></div>
                </section>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
                    {/* Empresa e Filial */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className={labelClass}>Empresa</label>
                            <div className="relative">
                                <select
                                    className={selectClass}
                                    value={formData.companyId}
                                    onChange={e => setFormData({ ...formData, companyId: e.target.value })}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">Selecione a empresa</option>
                                    {COMPANIES.map(c => (
                                        <option key={c.id} value={c.id} className="bg-forest text-slate-100 italic">
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Filial</label>
                            <div className="relative">
                                <select
                                    className={`${selectClass} ${!formData.companyId ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    value={formData.branchId}
                                    onChange={e => setFormData({ ...formData, branchId: e.target.value })}
                                    disabled={!formData.companyId}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">
                                        {formData.companyId ? "Selecione a unidade" : "Selecione a empresa primeiro"}
                                    </option>
                                    {(BRANCHES[formData.companyId] || []).map(b => (
                                        <option key={b.id} value={b.id} className="bg-forest text-slate-100">
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5 my-2" />

                    {/* Veículo */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className={labelClass}>Placa do Caminhão</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Truck size={20} className="text-slate-500" />
                                </div>
                                <input
                                    className="w-full bg-forest text-slate-100 border border-emerald/50 rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-600 shadow-sm uppercase font-mono tracking-wider"
                                    placeholder="ABC-1234"
                                    value={formData.licensePlate}
                                    onChange={handlePlateChange}
                                    maxLength={8}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Tipo de Caminhão</label>
                            <div className="relative">
                                <select
                                    className={selectClass}
                                    value={formData.truckType}
                                    onChange={e => setFormData({ ...formData, truckType: e.target.value })}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">Selecione o tipo</option>
                                    {TRUCK_TYPES.map(t => (
                                        <option key={t.value} value={t.value} className="bg-forest text-slate-100">
                                            {t.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-white/5 my-2" />

                    {/* Carga */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className={labelClass}>Produto / Grão</label>
                            <div className="relative">
                                <select
                                    className={selectClass}
                                    value={formData.grainType}
                                    onChange={e => setFormData({ ...formData, grainType: e.target.value })}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">Selecione o grão</option>
                                    {GRAIN_TYPES.map(g => (
                                        <option key={g.value} value={g.value} className="bg-forest text-slate-100">
                                            {g.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Transportadora</label>
                            <div className="relative">
                                <select
                                    className={selectClass}
                                    value={formData.carrierId}
                                    onChange={e => setFormData({ ...formData, carrierId: e.target.value })}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">Selecione a empresa</option>
                                    {CARRIERS.map(c => (
                                        <option key={c.value} value={c.value} className="bg-forest text-slate-100">
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={!isFormValid || isLoading}
                            className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-background-dark font-bold text-sm sm:text-lg py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all uppercase tracking-widest flex justify-center items-center gap-2 sm:gap-3 cursor-pointer whitespace-nowrap"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                    <span>Processando...</span>
                                </>
                            ) : (
                                <>
                                    <span>Confirmar Agendamento</span>
                                    <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px]" />
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-slate-500 dark:text-slate-500 px-4 leading-relaxed uppercase tracking-tighter">
                        Ao agendar, você aceita os termos e normas de segurança da unidade e se compromete a respeitar o horário previsto.
                    </p>
                </form>
            </main>

            <DriverFooter />
        </div>
    );
}
