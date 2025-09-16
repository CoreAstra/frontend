import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ReportComplaint from "./pages/ReportComplaint";
import AllComplaints from "./pages/AllComplaints";
import YourComplaints from "./pages/YourComplaints";
import ComplaintView from "./pages/ComplaintView";
import Profile from "./pages/Profile";
import PendingDiscussions from "./pages/PendingDiscussions";
import Login from "./pages/auth/Login";
import SignIn from "./pages/auth/SignIn";
import SignupCitizen from "./pages/auth/SignupCitizen";
import SignupOfficial from "./pages/auth/SignupOfficial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportComplaint />} />
          <Route path="/complaints" element={<AllComplaints />} />
          <Route path="/complaints/your" element={<YourComplaints />} />
          <Route path="/complaints/:id" element={<ComplaintView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pending" element={<PendingDiscussions />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup/citizen" element={<SignupCitizen />} />
          <Route path="/auth/signup/official" element={<SignupOfficial />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
