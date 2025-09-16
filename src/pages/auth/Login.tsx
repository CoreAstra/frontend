import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AuthLayout from './layout';

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    console.log('Login data:', data);
    // TODO: Replace with real auth API call
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your CoreAstra account</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrUsername">Email or Username</Label>
              <Input
                id="emailOrUsername"
                {...register('emailOrUsername')}
                placeholder="Enter your email or username"
                className={errors.emailOrUsername ? 'border-danger' : ''}
              />
              {errors.emailOrUsername && (
                <p className="text-sm text-danger">{errors.emailOrUsername.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                className={errors.password ? 'border-danger' : ''}
              />
              {errors.password && (
                <p className="text-sm text-danger">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" variant="default" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" size="sm" className="w-full">
                Citizen Sign Up
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Official Sign Up
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default Login;