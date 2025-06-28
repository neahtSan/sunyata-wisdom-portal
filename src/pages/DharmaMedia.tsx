import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, Filter, Calendar, User, Tag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const DharmaMedia = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "หลักการสมาधิเบื้องต้น สำหรับผู้เริ่มต้น",
      excerpt: "เรียนรู้หลักการพื้นฐานของการนั่งสมาธิ ตั้งแต่การหายใจอย่างถูกวิธี ไปจนถึงการปล่อยวาง...",
      coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["สมาธิ", "เบื้องต้น"],
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "15 มกราคม 2567",
      views: 1250
    },
    {
      id: 2,
      title: "การปฏิบัติธรรมในชีวิตประจำวัน",
      excerpt: "ธรรมะไม่ใช่เพียงสิ่งที่เราศึกษาในหนังสือ แต่คือสิ่งที่นำมาใช้จริงในชีวิตประจำวัน เรียนรู้วิธีการ...",
      coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["ชีวิตประจำวัน", "การปฏิบัติ"],
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "8 กุมภาพันธ์ 2567",
      views: 980
    },
    {
      id: 3,
      title: "ความหมายของการให้ทาน",
      excerpt: "การให้ทานไม่ใช่เพียงการให้สิ่งของ แต่เป็นการให้จากใจที่บริสุทธิ์ ความเข้าใจที่ถูกต้องเกี่ยวกับ...",
      coverImage: "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["ทาน", "คุณธรรม"],
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "22 มีนาคม 2567",
      views: 756
    },
    {
      id: 4,
      title: "การเดินจงกรม วิธีการและประโยชน์",
      excerpt: "การเดินจงกรมเป็นการปฏิบัติธรรมที่สำคัญไม่แพ้การนั่งสมาธิ เรียนรู้เทคนิคการเดินจงกรมที่ถูกต้อง...",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["จงกรม", "การปฏิบัติ"],
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "5 เมษายน 2567",
      views: 642
    },
    {
      id: 5,
      title: "ความสำคัญของการรักษาศีล",
      excerpt: "ศีลเป็นพื้นฐานของการปฏิบัติธรรม การรักษาศีลไม่ใช่การจำกัดตนเอง แต่เป็นการสร้างเสรีภาพที่แท้จริง...",
      coverImage: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["ศีล", "คุณธรรม"],
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "18 เมษายน 2567",
      views: 834
    },
    {
      id: 6,
      title: "การจัดการอารมณ์ด้วยสติ",
      excerpt: "เมื่อเราเผชิญกับอารมณ์ต่างๆ ไม่ว่าจะเป็นความโกรธ ความเศร้า หรือความดีใจ การมีสติจะช่วยให้เราจัดการ...",
      coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["สติ", "อารมณ์"],
      author: "พระอาจารย์ปัญญานันท์",
      publishDate: "2 พฤษภาคม 2567",
      views: 1156
    }
  ];

  // Get unique tags
  const allTags = [...new Set(articles.flatMap(article => article.tags))];

  // Filter articles based on search and tag
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === '' || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      {/* Main content with padding to compensate for fixed navigation on mobile */}
      <div className="pt-16 md:pt-0">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ธรรมะมีเดีย</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              คลังธรรมะและบทความเพื่อการเรียนรู้และปฏิบัติธรรมในชีวิตประจำวัน
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ค้นหาบทความ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              >
                <option value="">หมวดหมู่ทั้งหมด</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link 
                key={article.id} 
                to={`/dharma/${article.id}`}
                className="block h-full"
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
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

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

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">ไม่พบบทความที่ค้นหา</p>
              <p className="text-gray-500 mt-2">ลองใช้คำค้นหาอื่น หรือเลือกหมวดหมู่ใหม่</p>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200">
                โหลดบทความเพิ่มเติม
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
      </div>
    </div>
    </TooltipProvider>
  );
};

export default DharmaMedia;
