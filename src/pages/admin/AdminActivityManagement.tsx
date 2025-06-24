
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar, Users, Images, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminActivityManagement = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState([
    { id: 1, title: 'ปฏิบัติธรรมประจำสัปดาห์', date: '2024-01-20', time: '18:00', participants: 25, maxParticipants: 50, status: 'upcoming' },
    { id: 2, title: 'อบรมสมาธิเข้มข้น', date: '2024-01-25', time: '09:00', participants: 15, maxParticipants: 30, status: 'upcoming' },
    { id: 3, title: 'บรรยายธรรมพิเศษ', date: '2024-01-15', time: '19:00', participants: 45, maxParticipants: 50, status: 'completed' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
    toast({
      title: "ลบกิจกรรมสำเร็จ",
      description: "กิจกรรมถูกลบแล้ว",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการกิจกรรม</h1>
            <p className="text-gray-600">จัดการกิจกรรมและแกลเลอรี่ภาพ</p>
          </div>
          <Link to="/admin/activity/new">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มกิจกรรมใหม่
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรมทั้งหมด</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรมที่กำลังมาถึง</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.filter(e => e.status === 'upcoming').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้เข้าร่วมทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.reduce((sum, e) => sum + e.participants, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>กิจกรรมทั้งหมด</CardTitle>
            <CardDescription>จัดการกิจกรรมและดูแกลเลอรี่ภาพ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหากิจกรรม..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อกิจกรรม</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ผู้เข้าร่วม</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.title}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>{activity.time}</TableCell>
                    <TableCell>{activity.participants}/{activity.maxParticipants}</TableCell>
                    <TableCell>
                      <Badge variant={activity.status === 'upcoming' ? 'default' : 'secondary'}>
                        {activity.status === 'upcoming' ? 'กำลังมาถึง' : 'เสร็จสิ้น'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/activity/${activity.id}`}>
                          <Button variant="ghost" size="sm" title="ดูแกลเลอรี่" className="w-auto">
                            <Images className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" title="ดูรายชื่อผู้เข้าร่วม" className="w-auto">
                          <Users className="h-4 w-4" />
                        </Button>
                        <Link to={`/admin/activity/${activity.id}`}>
                          <Button variant="ghost" size="sm" title="แก้ไข" className="w-auto">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          title="ลบ"
                          className="w-auto"
                          onClick={() => handleDeleteActivity(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityManagement;
