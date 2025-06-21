
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Trash2, Edit } from 'lucide-react';

interface HeroImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

interface HeroImageManagerProps {
  heroImages: HeroImage[];
  setHeroImages: React.Dispatch<React.SetStateAction<HeroImage[]>>;
  onPreview: () => void;
}

const HeroImageManager = ({ heroImages, setHeroImages, onPreview }: HeroImageManagerProps) => {
  return (
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
          <Button variant="outline" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            ดูตัวอย่าง
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroImageManager;
