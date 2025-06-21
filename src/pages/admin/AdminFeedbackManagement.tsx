
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Eye, Check, X, Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminFeedbackManagement = () => {
  const { toast } = useToast();
  const [feedbacks, setFeedbacks] = useState([
    { 
      id: 1, 
      name: 'นายสมชาย ใจดี', 
      email: 'somchai@email.com', 
      type: 'testimonial',
      subject: 'ประสบการณ์ดีในการปฏิบัติธรรม',
      message: 'ขอบคุณวัดป่าสุญญตาที่ให้โอกาสในการปฏิบัติธรรม สถานที่สงบและเหมาะสำหรับการทำสมาธิ',
      rating: 5,
      date: '2024-01-18',
      status: 'pending'
    },
    { 
      id: 2, 
      name: 'นางสาวสมใส รักธรรม', 
      email: 'somsai@email.com', 
      type: 'suggestion',
      subject: 'ข้อเสนอแนะการปรับปรุง',
      message: 'อยากให้มีเสียงไมค์ที่ดีขึ้นในศาลาธรรม เพื่อให้ได้ยินคำสอนชัดเจนยิ่งขึ้น',
      rating: 4,
      date: '2024-01-17',
      status: 'approved'
    },
    { 
      id: 3, 
      name: 'นายประชา สันติสุข', 
      email: 'pracha@email.com', 
      type: 'testimonial',
      subject: 'ประทับใจกับการสอนของพระอาจารย์',
      message: 'คำสอนของพระอาจารย์ทำให้เข้าใจธรรมะมากขึ้น ขอบคุณมากครับ',
      rating: 5,
      date: '2024-01-16',
      status: 'approved'
    },
    { 
      id: 4, 
      name: 'นางมาลี ธรรมรัก', 
      email: 'malee@email.com', 
      type: 'complaint',
      subject: 'ปัญหาเรื่องที่จอดรถ',
      message: 'ที่จอดรถไม่เพียงพอในวันที่มีกิจกรรมใหญ่ อยากให้จัดหาพื้นที่เพิ่มเติม',
      rating: 3,
      date: '2024-01-15',
      status: 'pending'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || feedback.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id ? { ...feedback, status: newStatus } : feedback
    ));
    toast({
      title: "อัปเดตสถานะสำเร็จ",
      description: `ความคิดเห็นถูก${newStatus === 'approved' ? 'อนุมัติ' : 'ปฏิเสธ'}แล้ว`,
    });
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'testimonial':
        return <Badge className="bg-green-100 text-green-800">คำรับรอง</Badge>;
      case 'suggestion':
        return <Badge className="bg-blue-100 text-blue-800">ข้อเสนอแนะ</Badge>;
      case 'complaint':
        return <Badge className="bg-red-100 text-red-800">ข้อร้องเรียน</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">อนุมัติแล้ว</Badge>;
      case 'pending':
        return <Badge variant="outline">รอการอนุมัติ</Badge>;
      case 'rejected':
        return <Badge variant="destructive">ปฏิเสธ</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const stats = {
    total: feedbacks.length,
    pending: feedbacks.filter(f => f.status === 'pending').length,
    approved: feedbacks.filter(f => f.status === 'approved').length,
    testimonials: feedbacks.filter(f => f.type === 'testimonial').length
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการความคิดเห็น</h1>
            <p className="text-gray-600">อนุมัติและจัดการความคิดเห็นจากผู้เยี่ยมชม</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ความคิดเห็นทั้งหมด</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">รอการอนุมัติ</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">อนุมัติแล้ว</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">คำรับรอง</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.testimonials}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ความคิดเห็นและข้อเสนอแนะ</CardTitle>
            <CardDescription>ตรวจสอบและอนุมัติความคิดเห็นจากผู้เยี่ยมชม</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาความคิดเห็น..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="กรองตามประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกประเภท</SelectItem>
                  <SelectItem value="testimonial">คำรับรอง</SelectItem>
                  <SelectItem value="suggestion">ข้อเสนอแนะ</SelectItem>
                  <SelectItem value="complaint">ข้อร้องเรียน</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="กรองตามสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกสถานะ</SelectItem>
                  <SelectItem value="pending">รอการอนุมัติ</SelectItem>
                  <SelectItem value="approved">อนุมัติแล้ว</SelectItem>
                  <SelectItem value="rejected">ปฏิเสธ</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อผู้ส่ง</TableHead>
                  <TableHead>หัวข้อ</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>วันที่</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeedbacks.map((feedback) => (
                  <TableRow key={feedback.id}>
                    <TableCell className="font-medium">{feedback.name}</TableCell>
                    <TableCell>{feedback.subject}</TableCell>
                    <TableCell>{getTypeBadge(feedback.type)}</TableCell>
                    <TableCell>
                      <div className="flex">{renderStars(feedback.rating)}</div>
                    </TableCell>
                    <TableCell>{feedback.date}</TableCell>
                    <TableCell>{getStatusBadge(feedback.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedFeedback(feedback)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดความคิดเห็น</DialogTitle>
                            </DialogHeader>
                            {selectedFeedback && (
                              <div className="space-y-4">
                                <div><strong>ชื่อ:</strong> {selectedFeedback.name}</div>
                                <div><strong>อีเมล:</strong> {selectedFeedback.email}</div>
                                <div><strong>ประเภท:</strong> {getTypeBadge(selectedFeedback.type)}</div>
                                <div><strong>หัวข้อ:</strong> {selectedFeedback.subject}</div>
                                <div><strong>คะแนน:</strong> <div className="flex inline-flex">{renderStars(selectedFeedback.rating)}</div></div>
                                <div><strong>ความคิดเห็น:</strong></div>
                                <div className="p-4 bg-gray-50 rounded-lg">{selectedFeedback.message}</div>
                                <div><strong>วันที่:</strong> {selectedFeedback.date}</div>
                                <div><strong>สถานะ:</strong> {getStatusBadge(selectedFeedback.status)}</div>
                                <div className="flex gap-2 pt-4">
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleStatusChange(selectedFeedback.id, 'approved')}
                                    disabled={selectedFeedback.status === 'approved'}
                                  >
                                    <Check className="h-4 w-4 mr-2" />
                                    อนุมัติ
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleStatusChange(selectedFeedback.id, 'rejected')}
                                    disabled={selectedFeedback.status === 'rejected'}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    ปฏิเสธ
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {feedback.status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleStatusChange(feedback.id, 'approved')}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleStatusChange(feedback.id, 'rejected')}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
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

export default AdminFeedbackManagement;
