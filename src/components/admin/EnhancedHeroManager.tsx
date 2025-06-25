
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Eye, Image, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  order: number;
}

interface EnhancedHeroManagerProps {
  heroImages: HeroImage[];
  setHeroImages: (images: HeroImage[]) => void;
  onPreview: () => void;
}

const EnhancedHeroManager = ({ heroImages, setHeroImages, onPreview }: EnhancedHeroManagerProps) => {
  const [editingImage, setEditingImage] = useState<HeroImage | null>(null);
  const [newImage, setNewImage] = useState({ src: '', alt: '', caption: '' });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { toast } = useToast();

  const handleAddImage = () => {
    if (!newImage.src || !newImage.alt) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอก URL รูปภาพและข้อความอธิบายรูป",
        variant: "destructive"
      });
      return;
    }

    const newHeroImage: HeroImage = {
      id: Date.now(),
      ...newImage,
      order: heroImages.length
    };

    setHeroImages([...heroImages, newHeroImage]);
    setNewImage({ src: '', alt: '', caption: '' });
    setIsAddingNew(false);
    
    toast({
      title: "เพิ่มรูปภาพสำเร็จ",
      description: "รูปภาพใหม่ถูกเพิ่มในสไลด์แล้ว"
    });
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;

    const updatedImages = heroImages.map(img => 
      img.id === editingImage.id ? editingImage : img
    );
    setHeroImages(updatedImages);
    setEditingImage(null);
    
    toast({
      title: "อัปเดตรูปภาพสำเร็จ",
      description: "ข้อมูลรูปภาพได้รับการแก้ไขแล้ว"
    });
  };

  const handleDeleteImage = (id: number) => {
    const updatedImages = heroImages.filter(img => img.id !== id);
    setHeroImages(updatedImages);
    
    toast({
      title: "ลบรูปภาพสำเร็จ",
      description: "รูปภาพถูกลบออกจากสไลด์แล้ว"
    });
  };

  const moveImage = (id: number, direction: 'up' | 'down') => {
    const currentIndex = heroImages.findIndex(img => img.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === heroImages.length - 1)
    ) {
      return;
    }

    const newImages = [...heroImages];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    [newImages[currentIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[currentIndex]];
    
    setHeroImages(newImages);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>จัดการภาพสไลด์หน้าแรก</CardTitle>
          <div className="space-x-2">
            <Button variant="outline" onClick={onPreview}>
              <Eye className="w-4 h-4 mr-2" />
              พรีวิว
            </Button>
            <Button onClick={() => setIsAddingNew(true)}>
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มรูปภาพ
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Image Form */}
        {isAddingNew && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">เพิ่มรูปภาพใหม่</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL รูปภาพ</label>
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={newImage.src}
                  onChange={(e) => setNewImage({ ...newImage, src: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ข้อความอธิบายรูป (Alt text)</label>
                <Input
                  placeholder="คำอธิบายรูปภาพสำหรับผู้พิการทางสายตา"
                  value={newImage.alt}
                  onChange={(e) => setNewImage({ ...newImage, alt: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">คำบรรยาย (ไม่บังคับ)</label>
                <Textarea
                  placeholder="คำบรรยายที่จะแสดงบนรูปภาพ"
                  value={newImage.caption}
                  onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddImage}>เพิ่มรูปภาพ</Button>
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  ยกเลิก
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Edit Image Form */}
        {editingImage && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">แก้ไขรูปภาพ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL รูปภาพ</label>
                <Input
                  value={editingImage.src}
                  onChange={(e) => setEditingImage({ ...editingImage, src: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ข้อความอธิบายรูป</label>
                <Input
                  value={editingImage.alt}
                  onChange={(e) => setEditingImage({ ...editingImage, alt: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">คำบรรยาย</label>
                <Textarea
                  value={editingImage.caption}
                  onChange={(e) => setEditingImage({ ...editingImage, caption: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleUpdateImage}>บันทึกการเปลี่ยนแปลง</Button>
                <Button variant="outline" onClick={() => setEditingImage(null)}>
                  ยกเลิก
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Images List */}
        <div className="space-y-3">
          <h3 className="font-medium text-gray-700">รูปภาพในสไลด์ ({heroImages.length} รูป)</h3>
          {heroImages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>ยังไม่มีรูปภาพในสไลด์</p>
              <p className="text-sm">คลิก "เพิ่มรูปภาพ" เพื่อเริ่มต้น</p>
            </div>
          ) : (
            heroImages.map((image, index) => (
              <Card key={image.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{image.alt}</h4>
                      {image.caption && (
                        <p className="text-sm text-gray-600 line-clamp-2">{image.caption}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">ลำดับที่ {index + 1}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(image.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveImage(image.id, 'down')}
                        disabled={index === heroImages.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingImage(image)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Instructions */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <h4 className="font-medium text-gray-700 mb-2">คำแนะนำ</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• รูปภาพควรมีขนาดอย่างน้อย 1920x1080 พิกเซล เพื่อความคมชัด</li>
              <li>• ใช้รูปภาพที่มีความเกี่ยวข้องกับวัดและกิจกรรมธรรม</li>
              <li>• คำบรรยายจะแสดงบนรูปภาพ ควรกระชับและมีความหมาย</li>
              <li>• สามารถจัดเรียงลำดับรูปภาพโดยใช้ปุ่มลูกศร</li>
            </ul>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default EnhancedHeroManager;
