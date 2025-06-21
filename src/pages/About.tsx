
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { MapPin, Clock, Heart, Users, Star, TreePine } from 'lucide-react';

const About = () => {
  // Sample landmarks data
  const landmarks = [
    {
      id: 1,
      name: "พระอุโบสถ",
      description: "สถานที่ศักดิ์สิทธิ์สำหรับการประกอบพิธีกรรมทางศาสนา ตกแต่งด้วยจิตรกรรมไทยประเพณี",
      image: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "ศาลาปฏิบัติธรรม",
      description: "ห้องขนาดกว้างสำหรับการนั่งสมาธิและฟังธรรมะ ออกแบบให้เอื้อต่อการทำสมาธิ",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "สวนป่าธรรมชาติ",
      description: "พื้นที่ป่าไผ่และต้นไม้ใหญ่ เหมาะสำหรับการเดินจงกรมและปฏิบัติธรรมกลางแจ้ง",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "กุฏิสงฆ์",
      description: "ที่พักอาศัยของพระสงฆ์ ตั้งอยู่ในบริเวณเงียบสงบท่ามกลางธรรมชาติ",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "ศาลากลางแจ้ง",
      description: "พื้นที่สำหรับกิจกรรมกลุ่มใหญ่และการประชุม ล้อมรอบด้วยธรรมชาติ",
      image: "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "ลานธรรม",
      description: "พื้นที่กว้างสำหรับการปฏิบัติธรรมร่วมกันและกิจกรรมพิเศษ",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">เกี่ยวกับเรา</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              ทำความรู้จักกับวัดป่าสุญญตาและประวัติความเป็นมา
            </p>
          </div>
        </div>
      </div>

      {/* Temple History */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                ประวัติวัดป่าสุญญตา
              </h2>
              <div className="w-24 h-1 bg-green-600 mb-8"></div>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  วัดป่าสุญญตาก่อตั้งขึ้นเมื่อปี พ.ศ. 2520 โดยหลวงพ่อปัญญานันท์ภิกขุ 
                  ด้วยปณิธานที่จะสร้างสถานที่ปฏิบัติธรรมที่สงบและเหมาะสำหรับการพัฒนาจิตใจ 
                  ท่ามกลางธรรมชาติที่ร่มรื่น
                </p>
                <p>
                  พื้นที่ของวัดตั้งอยู่บนเนื้อที่ 50 ไร่ ล้อมรอบด้วยป่าไผ่และต้นไม้ใหญ่ 
                  สร้างบรรยากาศที่เงียบสงบและเอื้อต่อการปฏิบัติธรรม วัดเปิดให้บริการ
                  การปฏิบัติธรรมแก่ประชาชนทั่วไปโดยไม่เสียค่าใช้จ่าย
                </p>
                <p>
                  ตลอดระยะเวลา 40 กว่าปีที่ผ่านมา วัดป่าสุญญตาได้รับการนับถือจาก
                  ผู้คนหลายพื้นที่ ทั้งคนไทยและชาวต่างชาติ ที่เดินทางมาเรียนรู้และ
                  ปฏิบัติธรรม หลายคนได้รับประโยชน์อย่างมากจากการปฏิบัติที่นี่
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="วัดป่าสุญญตา"
                className="rounded-lg shadow-xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">40+</div>
                  <div className="text-sm">ปีแห่งการให้บริการ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Abbot Biography */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="หลวงพ่อปัญญานันท์ภิกขุ"
                className="rounded-lg shadow-xl w-full max-w-md mx-auto"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                หลวงพ่อปัญญานันท์ภิกขุ
              </h2>
              <div className="w-24 h-1 bg-blue-600 mb-8"></div>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  หลวงพ่อปัญญานันท์ภิกขุ เป็นพระเถระผู้ทรงประสบการณ์ในการปฏิบัติธรรม
                  มากว่า 50 ปี ได้รับการศึกษาพระธรรมวินัยทั้งในประเทศไทยและต่างประเทศ
                </p>
                <p>
                  ท่านเป็นผู้ที่มีความเชี่ยวชาญในการสอนสมาธิภาวนา โดยเฉพาะการปฏิบัติ
                  วิปัสสนากรรมฐาน ท่านมีวิธีการสอนที่เข้าใจง่าย เหมาะสำหรับทั้งผู้เริ่มต้น
                  และผู้ที่มีประสบการณ์แล้ว
                </p>
                <p>
                  คำสอนของท่านเน้นการนำธรรมะไปใช้ในชีวิตประจำวัน เพื่อให้ผู้ปฏิบัติ
                  สามารถมีความสุขและความสงบใจแม้อยู่ท่ามกลางความยุ่งยากของโลก
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">50+</div>
                  <div className="text-sm text-gray-600">ปีแห่งการปฏิบัติ</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">1000+</div>
                  <div className="text-sm text-gray-600">ผู้ได้รับคำสอน</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Landmarks */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              สถานที่สำคัญภายในวัด
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ชมสถานที่ต่างๆ ภายในวัดที่เป็นจุดสำคัญสำหรับการปฏิบัติธรรม
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landmarks.map((landmark) => (
              <div
                key={landmark.id}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={landmark.image}
                  alt={landmark.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-orange-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">{landmark.name}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {landmark.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">วิสัยทัศน์และพันธกิจ</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">วิสัยทัศน์</h3>
              <p className="text-lg leading-relaxed">
                เป็นสถานที่ปฏิบัติธรรมที่ผู้คนทุกหมู่เหล่าสามารถเข้าถึงได้ 
                เพื่อพัฒนาความสงบใจและปัญญา
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">พันธกิจ</h3>
              <p className="text-lg leading-relaxed">
                เผยแพร่พระธรรมคำสอนและสนับสนุนการปฏิบัติธรรมของประชาชน
                เพื่อสร้างสังคมที่มีความสุขและสันติภาพ
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">คติธรรม</h3>
              <p className="text-lg leading-relaxed">
                "ธรรมะคือทางแห่งความสงบ การปฏิบัติธรรมคือการเดินทางสู่ความหลุดพ้น"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temple Schedule */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              กิจวัตรประจำวัน
            </h2>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-green-600" />
                  กิจกรรมในวัน
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">วัตรเช้า</span>
                    <span className="font-medium">05:00 - 06:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">นั่งสมาธิกลุ่ม</span>
                    <span className="font-medium">06:00 - 07:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">เวลาส่วนตัว</span>
                    <span className="font-medium">07:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">วัตรเย็น</span>
                    <span className="font-medium">17:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">นั่งสมาธิกลุ่ม</span>
                    <span className="font-medium">18:00 - 19:00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-blue-600" />
                  กิจกรรมพิเศษ
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-gray-800">วันพระ</h4>
                    <p className="text-gray-600">ธรรมะสำหรับชาวบ้าน 14:00-16:00</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-gray-800">วันอาทิตย์</h4>
                    <p className="text-gray-600">กิจกรรมครอบครัว 09:00-12:00</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border-l-4 border-orange-500">
                    <h4 className="font-bold text-gray-800">วันสำคัญ</h4>
                    <p className="text-gray-600">พิธีกรรมตามโอกาส</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
