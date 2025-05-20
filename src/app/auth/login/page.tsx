'use client'

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { LoginFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/ui/AuthInput';
import { toast } from 'sonner';
import AuthButton from '@/components/ui/AuthButton';
import Link from 'next/link';


const Login = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const onSubmit = (data: LoginFormData) => {
      toast.success('Login successful');
      console.log(errors);
        console.log(data);
    }

  return(
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
          })}
          error={errors.password?.message}
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
            href="/auth/register"
            style={{
              color: '#5472E4',
              fontSize: '0.875rem',
              fontWeight: '500',
              textDecoration: 'none',
            }}
          >
            Register
          </Link>
          <AuthButton type="submit">Login</AuthButton>
        </div>
      </form>
    </main>
  )
}

export default Login;
