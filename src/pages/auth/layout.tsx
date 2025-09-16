import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">CoreAstra</h1>
          <p className="text-muted-foreground mt-2">Civic Issue Reporting Platform</p>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;