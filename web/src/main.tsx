import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('Iniciando aplicação React...');
try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Elemento root não encontrado');

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error('Erro fatal na inicialização da aplicação:', error);
}
