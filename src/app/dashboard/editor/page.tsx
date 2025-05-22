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
            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 ]">
                <p className="text-white">{error}</p>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center justify-start min-h-[calc(90vh-64px)] p-4  overflow-y-auto">
            <div className="flex w-full max-w-6xl gap-4">
                {/* Image Section */}
                <div className="flex-1 flex justify-center items-start relative">
                    {imageData ? (
                        <Image 
                            src={imageData} 
                            alt="Uploaded image" 
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-auto rounded-lg shadow-lg object-contain"
                        />
                    ) : (
                        <p className="text-white">Loading image...</p>
                    )}
                </div>

                {/* Filter Panel */}
                <div className="w-72 bg-[#27272A] rounded-lg p-4 flex-shrink-0">
                    <h2 className="text-white text-xl mb-4">Filters</h2>
                    {/* Filter controls */}
                    <p className="text-gray-400">.</p>
                </div>
            </div>
        </main>
    );
};

export default Editor;