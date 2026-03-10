import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, ArrowRight, Loader2 } from 'lucide-react';
import DriverHeader from '../../../components/layout/DriverHeader';
import DriverFooter from '../../../components/layout/DriverFooter';
import { formatPlate } from '../../../utils/masks';
import { GRAIN_TYPES, TRUCK_TYPES } from '../../../types';
import masterDataService from '../../../services/masterDataService';
import type { CompanyMaster, BranchMaster, CarrierMaster } from '../../../services/masterDataService';
import schedulingService from '../../../services/schedulingService';

export default function NewSchedule() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyCnpj: '',
        branchCode: '',
        licensePlate: '',
        truckType: '',
        grainType: '',
        carrierCnpj: '',
    });

    const [companies, setCompanies] = useState<CompanyMaster[]>([]);
    const [branches, setBranches] = useState<BranchMaster[]>([]);
    const [carriers, setCarriers] = useState<CarrierMaster[]>([]);
    
    const [isFetchingCompanies, setIsFetchingCompanies] = useState(false);
    const [isFetchingBranches, setIsFetchingBranches] = useState(false);
    const [isFetchingCarriers, setIsFetchingCarriers] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Carregar Empresas e Transportadoras no mount
    useEffect(() => {
        const loadInitialData = async () => {
            setIsFetchingCompanies(true);
            setIsFetchingCarriers(true);
            try {
                const [companiesData, carriersData] = await Promise.all([
                    masterDataService.getCompanies(),
                    masterDataService.getCarriers()
                ]);
                setCompanies(companiesData);
                setCarriers(carriersData);
            } catch (error) {
                console.error("Erro ao carregar dados iniciais:", error);
            } finally {
                setIsFetchingCompanies(false);
                setIsFetchingCarriers(false);
            }
        };
        loadInitialData();
    }, []);

    // Carregar Filiais quando Empresa muda
    useEffect(() => {
        setFormData(prev => ({ ...prev, branchCode: '' }));
        setBranches([]);

        if (!formData.companyCnpj) return;

        const selectedCompany = companies.find(c => c.cnpj === formData.companyCnpj);
        if (!selectedCompany) return;

        const loadBranches = async () => {
            setIsFetchingBranches(true);
            try {
                const data = await masterDataService.getBranchesByCompany(selectedCompany.name);
                setBranches(data);
            } catch (error) {
                console.error("Erro ao carregar filiais:", error);
            } finally {
                setIsFetchingBranches(false);
            }
        };
        loadBranches();
    }, [formData.companyCnpj, companies]);

    const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPlate(e.target.value);
        setFormData({ ...formData, licensePlate: formatted });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // TODO: Ajustar ScheduleRequestDTO no backend para aceitar campos únicos
            // Por enquanto, enviamos o que temos
            await schedulingService.create({
                plate: formData.licensePlate,
                branchCode: formData.branchCode, // Precisaremos ajustar o DTO no backend
                grainType: formData.grainType,
                truckType: formData.truckType,
                companyCnpj: formData.companyCnpj,
                carrierCnpj: formData.carrierCnpj,
            } as any);

            navigate('/driver/active');
        } catch (error) {
            console.error("Erro ao realizar agendamento:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid =
        formData.companyCnpj &&
        formData.branchCode &&
        formData.licensePlate.length === 8 &&
        formData.truckType &&
        formData.grainType &&
        formData.carrierCnpj;

    const labelClass = "block text-sm font-semibold text-primary uppercase tracking-wide ml-1 mb-2";
    const selectClass = "w-full bg-forest text-slate-100 border border-emerald/50 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-slate-500 shadow-sm appearance-none cursor-pointer disabled:opacity-50";

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
                                    value={formData.companyCnpj}
                                    onChange={e => setFormData({ ...formData, companyCnpj: e.target.value })}
                                    disabled={isFetchingCompanies}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">
                                        {isFetchingCompanies ? "Carregando..." : "Selecione a empresa"}
                                    </option>
                                    {companies.map(c => (
                                        <option key={c.cnpj} value={c.cnpj} className="bg-forest text-slate-100">
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    {isFetchingCompanies ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} className="rotate-90" />}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className={labelClass}>Filial</label>
                            <div className="relative">
                                <select
                                    className={selectClass}
                                    value={formData.branchCode}
                                    onChange={e => setFormData({ ...formData, branchCode: e.target.value })}
                                    disabled={!formData.companyCnpj || isFetchingBranches}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">
                                        {isFetchingBranches ? "Carregando..." : formData.companyCnpj ? "Selecione a unidade" : "Selecione a empresa primeiro"}
                                    </option>
                                    {branches.map(b => (
                                        <option key={b.branchCode} value={b.branchCode} className="bg-forest text-slate-100">
                                            {b.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    {isFetchingBranches ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} className="rotate-90" />}
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
                                        <option key={t.code} value={t.code} className="bg-forest text-slate-100">
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
                                        <option key={g.code} value={g.code} className="bg-forest text-slate-100">
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
                                    value={formData.carrierCnpj}
                                    onChange={e => setFormData({ ...formData, carrierCnpj: e.target.value })}
                                    disabled={isFetchingCarriers}
                                >
                                    <option value="" disabled className="bg-forest text-slate-100 italic">
                                        {isFetchingCarriers ? "Carregando..." : "Selecione a empresa"}
                                    </option>
                                    {carriers.map(c => (
                                        <option key={c.cnpj} value={c.cnpj} className="bg-forest text-slate-100">
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-primary/50">
                                    {isFetchingCarriers ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} className="rotate-90" />}
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
