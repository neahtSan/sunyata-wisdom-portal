
import React from 'react';
import { MapPin, Phone, Mail, Facebook, Youtube, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Temple Information */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">วัด</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">วัดป่าสุญญตา</h3>
                <p className="text-gray-400">ความสงบในธรรมชาติ</p>
              </div>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              วัดป่าสุญญตาเป็นสถานที่ศักดิ์สิทธิ์สำหรับการปฏิบัติธรรมและหาความสงบใจ 
              ท่ามกลางธรรมชาติที่ร่มรื่น
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-bold mb-6">ข้อมูลติดต่อ</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-green-400 mr-3 mt-1" />
                <div>
                  <p className="text-lg font-medium mb-1">ที่อยู่</p>
                  <p className="text-gray-300">
                    123 หมู่ 4 ตำบลสุญญตา<br />
                    อำเภอเมือง จังหวัดนครราชสีมา<br />
                    30000
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <p className="text-lg font-medium">โทรศัพท์</p>
                  <p className="text-gray-300">044-123-456</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-6 h-6 text-green-400 mr-3" />
                <div>
                  <p className="text-lg font-medium">อีเมล</p>
                  <p className="text-gray-300">info@watpasunyata.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours & Social Media */}
          <div>
            <h4 className="text-xl font-bold mb-6">เวลาเปิด - ปิด</h4>
            <div className="flex items-start mb-6">
              <Clock className="w-6 h-6 text-green-400 mr-3 mt-1" />
              <div>
                <p className="text-lg font-medium mb-2">เวลาเปิดให้ญาติโยมเข้ากราบไหว้</p>
                <div className="text-gray-300 space-y-1">
                  <p>จันทร์ - ศุกร์: 06:00 - 18:00</p>
                  <p>เสาร์ - อาทิตย์: 05:30 - 19:00</p>
                  <p className="text-sm text-gray-400 mt-2">
                    *กิจกรรมพิเศษอาจมีเวลาแตกต่าง
                  </p>
                </div>
              </div>
            </div>

            <h5 className="text-lg font-bold mb-4">ติดตามเรา</h5>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/watpasunyata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook วัดป่าสุญญตา"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com/watpasunyata"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="YouTube วัดป่าสุญญตา"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-lg mb-4 md:mb-0">
              © 2024 วัดป่าสุญญตา สงวนลิขสิทธิ์
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-400 hover:text-white text-lg transition-colors duration-200">
                นโยบายความเป็นส่วนตัว
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white text-lg transition-colors duration-200">
                ข้อกำหนดการใช้งาน
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
