
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Upload, X, Clock, History, Calendar, MapPin, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    maxParticipants: '',
    location: '',
    type: '',
    requirements: '',
    images: [] as string[]
  });

  const activityTypes = ['ปฏิบัติธรรม', 'อบรม', 'บรรยาย', 'งานบุญ', 'กิจกรรมพิเศษ'];

  useEffect(() => {
    if (id && id !== 'new') {
      // Load existing activity data
      const mockActivity = {
        title: 'ปฏิบัติธรรมประจำสัปดาห์',
        description: 'กิจกรรมปฏิบัติธรรมสำหรับผู้ที่สนใจเข้าร่วมการปฏิบัติธรรม พร้อมคำแนะนำจากพระอาจารย์ผู้มีประสบการณ์',
        date: '2024-03-20',
        time: '18:00',
        maxParticipants: '50',
        location: 'ศาลาหลัก วัดป่าสุญญตา',
        type: 'ปฏิบัติธรรม',
        requirements: 'แต่งกายสีขาว, นำขันน้ำมาด้วย, มาก่อนเวลา 15 นาที',
        images: [
          'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
      };
      setActivity(mockActivity);
    }
  }, [id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!activity.title.trim()) {
      newErrors.title = 'กรุณากรอกชื่อกิจกรรม';
    }
    if (!activity.description.trim()) {
      newErrors.description = 'กรุณากรอกรายละเอียดกิจกรรม';
    }
    if (!activity.date) {
      newErrors.date = 'กรุณาเลือกวันที่';
    }
    if (!activity.time) {
      newErrors.time = 'กรุณาเลือกเวลา';
    }
    if (!activity.location.trim()) {
      newErrors.location = 'กรุณากรอกสถานที่';
    }
    if (!activity.type) {
      newErrors.type = 'กรุณาเลือกประเภทกิจกรรม';
    }
    if (!activity.maxParticipants || parseInt(activity.maxParticipants) <= 0) {
      newErrors.maxParticipants = 'กรุณากรอกจำนวนผู้เข้าร่วมสูงสุด';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        title: "บันทึกกิจกรรมสำเร็จ",
        description: "กิจกรรมได้รับการบันทึกแล้ว",
      });
      setIsLoading(false);
      navigate('/admin/activity');
    }, 1500);
  };

  const isNewActivity = id === 'new';
  const activityDate = new Date(activity.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isUpcoming = activityDate >= today;

  const formatThaiDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const thaiMonths = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${date.getFullYear() + 543}`;
  };

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
            <div className="flex items-center gap-2 mt-1">
              <p className="text-gray-600">
                {isNewActivity ? 'สร้างกิจกรรมใหม่' : 'แก้ไขข้อมูลกิจกรรม'}
              </p>
              {!isNewActivity && activity.date && (
                <Badge variant={isUpcoming ? 'default' : 'secondary'} className="ml-2">
                  {isUpcoming ? (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      กิจกรรมที่กำลังมา
                    </>
                  ) : (
                    <>
                      <History className="h-3 w-3 mr-1" />
                      แกลเลอรี่กิจกรรม
                    </>
                  )}
                </Badge>
              )}
            </div>
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
                  <Label htmlFor="title">ชื่อกิจกรรม *</Label>
                  <Input
                    id="title"
                    value={activity.title}
                    onChange={(e) => setActivity({...activity, title: e.target.value})}
                    placeholder="กรอกชื่อกิจกรรม"
                    className={errors.title ? 'border-red-500' : ''}
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>
                
                <div>
                  <Label htmlFor="description">รายละเอียด *</Label>
                  <Textarea
                    id="description"
                    value={activity.description}
                    onChange={(e) => setActivity({...activity, description: e.target.value})}
                    rows={4}
                    placeholder="กรอกรายละเอียดกิจกรรม"
                    className={errors.description ? 'border-red-500' : ''}
                  />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">วันที่ *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={activity.date}
                      onChange={(e) => setActivity({...activity, date: e.target.value})}
                      className={errors.date ? 'border-red-500' : ''}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                  </div>
                  <div>
                    <Label htmlFor="time">เวลา *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={activity.time}
                      onChange={(e) => setActivity({...activity, time: e.target.value})}
                      className={errors.time ? 'border-red-500' : ''}
                    />
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">ประเภทกิจกรรม *</Label>
                    <Select value={activity.type} onValueChange={(value) => setActivity({...activity, type: value})}>
                      <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                        <SelectValue placeholder="เลือกประเภท" />
                      </SelectTrigger>
                      <SelectContent>
                        {activityTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                  </div>
                  <div>
                    <Label htmlFor="maxParticipants">จำนวนผู้เข้าร่วมสูงสุด *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={activity.maxParticipants}
                      onChange={(e) => setActivity({...activity, maxParticipants: e.target.value})}
                      placeholder="50"
                      className={errors.maxParticipants ? 'border-red-500' : ''}
                    />
                    {errors.maxParticipants && <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">สถานที่ *</Label>
                  <Input
                    id="location"
                    value={activity.location}
                    onChange={(e) => setActivity({...activity, location: e.target.value})}
                    placeholder="ศาลาหลัก วัดป่าสุญญตา"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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
                <CardDescription>
                  {isUpcoming ? 'อัปโหลดภาพประกอบกิจกรรม' : 'อัปโหลดภาพจากกิจกรรม (แกลเลอรี่)'}
                </CardDescription>
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
                  <p className="text-xs text-gray-500 mt-1">
                    สามารถเลือกหลายภาพพร้อมกัน
                  </p>
                </div>

                {activity.images.length > 0 && (
                  <div className="space-y-2">
                    <Label>ภาพที่อัปโหลด ({activity.images.length})</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
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
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={isUpcoming ? 'default' : 'secondary'}>
                    {activity.type}
                  </Badge>
                  {activity.date && (
                    <Badge variant={isUpcoming ? 'outline' : 'secondary'}>
                      {isUpcoming ? (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          กำลังมาถึง
                        </>
                      ) : (
                        <>
                          <History className="h-3 w-3 mr-1" />
                          ผ่านมาแล้ว
                        </>
                      )}
                    </Badge>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{activity.title}</h2>
                <p className="text-gray-600 mb-4">{activity.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{activity.date ? formatThaiDate(activity.date) : 'ไม่ระบุ'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{activity.time || 'ไม่ระบุ'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{activity.location || 'ไม่ระบุ'}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>สูงสุด {activity.maxParticipants || 0} คน</span>
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
                      {activity.images.slice(0, 6).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Activity ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                      {activity.images.length > 6 && (
                        <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
                          +{activity.images.length - 6} อีก
                        </div>
                      )}
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
