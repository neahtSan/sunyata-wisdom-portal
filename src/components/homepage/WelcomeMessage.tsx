
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/HeroSection';

const WelcomeMessage = () => {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section with Carousel */}
        <div className="mb-8 sm:mb-12">
          <HeroSection />
        </div>

        {/* Welcome Message Card */}
        <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6 sm:p-8 lg:p-12">
            <div className="text-center space-y-4 sm:space-y-6">
              {/* Main welcome heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 leading-tight">
                สุญญตาสวัสดี
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium">
                ยินดีต้อนรับสู่วัดป่าสุญญตา
              </h2>
              
              {/* Welcome message */}
              <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                  สถานที่แห่งความสงบและการเรียนรู้ธรรมะ ท่ามกลางธรรมชาติอันร่มรื่น
                </p>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  เราเปิดโอกาสให้ทุกท่านได้มาพบกับความสงบภายในใจ 
                  ผ่านการปฏิบัติธรรมและการเรียนรู้หลักคำสอนของพระพุทธเจ้า
                </p>
              </div>
              
              {/* Temple motto */}
              <div className="pt-4 sm:pt-6 border-t border-green-200">
                <p className="text-base sm:text-lg md:text-xl text-green-700 font-semibold italic">
                  "ความว่างเปล่าคือความเต็มเปี่ยม ความสงบคือความสุข"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WelcomeMessage;
