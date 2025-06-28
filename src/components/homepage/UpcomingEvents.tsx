
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  // Mock events data - in real app, this would come from admin panel
  const events = [
    {
      id: 1,
      title: 'วันพระ - สวดมนต์เช้า',
      date: '2024-01-15',
      time: '06:00',
      location: 'วิหารใหญ่',
      participants: 'ทุกท่าน',
      description: 'พิธีสวดมนต์เช้าและนั่งสมาธิร่วมกัน'
    },
    {
      id: 2,
      title: 'การเรียนรู้ปฏิบัติธรรมสำหรับผู้เริ่มต้น',
      date: '2024-01-18',
      time: '09:00',
      location: 'ศาลาการเปรียญ',
      participants: 'ผู้สนใจ',
      description: 'หลักสูตรเบื้องต้นสำหรับผู้ที่ต้องการเริ่มต้นปฏิบัติธรรม'
    },
    {
      id: 3,
      title: 'ปฏิบัติธรรมค้างคืน',
      date: '2024-01-22',
      time: '17:00',
      location: 'กุฏิปฏิบัติธรรม',
      participants: 'จำกัด 20 ท่าน',
      description: 'โปรแกรมปฏิบัติธรรมค้างคืน 2 วัน 1 คืน'
    },
    {
      id: 4,
      title: 'วันวิสาขบูชา - พิธีเวียนเทียน',
      date: '2024-01-25',
      time: '19:00',
      location: 'รอบวิหารใหญ่',
      participants: 'ทุกท่าน',
      description: 'พิธีเวียนเทียนเนื่องในวันวิสาขบูชา'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return `${timeString} น.`;
  };

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-6 bg-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            กิจกรรมที่จะมาถึง
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 px-4">
            ร่วมเป็นส่วนหนึ่งของกิจกรรมธรรมะในเดือนนี้
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {events.map((event, index) => (
            <Card key={event.id} className="border-l-4 border-l-green-500 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                  <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                        {event.title}
                      </h3>
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500 mb-1">วันที่</div>
                            <div className="text-base sm:text-lg font-medium text-gray-800">
                              {formatDate(event.date)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500 mb-1">เวลา</div>
                            <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">
                              {formatTime(event.time)}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500 mb-1">สถานที่</div>
                            <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">
                              {event.location}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-gray-500 mb-1">ผู้เข้าร่วม</div>
                            <div className="text-sm sm:text-base lg:text-lg font-medium text-gray-800">
                              {event.participants}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1 flex lg:justify-end items-start">
                    <Link to="/registration" className="w-full lg:w-auto">
                      <Button size="lg" className="w-full text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 h-auto">
                        สมัครเข้าร่วม
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link to="/activities">
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              ดูกิจกรรมทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
