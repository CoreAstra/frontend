import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from './layout';
import { Upload } from 'lucide-react';

// Login Schema
const loginSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email or username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Citizen Signup Schema
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

// Official Signup Schema
const officialSignupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  department: z.string().min(1, 'Please select a department'),
  sector: z.string().min(1, 'Please select a sector'),
  areaLocation: z.string().min(1, 'Please select an area/location'),
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

type LoginForm = z.infer<typeof loginSchema>;
type CitizenSignupForm = z.infer<typeof citizenSignupSchema>;
type OfficialSignupForm = z.infer<typeof officialSignupSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('citizen-signup');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [proofFiles, setProofFiles] = useState<{personal: File | null, job: File | null}>({
    personal: null,
    job: null
  });

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const citizenForm = useForm<CitizenSignupForm>({
    resolver: zodResolver(citizenSignupSchema),
  });

  const officialForm = useForm<OfficialSignupForm>({
    resolver: zodResolver(officialSignupSchema),
  });

  const departments = [
    'Public Works', 'Transportation', 'Health Department', 'Environmental Services',
    'Parks & Recreation', 'Water & Sewage', 'Building & Planning', 'Fire Department', 'Police Department'
  ];

  const sectors = [
    'Infrastructure', 'Public Safety', 'Environmental', 'Social Services', 'Administrative', 'Technical Services'
  ];

  const areas = [
    'Downtown District', 'North Zone', 'South Zone', 'East District', 'West District', 'Industrial Area', 'Residential Area'
  ];

  const onLoginSubmit = (data: LoginForm) => {
    console.log('Login data:', data);
    // TODO: Replace with real auth API call
    navigate('/dashboard');
  };

  const onCitizenSubmit = (data: CitizenSignupForm) => {
    console.log('Citizen signup data:', data);
  };

  const onOfficialSubmit = (data: OfficialSignupForm) => {
    console.log('Official signup data:', data);
  };

  const handlePhoneAuth = () => {
    setIsPhoneVerified(true);
  };

  const handleFileUpload = (type: 'personal' | 'job') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProofFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">CoreAstra</h1>
          <p className="text-muted-foreground mt-2 text-lg">Civic Issue Reporting Platform</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Citizen Signup */}
          <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
            <CardHeader className="text-center border-b bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex justify-center gap-4 mb-4">
                <Button 
                  variant={activeTab === 'citizen-signup' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('citizen-signup')}
                  className="text-sm"
                >
                  Sign up page public
                </Button>
                <Button 
                  variant={activeTab === 'citizen-login' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('citizen-login')}
                  className="text-sm"
                >
                  Already have an account? Login
                </Button>
              </div>
              <CardTitle className="text-xl">
                {activeTab === 'citizen-signup' ? 'Citizen Registration' : 'Citizen Login'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'citizen-signup' ? 'Join CoreAstra as a citizen' : 'Sign in to your account'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {activeTab === 'citizen-signup' ? (
                <form onSubmit={citizenForm.handleSubmit(onCitizenSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Citizen of this country (cite bar)</Label>
                    <div className="space-y-2">
                      <Input
                        {...citizenForm.register('fullName')}
                        placeholder="Full name (as in proof)"
                        className={citizenForm.formState.errors.fullName ? 'border-danger' : ''}
                      />
                      {citizenForm.formState.errors.fullName && (
                        <p className="text-xs text-danger">{citizenForm.formState.errors.fullName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Proof (photo or upload)</Label>
                    <div className="border border-dashed border-muted rounded p-3 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload('personal')}
                        className="hidden"
                        id="citizen-proof"
                      />
                      <label htmlFor="citizen-proof" className="cursor-pointer text-sm text-muted-foreground">
                        {proofFiles.personal ? proofFiles.personal.name : 'Upload profile photo (Personal)'}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        {...citizenForm.register('phoneNumber')}
                        placeholder="phone number"
                        className={`flex-1 ${citizenForm.formState.errors.phoneNumber ? 'border-danger' : ''}`}
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
                    {citizenForm.formState.errors.phoneNumber && (
                      <p className="text-xs text-danger">{citizenForm.formState.errors.phoneNumber.message}</p>
                    )}
                  </div>

                  <Input
                    type="date"
                    {...citizenForm.register('dob')}
                    placeholder="DOB"
                    className={citizenForm.formState.errors.dob ? 'border-danger' : ''}
                  />

                  <Textarea
                    {...citizenForm.register('address')}
                    placeholder="Address (access to current location)"
                    className={citizenForm.formState.errors.address ? 'border-danger' : ''}
                    rows={2}
                  />

                  <Textarea
                    {...citizenForm.register('otherDetails')}
                    placeholder="Other Details (like job, parent name for identification)"
                    rows={2}
                  />

                  <Input
                    {...citizenForm.register('username')}
                    placeholder="user name/unique id (red...not red available, green if available"
                    className={citizenForm.formState.errors.username ? 'border-danger' : ''}
                  />

                  <Input
                    type="password"
                    {...citizenForm.register('password')}
                    placeholder="Password"
                    className={citizenForm.formState.errors.password ? 'border-danger' : ''}
                  />

                  <Input
                    type="password"
                    {...citizenForm.register('confirmPassword')}
                    placeholder="confirm password"
                    className={citizenForm.formState.errors.confirmPassword ? 'border-danger' : ''}
                  />

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              ) : (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <Input
                    {...loginForm.register('emailOrUsername')}
                    placeholder="Email or Username"
                    className={loginForm.formState.errors.emailOrUsername ? 'border-danger' : ''}
                  />
                  {loginForm.formState.errors.emailOrUsername && (
                    <p className="text-xs text-danger">{loginForm.formState.errors.emailOrUsername.message}</p>
                  )}

                  <Input
                    type="password"
                    {...loginForm.register('password')}
                    placeholder="Password"
                    className={loginForm.formState.errors.password ? 'border-danger' : ''}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-danger">{loginForm.formState.errors.password.message}</p>
                  )}

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Official Signup */}
          <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
            <CardHeader className="text-center border-b bg-gradient-to-r from-secondary/10 to-accent/10">
              <div className="flex justify-center gap-4 mb-4">
                <Button 
                  variant={activeTab === 'official-signup' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('official-signup')}
                  className="text-sm"
                >
                  Sign up page department
                </Button>
                <Button 
                  variant={activeTab === 'official-login' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('official-login')}
                  className="text-sm"
                >
                  Already have an account? Login
                </Button>
              </div>
              <CardTitle className="text-xl">
                {activeTab === 'official-signup' ? 'Department Official' : 'Official Login'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'official-signup' ? 'Register as government official' : 'Sign in to your account'}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              {activeTab === 'official-signup' ? (
                <form onSubmit={officialForm.handleSubmit(onOfficialSubmit)} className="space-y-4">
                  <Select onValueChange={(value) => officialForm.setValue('department', value)}>
                    <SelectTrigger className={officialForm.formState.errors.department ? 'border-danger' : ''}>
                      <SelectValue placeholder="choose department, sector, area/location - 3 drop downs" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input
                    {...officialForm.register('fullName')}
                    placeholder="Full name (as in proof)"
                    className={officialForm.formState.errors.fullName ? 'border-danger' : ''}
                  />

                  <div className="space-y-2">
                    <Label className="text-sm">Proof (photo or upload) - personal</Label>
                    <div className="border border-dashed border-muted rounded p-3 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload('personal')}
                        className="hidden"
                        id="official-personal-proof"
                      />
                      <label htmlFor="official-personal-proof" className="cursor-pointer text-sm text-muted-foreground">
                        {proofFiles.personal ? proofFiles.personal.name : 'Upload personal proof'}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Proof (photo or upload) - job</Label>
                    <div className="border border-dashed border-muted rounded p-3 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload('job')}
                        className="hidden"
                        id="official-job-proof"
                      />
                      <label htmlFor="official-job-proof" className="cursor-pointer text-sm text-muted-foreground">
                        {proofFiles.job ? proofFiles.job.name : 'Upload job proof'}
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      {...officialForm.register('phoneNumber')}
                      placeholder="phone number"
                      className={`flex-1 ${officialForm.formState.errors.phoneNumber ? 'border-danger' : ''}`}
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

                  <Input
                    type="date"
                    {...officialForm.register('dob')}
                    placeholder="DOB"
                    className={officialForm.formState.errors.dob ? 'border-danger' : ''}
                  />

                  <Textarea
                    {...officialForm.register('address')}
                    placeholder="Address (access to current location)"
                    className={officialForm.formState.errors.address ? 'border-danger' : ''}
                    rows={2}
                  />

                  <Textarea
                    {...officialForm.register('otherDetails')}
                    placeholder="Other Details (like job, parent name for identification)"
                    rows={2}
                  />

                  <Input
                    {...officialForm.register('username')}
                    placeholder="user name/unique id (red...not red available, green if available"
                    className={officialForm.formState.errors.username ? 'border-danger' : ''}
                  />

                  <Input
                    type="password"
                    {...officialForm.register('password')}
                    placeholder="Password"
                    className={officialForm.formState.errors.password ? 'border-danger' : ''}
                  />

                  <Input
                    type="password"
                    {...officialForm.register('confirmPassword')}
                    placeholder="confirm password"
                    className={officialForm.formState.errors.confirmPassword ? 'border-danger' : ''}
                  />

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              ) : (
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <Input
                    {...loginForm.register('emailOrUsername')}
                    placeholder="Email or Username"
                    className={loginForm.formState.errors.emailOrUsername ? 'border-danger' : ''}
                  />
                  {loginForm.formState.errors.emailOrUsername && (
                    <p className="text-xs text-danger">{loginForm.formState.errors.emailOrUsername.message}</p>
                  )}

                  <Input
                    type="password"
                    {...loginForm.register('password')}
                    placeholder="Password"
                    className={loginForm.formState.errors.password ? 'border-danger' : ''}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-xs text-danger">{loginForm.formState.errors.password.message}</p>
                  )}

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignIn;