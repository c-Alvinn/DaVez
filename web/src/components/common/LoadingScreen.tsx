
/**
 * Componente de tela cheia que mimetiza o pre-loader premium.
 * Ideal para transições de rotas ou carregamentos iniciais de módulos.
 */
export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background-dark animate-in fade-in duration-500">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-radial-forest opacity-50"></div>

            <div className="relative flex flex-col items-center justify-center z-10">
                <div className="relative flex justify-center items-center mb-16">
                    {/* Ring */}
                    <div className="absolute w-[120px] h-[120px] rounded-full border-4 border-primary/10 border-top-primary animate-spin-slow"></div>

                    {/* Logo Pulsante */}
                    <div className="w-16 h-16 bg-[url('/logo-davez.png')] bg-cover bg-center rounded-xl shadow-[0_0_20px_rgba(19,236,109,0.3)] animate-pulse"></div>
                </div>

                <div className="text-3xl font-black text-white tracking-tighter uppercase animate-in slide-in-from-bottom-2 duration-700 delay-300">
                    Da<span className="text-primary">Vez</span>
                </div>
            </div>
        </div>
    );
}

// Add CSS animation to global styles if not already present
// In a real project, these would be in a CSS file, but for the sake of the component:
export const loadingStyles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}
`;
