import { InputHTMLAttributes, forwardRef } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    isRequired?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(({ label, error, isRequired, ...props }, ref) => (
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
        <input 
            style={{
                padding: '0.5rem',
                borderRadius: '0.2rem',
                border: '1px solid #ededee63',
                marginTop: '0.5rem',
                marginBottom: '0.5rem',
                color: '#ededee',
            }}
            className="container_color" 
            ref={ref} 
            { ...props } 
        />
        { error && <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</span> }
    </div>
));
    
AuthInput.displayName = 'AuthInput';

export default AuthInput;
