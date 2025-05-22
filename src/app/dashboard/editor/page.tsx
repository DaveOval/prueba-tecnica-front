'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { imageService } from '@/api/services/images';
import { useAuth } from '@/hooks/useAuth';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { toast } from 'sonner';

const filters = [
    {
        name: 'Grayscale',
        description: 'Apply a grayscale filter to the image.',
        value: 'grayscale',
        img: '/grayscale.webp',
    },
    {
        name: 'Blur',
        description: 'Apply a blur effect to the image.',
        value: 'blur',
        img: '/blur.webp',
    },
    {
        name: 'Thumbnail',
        description: 'Create a thumbnail version of the image.',
        value: 'thumbnail',
        img: '/thumbnail.webp',
    },
    {
        name: 'Sepia',
        description: 'Apply a sepia tone to the image.',
        value: 'sepia',
        img: '/sepia.webp',
    },
    {
        name: 'Invert',
        description: 'Invert the colors of the image.',
        value: 'invert',
        img: '/invert.webp',
    },
    {
        name: 'Brightness',
        description: 'Adjust the brightness of the image.',
        value: 'brightness',
        img: '/brightness.webp',
    },

]

const Editor = () => {
    const searchParams = useSearchParams();
    const imageId = searchParams.get('imageId');
    const [imageData, setImageData] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
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


    const handleApplyFilter = async () => {
        const filter = selectedFilter;
        if (!filter) {
            toast.error('Please select a filter to apply');
            return;
        }
        try {
            const response = await imageService.applyFilter(imageId!, filter);
            if (response.message) {
                toast.success(response.message);
            } else {
                setError('Invalid response format from server');
            }
        } catch (err) {
            const error = err as Error;
            console.error('Error details:', error);
            toast.error(error.message || 'Error applying filter');
        }
    }

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
                <div 
                    style={{
                        flexShrink: 0,
                        width: '100%',
                        backgroundColor: '#27272A',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '1rem',
                        overflowX: 'auto',
                    }}
                >
                    <button
                        type="button"
                        style={{
                            backgroundColor: '#3B82F6', 
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            border: 'none',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            marginRight: '8px',
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleApplyFilter();
                        }}
                    >
                        Apply Filter
                    </button>
                    
                    {/* Filter cards */}
                    <div style={{ display: 'flex', gap: '1rem', overflow: 'hidden' }}>
                        {filters.map(filter => (
                            <div
                                key={filter.value}
                                style={{
                                    flexShrink: 0,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center', 
                                    padding: '0.5rem', 
                                    borderRadius: '0.5rem', 
                                    borderWidth: '2px', 
                                    borderStyle: 'solid',
                                    cursor: 'pointer',
                                    width: '100px', 
                                    height: '100px', 
                                    borderColor: selectedFilter === filter.value ? '#3b82f6' : 'transparent', 
                                    backgroundColor: hoveredFilter === filter.value ? '#19191B' : selectedFilter === filter.value ? 'rgba(25, 25, 27, 0.8)' : '#19191B', 
                                    backgroundImage: hoveredFilter === filter.value ? 'none' : `url(${filter.img})`, 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center', 
                                    backgroundRepeat: 'no-repeat', 
                                    position: 'relative', 
                                    overflow: 'hidden', 
                                    transition: 'background-color 0.3s ease, background-image 0.3s ease', 
                                    boxSizing: 'border-box', 
                                    backgroundClip: 'padding-box', 
                                }}
                                onClick={() => setSelectedFilter(filter.value)}
                                onMouseEnter={() => setHoveredFilter(filter.value)}
                                onMouseLeave={() => setHoveredFilter(null)}
                                title={filter.description} 
                            >
                                {/* Text overlaid on background image */}
                                {hoveredFilter !== filter.value && (
                                    <p style={{ color: '#ededee', fontSize: '0.75rem', textAlign: 'center', zIndex: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>{filter.name}</p>
                                )}
                                {hoveredFilter === filter.value && (
                                    <p style={{ color: '#9ca3af', fontSize: '0.65rem', textAlign: 'center', zIndex: 1, textShadow: '1px 1px 2px rgba(0,0,0,0.5)', padding: '0.5rem' }}>{filter.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Editor;