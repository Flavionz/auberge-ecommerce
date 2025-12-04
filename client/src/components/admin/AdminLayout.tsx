import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        // Contenitore principale: flex per layout Sidebar + Contenuto
        <div className="flex min-h-screen bg-gray-100">

            {/* 1. Sidebar (Componente importato - w-64 gestito internamente) */}
            <AdminSidebar />

            {/* 2. Contenitore per Header e Contenuto della Pagina */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Intestazione del pannello (Header) */}
                <header className="flex items-center justify-between p-4 bg-darkAccent text-white border-b border-gray-800 shadow-lg">
                    <h1 className="text-xl font-serif text-white">Pannello Amministrazione</h1>
                    {/* Qui andranno elementi come notifiche o avatar utente */}
                    <div className="text-sm text-gray-400">Utente Admin Loggato</div>
                </header>

                {/* Contenuto Dinamico della Pagina. Sfondo bianco per il contenuto. */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};