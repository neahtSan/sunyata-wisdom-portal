
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Bell, Repeat, Mail } from 'lucide-react';

interface ActivitySchedulerProps {
  activityDate: string;
  activityTime: string;
  onScheduleChange: (date: string, time: string) => void;
  isRecurring?: boolean;
  onRecurringChange?: (recurring: boolean, pattern?: string) => void;
}

const ActivityScheduler = ({ 
  activityDate, 
  activityTime, 
  onScheduleChange,
  isRecurring = false,
  onRecurringChange
}: ActivitySchedulerProps) => {
  const [reminderSettings, setReminderSettings] = useState({
    emailReminder: true,
    reminderDays: '7',
    customMessage: ''
  });

  const [recurringPattern, setRecurringPattern] = useState('weekly');

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    return { date, time };
  };

  const { date: currentDate, time: currentTime } = getCurrentDateTime();

  const handleDateTimeChange = (field: 'date' | 'time', value: string) => {
    if (field === 'date') {
      onScheduleChange(value, activityTime);
    } else {
      onScheduleChange(activityDate, value);
    }
  };

  const handleRecurringToggle = (enabled: boolean) => {
    if (onRecurringChange) {
      onRecurringChange(enabled, enabled ? recurringPattern : undefined);
    }
  };

  const handlePatternChange = (pattern: string) => {
    setRecurringPattern(pattern);
    if (onRecurringChange && isRecurring) {
      onRecurringChange(true, pattern);
    }
  };

  const recurringOptions = [
    { value: 'daily', label: 'ทุกวัน' },
    { value: 'weekly', label: 'ทุกสัปดาห์' },
    { value: 'biweekly', label: 'ทุก 2 สัปดาห์' },
    { value: 'monthly', label: 'ทุกเดือน' },
    { value: 'custom', label: 'กำหนดเอง' }
  ];

  const reminderOptions = [
    { value: '1', label: '1 วันก่อน' },
    { value: '3', label: '3 วันก่อน' },
    { value: '7', label: '1 สัปดาห์ก่อน' },
    { value: '14', label: '2 สัปดาห์ก่อน' }
  ];

  return (
    <div className="space-y-6">
      {/* Basic Scheduling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>กำหนดวันเวลา</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="activity-date">วันที่</Label>
              <Input
                id="activity-date"
                type="date"
                value={activityDate}
                min={currentDate}
                onChange={(e) => handleDateTimeChange('date', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="activity-time">เวลา</Label>
              <Input
                id="activity-time"
                type="time"
                value={activityTime}
                onChange={(e) => handleDateTimeChange('time', e.target.value)}
              />
            </div>
          </div>

          {activityDate && activityTime && (
            <div className="text-sm text-blue-700 bg-blue-100 p-3 rounded">
              <strong>กำหนดการ:</strong> {new Date(`${activityDate}T${activityTime}`).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recurring Activities */}
      {onRecurringChange && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Repeat className="h-5 w-5" />
              <span>กิจกรรมประจำ</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="recurring">ทำซ้ำตามรูปแบบ</Label>
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={handleRecurringToggle}
              />
            </div>

            {isRecurring && (
              <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <Label htmlFor="pattern">รูปแบบการทำซ้ำ</Label>
                  <Select value={recurringPattern} onValueChange={handlePatternChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {recurringOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {recurringPattern === 'custom' && (
                  <div>
                    <Label htmlFor="custom-pattern">รูปแบบกำหนดเอง</Label>
                    <Textarea
                      id="custom-pattern"
                      placeholder="อธิบายรูปแบบการทำซ้ำ เช่น ทุกวันพฤหัสบดีแรกของเดือน"
                      rows={3}
                    />
                  </div>
                )}

                <div className="text-sm text-blue-700">
                  <strong>หมายเหตุ:</strong> กิจกรรมประจำจะถูกสร้างอัตโนมัติตามรูปแบบที่กำหนด
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reminder Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>การแจ้งเตือน</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-reminder">ส่งอีเมลแจ้งเตือน</Label>
            <Switch
              id="email-reminder"
              checked={reminderSettings.emailReminder}
              onCheckedChange={(checked) => 
                setReminderSettings(prev => ({ ...prev, emailReminder: checked }))
              }
            />
          </div>

          {reminderSettings.emailReminder && (
            <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div>
                <Label htmlFor="reminder-days">ส่งแจ้งเตือนล่วงหน้า</Label>
                <Select 
                  value={reminderSettings.reminderDays} 
                  onValueChange={(value) => 
                    setReminderSettings(prev => ({ ...prev, reminderDays: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reminderOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="custom-message">ข้อความเพิ่มเติม (ไม่บังคับ)</Label>
                <Textarea
                  id="custom-message"
                  value={reminderSettings.customMessage}
                  onChange={(e) => 
                    setReminderSettings(prev => ({ ...prev, customMessage: e.target.value }))
                  }
                  placeholder="ข้อความพิเศษที่ต้องการส่งในอีเมลแจ้งเตือน"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2 text-sm text-green-700">
                <Mail className="h-4 w-4" />
                <span>อีเมลแจ้งเตือนจะถูกส่งให้ผู้ลงทะเบียนทั้งหมด</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Summary */}
      {activityDate && activityTime && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-lg">สรุปกำหนดการ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">วันเวลากิจกรรม</span>
              <span className="font-semibold">
                {new Date(`${activityDate}T${activityTime}`).toLocaleDateString('th-TH', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            {isRecurring && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">การทำซ้ำ</span>
                <span className="font-semibold text-blue-600">
                  {recurringOptions.find(opt => opt.value === recurringPattern)?.label}
                </span>
              </div>
            )}
            
            {reminderSettings.emailReminder && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">แจ้งเตือน</span>
                <span className="font-semibold text-green-600">
                  {reminderOptions.find(opt => opt.value === reminderSettings.reminderDays)?.label}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActivityScheduler;
