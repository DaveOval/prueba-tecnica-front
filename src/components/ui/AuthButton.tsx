import { ButtonHTMLAttributes, forwardRef } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    loading?: boolean;
}

const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(({ children, loading, ...props }, ref) => {
    return (
        <button 
            style={{
                backgroundColor: '#5472E4',
                color: '#ededee',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                border: '1px solid #27272A',
                cursor: 'pointer',
            }}
            ref={ref} 
            disabled={loading}
            {...props}
        >
            {children}
        </button>
    );
});

AuthButton.displayName = 'AuthButton';

export default AuthButton;
