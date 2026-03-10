import React from 'react';

interface CarrierLayoutProps {
    sidebar: React.ReactNode;
    children: React.ReactNode;
}

export function CarrierLayout({ sidebar, children }: CarrierLayoutProps) {
    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 font-display">
            {/* Dashboard Container (O "Quadrado" SPA) */}
            <div className="w-full max-w-[1440px] h-[90vh] bg-[#102218] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row relative">
                {sidebar}

                <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#102218]">
                    {/* Background Decorative Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                    {/* Content Wrapper */}
                    <div className="flex-1 flex flex-col p-8 md:p-12 z-10 overflow-y-auto custom-scrollbar">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
