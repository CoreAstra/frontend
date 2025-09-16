import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ComplaintView = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-foreground">Complaint</div>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle>Complaint-01</CardTitle>
            <CardDescription>Detailed view with images, description, department, status, likes, and comments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-muted/40 rounded" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Reporter: John Doe</div>
                <div>Department: Public Works</div>
                <div>Sector: Infrastructure</div>
                <div>Location: 00.0000, 00.0000</div>
                <Badge variant="secondary">In Review</Badge>
              </div>
            </div>
            <div className="h-28 bg-muted/30 rounded" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComplaintView;


