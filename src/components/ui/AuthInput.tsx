import { InputHTMLAttributes, forwardRef, useState } from 'react';
import Image from 'next/image';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    isRequired?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(({ label, error, isRequired, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div 
            className="flex flex-col gap-2"
            style={{
                borderRadius: '0.5rem',
                padding: '0.5rem',
            }}
        >
            {label && (
                <label style={{ 
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#e5e5e5'
                }}>
                    {label} 
                    {isRequired && <span style={{ 
                        color: '#ef4444',
                        marginLeft: '0.25rem',
                        fontWeight: 'bold'
                    }}>*</span>}
                </label>
            )}
            <div className="relative">
                <input 
                    style={{
                        padding: '0.5rem',
                        borderRadius: '0.2rem',
                        border: '1px solid #ededee63',
                        marginTop: '0.5rem',
                        marginBottom: '0.5rem',
                        color: '#ededee',
                        width: '100%',
                    }}
                    className="container_color" 
                    ref={ref} 
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    { ...props } 
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            src={showPassword ? '/eye-close.svg' : '/eye.svg'}
                            alt={showPassword ? 'Hide password' : 'Show password'}
                            width={20}
                            height={20}
                        />
                    </button>
                )}
            </div>
            { error && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</span> }
        </div>
    );
});
    
AuthInput.displayName = 'AuthInput';

export default AuthInput;
