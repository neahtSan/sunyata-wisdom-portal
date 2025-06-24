
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import Gallery from "./pages/Gallery";
import Registration from "./pages/Registration";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminHomeManagement from "./pages/admin/AdminHomeManagement";
import AdminDharmaManagement from "./pages/admin/AdminDharmaManagement";
import AdminDharmaForm from "./pages/admin/AdminDharmaForm";
import AdminActivityManagement from "./pages/admin/AdminActivityManagement";
import AdminActivityForm from "./pages/admin/AdminActivityForm";
import AdminRegistrationManagement from "./pages/admin/AdminRegistrationManagement";
import AdminFeedbackManagement from "./pages/admin/AdminFeedbackManagement";
import AdminAboutManagement from "./pages/admin/AdminAboutManagement";
import AdminCreateUser from "./pages/admin/AdminCreateUser";
import AdminLog from "./pages/admin/AdminLog";
import ActivityGallery from "./pages/ActivityGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/article" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<About />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/home" element={<AdminHomeManagement />} />
          <Route path="/admin/dharma" element={<AdminDharmaManagement />} />
          <Route path="/admin/dharma/:id" element={<AdminDharmaForm />} />
          <Route path="/admin/activity" element={<AdminActivityManagement />} />
          <Route path="/admin/activity/:id" element={<AdminActivityForm />} />
          <Route path="/admin/registrations" element={<AdminRegistrationManagement />} />
          <Route path="/admin/feedback" element={<AdminFeedbackManagement />} />
          <Route path="/admin/about" element={<AdminAboutManagement />} />
          <Route path="/admin/users" element={<AdminCreateUser />} />
          <Route path="/admin/log" element={<AdminLog />} />
          
          {/* Activity Gallery Route */}
          <Route path="/activity/:activityId" element={<ActivityGallery />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
