'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { toast } from 'sonner';
import { imageService } from '@/api/services/images';
import { useRouter } from 'next/navigation';

interface ApiError {
    response?: {
        data?: {
            detail: string;
        }
    }
}

export default function DropZone() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            
            // Create preview URL
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);
        }
    }, []);

    const handleUpload = async () => {
        if (!file) return;

        try {
            setIsUploading(true);
            const response = await imageService.uploadImage(file);
            toast.success(response.message);
            // Redirect to editor page with image ID
            router.push(`/dashboard/editor?imageId=${response.image_id}`);
        } catch (error) {
            const apiError = error as ApiError;
            toast.error(apiError.response?.data?.detail || 'Error al subir la imagen');
        } finally {
            setIsUploading(false);
        }
    };

    const { 
        getRootProps, 
        getInputProps, 
        isDragActive 
    } = useDropzone({ 
        onDrop,
        maxFiles: 1,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg']
        }
    });

    // Styles 
    const baseStyle: React.CSSProperties = {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: isDragActive ? '#5472E4' : '#27272A',
        backgroundColor: isDragActive ? '#1E1E1E' : '#19191B',
        padding: '2.5rem',
        borderRadius: '0.5rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
        color: '#ededee',
        position: 'relative',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }

    const textStyle: React.CSSProperties = {
        color: isDragActive ? '#5472E4' : '#ededee',
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '1rem',
    };

    const previewStyle: React.CSSProperties = {
        width: '100%',
        maxWidth: '300px',
        height: '200px',
        objectFit: 'contain',
        marginTop: '1rem',
    };

    const fileInfoStyle: React.CSSProperties = {
        marginTop: '1rem',
        fontSize: '14px',
        color: '#ededee',
        backgroundColor: '#27272A',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    };

    const buttonStyle: React.CSSProperties = {
        backgroundColor: '#5472E4',
        color: '#ededee',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'all 0.3s ease',
        opacity: isUploading ? 0.7 : 1,
        pointerEvents: isUploading ? 'none' : 'auto',
    };

    return (
        <div
            {...getRootProps()}
            style={baseStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <input {...getInputProps()} />
            <p style={textStyle}>
                {isDragActive ? 'Drop the image here...' : 'Drag and drop an image here, or click to select one'}
            </p>

            {!preview && (
                <DotLottieReact
                    src="https://lottie.host/326f91e9-3387-4e91-9d21-7c0cb27d1cd6/adpiAPPwfH.lottie"
                    autoplay
                />
            )}

            {preview && (
                <>
                    <div style={previewStyle}>
                        <Image
                            src={preview}
                            alt="Preview"
                            width={300}
                            height={200}
                            style={{ borderRadius: '0.5rem' }}
                        />
                    </div>
                    
                    {file && (
                        <div style={fileInfoStyle}>
                            <span>📄</span> {file.name}
                        </div>
                    )}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleUpload();
                        }}
                        style={buttonStyle}
                        disabled={isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </>
            )}
        </div>
    );
}