import ReactModal from 'react-modal';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { closeModal } from '@/store/slices/modalSlice';

const customStyles: ReactModal.Styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 9999
    },
    content: {
        backgroundColor: '#19191B',
        border: '1px solid #27272A',
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '500px',
        width: '90%',
        zIndex: 10000
    }
};

export default function Modal() {
    const dispatch = useDispatch();
    const { isOpen, title, message, onConfirm } = useSelector((state: RootState) => state.modal);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            ReactModal.setAppElement('main');
        }
    }, []);

    console.log('Modal render:', { isOpen, title });

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
        dispatch(closeModal());
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeModal())}
            style={customStyles}
            contentLabel={title}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
        >
            <div>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => dispatch(closeModal())}
                        style={{
                            backgroundColor: '#19191B',
                            color: '#ededee',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 1rem',
                            border: '1px solid #27272A',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        className="hover:bg-[#27272A]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        style={{
                            backgroundColor: '#5472E4',
                            color: '#ededee',
                            borderRadius: '0.5rem',
                            padding: '0.5rem 1rem',
                            border: '1px solid #27272A',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        className="hover:bg-[#4A63C7]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </ReactModal>
    );
} 