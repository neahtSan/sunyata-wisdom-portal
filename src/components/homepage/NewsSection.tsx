
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsSection = () => {
  // Mock news data - in real app, this would come from admin panel
  const news = [
    {
      id: 1,
      title: 'ประกาศเปิดรับสมัครหลักสูตรปฏิบัติธรรม 7 วัน',
      summary: 'หลักสูตรปฏิบัติธรรมเข้มข้นสำหรับผู้ที่ต้องการเรียนรู้การปฏิบัติสมาธิอย่างลึกซึ้ง เริ่มต้นตั้งแต่วันที่ 15 มกราคม 2567',
      date: '2024-01-10',
      category: 'หลักสูตร',
      featured: true
    },
    {
      id: 2,
      title: 'พิธีทำบุญวันพระ ประจำเดือนมกราคม',
      summary: 'ขอเชิญทุกท่านร่วมทำบุญในวันพระ พร้อมฟังเทศน์ธรรมและสวดมนต์ร่วมกัน ณ วิหารใหญ่',
      date: '2024-01-08',
      category: 'พิธีกรรม',
      featured: true
    },
    {
      id: 3,
      title: 'กิจกรรมปันน้ำใจให้ชุมชน ช่วงปีใหม่',
      summary: 'โครงการแจกข้าวสารและของจำเป็นให้กับครอบครัวผู้ยากไร้ในชุมชน เพื่อส่งท้ายปีเก่าต้อนรับปีใหม่',
      date: '2024-01-05',
      category: 'กิจกรรม',
      featured: true
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            ข่าวประชาสัมพันธ์
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            ติดตามข่าวสารและกิจกรรมล่าสุดของวัด
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {news.map((item, index) => (
            <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(item.date)}</span>
                  <span className="mx-2">•</span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {item.category}
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                  {item.summary}
                </p>
                <Link to={`/dharma/${item.id}`}>
                  <Button variant="outline" className="w-full text-base py-3">
                    อ่านต่อ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/dharma">
            <Button size="lg" className="text-lg px-8 py-4">
              ดูข่าวทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
