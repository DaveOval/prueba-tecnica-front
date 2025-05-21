'use client';
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import Image from "next/image"

export default function Sidebar() {

    const { isSidebarOpen } = useSelector((state: RootState) => state.ui);

    return(
        <aside 
            className="flex h-full min-h-screen flex-col items-center justify-between gap-4 overflow-y-auto  p-4 transition-all duration-300 py-4"
            style={{
                width: !isSidebarOpen ? '260px' : '50px',
            }}
        >
            <div className="flex flex-col items-center justify-center gap-4 w-full">
                <Link 
                    href="/dashboard"
                    style={{
                        width: '95%',
                        border: '1px solid #e0e0e081',
                        borderRadius: '15px',
                    }}
                    className="flex items-center justify-center"
                >
                    <Image
                        src="/logo.svg" 
                        alt="logo" 
                        width={80} 
                        height={80}
                    />
                </Link>
            </div>
        </aside>
    )
}

