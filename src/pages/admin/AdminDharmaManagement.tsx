
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Search, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDharmaManagement = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState([
    { id: 1, title: 'หลักการสมาธิเบื้องต้น', category: 'สมาธิ', writer: 'พระอาจารย์สุเมธ', status: 'published', views: 245, date: '2024-01-15' },
    { id: 2, title: 'การปฏิบัติวิปัสสนา', category: 'วิปัสสนา', writer: 'พระอาจารย์วิทยา', status: 'draft', views: 0, date: '2024-01-14' },
    { id: 3, title: 'ศีล สมาธิ ปัญญา', category: 'หลักธรรม', writer: 'พระอาจารย์ธรรม', status: 'published', views: 189, date: '2024-01-13' },
    { id: 4, title: 'การดำเนินชีวิตตามหลักธรรม', category: 'จริยธรรม', writer: 'พระอาจารย์สุเมธ', status: 'published', views: 156, date: '2024-01-12' },
    { id: 5, title: 'ประวัติวัดป่าสุญญตา', category: 'ประวัติ', writer: 'คณะผู้จัดทำ', status: 'published', views: 89, date: '2024-01-10' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['หลักธรรม', 'สมาธิ', 'วิปัสสนา', 'จริยธรรม', 'ประวัติ'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.writer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "ลบบทความสำเร็จ",
      description: "บทความถูกลบแล้ว",
    });
  };

  const totalArticles = articles.length;
  const publishedArticles = articles.filter(a => a.status === 'published').length;
  const draftArticles = articles.filter(a => a.status === 'draft').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการธรรมะมีเดีย</h1>
            <p className="text-gray-600">จัดการบทความและเนื้อหาธรรมะ</p>
          </div>
          <Link to="/admin/dharma/new">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มบทความใหม่
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">บทความทั้งหมด</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">เผยแพร่แล้ว</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ร่าง</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftArticles}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ยอดเข้าชมรวม</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>บทความทั้งหมด</CardTitle>
            <CardDescription>จัดการและแก้ไขบทความธรรมะ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ค้นหาบทความ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="เลือกหมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>หัวข้อ</TableHead>
                  <TableHead>ผู้เขียน</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ยอดเข้าชม</TableHead>
                  <TableHead>วันที่สร้าง</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{article.writer}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{article.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'published' ? 'default' : 'outline'}>
                        {article.status === 'published' ? 'เผยแพร่' : 'ร่าง'}
                      </Badge>
                    </TableCell>
                    <TableCell>{article.views.toLocaleString()}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="w-auto">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link to={`/admin/dharma/${article.id}`}>
                          <Button variant="ghost" size="sm" className="w-auto">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="w-auto"
                          onClick={() => handleDeleteArticle(article.id)}
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

export default AdminDharmaManagement;
