import React, { useState } from 'react';
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

type OfficialSignupForm = z.infer<typeof officialSignupSchema>;

const SignupOfficial = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [personalProofFile, setPersonalProofFile] = useState<File | null>(null);
  const [jobProofFile, setJobProofFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<OfficialSignupForm>({
    resolver: zodResolver(officialSignupSchema),
  });

  const departments = [
    'Public Works',
    'Transportation',
    'Health Department',
    'Environmental Services',
    'Parks & Recreation',
    'Water & Sewage',
    'Building & Planning',
    'Fire Department',
    'Police Department'
  ];

  const sectors = [
    'Infrastructure',
    'Public Safety',
    'Environmental',
    'Social Services',
    'Administrative',
    'Technical Services'
  ];

  const areas = [
    'Downtown District',
    'North Zone',
    'South Zone',
    'East District',
    'West District',
    'Industrial Area',
    'Residential Area'
  ];

  const onSubmit = (data: OfficialSignupForm) => {
    console.log('Official signup data:', data);
    // Handle signup logic here
  };

  const handlePhoneAuth = () => {
    setIsPhoneVerified(true);
  };

  const handlePersonalProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPersonalProofFile(file);
    }
  };

  const handleJobProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJobProofFile(file);
    }
  };

  return (
    <AuthLayout>
      <Card className="shadow-lg border-0 bg-card/80 backdrop-blur-sm max-w-lg w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Department Official Registration</CardTitle>
          <CardDescription>Register as a government official</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
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
                  <Label>Upload Profile Photo (Personal Proof)</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePersonalProofUpload}
                      className="hidden"
                      id="personal-proof-upload"
                    />
                    <label htmlFor="personal-proof-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {personalProofFile ? personalProofFile.name : 'Personal identification proof'}
                      </p>
                    </label>
                  </div>
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

                <Button type="button" onClick={() => setActiveTab('professional')} className="w-full">
                  Continue to Professional Info
                </Button>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Select onValueChange={(value) => setValue('department', value)}>
                    <SelectTrigger className={errors.department ? 'border-danger' : ''}>
                      <SelectValue placeholder="Choose department, sector, area/location - 3 drop downs" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-danger">{errors.department.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Sector</Label>
                  <Select onValueChange={(value) => setValue('sector', value)}>
                    <SelectTrigger className={errors.sector ? 'border-danger' : ''}>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.sector && (
                    <p className="text-sm text-danger">{errors.sector.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Area/Location</Label>
                  <Select onValueChange={(value) => setValue('areaLocation', value)}>
                    <SelectTrigger className={errors.areaLocation ? 'border-danger' : ''}>
                      <SelectValue placeholder="Select area/location" />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.areaLocation && (
                    <p className="text-sm text-danger">{errors.areaLocation.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Job Proof (Upload)</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleJobProofUpload}
                      className="hidden"
                      id="job-proof-upload"
                    />
                    <label htmlFor="job-proof-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {jobProofFile ? jobProofFile.name : 'Employment verification document'}
                      </p>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherDetails">Other Details (like job, parent name for identification)</Label>
                  <Textarea
                    id="otherDetails"
                    {...register('otherDetails')}
                    placeholder="Additional identification details"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button type="button" variant="outline" onClick={() => setActiveTab('personal')}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveTab('account')}>
                    Continue
                  </Button>
                </div>
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
                  <Button type="button" variant="outline" onClick={() => setActiveTab('professional')}>
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

export default SignupOfficial;