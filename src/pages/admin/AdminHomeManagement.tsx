
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PreviewModal from '@/components/admin/PreviewModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, Eye, Trash2, Edit, DragHandleDots2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/HeroSection';
import TempleIntro from '@/components/TempleIntro';

const AdminHomeManagement = () => {
  const [previewMode, setPreviewMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for hero images
  const [heroImages, setHeroImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "วิหารสงบ",
      caption: "ความสงบในธรรมชาติ"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "สวนสมาธิ",
      caption: "สถานที่ปฏิบัติธรรม"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "บรรยากาศวัด",
      caption: "บรรยากาศแห่งการเรียนรู้"
    }
  ]);

  const [templeIntro, setTempleIntro] = useState(`วัดป่าสุญญตา ตั้งอยู่ท่ามกลางธรรมชาติอันเงียบสงบ เป็นสถานที่ที่เหมาะสำหรับการปฏิบัติธรรมและการพัฒนาจิตใจ 

เราเปิดโอกาสให้ทุกคนได้มาเรียนรู้หลักธรรมะ ฝึกสมาธิ และพบกับความสงบภายในใจ ไม่ว่าจะเป็นผู้เริ่มต้นหรือผู้ที่มีประสบการณ์แล้ว

ที่วัดป่าสุญญตา เราเชื่อว่าทุกคนสามารถพัฒนาตนเองและพบกับความสุขที่แท้จริงได้ผ่านการปฏิบัติธรรม`);

  const [testimonialVideos, setTestimonialVideos] = useState([
    {
      id: 1,
      title: "ประสบการณ์ปฏิบัติธรรม - คุณสมศรี",
      youtubeId: "dQw4w9WgXcQ",
      description: "การเปลี่ยนแปลงชีวิตจากการปฏิบัติธรรม"
    },
    {
      id: 2,
      title: "ความสงบใจที่พบ - คุณวิชัย",
      youtubeId: "dQw4w9WgXcQ",
      description: "ธรรมะที่ใช้ในชีวิตประจำวัน"
    }
  ]);

  const handlePreview = (section: string) => {
    setPreviewMode(section);
  };

  const handleConfirmChanges = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "บันทึกการเปลี่ยนแปลงสำเร็จ",
        description: "เนื้อหาได้รับการอัปเดตบนเว็บไซต์แล้ว",
      });
      setIsLoading(false);
      setPreviewMode(null);
    }, 1500);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">จัดการหน้าแรก</h1>
            <p className="text-gray-600">แก้ไขเนื้อหาที่แสดงบนหน้าแรกของเว็บไซต์</p>
          </div>
        </div>

        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hero">ภาพสไลด์</TabsTrigger>
            <TabsTrigger value="intro">ข้อความแนะนำ</TabsTrigger>
            <TabsTrigger value="testimonials">วิดีโอคำรับรอง</TabsTrigger>
            <TabsTrigger value="preview">พรีวิวทั้งหมด</TabsTrigger>
          </TabsList>

          {/* Hero Images Management */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>จัดการภาพสไลด์หน้าแรก</CardTitle>
                <CardDescription>
                  อัปโหลดและจัดเรียงภาพสไลด์ (แนะนำขนาด 1920x1080 หรืออัตราส่วน 16:9)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {heroImages.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        <Button size="sm" variant="secondary">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded px-2 py-1 text-xs">
                        ลำดับ {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่มรูปภาพ
                  </Button>
                  <Button variant="outline" onClick={() => handlePreview('hero')}>
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Temple Introduction */}
          <TabsContent value="intro">
            <Card>
              <CardHeader>
                <CardTitle>ข้อความแนะนำวัด</CardTitle>
                <CardDescription>
                  แก้ไขข้อความแนะนำวัดที่แสดงบนหน้าแรก
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="temple-intro">ข้อความแนะนำ</Label>
                  <Textarea
                    id="temple-intro"
                    value={templeIntro}
                    onChange={(e) => setTempleIntro(e.target.value)}
                    rows={8}
                    className="mt-2"
                    placeholder="กรอกข้อความแนะนำวัด..."
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={() => handlePreview('intro')}>
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                  <Button variant="outline">
                    บันทึกร่าง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonial Videos */}
          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>วิดีโอคำรับรอง</CardTitle>
                <CardDescription>
                  จัดการวิดีโอ YouTube ที่แสดงความคิดเห็นจากผู้ปฏิบัติธรรม
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {testimonialVideos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{video.title}</h4>
                        <p className="text-sm text-gray-600">{video.description}</p>
                        <p className="text-xs text-gray-500">YouTube ID: {video.youtubeId}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    เพิ่มวิดีโอ
                  </Button>
                  <Button variant="outline" onClick={() => handlePreview('testimonials')}>
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Full Preview */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>พรีวิวหน้าแรกทั้งหมด</CardTitle>
                <CardDescription>
                  ตรวจสอบหน้าแรกทั้งหมดก่อนเผยแพร่การเปลี่ยนแปลง
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="lg" onClick={() => handlePreview('full')}>
                  <Eye className="h-5 w-5 mr-2" />
                  ดูตัวอย่างหน้าแรกทั้งหมด
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={!!previewMode}
          onClose={() => setPreviewMode(null)}
          onConfirm={handleConfirmChanges}
          title="หน้าแรกเว็บไซต์"
          isLoading={isLoading}
        >
          {previewMode === 'hero' && <HeroSection />}
          {previewMode === 'intro' && <TempleIntro />}
          {previewMode === 'full' && (
            <div className="space-y-0">
              <HeroSection />
              <TempleIntro />
            </div>
          )}
        </PreviewModal>
      </div>
    </AdminLayout>
  );
};

export default AdminHomeManagement;
