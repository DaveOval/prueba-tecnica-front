'use client'

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';

import { LoginFormData } from '@/types/auth';
import AuthInput from '@/components/ui/AuthInput';
import AuthButton from '@/components/ui/AuthButton';
import Link from 'next/link';
import { login } from '@/store/slices/authSlice';
import { authService } from '@/api/services/auth';
import PublicRoute from '@/components/auth/PublicRoute';

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
      try {
        const response = await authService.login(data);
        if (response) {
          dispatch(login(response));
          toast.success('Login successful');
          router.replace('/dashboard');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unexpected error occurred');
        }
      }
    }

    return (
      <PublicRoute>
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
      </PublicRoute>
    )
}

export default Login;
