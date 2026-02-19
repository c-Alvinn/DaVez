import { HelpCircle, Headphones } from 'lucide-react';

export default function DriverFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-auto py-8 px-6 text-center space-y-4 border-t border-slate-200 dark:border-white/5 bg-background-light dark:bg-background-dark/50">
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase">
                © {currentYear} DaVez Logistics • Versão 2.4.0
            </p>

            <div className="flex justify-center gap-8">
                <a
                    href="#"
                    className="text-emerald- agro dark:text-lime-agro text-sm font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity no-underline"
                >
                    <Headphones size={18} />
                    Suporte
                </a>
                <a
                    href="#"
                    className="text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center gap-1.5 hover:opacity-80 transition-opacity no-underline"
                >
                    <HelpCircle size={18} />
                    Ajuda
                </a>
            </div>
        </footer>
    );
}
