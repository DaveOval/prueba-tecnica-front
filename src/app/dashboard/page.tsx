'use client'

import DropZone from "@/components/ui/DropZone";

const DashboardHome = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 ">
        <div className="w-[calc(w-full - 20%)] max-w-3xl">
            <DropZone />
        </div>
    </main>
  )
}

export default DashboardHome;


