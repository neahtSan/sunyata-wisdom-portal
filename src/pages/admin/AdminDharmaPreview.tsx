
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Calendar, User, Eye } from 'lucide-react';

const AdminDharmaPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    // Load article data - in real app, fetch from API
    const mockArticle = {
      id: 1,
      title: 'หลักการสมาธิเบื้องต้น',
      content: 'การปฏิบัติสมาธิเป็นพื้นฐานสำคัญในการพัฒนาจิตใจ ช่วยให้เกิดความสงบและความใสใน จิตใจ เพื่อพัฒนาปัญญาให้เกิดขึ้น\n\nสมาธิมีหลายระดับ ตั้งแต่การทำให้จิตสงบเบื้องต้น ไปจนถึงการบรรลุฌานต่างๆ การฝึกสมาธิต้องอาศัยความอดทนและการฝึกฝนอย่างต่อเนื่อง\n\nหลักการสำคัญในการปฏิบัติสมาธิ:\n1. การรักษาศีล ให้จิตใจผ่องใส\n2. การควบคุมอินทรีย์ ไม่ให้ฟุ้งซ่าน\n3. การเจริญสติ ระลึกรู้ตัวอยู่เสมอ\n4. การฝึกสมาธิ ทำจิตให้มั่นคง\n\nผลของการปฏิบัติสมาธิที่ถูกต้อง จะทำให้เกิดความสุขใจ ความสงบ และเป็นรากฐานสำคัญในการพัฒนาปัญญาต่อไป',
      writer: 'พระอาจารย์สุเมธ',
      category: 'สมาธิ',
      tags: 'สมาธิ, ปฏิบัติธรรม, พื้นฐาน',
      status: 'published',
      image: 'https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: '15 มกราคม 2567',
      views: 245
    };
    setArticle(mockArticle);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดบทความ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Admin Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/dharma-article')}
                className="w-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับสู่รายการ
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-600 bg-green-100 px-3 py-1 rounded-full">
                โหมดพรีวิว
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Link to={`/admin/dharma-article/${id}`}>
                <Button variant="outline" size="sm" className="w-auto">
                  <Edit className="h-4 w-4 mr-2" />
                  แก้ไข
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Article Image */}
            {article.image && (
              <div className="relative h-64 md:h-80">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
            )}

            {/* Article Header */}
            <div className="p-6 md:p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>โดย {article.writer}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{article.views.toLocaleString()} ครั้ง</span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
              </div>

              {/* Article Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {article.content}
                </div>
              </div>

              {/* Tags */}
              {article.tags && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-medium text-gray-700">แท็ก:</span>
                    {article.tags.split(',').map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium hover:bg-green-200 transition-colors cursor-pointer"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
                <Link to={`/admin/dharma-article/${id}`}>
                  <Button className="w-auto">
                    <Edit className="h-4 w-4 mr-2" />
                    แก้ไขบทความ
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/admin/dharma-article')}
                  className="w-auto"
                >
                  กลับสู่รายการ
                </Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default AdminDharmaPreview;
