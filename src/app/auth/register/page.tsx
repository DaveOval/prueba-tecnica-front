'use client'

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { RegisterFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/ui/AuthInput';
import { toast } from 'sonner';
import AuthButton from '@/components/ui/AuthButton';
import { registerService } from '@/api/services/auth';

interface ApiError extends Error {
    response: {
        data: {
            detail: string;
        }
    }
}

const Register = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
        mode: 'onChange'
    });


    const password = watch('password');

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await registerService.register({
                ...data,
                last_name: data.lastName
            });
            if (response) {
                toast.success('Registration successful');
                router.push('/auth/login');
            }
        } catch (error) {
            if (error instanceof Error && 'response' in error) {
                const { detail } = (error as ApiError).response.data;
                toast.error(detail);
            } else {
                toast.error('An unexpected error occurred');
            }
        }
    }

    return (
        <main
            style={{
                width: '100%',
                maxWidth: '400px',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #27272A',
            }}
            className="container_color"
        >
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthInput
                    placeholder="Enter your name"
                    label="Name"
                    type="text"
                    {...register('name', {
                        required: 'Name is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                        },
                    })}
                    error={errors.name?.message}
                    isRequired
                />
                <AuthInput
                    placeholder="Enter your last name"
                    label="Last Name"
                    type="text"
                    {...register('lastName', {
                        required: 'Last name is required',
                        minLength: {
                            value: 2,
                            message: 'Last name must be at least 2 characters',
                        },
                    })}
                    error={errors.lastName?.message}
                    isRequired
                />

                <AuthInput
                    placeholder="Enter your email"
                    label="Email"
                    type="email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Invalid email format',
                        },
                    })}
                    error={errors.email?.message}
                    isRequired
                />

                <AuthInput
                    placeholder="Enter your password"
                    label="Password"
                    type="password"
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Minimum 6 characters',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Maximum 20 characters',
                        },
                        validate: (value) => {
                            if (!value) return true;
                            if (value.length < 6) return 'Password must be at least 6 characters';
                            if (value.length > 20) return 'Password must be at most 20 characters';
                            if (!/[!@#$%^&*]/.test(value)) return 'Password must contain at least one special character';
                            if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
                            if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
                            if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
                            return true;
                        }
                    })}
                    error={errors.password?.message}
                    isRequired
                />

                <AuthInput
                    placeholder="Confirm your password"
                    label="Confirm Password"
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => {
                            if (!value) return true;
                            if (value !== password) return 'Passwords do not match';
                            return true;
                        }
                    })}
                    error={errors.confirmPassword?.message}
                    isRequired
                />

                <div
                    className="flex justify-between items-center"
                    style={{
                        marginTop: '1rem',
                        padding: '0.5rem',
                    }}
                >
                    <Link
                        href="/auth/login"
                        style={{
                            color: '#5472E4',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            textDecoration: 'none',
                        }}
                    >
                        Login
                    </Link>
                    <AuthButton type="submit">Register</AuthButton>
                </div>
            </form>
        </main>
    )
}

export default Register;
