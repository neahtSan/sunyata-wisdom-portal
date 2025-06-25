
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar, Clock, Bell } from 'lucide-react';

interface ArticleSchedulerProps {
  status: string;
  publishDate?: string;
  onStatusChange: (status: string) => void;
  onScheduleChange: (date: string) => void;
}

const ArticleScheduler = ({ status, publishDate, onStatusChange, onScheduleChange }: ArticleSchedulerProps) => {
  const [isScheduled, setIsScheduled] = useState(status === 'scheduled');
  const [scheduleDate, setScheduleDate] = useState(publishDate || '');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  const handleScheduleToggle = (enabled: boolean) => {
    setIsScheduled(enabled);
    if (enabled) {
      onStatusChange('scheduled');
    } else {
      onStatusChange('draft');
    }
  };

  const handleDateTimeChange = () => {
    if (scheduleDate && scheduleTime) {
      const dateTime = `${scheduleDate}T${scheduleTime}`;
      onScheduleChange(dateTime);
    }
  };

  React.useEffect(() => {
    if (isScheduled) {
      handleDateTimeChange();
    }
  }, [scheduleDate, scheduleTime, isScheduled]);

  const statusOptions = [
    { value: 'draft', label: 'ร่าง', description: 'บทความยังไม่พร้อมเผยแพร่' },
    { value: 'published', label: 'เผยแพร่', description: 'เผยแพร่ทันที' },
    { value: 'scheduled', label: 'กำหนดเวลาเผยแพร่', description: 'เผยแพร่ในเวลาที่กำหนด' },
    { value: 'archived', label: 'เก็บถาวร', description: 'ซ่อนจากการแสดงผล' }
  ];

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    return { date, time };
  };

  const { date: currentDate, time: currentTime } = getCurrentDateTime();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>การเผยแพร่และกำหนดเวลา</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="status">สถานะบทความ</Label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกสถานะ" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(status === 'scheduled' || isScheduled) && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">กำหนดเวลาเผยแพร่</Label>
              <Switch
                checked={isScheduled}
                onCheckedChange={handleScheduleToggle}
              />
            </div>
            
            {isScheduled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="schedule-date" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>วันที่</span>
                  </Label>
                  <Input
                    id="schedule-date"
                    type="date"
                    value={scheduleDate}
                    min={currentDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="schedule-time" className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>เวลา</span>
                  </Label>
                  <Input
                    id="schedule-time"
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {isScheduled && scheduleDate && scheduleTime && (
              <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
                <strong>กำหนดเผยแพร่:</strong> {new Date(`${scheduleDate}T${scheduleTime}`).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}
          </div>
        )}

        {status === 'published' && (
          <div className="text-sm text-green-700 bg-green-100 p-3 rounded border border-green-200">
            <strong>สถานะ:</strong> บทความนี้เผยแพร่แล้วและผู้อ่านสามารถเข้าชมได้
          </div>
        )}

        {status === 'draft' && (
          <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded border border-gray-200">
            <strong>สถานะ:</strong> บทความนี้อยู่ในสถานะร่าง ยังไม่เผยแพร่ต่อสาธารณะ
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArticleScheduler;
