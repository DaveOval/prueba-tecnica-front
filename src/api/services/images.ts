import apiClient from '../client';

interface ImageResponse {
    message: string;
    image_id: string;
}

interface getImageResponse {
    image_data: string;
    filename: string;
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
    }
};