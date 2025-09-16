import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
        <div className="-mt-4 mb-6">
          <p className="text-muted-foreground">Their respective info’s what we took during signup</p>
        </div>

        <Card className="shadow-lg border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Full Name" />
              </div>
              <div>
                <Label>Username</Label>
                <Input placeholder="Username" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input placeholder="Phone Number" />
              </div>
              <div>
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
              <div className="md:col-span-2">
                <Label>Address</Label>
                <Input placeholder="Address" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline">Edit</Button>
              <Button>Update</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;


