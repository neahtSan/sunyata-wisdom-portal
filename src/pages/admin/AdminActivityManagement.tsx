
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Calendar, Users, Images, Search, Clock, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminActivityManagement = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState([
    { 
      id: 1, 
      title: 'ปฏิบัติธรรมประจำสัปดาห์', 
      date: '2024-03-20', 
      time: '18:00', 
      participants: 25, 
      maxParticipants: 50, 
      location: 'ศาลาหลัก',
      type: 'ปฏิบัติธรรม',
      images: ['https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
    },
    { 
      id: 2, 
      title: 'อบรมสมาธิเข้มข้น', 
      date: '2024-03-25', 
      time: '09:00', 
      participants: 15, 
      maxParticipants: 30, 
      location: 'ห้องปฏิบัติธรรม',
      type: 'อบรม',
      images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']
    },
    { 
      id: 3, 
      title: 'บรรยายธรรมพิเศษ', 
      date: '2024-01-15', 
      time: '19:00', 
      participants: 45, 
      maxParticipants: 50, 
      location: 'ศาลาหลัก',
      type: 'บรรยาย',
      images: [
        'https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    { 
      id: 4, 
      title: 'งานบุญประจำเดือน', 
      date: '2024-01-10', 
      time: '08:00', 
      participants: 80, 
      maxParticipants: 100, 
      location: 'บริเวณวัด',
      type: 'งานบุญ',
      images: [
        'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate activities into upcoming and past
  const upcomingActivities = activities
    .filter(activity => new Date(activity.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastActivities = activities
    .filter(activity => new Date(activity.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredUpcoming = upcomingActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPast = pastActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
    toast({
      title: "ลบกิจกรรมสำเร็จ",
      description: "กิจกรรมถูกลบแล้ว",
    });
  };

  const formatThaiDate = (dateString: string) => {
    const date = new Date(dateString);
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

  const ActivityTable = ({ activities, type }: { activities: any[], type: 'upcoming' | 'past' }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ชื่อกิจกรรม</TableHead>
          <TableHead>ประเภท</TableHead>
          <TableHead>วันที่</TableHead>
          <TableHead>เวลา</TableHead>
          <TableHead>สถานที่</TableHead>
          <TableHead>ผู้เข้าร่วม</TableHead>
          <TableHead>รูปภาพ</TableHead>
          <TableHead>การจัดการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">{activity.title}</TableCell>
            <TableCell>
              <Badge variant="secondary">{activity.type}</Badge>
            </TableCell>
            <TableCell>{formatThaiDate(activity.date)}</TableCell>
            <TableCell>{activity.time}</TableCell>
            <TableCell>{activity.location}</TableCell>
            <TableCell>
              {type === 'upcoming' ? (
                <span>{activity.participants}/{activity.maxParticipants}</span>
              ) : (
                <span>{activity.participants} คน</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Images className="h-4 w-4 mr-1" />
                <span>{activity.images.length}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link to={`/activity/${activity.id}`}>
                  <Button variant="ghost" size="sm" title="ดูแกลเลอรี่" className="w-auto">
                    <Images className="h-4 w-4" />
                  </Button>
                </Link>
                {type === 'upcoming' && (
                  <Button variant="ghost" size="sm" title="ดูรายชื่อผู้เข้าร่วม" className="w-auto">
                    <Users className="h-4 w-4" />
                  </Button>
                )}
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
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการกิจกรรม</h1>
            <p className="text-gray-600">จัดการกิจกรรมที่กำลังจะเกิดขึ้นและแกลเลอรี่กิจกรรมที่ผ่านมา</p>
          </div>
          <Link to="/admin/activity/new">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มกิจกรรมใหม่
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <CardTitle className="text-sm font-medium">กิจกรรมที่กำลังมา</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{upcomingActivities.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรมที่ผ่านมา</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{pastActivities.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้เข้าร่วมรวม</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.reduce((sum, e) => sum + e.participants, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex gap-4 mb-4">
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
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  กิจกรรมที่กำลังมาถึง ({upcomingActivities.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  แกลเลอรี่กิจกรรมที่ผ่านมา ({pastActivities.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardDescription>
                      กิจกรรมที่กำลังจะเกิดขึ้น - สามารถจัดการการลงทะเบียนและรายละเอียด
                    </CardDescription>
                  </div>
                  {filteredUpcoming.length > 0 ? (
                    <ActivityTable activities={filteredUpcoming} type="upcoming" />
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'ไม่พบกิจกรรมที่ตรงกับการค้นหา' : 'ยังไม่มีกิจกรรมที่กำลังจะเกิดขึ้น'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="past">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardDescription>
                      กิจกรรมที่ผ่านมาแล้ว - สามารถจัดการภาพและข้อมูลสำหรับแกลเลอรี่
                    </CardDescription>
                  </div>
                  {filteredPast.length > 0 ? (
                    <ActivityTable activities={filteredPast} type="past" />
                  ) : (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">
                        {searchTerm ? 'ไม่พบกิจกรรมที่ตรงกับการค้นหา' : 'ยังไม่มีกิจกรรมที่ผ่านมา'}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityManagement;
