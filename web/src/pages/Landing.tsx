import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
            <h1 className="text-4xl font-bold mb-12 text-blue-900">DaVez Logística</h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl w-full px-4">
                <Link to="/login?role=driver" className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all text-center flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" /><path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="2" /></svg>
                    </div>
                    <h2 className="text-xl font-semibold">Sou Motorista</h2>
                    <p className="text-sm text-gray-500">Agende sua carga e acompanhe a fila pelo celular.</p>
                </Link>
                <Link to="/login?role=carrier" className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all text-center flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3" /><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" /><path d="M14 17h1" /><circle cx="7.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>
                    </div>
                    <h2 className="text-xl font-semibold">Transportadora</h2>
                    <p className="text-sm text-gray-500">Gerencie sua frota e agendamentos.</p>
                </Link>
                <Link to="/login?role=internal" className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all text-center flex flex-col items-center gap-4 group">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                    </div>
                    <h2 className="text-xl font-semibold">Acesso Interno</h2>
                    <p className="text-sm text-gray-500">Operadores, Portaria e Administrativo.</p>
                </Link>
            </div>
        </div>
    );
}
