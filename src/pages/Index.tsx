import React from 'react';
import HeroSection from '@/components/HeroSection';
import { useNavigate } from 'react-router-dom';
import FeatureCard from '@/components/FeatureCard';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  DollarSign, 
  Award, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Live Map Tracking",
      description: "View and track all civic issues on an interactive map with real-time status updates and location-based filtering."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-success" />,
      title: "Funds Transparency",
      description: "Complete visibility into how public funds are allocated and used for issue resolution with detailed receipts and invoices."
    },
    {
      icon: <Award className="w-8 h-8 text-accent" />,
      title: "Civic Score Rewards",
      description: "Earn civic points for reporting issues and contributing to community improvement with recognition rewards."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure & Anonymous",
      description: "Report issues anonymously or with your profile. Your privacy and data security are our top priorities."
    },
    {
      icon: <Clock className="w-8 h-8 text-warning" />,
      title: "Real-time Updates",
      description: "Get instant notifications about the progress of your reports with timeline tracking and status changes."
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "Community Engagement",
      description: "Connect with other citizens, share experiences, and collectively work towards a better community."
    }
  ];

  const stats = [
    { icon: CheckCircle, value: "98%", label: "Resolution Rate", color: "text-success" },
    { icon: Clock, value: "3 Days", label: "Average Response", color: "text-primary" },
    { icon: AlertTriangle, value: "24/7", label: "Issue Monitoring", color: "text-accent" },
    { icon: Users, value: "50K+", label: "Active Users", color: "text-secondary" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Trial CTA */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Button variant="outline" size="lg" onClick={() => navigate('/dashboard')}>
            Try without login
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-neutral-100 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Empowering Citizens, Enabling Change
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform bridges the gap between citizens and government, 
              ensuring every voice is heard and every issue is addressed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color.replace('text-', 'text-white/')}`} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are actively improving their communities. 
            Your report could be the change your neighborhood needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg">
              Get Started Today
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">CoreAstra</h3>
              <p className="text-white/80 mb-4">
                Building stronger communities through transparency, 
                accountability, and citizen engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/80">
                <li>Report Issues</li>
                <li>Track Progress</li>
                <li>View Statistics</li>
                <li>Community Forum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/80">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            © 2024 CoreAstra. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;