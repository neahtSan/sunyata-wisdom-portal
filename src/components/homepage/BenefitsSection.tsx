
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, Star, Book, Activity } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Leaf,
      title: 'ความสงบใจ',
      description: 'พบกับความสงบและความผ่อนคลายในธรรมชาติ'
    },
    {
      icon: Book,
      title: 'เรียนรู้ธรรมะ',
      description: 'ศึกษาหลักคำสอนที่นำไปใช้ในชีวิตประจำวัน'
    },
    {
      icon: Users,
      title: 'ชุมชนดี',
      description: 'พบปะกับเพื่อนร่วมทางธรรมและแบ่งปันประสบการณ์'
    },
    {
      icon: Star,
      title: 'พัฒนาจิตใจ',
      description: 'ฝึกสมาธิและพัฒนาคุณภาพชีวิตให้ดีขึ้น'
    },
    {
      icon: Activity,
      title: 'กิจกรรมหลากหลาย',
      description: 'เข้าร่วมกิจกรรมธรรมะและงานบุญต่างๆ'
    }
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            มาวัดแล้วได้อะไร?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            ค้นพบประโยชน์และความหมายที่ท่านจะได้รับจากการมาวัดป่าสุญญตา
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
                  <div className="mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
