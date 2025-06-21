
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - in real app, this would be API call
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'sala2024') {
        localStorage.setItem('adminAuth', 'true');
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "ยินดีต้อนรับสู่ระบบจัดการ Sala",
        });
        navigate('/admin/dashboard');
      } else {
        toast({
          title: "เข้าสู่ระบบไม่สำเร็จ",
          description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">วัด</span>
          </div>
          <CardTitle className="text-2xl">เข้าสู่ระบบ Sala</CardTitle>
          <CardDescription>
            ระบบจัดการเนื้อหาวัดป่าสุญญตา
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="username"
                  type="text"
                  placeholder="กรอกชื่อผู้ใช้"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="กรอกรหัสผ่าน"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </Button>
          </form>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p><strong>ข้อมูลทดสอบ:</strong></p>
            <p>ชื่อผู้ใช้: admin</p>
            <p>รหัสผ่าน: sala2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
