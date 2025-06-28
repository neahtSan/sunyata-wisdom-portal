
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import About from '@/pages/About';
import DharmaMedia from '@/pages/DharmaMedia';
import ArticleDetail from '@/pages/ArticleDetail';
import ArticleList from '@/pages/ArticleList';
import ActivityGallery from '@/pages/ActivityGallery';
import Gallery from '@/pages/Gallery';
import Registration from '@/pages/Registration';
import NotFound from '@/pages/NotFound';

// Admin pages
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminHomeManagement from '@/pages/admin/AdminHomeManagement';
import AdminDharmaManagement from '@/pages/admin/AdminDharmaManagement';
import AdminDharmaForm from '@/pages/admin/AdminDharmaForm';
import AdminDharmaPreview from '@/pages/admin/AdminDharmaPreview';
import AdminActivityManagement from '@/pages/admin/AdminActivityManagement';
import AdminActivityForm from '@/pages/admin/AdminActivityForm';
import AdminRegistrationManagement from '@/pages/admin/AdminRegistrationManagement';
import AdminFeedbackManagement from '@/pages/admin/AdminFeedbackManagement';
import AdminAboutManagement from '@/pages/admin/AdminAboutManagement';
import AdminUserManagement from '@/pages/admin/AdminUserManagement';
import AdminLog from '@/pages/admin/AdminLog';

// Auth pages
import Login from '@/pages/auth/Login';
import UserProfile from '@/pages/UserProfile';

import './App.css';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/dharma" element={<DharmaMedia />} />
          <Route path="/dharma/:id" element={<ArticleDetail />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/activities" element={<ActivityGallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/registration" element={<Registration />} />
          
          {/* Auth routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/home" element={<AdminHomeManagement />} />
          <Route path="/admin/dharma-article" element={<AdminDharmaManagement />} />
          <Route path="/admin/dharma/:id" element={<AdminDharmaForm />} />
          <Route path="/admin/dharma-preview/:id" element={<AdminDharmaPreview />} />
          <Route path="/admin/activity" element={<AdminActivityManagement />} />
          <Route path="/admin/activity/:id" element={<AdminActivityForm />} />
          <Route path="/admin/registrations" element={<AdminRegistrationManagement />} />
          <Route path="/admin/feedback" element={<AdminFeedbackManagement />} />
          <Route path="/admin/about" element={<AdminAboutManagement />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/log" element={<AdminLog />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
