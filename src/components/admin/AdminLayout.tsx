
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Users, 
  MessageSquare, 
  Info,
  LogOut,
  Menu,
  X,
  Settings,
  UserPlus,
  FileText
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้งาน Sala",
    });
    navigate('/admin/login');
  };

  const menuItems = [
    { 
      title: 'แผงควบคุม', 
      path: '/admin/dashboard', 
      icon: Home 
    },
    { 
      title: 'จัดการหน้าแรก', 
      path: '/admin/home', 
      icon: Home 
    },
    { 
      title: 'จัดการธรรมะมีเดีย', 
      path: '/admin/dharma', 
      icon: BookOpen 
    },
    { 
      title: 'จัดการกิจกรรม', 
      path: '/admin/activity', 
      icon: Calendar 
    },
    { 
      title: 'ดูการลงทะเบียน', 
      path: '/admin/registrations', 
      icon: Users 
    },
    { 
      title: 'ความคิดเห็น', 
      path: '/admin/feedback', 
      icon: MessageSquare 
    },
    { 
      title: 'เกี่ยวกับเรา', 
      path: '/admin/about', 
      icon: Info 
    },
    { 
      title: 'จัดการผู้ดูแล', 
      path: '/admin/users', 
      icon: UserPlus 
    },
    { 
      title: 'บันทึกกิจกรรม', 
      path: '/admin/log', 
      icon: FileText 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">วัด</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Sala</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden w-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors w-full ${
                  location.pathname === item.path
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            ออกจากระบบ
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden w-auto"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ผู้ดูแลระบบ: admin
              </span>
              <Button variant="outline" size="sm" className="w-auto">
                <Settings className="h-4 w-4 mr-2" />
                ตั้งค่า
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
