
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminEventsManagement = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([
    { id: 1, title: 'ปฏิบัติธรรมประจำสัปดาห์', date: '2024-01-20', time: '18:00', participants: 25, maxParticipants: 50, status: 'upcoming' },
    { id: 2, title: 'อบรมสมาธิเข้มข้น', date: '2024-01-25', time: '09:00', participants: 15, maxParticipants: 30, status: 'upcoming' },
    { id: 3, title: 'บรรยายธรรมพิเศษ', date: '2024-01-15', time: '19:00', participants: 45, maxParticipants: 50, status: 'completed' },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: '',
    location: '',
    requirements: ''
  });

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event = {
        id: Date.now(),
        ...newEvent,
        maxParticipants: parseInt(newEvent.maxParticipants) || 0,
        participants: 0,
        status: 'upcoming'
      };
      setEvents([...events, event]);
      setNewEvent({ title: '', description: '', date: '', time: '', maxParticipants: '', location: '', requirements: '' });
      setIsAddDialogOpen(false);
      toast({
        title: "เพิ่มกิจกรรมสำเร็จ",
        description: "กิจกรรมใหม่ถูกเพิ่มแล้ว",
      });
    }
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
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
            <p className="text-gray-600">จัดการกิจกรรมและการลงทะเบียน</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มกิจกรรมใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>เพิ่มกิจกรรมใหม่</DialogTitle>
                <DialogDescription>กรอกข้อมูลกิจกรรมใหม่</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">ชื่อกิจกรรม</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="กรอกชื่อกิจกรรม"
                  />
                </div>
                <div>
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    rows={3}
                    placeholder="กรอกรายละเอียดกิจกรรม"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">วันที่</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">เวลา</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="maxParticipants">จำนวนผู้เข้าร่วมสูงสุด</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={newEvent.maxParticipants}
                    onChange={(e) => setNewEvent({...newEvent, maxParticipants: e.target.value})}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="location">สถานที่</Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    placeholder="ศาลาหลัก วัดป่าสุญญตา"
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">ข้อกำหนด/ข้อแนะนำ</Label>
                  <Textarea
                    id="requirements"
                    value={newEvent.requirements}
                    onChange={(e) => setNewEvent({...newEvent, requirements: e.target.value})}
                    rows={2}
                    placeholder="เช่น แต่งกายสีขาว, นำขันน้ำมาด้วย"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddEvent} className="flex-1">บันทึก</Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">ยกเลิก</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรมทั้งหมด</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">กิจกรรมที่กำลังมาถึง</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.filter(e => e.status === 'upcoming').length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้เข้าร่วมทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{events.reduce((sum, e) => sum + e.participants, 0)}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>กิจกรรมทั้งหมด</CardTitle>
            <CardDescription>จัดการกิจกรรมและดูรายชื่อผู้เข้าร่วม</CardDescription>
          </CardHeader>
          <CardContent>
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
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.time}</TableCell>
                    <TableCell>{event.participants}/{event.maxParticipants}</TableCell>
                    <TableCell>
                      <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                        {event.status === 'upcoming' ? 'กำลังมาถึง' : 'เสร็จสิ้น'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteEvent(event.id)}
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

export default AdminEventsManagement;
