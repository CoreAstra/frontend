import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AllComplaints = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">View all complaints</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button variant="outline">filter</Button>
          </div>
        </div>

        <div className="mb-6">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search bar (search by person, complaint name, area, department, sector)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1,2,3,4].map((i) => (
            <Card key={i} className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="h-40 flex items-center justify-center text-muted-foreground">Complaint card placeholder</CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle>Map showing complaint in their locality</CardTitle>
            <CardDescription>Something like the provided mock</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-72 rounded-md bg-muted/50 border" />
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle>Current trend complaints (more likes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 w-full bg-muted/40 rounded" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllComplaints;


