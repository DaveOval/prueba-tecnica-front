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
};