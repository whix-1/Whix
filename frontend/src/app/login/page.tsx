'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import api from '@/lib/api';
import { useAuth } from '@/store/auth';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      setAuth(response.data.token, response.data.user);
      router.push('/dashboard');
    } catch (error: any) {
      setError('email', {
        message: error.response?.data?.message || 'Login failed',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="card w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary-500 mb-2">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Sign in to your Whix account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<FiMail />}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message as string}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<FiLock />}
            {...register('password', {
              required: 'Password is required',
            })}
            error={errors.password?.message as string}
          />

          <Button type="submit" loading={isSubmitting} className="w-full">
            Sign In
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-primary-500 hover:underline font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
