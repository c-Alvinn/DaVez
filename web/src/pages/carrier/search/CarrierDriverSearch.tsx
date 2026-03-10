import { useState } from 'react';
import {
    Search,
    User,
    Phone,
    Fingerprint,
    X,
} from 'lucide-react';

type SearchType = 'cpf' | 'phone';

interface DriverData {
    name: string;
    cpf: string;
    phone: string;
}

export default function CarrierDriverSearch() {
    const [searchType, setSearchType] = useState<SearchType>('cpf');
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<DriverData | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query) return;

        setIsLoading(true);
        setHasSearched(true);

        // Simulando delay de busca
        setTimeout(() => {
            // Mock de sucesso se o valor for preenchido
            if (query.length > 5) {
                setResult({
                    name: "João da Silva Sauro",
                    cpf: "123.456.789-00",
                    phone: "(45) 99988-7766"
                });
            } else {
                setResult(null);
            }
            setIsLoading(false);
        }, 800);
    };

    const clearSearch = () => {
        setQuery('');
        setResult(null);
        setHasSearched(false);
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-black text-white tracking-tight">Buscar Motorista</h2>
                <p className="text-slate-400 font-medium">Localize informações rápidas de motoristas cadastrados na plataforma.</p>
            </div>

            {/* Search Box */}
            <div className="max-w-3xl mx-auto w-full mb-12">
                <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-xl">
                    <form onSubmit={handleSearch} className="space-y-8">
                        {/* Radio Selection */}
                        <div className="flex justify-center gap-4">
                            {(['cpf', 'phone'] as const).map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => {
                                        setSearchType(type);
                                    }}
                                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border cursor-pointer ${searchType === type
                                        ? 'bg-primary border-primary text-background-dark shadow-lg shadow-primary/20'
                                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {type === 'cpf' ? <Fingerprint size={18} /> : <Phone size={18} />}
                                    {type === 'cpf' ? 'CPF' : 'Telefone'}
                                </button>
                            ))}
                        </div>

                        {/* Input Group */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-6 flex items-center text-slate-500 group-focus-within:text-primary transition-colors">
                                {searchType === 'cpf' ? <Fingerprint size={22} /> : <Phone size={22} />}
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={searchType === 'cpf' ? "000.000.000-00" : "(00) 00000-0000"}
                                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-5 pl-16 pr-20 text-white font-bold placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-6 flex items-center text-slate-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !query}
                            className="w-full bg-primary text-background-dark py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group shadow-[0_10px_30px_rgba(19,236,109,0.2)]"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Search size={22} className="group-hover:scale-110 transition-transform" />
                                    Buscar Motorista
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Result Area */}
            <div className="max-w-3xl mx-auto w-full">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="w-20 h-20 border-8 border-white/5 border-t-primary rounded-full animate-spin shadow-lg"></div>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Pesquisando no Banco DaVez...</p>
                    </div>
                ) : result ? (
                    <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-10 rounded-[3rem] animate-in zoom-in-95 duration-500 relative overflow-hidden group">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                            <div className="space-y-6 flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                                        <User size={32} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Motorista Encontrado</p>
                                        <h3 className="text-3xl font-black text-white tracking-tight italic">{result.name}</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">CPF</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Fingerprint size={16} className="text-primary" />
                                            {result.cpf}
                                        </p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Contato</p>
                                        <p className="text-lg font-bold text-white flex items-center gap-2">
                                            <Phone size={16} className="text-primary" />
                                            {result.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : hasSearched && (
                    <div className="bg-red-500/5 border border-red-500/10 p-12 rounded-[2.5rem] flex flex-col items-center text-center animate-in shake duration-500">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-400 mb-6">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-red-100 mb-2">Motorista não localizado</h3>
                        <p className="text-red-400/60 max-w-xs font-medium italic">
                            Não encontramos nenhum cadastro com este {searchType === 'cpf' ? 'CPF' : 'telefone'}. Verifique os números e tente novamente.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
