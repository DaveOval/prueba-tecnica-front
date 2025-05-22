'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { imageService } from '@/api/services/images';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';
import Image from 'next/image';

const Editor = () => {
    const searchParams = useSearchParams();
    const imageId = searchParams.get('imageId');
    const [imageData, setImageData] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchImage = async () => {
            if (!imageId) return;
            
            try {
                const response = await imageService.getImage(imageId);
                if (response.image_data) {
                    setImageData(response.image_data);
                } else {
                    setError('Invalid response format from server');
                }
            } catch (err) {
                const error = err as AxiosError;
                console.error('Error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status
                });
                setError((error.response?.data as { detail: string })?.detail || 'Error loading image');
            }
        };

        fetchImage();
    }, [imageId, user]);

    if (!imageId) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 ">
                <p className="text-white">No image selected</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex flex-col items-center justify-center min-h-[calc(100vh - 64px)] p-4 ]">
                <p className="text-white">{error}</p>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center justify-start min-h-[calc(100vh-64px)] p-4 w-full">
            <div className="flex flex-col w-full max-w-6xl gap-4 flex-grow h-full">
                {/* Image Section */}
                <div className="flex justify-center items-start relative h-[calc(100vh-212px)]">
                    {imageData ? (
                        <Image 
                            src={imageData} 
                            alt="Uploaded image" 
                            width={0}
                            height={0}
                            sizes="90vw"
                            className="w-auto h-full object-contain"
                        />
                    ) : (
                        <p className="text-white">Loading image...</p>
                    )}
                </div>

                {/* Filter Panel */}
                <div className="flex-shrink-0 w-full bg-[#27272A] rounded-lg p-4 h-[100px]">
                    <h2 className="text-white text-xl mb-4">Filters</h2>
                    {/* Filter controls */}
                    <p className="text-gray-400">Filtros xd</p>
                </div>
            </div>
        </main>
    );
};

export default Editor;