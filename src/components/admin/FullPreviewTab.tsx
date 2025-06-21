
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface FullPreviewTabProps {
  onPreview: () => void;
}

const FullPreviewTab = ({ onPreview }: FullPreviewTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>พรีวิวหน้าแรกทั้งหมด</CardTitle>
        <CardDescription>
          ตรวจสอบหน้าแรกทั้งหมดก่อนเผยแพร่การเปลี่ยนแปลง
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button size="lg" onClick={onPreview}>
          <Eye className="h-5 w-5 mr-2" />
          ดูตัวอย่างหน้าแรกทั้งหมด
        </Button>
      </CardContent>
    </Card>
  );
};

export default FullPreviewTab;
