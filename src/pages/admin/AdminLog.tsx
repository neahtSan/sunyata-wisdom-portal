
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Search, Filter, User, Activity, RefreshCw } from 'lucide-react';

const AdminLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  // Sample admin activity logs
  const activityLogs = [
    {
      id: 1,
      action: 'เผยแพร่บทความ',
      adminUser: 'admin',
      entity: 'สมาธิเบื้องต้น',
      entityType: 'บทความ',
      timestamp: '2024-01-20 14:30:25',
      details: 'เผยแพร่บทความใหม่เรื่อง "หลักการสมาธิเบื้องต้น สำหรับผู้เริ่มต้น"',
      status: 'สำเร็จ'
    },
    {
      id: 2,
      action: 'อนุมัติความคิดเห็น',
      adminUser: 'admin',
      entity: 'ความคิดเห็นจากคุณสมศรี',
      entityType: 'ความคิดเห็น',
      timestamp: '2024-01-20 13:15:10',
      details: 'อนุมัติความคิดเห็นในบทความ "หลักการสมาธิเบื้องต้น"',
      status: 'สำเร็จ'
    },
    {
      id: 3,
      action: 'เพิ่มกิจกรรม',
      adminUser: 'admin',
      entity: 'ปฏิบัติธรรมประจำสัปดาห์',
      entityType: 'กิจกรรม',
      timestamp: '2024-01-19 16:45:30',
      details: 'เพิ่มกิจกรรมใหม่ "ปฏิบัติธรรมประจำสัปดาห์" วันที่ 25 มกราคม 2567',
      status: 'สำเร็จ'
    },
    {
      id: 4,
      action: 'อัปเดตข้อมูลวัด',
      adminUser: 'admin',
      entity: 'ประวัติวัดป่าสุญญตา',
      entityType: 'หน้าเกี่ยวกับเรา',
      timestamp: '2024-01-19 11:20:15',
      details: 'อัปเดตข้อมูลประวัติวัดและข้อมูลพระอาจารย์',
      status: 'สำเร็จ'
    },
    {
      id: 5,
      action: 'ลบความคิดเห็น',
      adminUser: 'moderator',
      entity: 'ความคิดเห็นไม่เหมาะสม',
      entityType: 'ความคิดเห็น',
      timestamp: '2024-01-18 09:30:45',
      details: 'ลบความคิดเห็นที่ไม่เหมาะสมในบทความ "การปฏิบัติธรรมในชีวิตประจำวัน"',
      status: 'สำเร็จ'
    },
    {
      id: 6,
      action: 'เปลี่ยนสถานะกิจกรรม',
      adminUser: 'admin',
      entity: 'อบรมสมาธิเข้มข้น',
      entityType: 'กิจกรรม',
      timestamp: '2024-01-17 15:10:20',
      details: 'เปลี่ยนสถานะกิจกรรม "อบรมสมาธิเข้มข้น" เป็น "เสร็จสิ้น"',
      status: 'สำเร็จ'
    },
    {
      id: 7,
      action: 'สร้างผู้ดูแลใหม่',
      adminUser: 'admin',
      entity: 'moderator',
      entityType: 'ผู้ใช้งาน',
      timestamp: '2024-01-16 10:25:30',
      details: 'สร้างบัญชีผู้ดูแลใหม่สำหรับ "moderator"',
      status: 'สำเร็จ'
    },
    {
      id: 8,
      action: 'อัปโหลดรูปภาพ',
      adminUser: 'admin',
      entity: 'รูปกิจกรรมปฏิบัติธรรม',
      entityType: 'ไฟล์',
      timestamp: '2024-01-15 14:40:12',
      details: 'อัปโหลดรูปภาพกิจกรรมปฏิบัติธรรมประจำสัปดาห์',
      status: 'สำเร็จ'
    }
  ];

  const actionTypes = ['all', 'เผยแพร่บทความ', 'อนุมัติความคิดเห็น', 'เพิ่มกิจกรรม', 'อัปเดตข้อมูลวัด', 'ลบความคิดเห็น', 'เปลี่ยนสถานะกิจกรรม', 'สร้างผู้ดูแลใหม่', 'อัปโหลดรูปภาพ'];
  const users = ['all', 'admin', 'moderator'];

  // Filter logs
  const filteredLogs = activityLogs.filter(log => {
    const searchMatch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const actionMatch = selectedAction === 'all' || log.action === selectedAction;
    const userMatch = selectedUser === 'all' || log.adminUser === selectedUser;
    return searchMatch && actionMatch && userMatch;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'เผยแพร่บทความ':
      case 'เพิ่มกิจกรรม':
      case 'สร้างผู้ดูแลใหม่':
        return 'bg-green-100 text-green-800';
      case 'อนุมัติความคิดเห็น':
      case 'อัปเดตข้อมูลวัด':
        return 'bg-blue-100 text-blue-800';
      case 'ลบความคิดเห็น':
        return 'bg-red-100 text-red-800';
      case 'เปลี่ยนสถานะกิจกรรม':
        return 'bg-yellow-100 text-yellow-800';
      case 'อัปโหลดรูปภาพ':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">บันทึกกิจกรรมผู้ดูแล</h1>
            <p className="text-gray-600">ติดตามกิจกรรมและการเปลี่ยนแปลงที่ทำโดยผู้ดูแลระบบ</p>
          </div>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            รีเฟรช
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรมทั้งหมด</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activityLogs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">วันนี้</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ดูแลที่ใช้งาน</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">การดำเนินการสำเร็จ</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>ตัวกรอง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ค้นหากิจกรรม, รายละเอียด, หรือเอนทิตี..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Action Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedAction}
                  onChange={(e) => setSelectedAction(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none"
                >
                  <option value="all">ประเภทการดำเนินการทั้งหมด</option>
                  {actionTypes.slice(1).map(action => (
                    <option key={action} value={action}>{action}</option>
                  ))}
                </select>
              </div>

              {/* User Filter */}
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:outline-none"
                >
                  <option value="all">ผู้ดูแลทั้งหมด</option>
                  {users.slice(1).map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>บันทึกกิจกรรม</CardTitle>
            <CardDescription>รายการกิจกรรมทั้งหมดที่ทำโดยผู้ดูแลระบบ ({filteredLogs.length} รายการ)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ผู้ดูแล</TableHead>
                  <TableHead>การดำเนินการ</TableHead>
                  <TableHead>เอนทิตี</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                  <TableHead>สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {formatDateTime(log.timestamp)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.adminUser}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(log.action)}>{log.action}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.entity}</div>
                        <div className="text-sm text-gray-500">{log.entityType}</div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm text-gray-600 line-clamp-2">{log.details}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredLogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">ไม่พบบันทึกกิจกรรมที่ตรงกับการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminLog;
