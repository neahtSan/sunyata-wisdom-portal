
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Trash2, Edit } from 'lucide-react';

interface TestimonialVideo {
  id: number;
  title: string;
  youtubeId: string;
  description: string;
}

interface TestimonialVideoManagerProps {
  testimonialVideos: TestimonialVideo[];
  setTestimonialVideos: React.Dispatch<React.SetStateAction<TestimonialVideo[]>>;
  onPreview: () => void;
}

const TestimonialVideoManager = ({ testimonialVideos, setTestimonialVideos, onPreview }: TestimonialVideoManagerProps) => {
  return (
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
          <Button variant="outline" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            ดูตัวอย่าง
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialVideoManager;
