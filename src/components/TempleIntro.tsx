
import React from 'react';
import { Leaf, Heart, Users } from 'lucide-react';

const TempleIntro = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ยินดีต้อนรับสู่วัดป่าสุญญตา
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            วัดป่าสุญญตาเป็นสถานที่ศักดิ์สิทธิ์ที่เปิดให้ผู้คนทุกเพศทุกวัยได้มาศึกษาธรรมะ 
            ปฏิบัติสมาธิ และหาความสงบใจท่ามกลางธรรมชาติอันร่มรื่น 
            ด้วยการนำของพระอาจารย์ผู้ทรงประสบการณ์ในการปฏิบัติธรรม
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors duration-200">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">ธรรมชาติที่สงบ</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              ล้อมรอบด้วยป่าไผ่และต้นไม้ใหญ่ สร้างบรรยากาศที่เหมาะสำหรับการปฏิบัติธรรม
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">ปณิธานแห่งการให้</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              เปิดให้บริการฟรีสำหรับผู้ที่ประสงค์จะเรียนรู้และปฏิบัติธรรมอย่างแท้จริง
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors duration-200">
            <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">ชุมชนแห่งการเรียนรู้</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              พบปะกับเพื่อนร่วมทางที่มีจิตใจที่ต้องการความสงบและพัฒนาตนเอง
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleIntro;
