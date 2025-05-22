/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { imageService } from '@/api/services/images';
import type { ImageInterface } from '@/api/services/images';
import { toast } from 'sonner';
import Link from 'next/link';

const FilteredImages = () => {
    const [images, setImages] = useState<ImageInterface[]>([]);
    const [loadingImages, setLoadingImages] = useState<boolean>(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoadingImages(true);
            try {
                const userImages = await imageService.getProcessedImages();
                
                setImages(userImages.images);

            } catch (err) {
                console.error('Error fetching images:', err);
                toast.error('Error loading images');
            } finally {
                setLoadingImages(false);
            }
        };

        fetchImages();
    }, []);

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        padding: '1rem',
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '1rem',
    };

    const gridContainerStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '6xl',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 8rem)',
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '1rem',
    };

    const noImagesStyle: React.CSSProperties = {
        color: '#9ca3af',
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: '#1f2937',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'box-shadow 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
    };

    const imageContainerStyle: React.CSSProperties = {
        width: '100%',
        height: '10rem',
        overflow: 'hidden',
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const contentStyle: React.CSSProperties = {
        padding: '1rem',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'white',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
        textOverflow: 'initial',
        overflow: 'visible',
        marginBottom: '0.5rem',
    };

    const dateStyle: React.CSSProperties = {
        color: '#9ca3af',
        fontSize: '0.875rem',
        marginBottom: '0.5rem',
    };

    const filterStyle: React.CSSProperties = {
        color: '#60a5fa',
        fontSize: '0.875rem',
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        transition: 'background-color 0.2s ease-in-out',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'block',
        flexGrow: 1,
        flexBasis: '0',
        minWidth: 'auto',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Filtered Images</h1>

            {loadingImages ? (
                <div style={noImagesStyle}>Loading images...</div>
            ) : images.length === 0 ? (
                <div style={noImagesStyle}>No filtered images available</div>
            ) : (
                <div style={gridContainerStyle}>
                    <div style={gridStyle}>
                        {images.map((image) => (
                            <div 
                                key={image.id} 
                                style={cardStyle}
                            >
                                <div style={imageContainerStyle}>
                                
                                    <img
                                        src={image.image_data!}
                                        alt={image.filename || 'Image'}
                                        style={imageStyle}
                                    />
                                </div>
                                <div style={contentStyle}>
                                    <div>
                                        <h2 style={titleStyle}>
                                            {image.filename || 'Untitled'}
                                        </h2>
                                        <p style={dateStyle}>
                                            {image.uploaded_at ? new Date(image.uploaded_at).toLocaleDateString() : 'No date'}
                                        </p>
                                        {image.filter_name && (
                                            <p style={filterStyle}>
                                                Filter: {image.filter_name}
                                                {image.filter_value && ` (${image.filter_value})`}
                                            </p>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                        <Link href={`/dashboard/editor?imageId=${image.id}`} style={buttonStyle}>
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilteredImages; 