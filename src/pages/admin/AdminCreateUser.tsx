
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Users, Shield, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminCreateUser = () => {
  const { toast } = useToast();
  const [admins, setAdmins] = useState([
    { id: 1, username: 'admin', email: 'admin@sala.com', role: 'super_admin', status: 'active', lastLogin: '2024-01-20', createdDate: '2024-01-01' },
    { id: 2, username: 'editor', email: 'editor@sala.com', role: 'editor', status: 'active', lastLogin: '2024-01-19', createdDate: '2024-01-10' },
    { id: 3, username: 'moderator', email: 'moderator@sala.com', role: 'moderator', status: 'inactive', lastLogin: '2024-01-15', createdDate: '2024-01-15' },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'editor',
    status: 'active'
  });

  const roles = [
    { value: 'super_admin', label: 'ผู้ดูแลระบบสูงสุด', description: 'สิทธิ์เต็มทุกฟีเจอร์' },
    { value: 'admin', label: 'ผู้ดูแลระบบ', description: 'จัดการเนื้อหาและผู้ใช้' },
    { value: 'editor', label: 'บรรณาธิการ', description: 'จัดการเนื้อหาและบทความ' },
    { value: 'moderator', label: 'ผู้ดูแล', description: 'อนุมัติความคิดเห็นและตอบกลับ' }
  ];

  const handleAddAdmin = () => {
    if (newAdmin.username && newAdmin.email && newAdmin.password && newAdmin.confirmPassword) {
      if (newAdmin.password !== newAdmin.confirmPassword) {
        toast({
          title: "รหัสผ่านไม่ตรงกัน",
          description: "กรุณาตรวจสอบรหัสผ่านให้ตรงกัน",
          variant: "destructive",
        });
        return;
      }

      const admin = {
        id: Date.now(),
        ...newAdmin,
        lastLogin: '',
        createdDate: new Date().toISOString().split('T')[0]
      };
      setAdmins([...admins, admin]);
      setNewAdmin({ username: '', email: '', password: '', confirmPassword: '', role: 'editor', status: 'active' });
      setIsAddDialogOpen(false);
      toast({
        title: "สร้างผู้ดูแลสำเร็จ",
        description: "ผู้ดูแลใหม่ถูกสร้างแล้ว",
      });
    }
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
    toast({
      title: "ลบผู้ดูแลสำเร็จ",
      description: "ผู้ดูแลถูกลบแล้ว",
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setAdmins(admins.map(admin => 
      admin.id === id ? { ...admin, status: newStatus } : admin
    ));
    toast({
      title: "เปลี่ยนสถานะสำเร็จ",
      description: "สถานะผู้ดูแลถูกเปลี่ยนแล้ว",
    });
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = roles.find(r => r.value === role);
    switch (role) {
      case 'super_admin':
        return <Badge className="bg-red-100 text-red-800">{roleConfig?.label}</Badge>;
      case 'admin':
        return <Badge className="bg-blue-100 text-blue-800">{roleConfig?.label}</Badge>;
      case 'editor':
        return <Badge className="bg-green-100 text-green-800">{roleConfig?.label}</Badge>;
      case 'moderator':
        return <Badge className="bg-yellow-100 text-yellow-800">{roleConfig?.label}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">ใช้งานได้</Badge>;
      case 'inactive':
        return <Badge variant="outline">ใช้งานไม่ได้</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const stats = {
    total: admins.length,
    active: admins.filter(a => a.status === 'active').length,
    superAdmins: admins.filter(a => a.role === 'super_admin').length,
    editors: admins.filter(a => a.role === 'editor').length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการผู้ดูแลระบบ</h1>
            <p className="text-gray-600">สร้างและจัดการบัญชีผู้ดูแลระบบ</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                สร้างผู้ดูแลใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>สร้างผู้ดูแลใหม่</DialogTitle>
                <DialogDescription>กรอกข้อมูลสำหรับสร้างบัญชีผู้ดูแลใหม่</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">ชื่อผู้ใช้</Label>
                  <Input
                    id="username"
                    value={newAdmin.username}
                    onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                    placeholder="กรอกชื่อผู้ใช้"
                  />
                </div>
                <div>
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    placeholder="กรอกอีเมล"
                  />
                </div>
                <div>
                  <Label htmlFor="password">รหัสผ่าน</Label>
                  <Input
                    id="password"
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    placeholder="กรอกรหัสผ่าน"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={newAdmin.confirmPassword}
                    onChange={(e) => setNewAdmin({...newAdmin, confirmPassword: e.target.value})}
                    placeholder="ยืนยันรหัสผ่าน"
                  />
                </div>
                <div>
                  <Label htmlFor="role">บทบาท</Label>
                  <Select value={newAdmin.role} onValueChange={(value) => setNewAdmin({...newAdmin, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกบทบาท" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role.value} value={role.value}>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-gray-500">{role.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">สถานะ</Label>
                  <Select value={newAdmin.status} onValueChange={(value) => setNewAdmin({...newAdmin, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">ใช้งานได้</SelectItem>
                      <SelectItem value="inactive">ใช้งานไม่ได้</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddAdmin} className="flex-1">สร้างบัญชี</Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">ยกเลิก</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ดูแลทั้งหมด</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ใช้งานได้</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ผู้ดูแลสูงสุด</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.superAdmins}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">บรรณาธิการ</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.editors}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>รายชื่อผู้ดูแลระบบ</CardTitle>
            <CardDescription>จัดการบัญชีและสิทธิ์ของผู้ดูแลระบบ</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อผู้ใช้</TableHead>
                  <TableHead>อีเมล</TableHead>
                  <TableHead>บทบาท</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>เข้าสู่ระบบล่าสุด</TableHead>
                  <TableHead>วันที่สร้าง</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.username}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{getRoleBadge(admin.role)}</TableCell>
                    <TableCell>{getStatusBadge(admin.status)}</TableCell>
                    <TableCell>{admin.lastLogin || 'ยังไม่เคย'}</TableCell>
                    <TableCell>{admin.createdDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Select
                          value={admin.status}
                          onValueChange={(value) => handleStatusChange(admin.id, value)}
                        >
                          <SelectTrigger className="w-28">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">เปิดใช้</SelectItem>
                            <SelectItem value="inactive">ปิดใช้</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteAdmin(admin.id)}
                          disabled={admin.role === 'super_admin'}
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

export default AdminCreateUser;
