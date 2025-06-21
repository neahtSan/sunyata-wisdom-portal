
import React, { useState } from 'react';
import { MessageCircle, Send, Heart } from 'lucide-react';
import { toast } from 'sonner';

const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample approved feedback
  const approvedFeedback = [
    {
      id: 1,
      name: "คุณสมชาย",
      message: "ได้รับประโยชน์จากการปฏิบัติธรรมที่นี่มาก จิตใจสงบและเข้าใจชีวิตมากขึ้น ขอบคุณพระอาจารย์และวัดทุกท่านครับ",
      date: "15 มกราคม 2567"
    },
    {
      id: 2,
      name: "คุณมาลี",
      message: "บรรยากาศที่วัดสงบมาก เหมาะสำหรับการฝึกสมาธิ พระอาจารย์ใจดีและให้คำแนะนำที่เป็นประโยชน์ค่ะ",
      date: "8 กุมภาพันธ์ 2567"
    },
    {
      id: 3,
      name: "ครอบครัวสมหวัง",
      message: "พาลูกๆ มาร่วมกิจกรรมครอบครัว เด็กๆ ชอบมาก เรียนรู้คุณธรรมและได้ใช้เวลาร่วมกันอย่างมีประโยชน์",
      date: "22 มีนาคม 2567"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.message.trim()) {
      toast.error('กรุณาเขียนข้อความความคิดเห็น');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('ส่งความคิดเห็นสำเร็จ! ขอบคุณสำหรับข้อความของท่าน ทางวัดจะพิจารณาเพื่อเผยแพร่ต่อไป');
      
      setFormData({
        name: '',
        message: ''
      });
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ความคิดเห็นจากผู้มาเยือน
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ท่านสามารถแบ่งปันประสบการณ์และข้อเสนอแนะกับเราได้
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Feedback Form */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <MessageCircle className="w-8 h-8 text-orange-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">แสดงความคิดเห็น</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                  ชื่อ (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200"
                  placeholder="ระบุชื่อของท่าน"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
                  ข้อความ *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none"
                  placeholder="แบ่งปันประสบการณ์หรือข้อเสนอแนะของท่าน..."
                  required
                />
              </div>

              <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border-l-4 border-orange-400">
                <p>
                  <strong>หมายเหตุ:</strong> ความคิดเห็นของท่านจะได้รับการพิจารณาก่อนการเผยแพร่ 
                  เพื่อรักษาคุณภาพของความเห็นบนเว็บไซต์
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  'กำลังส่ง...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    ส่งความคิดเห็น
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Approved Feedback Display */}
          <div>
            <div className="flex items-center mb-6">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">ความคิดเห็นจากผู้มาเยือน</h3>
            </div>

            <div className="space-y-6">
              {approvedFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-400 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-800">{feedback.name}</h4>
                    <span className="text-sm text-gray-500">{feedback.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    "{feedback.message}"
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="text-red-600 hover:text-red-700 font-medium text-lg transition-colors duration-200">
                ดูความคิดเห็นทั้งหมด →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
