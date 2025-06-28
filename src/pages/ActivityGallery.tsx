
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FallbackImage from '@/components/ui/fallback-image';
import { Calendar, ArrowLeft, Filter, Users, Clock, MapPin } from 'lucide-react';

const ActivityGallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Activities data from homepage UpcomingEvents component
  const allActivities = [
    {
      id: 1,
      title: 'วันพระ - สวดมนต์เช้า',
      date: '15 มกราคม 2567',
      year: '2567',
      month: 'มกราคม',
      time: '06:00',
      location: 'วิหารใหญ่',
      participants: 'ทุกท่าน',
      category: 'พิธีกรรม',
      description: 'พิธีสวดมนต์เช้าและนั่งสมาธิร่วมกัน',
      images: [
        "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 2,
      title: 'การเรียนรู้ปฏิบัติธรรมสำหรับผู้เริ่มต้น',
      date: '18 มกราคม 2567',
      year: '2567',
      month: 'มกราคม',
      time: '09:00',
      location: 'ศาลาการเปรียญ',
      participants: 'ผู้สนใจ',
      category: 'ปฏิบัติธรรม',
      description: 'หลักสูตรเบื้องต้นสำหรับผู้ที่ต้องการเริ่มต้นปฏิบัติธรรม',
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 3,
      title: 'ปฏิบัติธรรมค้างคืน',
      date: '22 มกราคม 2567',
      year: '2567',
      month: 'มกราคม',
      time: '17:00',
      location: 'กุฏิปฏิบัติธรรม',
      participants: 'จำกัด 20 ท่าน',
      category: 'ปฏิบัติธรรม',
      description: 'โปรแกรมปฏิบัติธรรมค้างคืน 2 วัน 1 คืน',
      images: [
        "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 4,
      title: 'วันวิสาขบูชา - พิธีเวียนเทียน',
      date: '25 มกราคม 2567',
      year: '2567',
      month: 'มกราคม',
      time: '19:00',
      location: 'รอบวิหารใหญ่',
      participants: 'ทุกท่าน',
      category: 'พิธีกรรม',
      description: 'พิธีเวียนเทียนเนื่องในวันวิสาขบูชา',
      images: [
        "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  const categories = ['all', 'ปฏิบัติธรรม', 'พิธีกรรม', 'บรรยาย', 'งานบุญ'];
  const years = ['all', '2567', '2566'];

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

  // Filter activities
  const filteredActivities = allActivities.filter(activity => {
    const categoryMatch = selectedFilter === 'all' || activity.category === selectedFilter;
    const yearMatch = selectedYear === 'all' || activity.year === selectedYear;
    return categoryMatch && yearMatch;
  });

  // Group activities by year and month
  const groupedActivities = filteredActivities.reduce((acc, activity) => {
    const key = `${activity.year}-${activity.month}`;
    if (!acc[key]) {
      acc[key] = {
        year: activity.year,
        month: activity.month,
        activities: []
      };
    }
    acc[key].activities.push(activity);
    return acc;
  }, {} as Record<string, { year: string; month: string; activities: typeof allActivities }>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">กิจกรรมของวัด</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              ร่วมเป็นส่วนหนึ่งของกิจกรรมธรรมะและการปฏิบัติต่างๆ
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-white hover:text-green-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              กลับสู่หน้าแรก
            </Link>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="all">ประเภทกิจกรรมทั้งหมด</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="all">ปีทั้งหมด</option>
                {years.slice(1).map(year => (
                  <option key={year} value={year}>พ.ศ. {year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {Object.values(groupedActivities).length > 0 ? (
            Object.values(groupedActivities).map((group) => (
              <div key={`${group.year}-${group.month}`} className="mb-12">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{group.month} พ.ศ. {group.year}</h2>
                    <p className="text-gray-600">{group.activities.length} กิจกรรม</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {group.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-green-500"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                        {/* Activity Image */}
                        <div className="lg:col-span-1">
                          <FallbackImage
                            src={activity.images[0]}
                            alt={activity.title}
                            className="w-full h-48 lg:h-full object-cover rounded-lg"
                            loading="lazy"
                          />
                        </div>

                        {/* Activity Details */}
                        <div className="lg:col-span-2 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                              {activity.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {activity.description}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-gray-500">วันที่</div>
                                  <div className="text-sm font-medium text-gray-800">
                                    {formatDate(activity.date)}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Clock className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-gray-500">เวลา</div>
                                  <div className="text-sm font-medium text-gray-800">
                                    {formatTime(activity.time)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="flex items-center space-x-2">
                                <MapPin className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-gray-500">สถานที่</div>
                                  <div className="text-sm font-medium text-gray-800">
                                    {activity.location}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <div>
                                  <div className="text-xs text-gray-500">ผู้เข้าร่วม</div>
                                  <div className="text-sm font-medium text-gray-800">
                                    {activity.participants}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="lg:col-span-1 flex flex-col gap-3 justify-start">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium text-center">
                            {activity.category}
                          </span>
                          
                          <Link
                            to="/registration"
                            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
                          >
                            สมัครเข้าร่วม
                          </Link>
                          
                          <Link
                            to={`/gallery?album=${activity.id}`}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
                          >
                            ดูภาพกิจกรรม
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">ไม่พบกิจกรรมที่ตรงกับการค้นหา</p>
              <p className="text-gray-500 mt-2">ลองเปลี่ยนตัวกรองหรือเลือกปีอื่น</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ActivityGallery;
