import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, 
  Plus, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userType] = useState<'public' | 'department'>('public');
  const [filters, setFilters] = useState({ city: '', department: '', sector: '', date: '' });
  const [search, setSearch] = useState('');
  const stats = [
    { 
      title: "My Reports", 
      value: "12", 
      change: "+2 this week", 
      icon: FileText, 
      color: "text-primary" 
    },
    { 
      title: "Resolved Issues", 
      value: "8", 
      change: "+3 this month", 
      icon: CheckCircle, 
      color: "text-success" 
    },
    { 
      title: "In Progress", 
      value: "3", 
      change: "2 pending review", 
      icon: Clock, 
      color: "text-warning" 
    },
    { 
      title: "Civic Score", 
      value: "850", 
      change: "+50 this month", 
      icon: TrendingUp, 
      color: "text-accent" 
    },
  ];

  const recentComplaints = [
    {
      id: 1,
      title: "Broken streetlight on Main St",
      status: "In Progress",
      date: "2 days ago",
      department: "Public Works",
      statusColor: "warning"
    },
    {
      id: 2,
      title: "Pothole near City Park",
      status: "Resolved",
      date: "1 week ago",
      department: "Transportation",
      statusColor: "success"
    },
    {
      id: 3,
      title: "Overflowing garbage bin",
      status: "Pending",
      date: "3 days ago",
      department: "Sanitation",
      statusColor: "danger"
    },
  ];

  const nearbyIssues = [
    {
      id: 1,
      title: "Traffic signal malfunction",
      distance: "0.2 km away",
      status: "Reported",
      priority: "High"
    },
    {
      id: 2,
      title: "Water leak on Oak Avenue",
      distance: "0.5 km away", 
      status: "In Progress",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Damaged sidewalk",
      distance: "0.8 km away",
      status: "Pending",
      priority: "Low"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Top Nav (changes per user type) */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            {/* Desktop nav */}
            <div className="hidden sm:flex items-center gap-4 text-sm">
              <Button variant="link" className="px-0" onClick={() => navigate('/')}>Home</Button>
              <Button variant="link" className="px-0" onClick={() => navigate('/report')}>+Complaint</Button>
              <Button variant="link" className="px-0" onClick={() => navigate('/complaints/your')}>Your complaints</Button>
              <Button variant="link" className="px-0" onClick={() => navigate('/complaints')}>view all complaints</Button>
              {userType === 'department' && (
                <Button variant="link" className="px-0" onClick={() => navigate('/pending')}>Resolve complaints</Button>
              )}
              <Button variant="link" className="px-0 font-semibold" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="link" className="px-0" onClick={() => navigate('/map')}>View Map</Button>
              <Button variant="link" className="px-0" onClick={() => navigate('/profile')}>Profile</Button>
              <Button variant="link" className="px-0" onClick={() => navigate('/')}>logout</Button>
            </div>

            {/* Mobile hamburger */}
            <div className="sm:hidden ml-auto">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Menu className="w-4 h-4" />
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-3/4">
                  <div className="flex flex-col gap-3 mt-8 text-sm">
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/')}>Home</Button>
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/report')}>+Complaint</Button>
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/complaints/your')}>Your complaints</Button>
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/complaints')}>view all complaints</Button>
                    {userType === 'department' && (
                      <Button variant="link" className="justify-start px-0" onClick={() => navigate('/pending')}>Resolve complaints</Button>
                    )}
                    <Button variant="link" className="justify-start px-0 font-semibold" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/map')}>View Map</Button>
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/profile')}>Profile</Button>
                    <Button variant="link" className="justify-start px-0" onClick={() => navigate('/')}>logout</Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Map placeholder */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-0 shadow-md">
          <CardHeader>
            <CardTitle>Complaints Heatmap</CardTitle>
            <CardDescription>Distribution and intensity by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-64 rounded-md bg-muted/50 border flex items-center justify-center text-muted-foreground">
              Map will render here
            </div>
          </CardContent>
        </Card>

        {/* Search + Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-1">
            <Label className="text-sm">Search a complaint by name, department, area, person</Label>
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="mt-2" />
          </div>
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <Label className="text-sm">City</Label>
              <Select onValueChange={(v) => setFilters({ ...filters, city: v })}>
                <SelectTrigger className="mt-2"><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                  <SelectItem value="North">North</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Department</Label>
              <Select onValueChange={(v) => setFilters({ ...filters, department: v })}>
                <SelectTrigger className="mt-2"><SelectValue placeholder="Select department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Public Works">Public Works</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Sanitation">Sanitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Sector</Label>
              <Select onValueChange={(v) => setFilters({ ...filters, sector: v })}>
                <SelectTrigger className="mt-2"><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="Public Safety">Public Safety</SelectItem>
                  <SelectItem value="Environmental">Environmental</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Date</Label>
              <Input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} className="mt-2" />
            </div>
          </div>
        </div>

        {/* Complaints carousel + details grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader>
              <CardTitle>Heading(Name)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon"><ChevronLeft className="w-4 h-4" /></Button>
                <div className="flex-1 text-center">Complaint-01</div>
                <Button variant="outline" size="icon"><ChevronRight className="w-4 h-4" /></Button>
              </div>
              <Button variant="outline" className="mt-4 w-24">Like</Button>
            </CardContent>
          </Card>
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
            <CardHeader>
              <CardTitle>Complaint Details</CardTitle>
              <CardDescription>Click to view profile and attachments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 bg-muted/40 rounded" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>Reporter: John Doe</div>
                  <div>Public profile: example.com/john</div>
                  <div>Department: Public Works</div>
                  <div>Status: In Review</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Complaints */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                My Recent Complaints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{complaint.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{complaint.department}</span>
                      <span>•</span>
                      <span>{complaint.date}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={complaint.statusColor === 'success' ? 'default' : 'secondary'}
                    className={
                      complaint.statusColor === 'success' ? 'bg-success text-success-foreground' :
                      complaint.statusColor === 'warning' ? 'bg-warning text-warning-foreground' :
                      'bg-danger text-danger-foreground'
                    }
                  >
                    {complaint.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => navigate('/complaints')}>
                View All Complaints
              </Button>
            </CardContent>
          </Card>

          {/* Nearby Issues */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Issues Nearby
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {nearbyIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg border">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{issue.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>{issue.distance}</span>
                      <span>•</span>
                      <Badge 
                        variant="outline" 
                        className={
                          issue.priority === 'High' ? 'border-danger text-danger' :
                          issue.priority === 'Medium' ? 'border-warning text-warning' :
                          'border-muted text-muted-foreground'
                        }
                      >
                        {issue.priority}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {issue.status}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard / Awards */}
        <Card className="mt-8 bg-card/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Community Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((rank) => (
                <div key={rank} className="p-4 rounded-lg border bg-gradient-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <div className="font-medium">User {rank}</div>
                      <div className="text-xs text-muted-foreground">Cityname</div>
                    </div>
                  </div>
                  <Badge variant="secondary">Civic Score: {1000 - rank * 10}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Floating Action Button */}
      <Button 
        size="lg"
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-hero"
        variant="accent"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Dashboard;