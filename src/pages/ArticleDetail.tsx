import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, User, Eye, Tag, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ArticleDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Sample article data - in real app, this would be fetched based on ID
  const article = {
    id: parseInt(id || '1'),
    title: "หลักการสมาธิเบื้องต้น สำหรับผู้เริ่มต้น",
    content: `
      <h2>การเริ่มต้นปฏิบัติสมาธิ</h2>
      <p>การปฏิบัติสมาธิเป็นหนทางสำคัญในการพัฒนาจิตใจและการเข้าถึงความสงบภายใน สำหรับผู้เริ่มต้น การปฏิบัติสมาธิอาจดูเป็นเรื่องที่ยากลำบาก แต่ด้วยหลักการที่ถูกต้องและการฝึกฝนอย่างสม่ำเสมอ ทุกคนสามารถพัฒนาจิตสมาธิได้</p>
      
      <h3>การเตรียมตัวก่อนปฏิบัติสมาธิ</h3>
      <p>ก่อนที่จะเริ่มนั่งสมาธิ การเตรียมตัวที่เหมาะสมจะช่วยให้การปฏิบัติเป็นไปอย่างราบรื่น:</p>
      <ul>
        <li>เลือกสถานที่ที่เงียบสงบ ไม่มีสิ่งรบกวน</li>
        <li>นั่งในท่าที่สบาย แต่ตัวตรง หลังเหยียด</li>
        <li>ปิดตาเบาๆ หรือมองลงข้างหน้าในระยะใกล้</li>
        <li>วางมือบนตัก หรือในท่าที่รู้สึกสบาย</li>
      </ul>
      
      <h3>การสังเกตลมหายใจ</h3>
      <p>การสังเกตลมหายใจเป็นวิธีการเบื้องต้นที่ดีที่สุดสำหรับผู้เริ่มต้น:</p>
      <ol>
        <li>เริ่มต้นด้วยการหายใจเข้าลึกๆ 3-5 ครั้ง</li>
        <li>ปล่อยให้ลมหายใจเป็นไปตามธรรมชาติ</li>
        <li>มีสติสังเกตลมหายใจเข้า-ออก</li>
        <li>เมื่อใจฟุ้งซ่าน ให้นำใจกลับมาสังเกตลมหายใจ</li>
      </ol>
      
      <h3>การจัดการกับอุปสรรค</h3>
      <p>ในระหว่างการปฏิบัติสมาธิ อาจมีอุปสรรคต่างๆ เกิดขึ้น:</p>
      <ul>
        <li><strong>ความง่วงซึม:</strong> ลองปรับท่านั่งให้ตรงขึ้น หรือเปิดตาเล็กน้อย</li>
        <li><strong>ความฟุ้งซ่าน:</strong> อย่าต่อสู้กับความคิด ให้นำใจกลับมาสังเกตลมหายใจเบาๆ</li>
        <li><strong>ความเจ็บปวด:</strong> ปรับท่านั่งเล็กน้อย หรือใช้หมอนรองนั่ง</li>
      </ul>
      
      <h3>การปฏิบัติอย่างสม่ำเสมอ</h3>
      <p>สิ่งสำคัญที่สุดในการพัฒนาสมาธิคือการปฏิบัติอย่างสม่ำเสมอ เริ่มต้นจาก 5-10 นาทีในแต่ละวัน แล้วค่อยๆ เพิ่มเวลาขึ้นตามความสามารถ</p>
      
      <p>การปฏิบัติสมาธิไม่ได้มีเป้าหมายเพื่อหยุดความคิด แต่เพื่อพัฒนาสติและความตระหนักรู้ ผลที่ได้รับจะค่อยๆ ปรากฏขึ้นในรูปของความสงบใจ ความมีสติในชีวิตประจำวัน และสติปัญญาที่เพิ่มขึ้น</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["สมาธิ", "เบื้องต้น"],
    author: "พระอาจารย์ปัญญานันท์",
    publishDate: "15 มกราคม 2567",
    views: 1250
  };

  // Sample approved comments
  const approvedComments = [
    {
      id: 1,
      name: "คุณสมศรี",
      content: "บทความนี้อธิบายได้ชัดเจนมาก ขอบคุณพระอาจารย์ครับ",
      date: "16 มกราคม 2567"
    },
    {
      id: 2,
      name: "คุณวิชาย",
      content: "ได้ลองปฏิบัติตามแล้ว รู้สึกสงบใจขึ้นจริงๆ",
      date: "17 มกราคม 2567"
    }
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() && name.trim()) {
      toast({
        title: "ส่งความคิดเห็นสำเร็จ",
        description: "ความคิดเห็นของคุณจะแสดงหลังจากได้รับการอนุมัติ",
      });
      setComment('');
      setName('');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link - Hidden on PC, visible on mobile */}
        <Link
          to="/dharma"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors lg:hidden"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับสู่หน้าบทความ
        </Link>

        {/* Article Content */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover Image */}
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />
          
          <div className="p-6 md:p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              {article.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 border-b pb-6 mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{article.publishDate}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{article.views.toLocaleString()} ครั้ง</span>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-3" />
            ความคิดเห็น
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">แสดงความคิดเห็น</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ *
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="กรอกชื่อของคุณ"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล (ไม่บังคับ)
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="กรอกอีเมลของคุณ"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                ความคิดเห็น *
              </label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="แสดงความคิดเห็นของคุณ..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="flex items-center">
              <Send className="w-4 h-4 mr-2" />
              ส่งความคิดเห็น
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              * ความคิดเห็นจะแสดงหลังจากได้รับการอนุมัติจากผู้ดูแล
            </p>
          </form>

          {/* Approved Comments */}
          <div className="space-y-6">
            {approvedComments.length > 0 ? (
              approvedComments.map((comment) => (
                <div key={comment.id} className="border-l-4 border-green-500 pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">{comment.name}</h4>
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
