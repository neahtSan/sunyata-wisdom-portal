
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FallbackImage from '@/components/ui/fallback-image';
import { Calendar, ArrowLeft, Filter, Users } from 'lucide-react';

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Sample activities data organized by timeline
  const allActivities = [
    {
      id: 1,
      title: "ปฏิบัติธรรมประจำสัปดาห์",
      date: "15 มกราคม 2567",
      year: "2567",
      month: "มกราคม",
      category: "ปฏิบัติธรรม",
      participants: 25,
      images: [
        "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "กิจกรรมปฏิบัติธรรมประจำสัปดาห์ สำหรับผู้ที่สนใจเรียนรู้หลักธรรมพื้นฐาน"
    },
    {
      id: 2,
      title: "อบรมสมาธิเข้มข้น",
      date: "22 กุมภาพันธ์ 2567",
      year: "2567",
      month: "กุมภาพันธ์",
      category: "อบรม",
      participants: 15,
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "อบรมสมาธิเข้มข้น 3 วัน 2 คืน สำหรับผู้ที่ต้องการเจาะลึกการปฏิบัติ"
    },
    {
      id: 3,
      title: "บรรยายธรรมพิเศษ",
      date: "8 มีนาคม 2567",
      year: "2567",
      month: "มีนาคม",
      category: "บรรยาย",
      participants: 50,
      images: [
        "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "บรรยายธรรมพิเศษเรื่อง 'การใช้ชีวิตอย่างมีสติ' โดยพระอาจารย์ปัญญานันท์"
    },
    {
      id: 4,
      title: "งานบุญประจำเดือน",
      date: "15 เมษายน 2566",
      year: "2566",
      month: "เมษายน",
      category: "งานบุญ",
      participants: 80,
      images: [
        "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "งานบุญประจำเดือนเพื่อการสร้างบุญกุศลและการร่วมใจของชุมชน"
    },
    {
      id: 5,
      title: "การปฏิบัติกลางแจ้ง",
      date: "22 พฤษภาคม 2566",
      year: "2566",
      month: "พฤษภาคม",
      category: "ปฏิบัติธรรม",
      participants: 30,
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      description: "การปฏิบัติธรรมกลางแจ้งท่ามกลางธรรมชาติ เสริมสร้างความสงบใจ"
    }
  ];

  const categories = ['all', 'ปฏิบัติธรรม', 'อบรม', 'บรรยาย', 'งานบุญ'];
  const years = ['all', '2567', '2566'];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">แกลเลอรี่กิจกรรม</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              ภาพบรรยากาศกิจกรรมต่างๆ และประสบการณ์การเรียนรู้ร่วมกัน
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

      {/* Activities Gallery */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative">
                        <FallbackImage
                          src={activity.images[0]}
                          alt={activity.title}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {activity.category}
                          </span>
                        </div>
                        {activity.images.length > 1 && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                              +{activity.images.length - 1} รูป
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                          {activity.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{activity.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{activity.participants} คน</span>
                          </div>
                        </div>

                        <Link
                          to={`/activity/${activity.id}`}
                          className="block w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-center"
                        >
                          ดูแกลเลอรี่เต็ม
                        </Link>
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

export default Gallery;
