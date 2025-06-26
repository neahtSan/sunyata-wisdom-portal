
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            มาวัดแล้วได้อะไร?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            ค้นพบประโยชน์และความหมายที่ท่านจะได้รับจากการมาวัดป่าสุญญตา
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
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
