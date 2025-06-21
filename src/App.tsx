
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DharmaMedia from "./pages/DharmaMedia";
import Registration from "./pages/Registration";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHomeManagement from "./pages/admin/AdminHomeManagement";
import AdminDharmaManagement from "./pages/admin/AdminDharmaManagement";
import AdminEventsManagement from "./pages/admin/AdminEventsManagement";
import AdminRegistrationManagement from "./pages/admin/AdminRegistrationManagement";
import AdminFeedbackManagement from "./pages/admin/AdminFeedbackManagement";
import AdminAboutManagement from "./pages/admin/AdminAboutManagement";
import AdminCreateUser from "./pages/admin/AdminCreateUser";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dharma" element={<DharmaMedia />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/home" element={<AdminHomeManagement />} />
          <Route path="/admin/dharma" element={<AdminDharmaManagement />} />
          <Route path="/admin/events" element={<AdminEventsManagement />} />
          <Route path="/admin/registrations" element={<AdminRegistrationManagement />} />
          <Route path="/admin/feedback" element={<AdminFeedbackManagement />} />
          <Route path="/admin/about" element={<AdminAboutManagement />} />
          <Route path="/admin/users" element={<AdminCreateUser />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
