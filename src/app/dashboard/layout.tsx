'use client';

import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';
import Modal from "@/components/ui/Modal"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex min-h-screen w-full justify-center overflow-hidden">
            {/* Sidebar */}
            <Sidebar />
            <section className="flex flex-col w-full h-full">
                {/* Header */}
                <Header />
                {/* Main */}
                {children}
            </section>
            {/* Modal */}
            <Modal />
        </main>
    )
}