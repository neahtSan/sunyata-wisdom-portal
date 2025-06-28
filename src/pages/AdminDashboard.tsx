import { useEffect } from 'react';
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
  Plus,
  Clock
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
    { title: 'บทความธรรมะ', value: '24', icon: BookOpen, color: 'text-blue-600', change: '+2 เดือนนี้' },
    { title: 'กิจกรรมทั้งหมด', value: '18', icon: Calendar, color: 'text-green-600', change: '+3 เดือนนี้' },
    { title: 'การลงทะเบียนเดือนนี้', value: '38', icon: Users, color: 'text-purple-600', change: '+15 จากเดือนก่อน' },
    { title: 'ความคิดเห็นรออนุมัติ', value: '7', icon: MessageSquare, color: 'text-yellow-600', change: 'ต้องดำเนินการ' },
  ];

  const quickShortcuts = [
    {
      title: 'เพิ่มบทความธรรมะ',
      description: 'สร้างบทความธรรมะใหม่',
      icon: Plus,
      href: '/admin/dharma/new',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'เพิ่มกิจกรรมใหม่',
      description: 'สร้างกิจกรรมใหม่',
      icon: Plus,
      href: '/admin/activity/new',
      color: 'bg-green-500 hover:bg-green-600'
    }
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
      href: '/admin/activity',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    { 
      title: 'ดูการลงทะเบียน', 
      description: 'ตรวจสอบรายชื่อผู้สมัครปฏิบัติธรรม',
      icon: Users,
      href: '/admin/registrations',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
  ];

  const recentActions = [
    { action: 'เพิ่มบทความ "หลักการสมาธิขั้นสูง"', user: 'admin', time: '2 ชั่วโมงที่แล้ว', type: 'create' },
    { action: 'อนุมัติความคิดเห็น 3 รายการ', user: 'admin', time: '4 ชั่วโมงที่แล้ว', type: 'approve' },
    { action: 'แก้ไขกิจกรรม "ปฏิบัติธรรมประจำสัปดาห์"', user: 'admin', time: '6 ชั่วโมงที่แล้ว', type: 'edit' },
    { action: 'อัปโหลดภาพใหม่ 5 รูป', user: 'admin', time: '1 วันที่แล้ว', type: 'upload' },
    { action: 'สร้างผู้ใช้ใหม่', user: 'admin', time: '2 วันที่แล้ว', type: 'create' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">แผงควบคุม Sala</h1>
          <p className="text-gray-600">ระบบจัดการเนื้อหาวัดป่าสุญญตา</p>
        </div>

        {/* Quick Shortcuts */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">ทางลัด</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickShortcuts.map((shortcut, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <Button 
                    className={`w-full justify-start ${shortcut.color} text-white`}
                    onClick={() => navigate(shortcut.href)}
                  >
                    <shortcut.icon className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">{shortcut.title}</div>
                      <div className="text-xs opacity-90">{shortcut.description}</div>
                    </div>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">สถิติรวม</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">การจัดการเนื้อหา</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Recent Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              กิจกรรมการดูแลล่าสุด
            </CardTitle>
            <CardDescription>บันทึกการดำเนินการล่าสุดของผู้ดูแลระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActions.map((action, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded border-l-4 border-l-green-500">
                  <div className="flex-1">
                    <span className="font-medium text-gray-800">{action.action}</span>
                    <div className="text-sm text-gray-600">โดย {action.user}</div>
                  </div>
                  <span className="text-sm text-gray-500">{action.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                className="w-full md:w-auto"
                onClick={() => navigate('/admin/log')}
              >
                ดูบันทึกทั้งหมด
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
