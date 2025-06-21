
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDharmaManagement = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState([
    { id: 1, title: 'หลักการสมาธิเบื้องต้น', category: 'สมาธิ', status: 'published', views: 245, date: '2024-01-15' },
    { id: 2, title: 'การปฏิบัติวิปัสสนา', category: 'วิปัสสนา', status: 'draft', views: 0, date: '2024-01-14' },
    { id: 3, title: 'ศีล สมาธิ ปัญญา', category: 'หลักธรรม', status: 'published', views: 189, views: 189, date: '2024-01-13' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: '',
    content: '',
    tags: '',
    status: 'draft'
  });

  const categories = ['หลักธรรม', 'สมาধิ', 'วิปัสสนา', 'จริยธรรม', 'ประวัติ'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddArticle = () => {
    if (newArticle.title && newArticle.category && newArticle.content) {
      const article = {
        id: Date.now(),
        ...newArticle,
        views: 0,
        date: new Date().toISOString().split('T')[0]
      };
      setArticles([...articles, article]);
      setNewArticle({ title: '', category: '', content: '', tags: '', status: 'draft' });
      setIsAddDialogOpen(false);
      toast({
        title: "เพิ่มบทความสำเร็จ",
        description: "บทความใหม่ถูกเพิ่มแล้ว",
      });
    }
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
    toast({
      title: "ลบบทความสำเร็จ",
      description: "บทความถูกลบแล้ว",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการธรรมะมีเดีย</h1>
            <p className="text-gray-600">จัดการบทความและเนื้อหาธรรมะ</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                เพิ่มบทความใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>เพิ่มบทความใหม่</DialogTitle>
                <DialogDescription>กรอกข้อมูลบทความธรรมะใหม่</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">หัวข้อบทความ</Label>
                  <Input
                    id="title"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                    placeholder="กรอกหัวข้อบทความ"
                  />
                </div>
                <div>
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Select value={newArticle.category} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content">เนื้อหา</Label>
                  <Textarea
                    id="content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                    rows={6}
                    placeholder="กรอกเนื้อหาบทความ"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">แท็ก (คั่นด้วยเครื่องหมายจุลภาค)</Label>
                  <Input
                    id="tags"
                    value={newArticle.tags}
                    onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                    placeholder="เช่น ธรรมะ, สมาธิ, วิปัสสนา"
                  />
                </div>
                <div>
                  <Label htmlFor="status">สถานะ</Label>
                  <Select value={newArticle.status} onValueChange={(value) => setNewArticle({...newArticle, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">ร่าง</SelectItem>
                      <SelectItem value="published">เผยแพร่</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleAddArticle} className="flex-1">บันทึก</Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">ยกเลิก</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>จำนวนผู้เข้าชม</TableHead>
                  <TableHead>วันที่สร้าง</TableHead>
                  <TableHead>การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{article.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={article.status === 'published' ? 'default' : 'outline'}>
                        {article.status === 'published' ? 'เผยแพร่' : 'ร่าง'}
                      </Badge>
                    </TableCell>
                    <TableCell>{article.views}</TableCell>
                    <TableCell>{article.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
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
