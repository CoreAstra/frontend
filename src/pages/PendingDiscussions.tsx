import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PendingDiscussions = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Pending for Discussion - Dashboard</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
        </div>
        <div className="p-6 rounded-md border bg-card/80 backdrop-blur-sm text-muted-foreground">
          This section is a placeholder for items pending discussion.
        </div>
      </div>
    </div>
  );
};

export default PendingDiscussions;


