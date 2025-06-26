
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import UserProfile from '@/components/auth/UserProfile';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem('userAuth');
    if (!authData) {
      navigate('/auth/login');
      return;
    }

    try {
      const userData = JSON.parse(authData);
      if (!userData.isAuthenticated) {
        navigate('/auth/login');
        return;
      }

      // Mock user data - replace with actual data fetch from Supabase
      setUser({
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone || '',
        avatarUrl: '',
        joinDate: '2024-01-15',
        totalActivities: 8,
        completedActivities: 6,
        favoriteCategories: ['สมาธิ', 'ปฏิบัติธรรม', 'บทสวดมนต์']
      });
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/auth/login');
    }
  }, [navigate]);

  const handleUpdateProfile = async (updatedData) => {
    // Simulate API call - replace with actual Supabase update
    console.log('Updating profile:', updatedData);
    
    // Update local storage
    const currentAuth = JSON.parse(localStorage.getItem('userAuth') || '{}');
    const newAuth = { ...currentAuth, ...updatedData };
    localStorage.setItem('userAuth', JSON.stringify(newAuth));
    
    // Update local state
    setUser(prev => ({ ...prev, ...updatedData }));
    
    return Promise.resolve();
  };

  const handleChangePassword = async (currentPassword, newPassword) => {
    // Simulate API call - replace with actual Supabase password change
    console.log('Changing password');
    return Promise.resolve();
  };

  const handleLogout = () => {
    localStorage.removeItem('userAuth');
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้งาน วัดป่าสุญญตา"
    });
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">กำลังโหลด...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">โปรไฟล์ของฉัน</h1>
            <p className="text-gray-600">จัดการข้อมูลส่วนตัวและดูประวัติการเข้าร่วมกิจกรรม</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-600 border-red-300 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            ออกจากระบบ
          </Button>
        </div>

        {/* Profile Component */}
        <UserProfile
          user={user}
          onUpdateProfile={handleUpdateProfile}
          onChangePassword={handleChangePassword}
        />
      </div>

      <Footer />
    </div>
  );
};

export default UserProfilePage;
