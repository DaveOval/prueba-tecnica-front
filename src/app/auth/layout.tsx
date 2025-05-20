import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return(
        <main className="flex h-screen w-screen items-center justify-center bg-gray-100">
            { children }
        </main>
    )
}

export default AuthLayout;
