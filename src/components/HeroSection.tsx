import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-city.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-secondary/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Report, Track, and Resolve 
          <span className="block text-accent"> Civic Issues</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your voice for a cleaner, greener, and more responsive city
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="w-full sm:w-auto" asChild>
            <a href="/auth/signin">Login / Sign Up</a>
          </Button>
          <Button variant="accent" size="lg" className="w-full sm:w-auto" asChild>
            <a href="/report">Report an Issue Anonymously</a>
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-white/80">Issues Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">50K+</div>
            <div className="text-white/80">Active Citizens</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-white/80">Transparency</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;