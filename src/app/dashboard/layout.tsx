import type {  ReactNode } from 'react';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="flex min-h-screen w-full items-center justify-center overflow-hidden">
            { children }
        </main>
    )
}

export default DashboardLayout;