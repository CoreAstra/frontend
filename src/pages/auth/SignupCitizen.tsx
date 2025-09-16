import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from './layout';
import { Upload } from 'lucide-react';

const citizenSignupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
  dob: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(10, 'Please enter a complete address'),
  otherDetails: z.string().optional(),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type CitizenSignupForm = z.infer<typeof citizenSignupSchema>;

const SignupCitizen = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CitizenSignupForm>({
    resolver: zodResolver(citizenSignupSchema),
  });

  const onSubmit = (data: CitizenSignupForm) => {
    console.log('Citizen signup data:', data);
    // Handle signup logic here
  };

  const handlePhoneAuth = () => {
    // Handle phone authentication
    setIsPhoneVerified(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofFile(file);
    }
  };

  return (
    <AuthLayout>
      <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Citizen Registration</CardTitle>
          <CardDescription>Join CoreAstra as a citizen</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="account">Account Setup</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TabsContent value="personal" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (as in proof)</Label>
                  <Input
                    id="fullName"
                    {...register('fullName')}
                    placeholder="Enter your full name"
                    className={errors.fullName ? 'border-danger' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-danger">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phoneNumber"
                      {...register('phoneNumber')}
                      placeholder="Enter phone number"
                      className={`flex-1 ${errors.phoneNumber ? 'border-danger' : ''}`}
                    />
                    <Button
                      type="button"
                      variant={isPhoneVerified ? "success" : "outline"}
                      size="sm"
                      onClick={handlePhoneAuth}
                      disabled={isPhoneVerified}
                    >
                      {isPhoneVerified ? 'Verified' : 'Authenticate'}
                    </Button>
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-sm text-danger">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    {...register('dob')}
                    className={errors.dob ? 'border-danger' : ''}
                  />
                  {errors.dob && (
                    <p className="text-sm text-danger">{errors.dob.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address (access to current location)</Label>
                  <Textarea
                    id="address"
                    {...register('address')}
                    placeholder="Enter your complete address"
                    className={errors.address ? 'border-danger' : ''}
                  />
                  {errors.address && (
                    <p className="text-sm text-danger">{errors.address.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherDetails">Other Details (like job, parent name for identification)</Label>
                  <Textarea
                    id="otherDetails"
                    {...register('otherDetails')}
                    placeholder="Additional identification details"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Profile Photo (Personal Proof)</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="proof-upload"
                    />
                    <label htmlFor="proof-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {proofFile ? proofFile.name : 'Click to upload proof document'}
                      </p>
                    </label>
                  </div>
                </div>

                <Button type="button" onClick={() => setActiveTab('account')} className="w-full">
                  Continue to Account Setup
                </Button>
              </TabsContent>

              <TabsContent value="account" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username (if not available, green if available)</Label>
                  <Input
                    id="username"
                    {...register('username')}
                    placeholder="Choose a username"
                    className={errors.username ? 'border-danger' : ''}
                  />
                  {errors.username && (
                    <p className="text-sm text-danger">{errors.username.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="Create a strong password"
                    className={errors.password ? 'border-danger' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-danger">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'border-danger' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-danger">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('personal')}>
                    Back
                  </Button>
                  <Button type="submit" variant="default">
                    Submit
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="#" className="text-primary hover:underline">Login</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default SignupCitizen;