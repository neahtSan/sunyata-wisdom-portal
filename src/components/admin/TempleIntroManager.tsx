
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye } from 'lucide-react';

interface TempleIntroManagerProps {
  templeIntro: string;
  setTempleIntro: React.Dispatch<React.SetStateAction<string>>;
  onPreview: () => void;
}

const TempleIntroManager = ({ templeIntro, setTempleIntro, onPreview }: TempleIntroManagerProps) => {
  return (
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
          <Button onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            ดูตัวอย่าง
          </Button>
          <Button variant="outline">
            บันทึกร่าง
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempleIntroManager;
