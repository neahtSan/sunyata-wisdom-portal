
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingEvents = () => {
  // Mock events data - in real app, this would come from admin panel
  const events = [
    {
      id: 1,
      title: 'วันพระ - สวดมนต์เช้าวันพระ - สวดมนต์เช้าวันพระ - สวดมนต์เช้าวันพระ - สวดมนต์เช้า',
      date: '2024-01-15',
      time: '06:00',
      location: 'วิหารใหญ่',
      participants: 'ทุกท่าน',
      description: 'พิธีสวดมนต์เช้าและนั่งสมาธิร่วมกัน พิธีสวดมนต์เช้าและนั่งสมาธิร่วมกันพิธีสวดมนต์เช้าและนั่งสมาธิร่วมกันพิธีสวดมนต์เช้าและนั่งสมาธิร่วมกันพิธีสวดมนต์เช้าและนั่งสมาธิร่วมกันพิธีสวดมนต์เช้าและนั่งสมาธิร่วมกันพิธีสวดมนต์เช้าและนั่งสมาธิร่วมกัน'
    },
    {
      id: 2,
      title: 'การเรียนรู้ปฏิบัติธรรมสำหรับผู้เริ่มต้นวันพระ - สวดมนต์เช้า',
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
    <TooltipProvider>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {events.slice(0, 4).map((event, index) => (
            <Card 
              key={event.id} 
              className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${
                index >= 1 ? 'hidden sm:block' : ''
              } ${
                index >= 2 ? 'hidden lg:block' : ''
              }`}
            >
              <CardHeader className="pb-3 sm:pb-4 flex-shrink-0">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-800 leading-6 line-clamp-2 cursor-pointer h-12">
                      {event.title}
                    </CardTitle>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs p-2">
                    <p className="text-sm">{event.title}</p>
                  </TooltipContent>
                </Tooltip>
                <div className="my-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                    กิจกรรม
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col flex-grow">
                <div className="flex-grow">
                  <p className="text-sm sm:text-base text-gray-600 leading-6 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-sm text-gray-600">
                        {formatTime(event.time)}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-sm text-gray-600 truncate">
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-sm text-gray-600 truncate">
                        {event.participants}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link to="/registration" className="mt-auto">
                  <Button variant="outline" className="w-full text-sm py-2">
                    สมัครเข้าร่วม
                  </Button>
                </Link>
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
    </TooltipProvider>
  );
};

export default UpcomingEvents;
