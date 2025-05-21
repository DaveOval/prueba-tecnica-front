'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log(acceptedFiles);

    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop,})


    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-400 p-8 rounded-md text-center cursor-pointer transition-all hover:border-blue-500"
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p className="text-blue-500">Suelta los archivos aquí...</p>
            ) : (
                <p>Arrastra y suelta archivos aquí, o haz clic para seleccionar</p>
            )}
        </div>
    )
}