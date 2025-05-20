import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const AuthInput = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => (
    <div>
        {label &&<label>{label}</label>}
        <input ref={ref} { ...props } />
        { error && <span>{error}</span> }
    </div>
));
    
AuthInput.displayName = 'AuthInput';


export default AuthInput;
