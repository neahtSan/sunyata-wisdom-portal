
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Calendar, MapPin, Clock, TrendingUp, UserCheck, UserX, Star } from 'lucide-react';

interface ActivityAnalyticsProps {
  activity: {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    maxParticipants: number;
    currentRegistrations: number;
    views: number;
    category: string;
    status: string;
    featured: boolean;
    registrationEnabled: boolean;
    completedParticipants?: number;
    noShowParticipants?: number;
    rating?: number;
    feedbackCount?: number;
  };
}

const ActivityAnalytics = ({ activity }: ActivityAnalyticsProps) => {
  const registrationRate = activity.maxParticipants > 0 ? 
    Math.round((activity.currentRegistrations / activity.maxParticipants) * 100) : 0;
  
  const attendanceRate = activity.completedParticipants && activity.currentRegistrations > 0 ?
    Math.round((activity.completedParticipants / activity.currentRegistrations) * 100) : 0;

  const isUpcoming = new Date(activity.date) > new Date();
  const isPast = new Date(activity.date) < new Date();

  const stats = [
    {
      label: 'ยอดเข้าชม',
      value: activity.views.toLocaleString(),
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      label: 'ผู้ลงทะเบียน',
      value: `${activity.currentRegistrations}/${activity.maxParticipants}`,
      icon: Users,
      color: 'text-green-600'
    },
    {
      label: 'ผู้เข้าร่วมจริง',
      value: activity.completedParticipants?.toLocaleString() || 'N/A',
      icon: UserCheck,
      color: 'text-purple-600'
    },
    {
      label: 'ไม่มาร่วม',
      value: activity.noShowParticipants?.toLocaleString() || 'N/A',
      icon: UserX,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registration Progress */}
      {activity.registrationEnabled && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">สถานะการลงทะเบียน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>ความคืบหน้า</span>
                <span>{registrationRate}%</span>
              </div>
              <Progress value={registrationRate} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{activity.currentRegistrations} คน</span>
                <span>เป้าหมาย {activity.maxParticipants} คน</span>
              </div>
            </div>

            {registrationRate >= 90 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-sm text-orange-800">
                  <strong>การลงทะเบียนเกือบเต็ม!</strong> เหลือที่นั่งอีก {activity.maxParticipants - activity.currentRegistrations} ที่
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Attendance Analytics (for past activities) */}
      {isPast && activity.completedParticipants !== undefined && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">สถิติการเข้าร่วม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>อัตราการเข้าร่วม</span>
                <span>{attendanceRate}%</span>
              </div>
              <Progress value={attendanceRate} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="font-semibold text-green-800">{activity.completedParticipants}</p>
                <p className="text-green-600">เข้าร่วม</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="font-semibold text-red-800">{activity.noShowParticipants || 0}</p>
                <p className="text-red-600">ไม่มาร่วม</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Activity Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">รายละเอียดกิจกรรม</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">วันเวลา</span>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{activity.date} {activity.time}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">สถานที่</span>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{activity.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">สถานะ</span>
            <Badge variant={activity.status === 'published' ? 'default' : 'outline'}>
              {activity.status === 'published' ? 'เผยแพร่' : activity.status === 'cancelled' ? 'ยกเลิก' : 'ร่าง'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">ประเภท</span>
            <Badge variant="secondary">{activity.category}</Badge>
          </div>

          {activity.featured && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">สถานะพิเศษ</span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold text-yellow-600">กิจกรรมเด่น</span>
              </div>
            </div>
          )}

          {activity.rating && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">คะแนนประเมิน</span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{activity.rating.toFixed(1)}/5.0</span>
                <span className="text-sm text-gray-500">({activity.feedbackCount} รีวิว)</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Time Status Indicator */}
      <Card>
        <CardContent className="p-4">
          {isUpcoming && (
            <div className="flex items-center space-x-2 text-blue-700 bg-blue-50 p-3 rounded">
              <Clock className="h-4 w-4" />
              <span className="font-medium">กิจกรรมที่กำลังจะมาถึง</span>
            </div>
          )}
          
          {isPast && (
            <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 p-3 rounded">
              <Clock className="h-4 w-4" />
              <span className="font-medium">กิจกรรมที่ผ่านมาแล้ว</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityAnalytics;
