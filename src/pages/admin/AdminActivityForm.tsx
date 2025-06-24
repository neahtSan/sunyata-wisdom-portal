
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, Save, Eye, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setSisLoading] = useState(false);
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: '',
    location: '',
    requirements: '',
    images: [] as string[]
  });

  useEffect(() => {
    if (id && id !== 'new') {
      // Load existing activity data
      const mockActivity = {
        title: 'ปฏิบัติธรรมประจำสัปดาห์',
        description: 'กิจกรรมปฏิบัติธรรมสำหรับผู้ที่สนใจเข้าร่วมการปฏิบัติธรรม',
        date: '2024-01-20',
        time: '18:00',
        maxParticipants: '50',
        location: 'ศาลาหลัก วัดป่าสุญญตา',
        requirements: 'แต่งกายสีขาว, นำขันน้ำมาด้วย',
        images: [
          'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
      };
      setActivity(mockActivity);
    }
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Mock image upload - in real app, upload to server
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setActivity(prev => ({
        ...prev,
        images: [...prev.images, ...newImageUrls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setActivity(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSisLoading(true);
    // Mock save
    setTimeout(() => {
      toast({
        title: "บันทึกกิจกรรมสำเร็จ",
        description: "กิจกรรมได้รับการบันทึกแล้ว",
      });
      setSisLoading(false);
      navigate('/admin/activity');
    }, 1500);
  };

  const isNewActivity = id === 'new';

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/admin/activity')} className="w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับ
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isNewActivity ? 'เพิ่มกิจกรรมใหม่' : 'แก้ไขกิจกรรม'}
            </h1>
            <p className="text-gray-600">
              {isNewActivity ? 'สร้างกิจกรรมใหม่' : 'แก้ไขข้อมูลกิจกรรม'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลกิจกรรม</CardTitle>
                <CardDescription>กรอกข้อมูลพื้นฐานของกิจกรรม</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">ชื่อกิจกรรม</Label>
                  <Input
                    id="title"
                    value={activity.title}
                    onChange={(e) => setActivity({...activity, title: e.target.value})}
                    placeholder="กรอกชื่อกิจกรรม"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={activity.description}
                    onChange={(e) => setActivity({...activity, description: e.target.value})}
                    rows={4}
                    placeholder="กรอกรายละเอียดกิจกรรม"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">วันที่</Label>
                    <Input
                      id="date"
                      type="date"
                      value={activity.date}
                      onChange={(e) => setActivity({...activity, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">เวลา</Label>
                    <Input
                      id="time"
                      type="time"
                      value={activity.time}
                      onChange={(e) => setActivity({...activity, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxParticipants">จำนวนผู้เข้าร่วมสูงสุด</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={activity.maxParticipants}
                    onChange={(e) => setActivity({...activity, maxParticipants: e.target.value})}
                    placeholder="50"
                  />
                </div>

                <div>
                  <Label htmlFor="location">สถานที่</Label>
                  <Input
                    id="location"
                    value={activity.location}
                    onChange={(e) => setActivity({...activity, location: e.target.value})}
                    placeholder="ศาลาหลัก วัดป่าสุญญตา"
                  />
                </div>

                <div>
                  <Label htmlFor="requirements">ข้อกำหนด/ข้อแนะนำ</Label>
                  <Textarea
                    id="requirements"
                    value={activity.requirements}
                    onChange={(e) => setActivity({...activity, requirements: e.target.value})}
                    rows={3}
                    placeholder="เช่น แต่งกายสีขาว, นำขันน้ำมาด้วย"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>ภาพกิจกรรม</CardTitle>
                <CardDescription>อัปโหลดภาพกิจกรรม</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="images">เลือกภาพ</Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                </div>

                {activity.images.length > 0 && (
                  <div className="space-y-2">
                    <Label>ภาพที่อัปโหลด</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {activity.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Activity ${index + 1}`}
                            className="w-full h-20 object-cover rounded"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => setIsPreviewOpen(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                  
                  <Button 
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'กำลังบันทึก...' : 'บันทึกกิจกรรม'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>ตัวอย่างกิจกรรม</DialogTitle>
              <DialogDescription>ตัวอย่างการแสดงผลกิจกรรมบนเว็บไซต์</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h2>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-medium">วันที่:</span> {activity.date}
                  </div>
                  <div>
                    <span className="font-medium">เวลา:</span> {activity.time}
                  </div>
                  <div>
                    <span className="font-medium">สถานที่:</span> {activity.location}
                  </div>
                  <div>
                    <span className="font-medium">ผู้เข้าร่วมสูงสุด:</span> {activity.maxParticipants} คน
                  </div>
                </div>

                {activity.requirements && (
                  <div className="mb-4">
                    <span className="font-medium">ข้อกำหนด:</span>
                    <p className="text-gray-600">{activity.requirements}</p>
                  </div>
                )}

                {activity.images.length > 0 && (
                  <div>
                    <span className="font-medium">ภาพกิจกรรม:</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {activity.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Activity ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityForm;
