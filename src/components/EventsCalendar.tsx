
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample events data - in real implementation, these would come from backend
  const sampleEvents = [
    {
      id: 1,
      title: "ปฏิบัติธรรมรายวัน",
      date: "2024-01-15",
      time: "06:00 - 08:00",
      location: "ศาลาใหญ่",
      type: "สาธารณะ",
      description: "นั่งสมาธิและฟังธรรมะ",
      attendees: 25
    },
    {
      id: 2,
      title: "คอร์สปฏิบัติธรรม 7 วัน",
      date: "2024-01-20",
      time: "09:00 - 16:00",
      location: "ห้องปฏิบัติธรรม",
      type: "ลงทะเบียน",
      description: "คอร์สเข้มข้นสำหรับผู้ที่ต้องการพัฒนาสมาธิ",
      attendees: 15
    },
    {
      id: 3,
      title: "ธรรมะสำหรับครอบครัว",
      date: "2024-01-25",
      time: "14:00 - 17:00",
      location: "ศาลากลางแจ้ง",
      type: "สาธารณะ",
      description: "กิจกรรมธรรมะสำหรับทั้งครอบครัว",
      attendees: 40
    }
  ];

  const upcomingEvents = sampleEvents.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    };
    return date.toLocaleDateString('th-TH', options);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ปฏิทินกิจกรรม
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ร่วมกิจกรรมปฏิบัติธรรมและเรียนรู้ไปด้วยกัน
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-600"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center text-green-600">
                  <Calendar className="w-6 h-6 mr-2" />
                  <span className="text-sm font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  event.type === 'สาธารณะ' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {event.type}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {event.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <span className="text-lg">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span className="text-lg">{event.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <span className="text-lg">ผู้เข้าร่วม {event.attendees} คน</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {event.description}
              </p>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors duration-200">
                {event.type === 'ลงทะเบียน' ? 'ลงทะเบียน' : 'รายละเอียดเพิ่มเติม'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg">
            ดูปฏิทินทั้งหมด
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;
