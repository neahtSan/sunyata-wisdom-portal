
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import RichTextEditor from './RichTextEditor';
import { Calendar, Clock, MapPin, Users, Eye, Save, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityFormData {
  id?: number;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  registrationEnabled: boolean;
  featured: boolean;
  status: 'draft' | 'published' | 'cancelled';
}

interface EnhancedActivityFormProps {
  activity?: ActivityFormData;
  onSave: (activity: ActivityFormData) => void;
  onPreview: (activity: ActivityFormData) => void;
  isEditing?: boolean;
}

const EnhancedActivityForm = ({ activity, onSave, onPreview, isEditing = false }: EnhancedActivityFormProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    content: '',
    category: 'meditation',
    date: '',
    time: '09:00',
    endTime: '17:00',
    location: '',
    maxParticipants: 30,
    registrationEnabled: true,
    featured: false,
    status: 'draft',
    ...activity
  });

  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'meditation', label: 'ปฏิบัติสมาธิ' },
    { value: 'dharma', label: 'เทศนาธรรม' },
    { value: 'ceremony', label: 'พิธีกรรม' },
    { value: 'retreat', label: 'ปฏิบัติธรรม' },
    { value: 'community', label: 'กิจกรรมชุมชน' },
    { value: 'education', label: 'การศึกษา' }
  ];

  const handleInputChange = (field: keyof ActivityFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (publish = false) => {
    setIsLoading(true);
    
    try {
      const dataToSave = {
        ...formData,
        status: publish ? 'published' : formData.status
      };
      
      await onSave(dataToSave);
      
      toast({
        title: publish ? "เผยแพร่กิจกรรมสำเร็จ" : "บันทึกข้อมูลสำเร็จ",
        description: publish ? "กิจกรรมได้รับการเผยแพร่แล้ว" : "ข้อมูลกิจกรรมได้รับการบันทึกแล้ว",
      });
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    onPreview(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'แก้ไขกิจกรรม' : 'สร้างกิจกรรมใหม่'}
          </h2>
          <p className="text-gray-600">จัดการข้อมูลกิจกรรมและการลงทะเบียน</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant={formData.status === 'published' ? 'default' : 'outline'}>
            {formData.status === 'published' ? 'เผยแพร่' : 'ร่าง'}
          </Badge>
          {formData.featured && (
            <Badge variant="secondary">กิจกรรมเด่น</Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">ชื่อกิจกรรม *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="ระบุชื่อกิจกรรม"
                />
              </div>

              <div>
                <Label htmlFor="description">คำอธิบายสั้น *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="คำอธิบายสั้นๆ เกี่ยวกับกิจกรรม"
                />
              </div>

              <div>
                <Label htmlFor="category">ประเภทกิจกรรม</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกประเภทกิจกรรม" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>รายละเอียดกิจกรรม</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => handleInputChange('content', value)}
                placeholder="เขียนรายละเอียดเกี่ยวกับกิจกรรม..."
                rows={15}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Schedule & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>วันเวลาและสถานที่</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="date">วันที่</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="time">เวลาเริ่ม</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">เวลาสิ้นสุด</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">สถานที่</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="วิหาร, ศาลาการเปรียญ, etc."
                />
              </div>
            </CardContent>
          </Card>

          {/* Registration Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>การลงทะเบียน</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="registrationEnabled">เปิดลงทะเบียน</Label>
                <Switch
                  id="registrationEnabled"
                  checked={formData.registrationEnabled}
                  onCheckedChange={(checked) => handleInputChange('registrationEnabled', checked)}
                />
              </div>

              {formData.registrationEnabled && (
                <div>
                  <Label htmlFor="maxParticipants">จำนวนผู้เข้าร่วมสูงสุด</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    max="1000"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Settings */}
          <Card>
            <CardHeader>
              <CardTitle>การตั้งค่าเพิ่มเติม</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">กิจกรรมเด่น</Label>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
              </div>

              <div>
                <Label htmlFor="status">สถานะ</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">ร่าง</SelectItem>
                    <SelectItem value="published">เผยแพร่</SelectItem>
                    <SelectItem value="cancelled">ยกเลิก</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="w-full"
            >
              <Eye className="h-4 w-4 mr-2" />
              พรีวิว
            </Button>
            
            <Button
              onClick={() => handleSave(false)}
              variant="outline"
              className="w-full"
              disabled={isLoading}
            >
              <Save className="h-4 w-4 mr-2" />
              บันทึกร่าง
            </Button>
            
            <Button
              onClick={() => handleSave(true)}
              className="w-full"
              disabled={isLoading}
            >
              <Send className="h-4 w-4 mr-2" />
              เผยแพร่
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedActivityForm;
