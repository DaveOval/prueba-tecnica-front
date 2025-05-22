'use client';

import { useSearchParams } from 'next/navigation';

const Editor = () => {
    const searchParams = useSearchParams();
    const imageId = searchParams.get('imageId');

    return (
        <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-[#19191B]">
            {imageId ? (
                <div className="w-full max-w-4xl">
                    {/* Aquí puedes usar el imageId para obtener la imagen del backend */}
                    <p className="text-white">Image ID: {imageId}</p>
                </div>
            ) : (
                <p className="text-white">No image selected</p>
            )}
        </main>
    );
};

export default Editor;