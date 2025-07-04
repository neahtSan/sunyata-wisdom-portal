
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const DharmaArticlesSection = () => {
  // Mock dharma articles data - in real app, this would come from admin panel
  const latestArticles = [
    {
      id: 1,
      title: "หลักการสมาธิเบื้องต้น สำหรับผู้เริ่มต้น",
      excerpt: "เรียนรู้หลักการพื้นฐานของการนั่งสมาธิ ตั้งแต่การหายใจอย่างถูกวิธี ไปจนถึงการปล่อยวาง",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "15 มกราคม 2567",
      views: 1250
    },
    {
      id: 2,
      title: "การปฏิบัติธรรมในชีวิตประจำวัน",
      excerpt: "ธรรมะไม่ใช่เพียงสิ่งที่เราศึกษาในหนังสือ แต่คือสิ่งที่นำมาใช้จริงในชีวิตประจำวัน",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "8 กุมภาพันธ์ 2567",
      views: 980
    },
    {
      id: 3,
      title: "ความหมายของการให้ทาน",
      excerpt: "การให้ทานไม่ใช่เพียงการให้สิ่งของ แต่เป็นการให้จากใจที่บริสุทธิ์",
      coverImage: "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "22 มีนาคม 2567",
      views: 756
    },
    {
      id: 4,
      title: "การเดินจงกรม วิธีการและประโยชน์",
      excerpt: "การเดินจงกรมเป็นการปฏิบัติธรรมที่สำคัญไม่แพ้การนั่งสมาธิ",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "5 เมษายน 2567",
      views: 642
    }
  ];

  return (
    <section className="w-full py-8 sm:py-12 lg:py-16 px-2 sm:px-4 lg:px-6 bg-gradient-to-b from-green-50 to-blue-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              บทความธรรมะล่าสุด
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 px-2">
            ศึกษาธรรมะและแนวทางการปฏิบัติเพื่อชีวิตที่มีความสุข
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {latestArticles.map((article, index) => (
            <Link 
              key={article.id} 
              to={`/dharma/${article.id}`}
              className={`block h-full ${
                index >= 1 ? 'hidden sm:block' : ''
              } ${
                index >= 2 ? 'hidden lg:block' : ''
              }`}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                
                <CardContent className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors leading-snug overflow-hidden text-ellipsis line-clamp-2 min-h-[3rem]">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed flex-grow overflow-hidden text-ellipsis line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Article Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">{article.publishDate}</span>
                  </div>
                  
                  {/* Read More Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mb-4 border-green-500 text-green-600 hover:bg-green-50 text-sm py-2"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `/dharma/${article.id}`;
                    }}
                  >
                    อ่านต่อ
                  </Button>
                  
                  <div className="space-y-2 text-sm text-gray-500 border-t pt-3 mt-auto">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="truncate text-sm">{article.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1 flex-shrink-0" />
                      <span className="text-sm">{article.views.toLocaleString()} การเข้าชม</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-12">
          <Link to="/dharma">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              ดูบทความธรรมะทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DharmaArticlesSection;
