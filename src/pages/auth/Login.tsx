
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual Supabase authentication
      console.log('Login attempt:', { email, password });
      
      // Mock successful login
      setTimeout(() => {
        localStorage.setItem('userAuth', JSON.stringify({
          id: '1',
          email,
          firstName: 'ผู้ใช้',
          lastName: 'ทดสอบ',
          isAuthenticated: true
        }));
        
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "ยินดีต้อนรับสู่วัดป่าสุญญตา"
        });
        
        navigate('/profile');
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: "โปรดตรวจสอบอีเมลและรหัสผ่าน",
        variant: "destructive"
      });
    }
  };

  const handleRegister = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual Supabase authentication
      console.log('Register attempt:', userData);
      
      // Mock successful registration
      setTimeout(() => {
        localStorage.setItem('userAuth', JSON.stringify({
          id: '1',
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          isAuthenticated: true
        }));
        
        toast({
          title: "สมัครสมาชิกสำเร็จ",
          description: "ยินดีต้อนรับสู่วัดป่าสุญญตา"
        });
        
        navigate('/profile');
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "สมัครสมาชิกไม่สำเร็จ",
        description: "เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง",
        variant: "destructive"
      });
    }
  };

  const handleForgotPassword = (email: string) => {
    toast({
      title: "ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว",
      description: `โปรดตรวจสอบอีเมล ${email} เพื่อรีเซ็ตรหัสผ่าน`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับสู่หน้าหลัก
          </Button>
        </div>

        {/* Auth Forms */}
        {mode === 'login' ? (
          <LoginForm
            onLogin={handleLogin}
            onForgotPassword={handleForgotPassword}
            onSwitchToRegister={() => setMode('register')}
            isLoading={isLoading}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={() => setMode('login')}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
