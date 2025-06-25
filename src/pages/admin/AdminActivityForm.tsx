
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import EnhancedActivityForm from '@/components/admin/EnhancedActivityForm';
import ActivityAnalytics from '@/components/admin/ActivityAnalytics';
import ActivityScheduler from '@/components/admin/ActivityScheduler';
import PreviewModal from '@/components/admin/PreviewModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Calendar, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityData {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  currentRegistrations: number;
  registrationEnabled: boolean;
  featured: boolean;
  status: 'draft' | 'published' | 'cancelled';
  views: number;
  completedParticipants?: number;
  noShowParticipants?: number;
  rating?: number;
  feedbackCount?: number;
}

const AdminActivityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = id !== 'new';

  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('form');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const loadActivity = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        if (isEditing) {
          // Mock existing activity data
          setActivity({
            id: parseInt(id!),
            title: 'ปฏิบัติสมาธิเช้า',
            description: 'การปฏิบัติสมาธิในบรรยากาศเงียบสงบ',
            content: `# การปฏิบัติสมาธิเช้า

เป็นกิจกรรมที่เหมาะสำหรับผู้ที่ต้องการเริ่มต้นวันใหม่ด้วยจิตใจที่สงบ

## รายละเอียดการปฏิบัติ

- **เวลา:** 06:00 - 08:00 น.
- **สถานที่:** ศาลาการเปรียญ
- **ผู้นำ:** พระอาจารย์สมชาย

## สิ่งที่ควรเตรียม

- เสื้อผ้าสีขาว
- เสื่อนั่งสมาธิ (หากมี)
- ใจที่เปิดกว้างและพร้อมเรียนรู้`,
            category: 'meditation',
            date: '2024-01-15',
            time: '06:00',
            endTime: '08:00',
            location: 'ศาลาการเปรียญ',
            maxParticipants: 30,
            currentRegistrations: 18,
            registrationEnabled: true,
            featured: true,
            status: 'published',
            views: 245,
            completedParticipants: 16,
            noShowParticipants: 2,
            rating: 4.8,
            feedbackCount: 12
          });
        } else {
          // New activity defaults
          setActivity({
            id: 0,
            title: '',
            description: '',
            content: '',
            category: 'meditation',
            date: '',
            time: '09:00',
            endTime: '17:00',
            location: '',
            maxParticipants: 30,
            currentRegistrations: 0,
            registrationEnabled: true,
            featured: false,
            status: 'draft',
            views: 0
          });
        }
        setIsLoading(false);
      }, 1000);
    };

    loadActivity();
  }, [id, isEditing]);

  const handleSave = async (activityData: Partial<ActivityData>) => {
    // Simulate API call
    console.log('Saving activity:', activityData);
    
    // Update local state
    setActivity(prev => ({ ...prev, ...activityData } as ActivityData));
    
    return Promise.resolve();
  };

  const handlePreview = (activityData: Partial<ActivityData>) => {
    setActivity(prev => ({ ...prev, ...activityData } as ActivityData));
    setPreviewMode(true);
  };

  const handleScheduleChange = (date: string, time: string) => {
    setActivity(prev => prev ? { ...prev, date, time } : null);
  };

  const handleRecurringChange = (recurring: boolean, pattern?: string) => {
    console.log('Recurring settings:', { recurring, pattern });
    // Handle recurring activity logic
  };

  if (isLoading || !activity) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">กำลังโหลด...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/activity')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              กลับ
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {isEditing ? 'แก้ไขกิจกรรม' : 'สร้างกิจกรรมใหม่'}
              </h1>
              <p className="text-gray-600">
                {activity.title || 'กิจกรรมใหม่'}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="form" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>แก้ไขกิจกรรม</span>
            </TabsTrigger>
            {isEditing && (
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>สถิติและข้อมูล</span>
              </TabsTrigger>
            )}
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>กำหนดการ</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form">
            <EnhancedActivityForm
              activity={activity}
              onSave={handleSave}
              onPreview={handlePreview}
              isEditing={isEditing}
            />
          </TabsContent>

          {isEditing && (
            <TabsContent value="analytics">
              <ActivityAnalytics activity={activity} />
            </TabsContent>
          )}

          <TabsContent value="schedule">
            <ActivityScheduler
              activityDate={activity.date}
              activityTime={activity.time}
              onScheduleChange={handleScheduleChange}
              onRecurringChange={handleRecurringChange}
            />
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <PreviewModal
          isOpen={previewMode}
          onClose={() => setPreviewMode(false)}
          onConfirm={() => {
            toast({
              title: "บันทึกการเปลี่ยนแปลงสำเร็จ",
              description: "กิจกรรมได้รับการอัปเดตแล้ว",
            });
            setPreviewMode(false);
          }}
          title="พรีวิวกิจกรรม"
        >
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h2 className="text-xl font-bold mb-2">{activity.title}</h2>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>วันเวลา:</strong> {activity.date} {activity.time}
                </div>
                <div>
                  <strong>สถานที่:</strong> {activity.location}
                </div>
                <div>
                  <strong>ผู้เข้าร่วม:</strong> {activity.currentRegistrations}/{activity.maxParticipants} คน
                </div>
                <div>
                  <strong>ประเภท:</strong> {activity.category}
                </div>
              </div>
              
              <div className="mt-4 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: activity.content.replace(/\n/g, '<br>') }} />
              </div>
            </div>
          </div>
        </PreviewModal>
      </div>
    </AdminLayout>
  );
};

export default AdminActivityForm;
