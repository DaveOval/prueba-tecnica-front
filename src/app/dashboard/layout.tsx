import type {  ReactNode } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="flex min-h-screen w-full justify-center overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            <section className="flex flex-col w-full h-full">
                {/* Header */}
                <Header />
                {/* Main */}
            { children }
            </section>
        </main>
    )
}

export default DashboardLayout;