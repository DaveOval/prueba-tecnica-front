'use client'

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { LoginFormData } from '@/types/auth';
import { useAuth } from '@/hooks/useAuth';
import AuthInput from '@/components/ui/AuthInput';

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
      console.log(errors);
        console.log(data);
    }

  return(
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthInput label="Email" type="email" {...register('email')} />
        <AuthInput label="Password" type="password" {...register('password')} />
        <button type="submit">Login</button>
      </form>
    </main>
  )
}

export default Login;
