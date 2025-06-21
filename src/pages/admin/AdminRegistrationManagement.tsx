
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Download, Filter, Users, Calendar, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminRegistrationManagement = () => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState([
    { id: 1, name: 'นายสมชาย ใจดี', email: 'somchai@email.com', phone: '081-234-5678', event: 'ปฏิบัติธรรมประจำสัปดาห์', date: '2024-01-20', status: 'confirmed', registeredDate: '2024-01-15' },
    { id: 2, name: 'นางสาวสมใส รักธรรม', email: 'somsai@email.com', phone: '082-345-6789', event: 'อบรมสมาธิเข้มข้น', date: '2024-01-25', status: 'pending', registeredDate: '2024-01-16' },
    { id: 3, name: 'นายประชา สันติสุข', email: 'pracha@email.com', phone: '083-456-7890', event: 'ปฏิบัติธรรมประจำสัปดาห์', date: '2024-01-20', status: 'confirmed', registeredDate: '2024-01-17' },
    { id: 4, name: 'นางมาลี ธรรมรัก', email: 'malee@email.com', phone: '084-567-8901', event: 'บรรยายธรรมพิเศษ', date: '2024-01-15', status: 'completed', registeredDate: '2024-01-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  const events = [...new Set(registrations.map(reg => reg.event))];

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || reg.event === eventFilter;
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setRegistrations(registrations.map(reg => 
      reg.id === id ? { ...reg, status: newStatus } : reg
    ));
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: "สถานะการลงทะเบียนถูกเปลี่ยนแล้ว",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">ยืนยันแล้ว</Badge>;
      case 'pending':
        return <Badge variant="outline">รอการยืนยัน</Badge>;
      case 'completed':
        return <Badge variant="secondary">เสร็จสิ้น</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">ยกเลิก</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = {
    total: registrations.length,
    confirmed: registrations.filter(r => r.status === 'confirmed').length,
    pending: registrations.filter(r => r.status === 'pending').length,
    thisMonth: registrations.filter(r => new Date(r.registeredDate).getMonth() === new Date().getMonth()).length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการการลงทะเบียน</h1>
            <p className="text-gray-600">ตรวจสอบและจัดการการลงทะเบียนปฏิบัติธรรม</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            ส่งออกข้อมูล
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ลงทะเบียนทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ยืนยันแล้ว</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">รอการยืนยัน</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">เดือนนี้</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisMonth}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>รายการลงทะเบียน</CardTitle>
            <CardDescription>จัดการและตรวจสอบการลงทะเบียนปฏิบัติธรรม</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาชื่อหรืออีเมล..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="กรองตามสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกสถานะ</SelectItem>
                  <SelectItem value="pending">รอการยืนยัน</SelectItem>
                  <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                  <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                  <SelectItem value="cancelled">ยกเลิก</SelectItem>
                </SelectContent>
              </Select>
              <Select value={eventFilter} onValueChange={setEventFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="กรองตามกิจกรรม" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกกิจกรรม</SelectItem>
                  {events.map(event => (
                    <SelectItem key={event} value={event}>{event}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อ-นามสกุล</TableHead>
                  <TableHead>อีเมล</TableHead>
                  <TableHead>เบอร์โทร</TableHead>
                  <TableHead>กิจกรรม</TableHead>
                  <TableHead>วันที่กิจกรรม</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.name}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.phone}</TableCell>
                    <TableCell>{registration.event}</TableCell>
                    <TableCell>{registration.date}</TableCell>
                    <TableCell>{getStatusBadge(registration.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedRegistration(registration)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>รายละเอียดการลงทะเบียน</DialogTitle>
                            </DialogHeader>
                            {selectedRegistration && (
                              <div className="space-y-4">
                                <div><strong>ชื่อ:</strong> {selectedRegistration.name}</div>
                                <div><strong>อีเมล:</strong> {selectedRegistration.email}</div>
                                <div><strong>เบอร์โทร:</strong> {selectedRegistration.phone}</div>
                                <div><strong>กิจกรรม:</strong> {selectedRegistration.event}</div>
                                <div><strong>วันที่กิจกรรม:</strong> {selectedRegistration.date}</div>
                                <div><strong>วันที่ลงทะเบียน:</strong> {selectedRegistration.registeredDate}</div>
                                <div><strong>สถานะ:</strong> {getStatusBadge(selectedRegistration.status)}</div>
                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleStatusChange(selectedRegistration.id, 'confirmed')}
                                    disabled={selectedRegistration.status === 'confirmed'}
                                  >
                                    ยืนยัน
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleStatusChange(selectedRegistration.id, 'cancelled')}
                                  >
                                    ยกเลิก
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Select
                          value={registration.status}
                          onValueChange={(value) => handleStatusChange(registration.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">รอการยืนยัน</SelectItem>
                            <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                            <SelectItem value="completed">เสร็จสิ้น</SelectItem>
                            <SelectItem value="cancelled">ยกเลิก</SelectItem>
                          </SelectContent>
                        </Select>
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

export default AdminRegistrationManagement;
