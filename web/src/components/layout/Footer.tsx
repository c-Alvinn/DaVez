import Logo from '../common/Logo';
import Button from '../common/Button';

export default function Footer() {
    return (
        <footer className="bg-forest pt-20 pb-10 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <Logo size="sm" className="mb-6" />
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Líder em inovação logística para o agronegócio brasileiro. Eficiência, transparência e tecnologia.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-slate-400" href="#">
                                <span className="material-icons text-xl">facebook</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-slate-400" href="#">
                                <span className="material-icons text-xl">share</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all text-slate-400" href="#">
                                <span className="material-icons text-xl">language</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Navegação</h4>
                        <ul className="space-y-4 list-none p-0">
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#inicio">Início</a></li>
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#sobre">Sobre Nós</a></li>
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#servicos">Serviços</a></li>
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#seguranca">Segurança</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1">
                        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Suporte</h4>
                        <ul className="space-y-4 list-none p-0">
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#ajuda">Central de Ajuda</a></li>
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#contato">Contato</a></li>
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#privacidade">Privacidade</a></li>
                            <li><a className="text-slate-400 hover:text-primary transition-colors no-underline" href="#faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="col-span-1 lg:col-span-1">
                        <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">Newsletter</h4>
                        <p className="text-slate-400 mb-4 text-sm">Receba as últimas novidades da logística agro.</p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <input
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Seu e-mail"
                                type="email"
                            />
                            <Button type="submit" variant="footer">Inscrever-se</Button>
                        </form>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>© 2024 DaVez Logística Inteligente. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <a className="hover:text-white transition-colors no-underline" href="#">Termos de Uso</a>
                        <a className="hover:text-white transition-colors no-underline" href="#">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
