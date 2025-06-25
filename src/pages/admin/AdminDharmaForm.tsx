
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Save, Eye, Upload, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDharmaForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [article, setArticle] = useState({
    title: '',
    content: '',
    writer: '',
    category: '',
    tags: '',
    status: 'draft',
    image: ''
  });

  const categories = ['หลักธรรม', 'สมาธิ', 'วิปัสสนา', 'จริยธรรม', 'ประวัติ'];

  useEffect(() => {
    if (id && id !== 'new') {
      // Load existing article data
      const mockArticle = {
        title: 'หลักการสมาธิเบื้องต้น',
        content: 'การปฏิบัติสมาธิเป็นพื้นฐานสำคัญในการพัฒนาจิตใจ ช่วยให้เกิดความสงบและความใสใน จิตใจ เพื่อพัฒนาปัญญาให้เกิดขึ้น\n\nสมาธิมีหลายระดับ ตั้งแต่การทำให้จิตสงบเบื้องต้น ไปจนถึงการบรรลุฌานต่างๆ การฝึกสมาธิต้องอาศัยความอดทนและการฝึกฝนอย่างต่อเนื่อง\n\nหลักการสำคัญในการปฏิบัติสมาธิ:\n1. การรักษาศีล ให้จิตใจผ่องใส\n2. การควบคุมอินทรีย์ ไม่ให้ฟุ้งซ่าน\n3. การเจริญสติ ระลึกรู้ตัวอยู่เสมอ\n4. การฝึกสมาธิ ทำจิตให้มั่นคง\n\nผลของการปฏิบัติสมาธิที่ถูกต้อง จะทำให้เกิดความสุขใจ ความสงบ และเป็นรากฐานสำคัญในการพัฒนาปัญญาต่อไป',
        writer: 'พระอาจารย์สุเมธ',
        category: 'สมาธิ',
        tags: 'สมาธิ, ปฏิบัติธรรม, พื้นฐาน',
        status: 'published',
        image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      };
      setArticle(mockArticle);
    }
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!article.title.trim()) {
      newErrors.title = 'กรุณากรอกหัวข้อบทความ';
    }
    if (!article.content.trim()) {
      newErrors.content = 'กรุณากรอกเนื้อหาบทความ';
    }
    if (!article.writer.trim()) {
      newErrors.writer = 'กรุณากรอกชื่อผู้เขียน';
    }
    if (!article.category) {
      newErrors.category = 'กรุณาเลือกหมวดหมู่';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock image upload - in real app, upload to server
      const imageUrl = URL.createObjectURL(file);
      setArticle(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบถ้วน",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Mock save
    setTimeout(() => {
      toast({
        title: "บันทึกบทความสำเร็จ",
        description: "บทความได้รับการบันทึกแล้ว",
      });
      setIsLoading(false);
      navigate('/admin/dharma-article');
    }, 1500);
  };

  const isNewArticle = id === 'new';

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/dharma-article')} className="w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับ
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isNewArticle ? 'เพิ่มบทความใหม่' : 'แก้ไขบทความ'}
            </h1>
            <p className="text-gray-600">
              {isNewArticle ? 'สร้างบทความธรรมะใหม่' : 'แก้ไขบทความธรรมะ'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>เนื้อหาบทความ</CardTitle>
                <CardDescription>กรอกข้อมูลและเนื้อหาบทความ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">หัวข้อบทความ *</Label>
                  <Input
                    id="title"
                    value={article.title}
                    onChange={(e) => setArticle({...article, title: e.target.value})}
                    placeholder="กรอกหัวข้อบทความ"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                
                <div>
                  <Label htmlFor="writer">ผู้เขียน *</Label>
                  <Input
                    id="writer"
                    value={article.writer}
                    onChange={(e) => setArticle({...article, writer: e.target.value})}
                    placeholder="ชื่อผู้เขียน"
                    className={errors.writer ? 'border-red-500' : ''}
                  />
                  {errors.writer && <p className="text-red-500 text-sm mt-1">{errors.writer}</p>}
                </div>

                <div>
                  <Label htmlFor="content">เนื้อหาบทความ *</Label>
                  <Textarea
                    id="content"
                    value={article.content}
                    onChange={(e) => setArticle({...article, content: e.target.value})}
                    rows={12}
                    placeholder="กรอกเนื้อหาบทความ"
                    className={errors.content ? 'border-red-500' : ''}
                  />
                  {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                </div>

                <div>
                  <Label htmlFor="tags">แท็ก (คั่นด้วยเครื่องหมายจุลภาค)</Label>
                  <Input
                    id="tags"
                    value={article.tags}
                    onChange={(e) => setArticle({...article, tags: e.target.value})}
                    placeholder="เช่น ธรรมะ, สมาธิ, วิปัสสนา"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่า</CardTitle>
                <CardDescription>หมวดหมู่และสถานะบทความ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">หมวดหมู่ *</Label>
                  <Select value={article.category} onValueChange={(value) => setArticle({...article, category: value})}>
                    <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div>
                  <Label htmlFor="status">สถานะ</Label>
                  <Select value={article.status} onValueChange={(value) => setArticle({...article, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">ร่าง</SelectItem>
                      <SelectItem value="published">เผยแพร่</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">ภาพประกอบ</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {article.image && (
                    <div className="mt-2">
                      <img
                        src={article.image}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => setIsPreviewOpen(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>

                  {!isNewArticle && (
                    <Link to={`/admin/dharma-article/${id}/preview`} target="_blank">
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        ดูหน้าเต็ม
                      </Button>
                    </Link>
                  )}
                  
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'กำลังบันทึก...' : 'บันทึกบทความ'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>ตัวอย่างบทความ</DialogTitle>
              <DialogDescription>ตัวอย่างการแสดงผลบทความบนเว็บไซต์</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <article className="bg-white rounded-lg shadow p-6">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>หมวดหมู่: {article.category}</span>
                  <span>•</span>
                  <span>โดย: {article.writer}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{article.title}</h1>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {article.content}
                  </p>
                </div>
                {article.tags && (
                  <div className="mt-6 pt-4 border-t">
                    <span className="text-sm font-medium text-gray-700">แท็ก: </span>
                    <div className="inline-flex flex-wrap gap-2 mt-1">
                      {article.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminDharmaForm;
