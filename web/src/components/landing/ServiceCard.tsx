interface ServiceCardProps {
    icon: string;
    title: string;
    description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
    return (
        <div className="group p-8 bg-forest/40 dark:bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 transition-all hover:bg-forest/60 hover:-translate-y-2">
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <span className="material-icons text-primary text-3xl">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
