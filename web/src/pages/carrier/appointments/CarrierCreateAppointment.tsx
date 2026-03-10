import { useState } from 'react';
import {
    User,
    Truck,
    MapPin,
    ClipboardCheck,
    Package,
    Building2,
    Search,
    CheckCircle2,
    XCircle,
    Loader2,
    ArrowRight,
    Briefcase
} from 'lucide-react';
import { Spinner } from '../../../components/common/Spinner';
import { formatCPF, formatPlate } from '../../../utils/masks';

interface FormState {
    driverCpf: string;
    enterprise: string;
    branchId: string;
    truckPlate: string;
    truckType: string;
    grainType: string;
    company: string;
}

const INITIAL_STATE: FormState = {
    driverCpf: '',
    enterprise: '',
    branchId: '',
    truckPlate: '',
    truckType: '',
    grainType: '',
    company: ''
};

const CARRIERS = [
    { label: 'Autônomo', value: 'AUTONOMO' },
    { label: 'TransLogística Brasil', value: 'TRANS_LOG' },
    { label: 'Expresso Grãos', value: 'EXPRESSO_GRAO' },
    { label: 'Rápido Rodoviário', value: 'RAPIDO_RODO' },
    { label: 'Transportes União', value: 'TRANS_UNIAO' },
];

export default function CarrierCreateAppointment() {
    const [form, setForm] = useState<FormState>(INITIAL_STATE);
    const [isCheckingCpf, setIsCheckingCpf] = useState(false);
    const [cpfStatus, setCpfStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [driverName, setDriverName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCPF(e.target.value);
        setForm({ ...form, driverCpf: formatted });
    };

    const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPlate(e.target.value);
        setForm({ ...form, truckPlate: formatted });
    };

    const handleCheckCpf = () => {
        if (!form.driverCpf) return;
        setIsCheckingCpf(true);
        setCpfStatus('idle');

        // Simulando verificação de CPF
        setTimeout(() => {
            const numericCpf = form.driverCpf.replace(/\D/g, '');
            if (numericCpf.length === 11) {
                setCpfStatus('valid');
                setDriverName("João da Silva Sauro");
            } else {
                setCpfStatus('invalid');
                setDriverName("");
            }
            setIsCheckingCpf(false);
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulando criação de agendamento
        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            setForm(INITIAL_STATE);
            setCpfStatus('idle');
            setDriverName("");

            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const isFormValid =
        form.driverCpf &&
        form.enterprise &&
        form.branchId &&
        form.truckPlate.length >= 8 &&
        form.truckType &&
        form.grainType &&
        form.company &&
        cpfStatus === 'valid';

    const selectClass = "w-full bg-[#1A3C34] text-slate-100 border border-emerald/50 rounded-xl px-4 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none cursor-pointer pr-12 font-bold";
    const labelClass = "text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2";

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Page Header */}
            <div className="mb-10 text-center">
                <h2 className="text-3xl font-black text-white tracking-tight">Novo Agendamento</h2>
                <p className="text-slate-400 font-medium">Cadastre manualmente uma nova ordem de embarque ou desembarque.</p>
            </div>

            <div className="max-w-4xl w-full mx-auto">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Driver Verification Section */}
                    <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />

                        <div className="flex flex-col md:flex-row gap-6 items-end">
                            <div className="flex-1 space-y-2">
                                <label className={labelClass}>
                                    <User size={12} className="text-primary" />
                                    CPF do Motorista
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="000.000.000-00"
                                        value={form.driverCpf}
                                        onChange={handleCpfChange}
                                        className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-white font-bold focus:outline-none focus:border-primary/50 transition-all font-mono"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCheckCpf}
                                        disabled={isCheckingCpf || !form.driverCpf}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-primary text-background-dark hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                                    >
                                        {isCheckingCpf ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className={`flex-[1.5] p-4 rounded-2xl border transition-all duration-500 flex items-center gap-4 ${cpfStatus === 'valid' ? 'bg-primary/10 border-primary/20' :
                                cpfStatus === 'invalid' ? 'bg-red-500/10 border-red-500/20' :
                                    'bg-white/5 border-white/5'
                                }`}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cpfStatus === 'valid' ? 'bg-primary/20 text-primary' :
                                    cpfStatus === 'invalid' ? 'bg-red-500/20 text-red-500' :
                                        'bg-white/10 text-slate-500'
                                    }`}>
                                    {cpfStatus === 'valid' ? <CheckCircle2 size={24} /> :
                                        cpfStatus === 'invalid' ? <XCircle size={24} /> :
                                            <User size={24} />}
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status do Motorista</p>
                                    <p className={`font-bold ${cpfStatus === 'valid' ? 'text-white' : 'text-slate-400'}`}>
                                        {cpfStatus === 'valid' ? driverName :
                                            cpfStatus === 'invalid' ? "Motorista não encontrado" :
                                                "Aguardando verificação..."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Empresa */}
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2 md:col-span-1">
                            <label className={labelClass}>
                                <Briefcase size={12} className="text-primary" />
                                Empresa
                            </label>
                            <div className="relative">
                                <select
                                    value={form.enterprise}
                                    onChange={e => setForm({ ...form, enterprise: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione a Empresa</option>
                                    <option value="1" className="bg-[#1A3C34] text-slate-100">DaVez Agro</option>
                                    <option value="2" className="bg-[#1A3C34] text-slate-100">Agro Export</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Filiais */}
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2">
                            <label className={labelClass}>
                                <Building2 size={12} className="text-primary" />
                                Filial de Operação
                            </label>
                            <div className="relative">
                                <select
                                    value={form.branchId}
                                    onChange={e => setForm({ ...form, branchId: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione a Filial</option>
                                    <option value="1" className="bg-[#1A3C34] text-slate-100">Filial Cascavel - PR</option>
                                    <option value="2" className="bg-[#1A3C34] text-slate-100">Filial Paranaguá - PR</option>
                                    <option value="3" className="bg-[#1A3C34] text-slate-100">Filial Cuiabá - MT</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Placa */}
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2">
                            <label className={labelClass}>
                                <Truck size={12} className="text-primary" />
                                Placa do Veículo
                            </label>
                            <input
                                type="text"
                                placeholder="ABC-1234"
                                value={form.truckPlate}
                                onChange={handlePlateChange}
                                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 px-4 text-white font-bold focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700 uppercase font-mono"
                                maxLength={8}
                            />
                        </div>

                        {/* Tipo do Caminhão */}
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2">
                            <label className={labelClass}>
                                <ClipboardCheck size={12} className="text-primary" />
                                Tipo de Veículo
                            </label>
                            <div className="relative">
                                <select
                                    value={form.truckType}
                                    onChange={e => setForm({ ...form, truckType: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione o Tipo</option>
                                    <option value="bitrem" className="bg-[#1A3C34] text-slate-100">Bitrem</option>
                                    <option value="rodotrem" className="bg-[#1A3C34] text-slate-100">Rodotrem</option>
                                    <option value="vanderleia" className="bg-[#1A3C34] text-slate-100">Vanderleia</option>
                                    <option value="toco" className="bg-[#1A3C34] text-slate-100">Toco / Truck</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Grão */}
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2 md:col-span-1">
                            <label className={labelClass}>
                                <Package size={12} className="text-primary" />
                                Tipo de Carga (Grão)
                            </label>
                            <div className="relative">
                                <select
                                    value={form.grainType}
                                    onChange={e => setForm({ ...form, grainType: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione o Grão</option>
                                    <option value="soja" className="bg-[#1A3C34] text-slate-100">Soja</option>
                                    <option value="milho" className="bg-[#1A3C34] text-slate-100">Milho</option>
                                    <option value="trigo" className="bg-[#1A3C34] text-slate-100">Trigo</option>
                                    <option value="farelo" className="bg-[#1A3C34] text-slate-100">Farelo</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Transportadora */}
                        <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] space-y-2 md:col-span-1">
                            <label className={labelClass}>
                                <MapPin size={12} className="text-primary" />
                                Transportadora
                            </label>
                            <div className="relative">
                                <select
                                    value={form.company}
                                    onChange={e => setForm({ ...form, company: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled className="bg-[#1A3C34] text-slate-400 italic font-normal">Selecione a Transportadora</option>
                                    {CARRIERS.map(carrier => (
                                        <option key={carrier.value} value={carrier.value} className="bg-[#1A3C34] text-slate-100">
                                            {carrier.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50">
                                    <ArrowRight size={18} className="rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className="w-full md:w-auto px-12 py-5 bg-primary text-background-dark rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-[0_10px_30px_rgba(19,236,109,0.2)] mx-auto cursor-pointer"
                        >
                            {isSubmitting ? <Spinner size="sm" color="dark" /> : (
                                <>
                                    <ClipboardCheck size={20} />
                                    Finalizar Agendamento
                                </>
                            )}
                        </button>

                        {showSuccess && (
                            <div className="flex items-center gap-3 text-primary animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <CheckCircle2 size={24} />
                                <span className="font-bold">Agendamento realizado com sucesso!</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
