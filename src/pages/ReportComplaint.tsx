import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, MapPin, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const complaintSchema = z.object({
  issueName: z.string().min(5, 'Issue name must be at least 5 characters'),
  department: z.string().min(1, 'Please select a department'),
  sector: z.string().min(1, 'Please select a sector'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().min(1, 'Location is required'),
});

type ComplaintForm = z.infer<typeof complaintSchema>;

const ReportComplaint = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ComplaintForm>({
    resolver: zodResolver(complaintSchema),
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
  ];

  const sectors = [
    'Infrastructure',
    'Public Safety',
    'Environmental',
    'Social Services',
    'Sanitation',
    'Traffic & Transport',
  ];

  const onSubmit = (data: ComplaintForm) => {
    console.log('Complaint data:', data);
    console.log('Uploaded files:', uploadedFiles);
    
    toast({
      title: "Complaint Submitted Successfully",
      description: "Your issue has been reported and will be reviewed by the relevant department.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (uploadedFiles.length + files.length > 10) {
      toast({
        title: "Too Many Files",
        description: "You can upload a maximum of 10 files.",
        variant: "destructive",
      });
      return;
    }

    if (uploadedFiles.length + files.length < 2) {
      toast({
        title: "Minimum Files Required",
        description: "Please upload at least 2 photos/videos.",
        variant: "destructive",
      });
    }

    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setCurrentLocation(locationString);
          setValue('location', locationString);
          
          toast({
            title: "Location Detected",
            description: "Current location has been automatically filled.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to get current location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground mb-2">Report Complaint</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
        <div className="-mt-4 mb-6">
          <p className="text-muted-foreground">Help us improve your community by reporting issues</p>
        </div>

        <Card className="shadow-lg border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Complaint Details</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Issue Name */}
              <div className="space-y-2">
                <Label htmlFor="issueName" className="text-base font-medium">Name the issue</Label>
                <Input
                  id="issueName"
                  {...register('issueName')}
                  placeholder="Brief title describing the issue"
                  className={`h-12 ${errors.issueName ? 'border-danger' : ''}`}
                />
                {errors.issueName && (
                  <p className="text-sm text-danger">{errors.issueName.message}</p>
                )}
              </div>

              {/* Department Selection */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Department it belongs to - drop down (advanced with search bar, filter)
                </Label>
                <Select onValueChange={(value) => setValue('department', value)}>
                  <SelectTrigger className={`h-12 ${errors.department ? 'border-danger' : ''}`}>
                    <SelectValue placeholder="Select relevant department" />
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

              {/* Sector Selection */}
              <div className="space-y-2">
                <Label className="text-base font-medium">Sector</Label>
                <Select onValueChange={(value) => setValue('sector', value)}>
                  <SelectTrigger className={`h-12 ${errors.sector ? 'border-danger' : ''}`}>
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

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base font-medium">
                  Description of the issue, tag other public of this place, mention respective department officer
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Provide detailed description of the issue. You can mention @officials or tag relevant people."
                  className={`min-h-32 resize-none ${errors.description ? 'border-danger' : ''}`}
                />
                {errors.description && (
                  <p className="text-sm text-danger">{errors.description.message}</p>
                )}
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label className="text-base font-medium">
                  Upload photos, minimum 2, max 10
                </Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center bg-muted/30">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                      <Camera className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground font-medium">
                        Click to upload photos/videos
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {uploadedFiles.length}/10 files uploaded
                      </p>
                    </div>
                  </label>
                </div>

                {/* Display uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-sm p-2">
                          <span className="text-center truncate">{file.name}</span>
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeFile(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium">Current location access</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    {...register('location')}
                    value={currentLocation}
                    placeholder="Location will be auto-detected"
                    className={`flex-1 h-12 ${errors.location ? 'border-danger' : ''}`}
                    readOnly
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={getCurrentLocation}
                    className="px-3"
                  >
                    <MapPin className="w-4 h-4" />
                  </Button>
                </div>
                {errors.location && (
                  <p className="text-sm text-danger">{errors.location.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Location is automatically detected. Click the map icon to refresh.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-lg"
                  disabled={uploadedFiles.length < 2}
                >
                  Submit Complaint
                </Button>
                {uploadedFiles.length < 2 && (
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Please upload at least 2 files to submit
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportComplaint;