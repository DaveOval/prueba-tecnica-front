import apiClient from '../client';

interface ImageResponse {
    message: string;
    image_id: string;
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
    }
};