import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, CheckCircle, Truck, Package } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useAuth } from '../../context/useAuth';

const STEPS = [
    { id: 1, title: 'Carga', icon: Package },
    { id: 2, title: 'Veículo', icon: Truck },
    { id: 3, title: 'Confirmação', icon: CheckCircle },
];

export default function NewSchedule() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        operationType: '',
        grainType: '',
        companyId: '',
        branchId: '',
        licensePlate: '',
        truckType: '',
        carrierId: '',
        driverCpf: user?.role === 'DRIVER' ? '' : '',
    });

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(c => c + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(c => c - 1);
        else navigate('/driver');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Enviando agendamento:', formData);
        // TODO: Integração com API
        alert('Agendamento realizado com sucesso! (Simulação)');
        navigate('/driver');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Simplificado */}
            <header className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
                <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Novo Agendamento</h1>
            </header>

            <main className="flex-1 p-4 max-w-lg mx-auto w-full">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 px-4">
                    {STEPS.map((step) => {
                        const Icon = step.icon;
                        const isActive = step.id === currentStep;
                        const isCompleted = step.id < currentStep;

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 relative z-0">
                                <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center transition-all
                            ${isActive ? 'bg-blue-600 text-white shadow-lg scale-110' :
                                        isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                        `}>
                                    <Icon size={18} />
                                </div>
                                <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        )
                    })}
                    {/* Linha de progresso (visual simplified) */}
                    <div className="absolute left-0 right-0 top-20 h-0.5 bg-gray-200 -z-10 hidden md:block" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">

                    {/* STEP 1: Carga */}
                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-700 block">Tipo de Operação</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, operationType: 'LOADING' })}
                                        className={`p-4 rounded-lg border-2 text-center transition-all ${formData.operationType === 'LOADING'
                                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                                            : 'border-gray-100 hover:border-blue-200 text-gray-600'
                                            }`}
                                    >
                                        Carregamento
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, operationType: 'UNLOADING' })}
                                        className={`p-4 rounded-lg border-2 text-center transition-all ${formData.operationType === 'UNLOADING'
                                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                                            : 'border-gray-100 hover:border-blue-200 text-gray-600'
                                            }`}
                                    >
                                        Descarregamento
                                    </button>
                                </div>
                            </div>

                            <Select
                                label="Empresa / Filial"
                                value={formData.branchId}
                                onChange={e => setFormData({ ...formData, branchId: e.target.value })}
                                options={[
                                    { label: 'AgroSul - Filial Matriz', value: '1' },
                                    { label: 'AgroSul - Porto', value: '2' },
                                ]} // Mock
                            />

                            <Select
                                label="Tipo de Grão"
                                value={formData.grainType}
                                onChange={e => setFormData({ ...formData, grainType: e.target.value })}
                                options={[
                                    { label: 'Soja', value: 'SOJA' },
                                    { label: 'Milho', value: 'MILHO' },
                                    { label: 'Trigo', value: 'TRIGO' },
                                ]} // Mock
                            />
                        </div>
                    )}

                    {/* STEP 2: Veículo */}
                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <Input
                                label="Placa do Veículo"
                                placeholder="ABC-1234"
                                value={formData.licensePlate}
                                onChange={e => setFormData({ ...formData, licensePlate: e.target.value.toUpperCase() })}
                                maxLength={8}
                            />

                            <Select
                                label="Tipo de Caminhão"
                                value={formData.truckType}
                                onChange={e => setFormData({ ...formData, truckType: e.target.value })}
                                options={[
                                    { label: 'Truck', value: 'TRUCK' },
                                    { label: 'Bitrem', value: 'BITREN' },
                                    { label: 'Rodotrem', value: 'RODOTREM' },
                                    { label: 'Carreta LS', value: 'CARRETA_LS' },
                                ]}
                            />

                            <Select
                                label="Transportadora"
                                value={formData.carrierId}
                                onChange={e => setFormData({ ...formData, carrierId: e.target.value })}
                                options={[
                                    { label: 'TransLogística A', value: '10' },
                                    { label: 'Rápido Grãos', value: '11' },
                                    { label: 'Autônomo', value: '0' },
                                ]}
                            />
                        </div>
                    )}

                    {/* STEP 3: Confirmação */}
                    {currentStep === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 text-center">
                            <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3">
                                <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2">Resumo do Agendamento</h3>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Operação</span>
                                    <span className="font-medium text-gray-900">{formData.operationType === 'LOADING' ? 'Carregamento' : 'Descarregamento'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Grão</span>
                                    <span className="font-medium text-gray-900">{formData.grainType}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Placa</span>
                                    <span className="font-medium text-gray-900">{formData.licensePlate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Veículo</span>
                                    <span className="font-medium text-gray-900">{formData.truckType}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500">
                                Ao confirmar, você entrará na fila virtual da filial selecionada.
                            </p>
                        </div>
                    )}

                    {/* Footer Buttons */}
                    <div className="pt-4 flex gap-3">
                        {currentStep < 3 ? (
                            <Button type="button" onClick={handleNext} className="w-full" disabled={
                                (currentStep === 1 && (!formData.operationType || !formData.branchId || !formData.grainType)) ||
                                (currentStep === 2 && (!formData.licensePlate || !formData.truckType || !formData.carrierId))
                            }>
                                Continuar <ChevronRight size={16} className="ml-2" />
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                                Confirmar Agendamento <CheckCircle size={16} className="ml-2" />
                            </Button>
                        )}
                    </div>
                </form>
            </main>
        </div>
    );
}
