import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const YourComplaints = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Your complaints</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
            <Button variant="outline">filter</Button>
          </div>
        </div>
        <div className="mb-6">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search bar (search by person, complaint name, area, department, sector)" />
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle>Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded bg-muted/40 flex items-center justify-center">Carousel placeholder with Like/Edit/Withdraw/Status</div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded bg-muted/40 flex items-center justify-center">Carousel placeholder with Like</div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle>Map showing complaints you reported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-72 rounded bg-muted/40" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default YourComplaints;


