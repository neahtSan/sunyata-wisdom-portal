import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import PreviewModal from '@/components/admin/PreviewModal';
import EnhancedHeroManager from '@/components/admin/EnhancedHeroManager';
import TempleIntroManager from '@/components/admin/TempleIntroManager';
import TestimonialVideoManager from '@/components/admin/TestimonialVideoManager';
import FullPreviewTab from '@/components/admin/FullPreviewTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/HeroSection';
import TempleIntro from '@/components/TempleIntro';

const AdminHomeManagement = () => {
  const [previewMode, setPreviewMode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Enhanced hero images data with proper ordering
  const [heroImages, setHeroImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "วิหารสงบ",
      caption: "ความสงบในธรรมชาติ",
      order: 0
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "สวนสมาธิ",
      caption: "สถานที่ปฏิบัติธรรม",
      order: 1
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "บรรยากาศวัด",
      caption: "บรรยากาศแห่งการเรียนรู้",
      order: 2
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

          <TabsContent value="hero">
            <EnhancedHeroManager
              heroImages={heroImages}
              setHeroImages={setHeroImages}
              onPreview={() => handlePreview('hero')}
            />
          </TabsContent>

          <TabsContent value="intro">
            <TempleIntroManager
              templeIntro={templeIntro}
              setTempleIntro={setTempleIntro}
              onPreview={() => handlePreview('intro')}
            />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialVideoManager
              testimonialVideos={testimonialVideos}
              setTestimonialVideos={setTestimonialVideos}
              onPreview={() => handlePreview('testimonials')}
            />
          </TabsContent>

          <TabsContent value="preview">
            <FullPreviewTab onPreview={() => handlePreview('full')} />
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
