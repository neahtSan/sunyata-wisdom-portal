
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from '@/components/HeroSection';

const WelcomeMessage = () => {
  return (
    <section className="w-full py-4 sm:py-6 lg:py-8 px-2 sm:px-4 lg:px-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Hero Section with Carousel */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <HeroSection />
        </div>

        {/* Welcome Message Card */}
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg w-full">
          <CardContent className="p-4 sm:p-6 lg:p-8">
            <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Main welcome heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-green-800 leading-tight">
                สุญญตาสวัสดี
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium">
                ยินดีต้อนรับสู่วัดป่าสุญญตา
              </h2>
              
              {/* Welcome message */}
              <div className="w-full space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                  สถานที่แห่งความสงบและการเรียนรู้ธรรมะ ท่ามกลางธรรมชาติอันร่มรื่น
                </p>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
                  เราเปิดโอกาสให้ทุกท่านได้มาพบกับความสงบภายในใจ 
                  ผ่านการปฏิบัติธรรมและการเรียนรู้หลักคำสอนของพระพุทธเจ้า
                </p>
              </div>
              
              {/* Temple motto */}
              <div className="pt-3 sm:pt-4 lg:pt-6 border-t border-green-200">
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
