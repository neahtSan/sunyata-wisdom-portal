
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Users, 
  MessageSquare, 
  Info,
  TrendingUp,
  Eye,
  FileText
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const dashboardStats = [
    { title: 'บทความทั้งหมด', value: '24', icon: FileText, color: 'text-blue-600' },
    { title: 'การลงทะเบียนเดือนนี้', value: '38', icon: Users, color: 'text-green-600' },
    { title: 'ความคิดเห็นรออนุมัติ', value: '7', icon: MessageSquare, color: 'text-yellow-600' },
    { title: 'กิจกรรมในเดือนนี้', value: '12', icon: Calendar, color: 'text-purple-600' },
  ];

  const quickActions = [
    { 
      title: 'จัดการหน้าแรก', 
      description: 'แก้ไขภาพสไลด์, ข้อความแนะนำ, วิดีโอคำรับรอง',
      icon: Home,
      href: '/admin/home',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    { 
      title: 'จัดการธรรมะมีเดีย', 
      description: 'เพิ่ม/แก้ไขบทความ, จัดการแท็ก',
      icon: BookOpen,
      href: '/admin/dharma',
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      title: 'จัดการกิจกรรม', 
      description: 'เพิ่มกิจกรรมใหม่, อัปเดตปฏิทิน',
      icon: Calendar,
      href: '/admin/events',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      title: 'ดูการลงทะเบียน', 
      description: 'ตรวจสอบรายชื่อผู้สมัครปฏิบัติธรรม',
      icon: Users,
      href: '/admin/registrations',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    { 
      title: 'อนุมัติความคิดเห็น', 
      description: 'ตรวจสอบและอนุมัติความคิดเห็นจากผู้เยี่ยมชม',
      icon: MessageSquare,
      href: '/admin/feedback',
      color: 'bg-yellow-500 hover:bg-yellow-600'
    },
    { 
      title: 'จัดการเกี่ยวกับเรา', 
      description: 'แก้ไขประวัติวัด, ข้อมูลพระอาจารย์',
      icon: Info,
      href: '/admin/about',
      color: 'bg-indigo-500 hover:bg-indigo-600'
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">แผงควบคุม Sala</h1>
          <p className="text-gray-600">ระบบจัดการเนื้อหาวัดป่าสุญญตา</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">การจัดการเนื้อหา</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-lg text-white ${action.color}`}>
                      <action.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {action.description}
                  </CardDescription>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(action.href)}
                  >
                    เข้าจัดการ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              กิจกรรมล่าสุด
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>มีการลงทะเบียนปฏิบัติธรรมใหม่จาก คุณสมชาย</span>
                <span className="text-gray-500">2 ชั่วโมงที่แล้ว</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>บทความ "หลักการสมาธิเบื้องต้น" มีผู้เข้าชม 45 ครั้ง</span>
                <span className="text-gray-500">5 ชั่วโมงที่แล้ว</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>มีความคิดเห็นใหม่รอการอนุมัติ</span>
                <span className="text-gray-500">1 วันที่แล้ว</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
