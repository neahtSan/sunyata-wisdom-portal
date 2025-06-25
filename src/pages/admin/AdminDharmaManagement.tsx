
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Eye, Search, BookOpen, ExternalLink, Filter, BarChart3, Calendar, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDharmaManagement = () => {
  const { toast } = useToast();
  const [articles, setArticles] = useState([
    { id: 1, title: 'หลักการสมาธิเบื้องต้น', category: 'สมาธิ', writer: 'พระอาจารย์สุเมธ', status: 'published', views: 245, likes: 12, comments: 3, date: '2024-01-15', readTime: 8 },
    { id: 2, title: 'การปฏิบัติวิปัสสนา', category: 'วิปัสสนา', writer: 'พระอาจารย์วิทยา', status: 'draft', views: 0, likes: 0, comments: 0, date: '2024-01-14', readTime: 6 },
    { id: 3, title: 'ศีล สมาธิ ปัญญา', category: 'หลักธรรม', writer: 'พระอาจารย์ธรรม', status: 'published', views: 189, likes: 8, comments: 5, date: '2024-01-13', readTime: 10 },
    { id: 4, title: 'การดำเนินชีวิตตามหลักธรรม', category: 'จริยธรรม', writer: 'พระอาจารย์สุเมธ', status: 'scheduled', views: 0, likes: 0, comments: 0, date: '2024-01-20', readTime: 7 },
    { id: 5, title: 'ประวัติวัดป่าสุญญตา', category: 'ประวัติ', writer: 'คณะผู้จัดทำ', status: 'published', views: 89, likes: 5, comments: 2, date: '2024-01-10', readTime: 5 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWriter, setSelectedWriter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = ['หลักธรรม', 'สมาธิ', 'วิปัสสนา', 'จริยธรรม', 'ประวัติ', 'การปฏิบัติ', 'พิธีกรรม', 'ธรรมนำใจ'];
  const writers = [...new Set(articles.map(a => a.writer))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.writer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    const matchesWriter = selectedWriter === 'all' || article.writer === selectedWriter;
    return matchesSearch && matchesCategory && matchesStatus && matchesWriter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
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
  const scheduledArticles = articles.filter(a => a.status === 'scheduled').length;
  const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
  const totalLikes = articles.reduce((sum, a) => sum + a.likes, 0);
  const avgReadTime = Math.round(articles.reduce((sum, a) => sum + a.readTime, 0) / articles.length);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการธรรมะมีเดีย</h1>
            <p className="text-gray-600">จัดการบทความและเนื้อหาธรรมะ</p>
          </div>
          <Link to="/admin/dharma-article/new">
            <Button className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มบทความใหม่
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="articles">บทความทั้งหมด</TabsTrigger>
            <TabsTrigger value="analytics">สถิติและการวิเคราะห์</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">บทความทั้งหมด</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalArticles}</div>
                  <p className="text-xs text-muted-foreground">+2 จากเดือนที่แล้ว</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">เผยแพร่แล้ว</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{publishedArticles}</div>
                  <p className="text-xs text-muted-foreground">ร่าง: {draftArticles} | กำหนดเวลา: {scheduledArticles}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ยอดเข้าชมรวม</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">เฉลี่ย {Math.round(totalViews/publishedArticles)} ต่อบทความ</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">การมีส่วนร่วม</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalLikes}</div>
                  <p className="text-xs text-muted-foreground">ถูกใจทั้งหมด</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <CardTitle>บทความล่าสุด</CardTitle>
                <CardDescription>บทความที่ถูกแก้ไขล่าสุด</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>หัวข้อ</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>ยอดเข้าชม</TableHead>
                      <TableHead>วันที่</TableHead>
                      <TableHead>การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {articles.slice(0, 5).map((article) => (
                      <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.title}</TableCell>
                        <TableCell>
                          <Badge variant={article.status === 'published' ? 'default' : article.status === 'scheduled' ? 'secondary' : 'outline'}>
                            {article.status === 'published' ? 'เผยแพร่' : article.status === 'scheduled' ? 'กำหนดเวลา' : 'ร่าง'}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.views.toLocaleString()}</TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link to={`/admin/dharma-article/${article.id}`}>
                              <Button variant="ghost" size="sm" title="แก้ไข" className="w-auto">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>บทความทั้งหมด</CardTitle>
                <CardDescription>จัดการและแก้ไขบทความธรรมะ</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Enhanced Filters */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <div className="md:col-span-2">
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
                    <SelectTrigger>
                      <SelectValue placeholder="หมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทุกหมวดหมู่</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="สถานะ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทุกสถานะ</SelectItem>
                      <SelectItem value="published">เผยแพร่</SelectItem>
                      <SelectItem value="draft">ร่าง</SelectItem>
                      <SelectItem value="scheduled">กำหนดเวลา</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="เรียงตาม" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">วันที่ล่าสุด</SelectItem>
                      <SelectItem value="views">ยอดเข้าชม</SelectItem>
                      <SelectItem value="likes">ถูกใจมากสุด</SelectItem>
                      <SelectItem value="title">ชื่อบทความ</SelectItem>
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
                      <TableHead>ถูกใจ</TableHead>
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
                          <Badge variant={article.status === 'published' ? 'default' : article.status === 'scheduled' ? 'secondary' : 'outline'}>
                            {article.status === 'published' ? 'เผยแพร่' : article.status === 'scheduled' ? 'กำหนดเวลา' : 'ร่าง'}
                          </Badge>
                        </TableCell>
                        <TableCell>{article.views.toLocaleString()}</TableCell>
                        <TableCell>{article.likes}</TableCell>
                        <TableCell>{article.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Link to={`/admin/dharma-article/${article.id}/preview`}>
                              <Button variant="ghost" size="sm" title="ดูตัวอย่าง" className="w-auto">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/admin/dharma-article/${article.id}`}>
                              <Button variant="ghost" size="sm" title="แก้ไข" className="w-auto">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              title="ลบ"
                              className="w-auto text-red-600 hover:text-red-700"
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
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ยอดเข้าชมตามหมวดหมู่</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.slice(0, 5).map(category => {
                      const categoryViews = articles
                        .filter(a => a.category === category)
                        .reduce((sum, a) => sum + a.views, 0);
                      const percentage = totalViews > 0 ? (categoryViews / totalViews * 100) : 0;
                      
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{categoryViews}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สถิติการเขียน</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">เวลาอ่านเฉลี่ย</span>
                    <span className="font-semibold">{avgReadTime} นาที</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">บทความยอดนิยม</span>
                    <span className="font-semibold">{articles.reduce((max, a) => a.views > max.views ? a : max, articles[0])?.title.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ผู้เขียนที่ผลิตผลมากสุด</span>
                    <span className="font-semibold">พระอาจารย์สุเมธ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">อัตราการมีส่วนร่วม</span>
                    <span className="font-semibold">{Math.round(totalLikes/totalViews*100)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDharmaManagement;
