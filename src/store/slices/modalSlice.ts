import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: (() => void) | null;
}

const initialState: ModalState = {
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ title: string; message: string; onConfirm: () => void }>) => {
            state.isOpen = true;
            state.title = action.payload.title;
            state.message = action.payload.message;
            state.onConfirm = action.payload.onConfirm;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.title = '';
            state.message = '';
            state.onConfirm = null;
        }
    },
})

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer; 