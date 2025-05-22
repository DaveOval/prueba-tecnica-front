import apiClient from '../client';
import { AxiosError } from 'axios';

interface ImageResponse {
    message: string;
    image_id: string;
}

interface getImageResponse {
    image_data: string;
    filename: string;
    message?: string;
}

export interface ImageInterface {
    id: string;
    filename: string;
    original_path: string;
    processed_path: string;
    processed_filename: string | null;
    filter_name: string | null;  
    filter_value?: string;
    uploaded_at?: string;
    is_processed?: boolean;
    image_data?: string;
}

interface OriginalImagesResponse {
    images: ImageInterface[];
}

export const imageService = {
    uploadImage: async (file: File): Promise<ImageResponse> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await apiClient.post<ImageResponse>('/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getImage: async (imageId: string): Promise<getImageResponse> => {
        const response = await apiClient.get<getImageResponse>(`/images/${imageId}/serve`);
        return response.data;
    },

    applyFilter: async (imageId: string, filter: string): Promise<getImageResponse> => {
        try {
            const response = await apiClient.post<getImageResponse>(`/images/${imageId}/process`, {
                filter_name: filter,
            });
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response?.status === 422) {
                throw new Error('Invalid filter type. Please select a valid filter.');
            }
            throw error;
        }
    },

    getOriginalImages: async (): Promise<OriginalImagesResponse> => {
        const response = await apiClient.get<OriginalImagesResponse>('/images/original');
        return response.data;
    },

    getProcessedImages: async (): Promise<OriginalImagesResponse> => {
        const response = await apiClient.get<OriginalImagesResponse>('/images/processed');
        return response.data;
    }
};