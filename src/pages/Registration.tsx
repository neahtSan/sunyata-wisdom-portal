
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Users, User, Calendar, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Registration = () => {
  const [registrationType, setRegistrationType] = useState<'individual' | 'group'>('individual');
  const [formData, setFormData] = useState({
    // Individual fields
    name: '',
    gender: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    
    // Group fields
    groupName: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    membersCount: '',
    
    // Common
    experience: '',
    expectations: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample current registration info
  const currentEvent = {
    title: "คอร์สปฏิบัติธรรม 7 วัน",
    date: "20-26 มิถุนายน 2567",
    location: "ห้องปฏิบัติธรรมหลัก วัดป่าสุญญตา",
    maxCapacity: 100,
    currentRegistrations: 67,
    deadline: "15 มิถุนายน 2567"
  };

  const pastEvents = [
    {
      title: "คอร์สปฏิบัติธรรมเดือนเมษายน",
      date: "เมษายน 2567",
      participants: 85
    },
    {
      title: "ปฏิบัติธรรมสำหรับครอบครัว",
      date: "มีนาคม 2567",
      participants: 45
    },
    {
      title: "คอร์สสมาธิเบื้องต้น",
      date: "กุมภาพันธ์ 2567",
      participants: 92
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (registrationType === 'individual') {
      if (!formData.name || !formData.phone || !formData.email) {
        toast.error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
        return;
      }
    } else {
      if (!formData.groupName || !formData.contactName || !formData.contactPhone || !formData.membersCount) {
        toast.error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
        return;
      }
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('ลงทะเบียนสำเร็จ! ทางวัดจะติดต่อกลับเพื่อยืนยันการเข้าร่วมภายใน 2-3 วัน');
      
      // Reset form
      setFormData({
        name: '',
        gender: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        groupName: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        membersCount: '',
        experience: '',
        expectations: ''
      });
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">ลงทะเบียนปฏิบัติธรรม</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              เข้าร่วมกิจกรรมปฏิบัติธรรมเพื่อพัฒนาสมาธิและความสงบใจ
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Registration Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                
                {/* Current Event Info */}
                <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6 mb-8 border-l-4 border-green-600">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">กิจกรรมที่เปิดรับสมัคร</h2>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-green-700">{currentEvent.title}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{currentEvent.date}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-5 h-5 mr-2" />
                        <span>{currentEvent.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="w-5 h-5 mr-2" />
                        <span>ที่นั่ง {currentEvent.currentRegistrations}/{currentEvent.maxCapacity}</span>
                      </div>
                      <div className="flex items-center text-red-600">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>ปิดรับสมัคร {currentEvent.deadline}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>จำนวนผู้สมัคร</span>
                        <span>{currentEvent.currentRegistrations}/{currentEvent.maxCapacity}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(currentEvent.currentRegistrations / currentEvent.maxCapacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Type Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">ประเภทการสมัคร</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRegistrationType('individual')}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                        registrationType === 'individual'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <User className="w-8 h-8 mx-auto mb-3 text-green-600" />
                      <h4 className="text-lg font-bold mb-2">สมัครรายบุคคล</h4>
                      <p className="text-gray-600">สำหรับผู้ที่ต้องการสมัครเข้าร่วมคนเดียว</p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setRegistrationType('group')}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                        registrationType === 'group'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <Users className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                      <h4 className="text-lg font-bold mb-2">สมัครเป็นกลุ่ม</h4>
                      <p className="text-gray-600">สำหรับกลุ่ม องค์กร หรือครอบครัว</p>
                    </button>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {registrationType === 'individual' ? (
                    // Individual Form Fields
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            ชื่อ-นามสกุล *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            placeholder="กรอกชื่อ-นามสกุล"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            เพศ
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                          >
                            <option value="">เลือกเพศ</option>
                            <option value="male">ชาย</option>
                            <option value="female">หญิง</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            อายุ
                          </label>
                          <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            placeholder="อายุ (ปี)"
                            min="1"
                            max="100"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            เบอร์โทรศัพท์ *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                            placeholder="เบอร์โทรศัพท์"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          อีเมล *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                          placeholder="อีเมล"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          ที่อยู่
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                          placeholder="ที่อยู่สำหรับติดต่อ"
                        />
                      </div>
                    </>
                  ) : (
                    // Group Form Fields
                    <>
                      <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                          ชื่อกลุ่ม/องค์กร *
                        </label>
                        <input
                          type="text"
                          name="groupName"
                          value={formData.groupName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="ชื่อกลุ่ม/องค์กร"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            ชื่อผู้ประสานงาน *
                          </label>
                          <input
                            type="text"
                            name="contactName"
                            value={formData.contactName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="ชื่อผู้ประสานงาน"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            จำนวนสมาชิก *
                          </label>
                          <input
                            type="number"
                            name="membersCount"
                            value={formData.membersCount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="jumlah orang"
                            min="2"
                            max="50"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            เบอร์โทรศัพท์ผู้ประสานงาน *
                          </label>
                          <input
                            type="tel"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="เบอร์โทรศัพท์"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-2">
                            อีเมลผู้ประสานงาน
                          </label>
                          <input
                            type="email"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                            placeholder="อีเมล"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Common Fields */}
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      ประสบการณ์การปฏิบัติธรรม
                    </label>
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                      placeholder="บอกเล่าประสบการณ์การปฏิบัติธรรมของท่าน (ถ้ามี)"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-2">
                      ความคาดหวังจากการเข้าร่วม
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none resize-none"
                      placeholder="สิ่งที่ท่านคาดหวังจากการเข้าร่วมกิจกรรมนี้"
                    />
                  </div>

                  {/* Terms & Privacy */}
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-400">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">ข้อตกลงและนโยบายความเป็นส่วนตัว</h4>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          ข้อมูลของท่านจะถูกใช้เพื่อวัตถุประสงค์ในการจัดกิจกรรมเท่านั้น 
                          ทางวัดจะเก็บรักษาข้อมูลส่วนบุคคลของท่านอย่างปลอดภัยและไม่เผยแพร่ให้บุคคลภายนอก 
                          โดยไม่ได้รับความยินยอมจากท่าน
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg text-lg font-medium transition-colors duration-200 ${
                      registrationType === 'individual'
                        ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                        : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400'
                    } text-white`}
                  >
                    {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งใบสมัคร'}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Past Events */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-600" />
                  กิจกรรมที่ผ่านมา
                </h3>
                <div className="space-y-4">
                  {pastEvents.map((event, index) => (
                    <div key={index} className="border-l-3 border-green-300 pl-4">
                      <h4 className="font-bold text-gray-800">{event.title}</h4>
                      <p className="text-gray-600">{event.date}</p>
                      <div className="flex items-center mt-1 text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">ผู้เข้าร่วม {event.participants} คน</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-800 mb-4">ต้องการสอบถามเพิ่มเติม?</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    📞 โทร: 044-123-456<br />
                    📧 อีเมล: info@watpasunyata.org<br />
                    ⏰ เวลาติดต่อ: 8:00-17:00 น.
                  </p>
                  <p className="text-sm text-gray-600">
                    ทางวัดยินดีให้คำปรึกษาและแนะนำเกี่ยวกับการปฏิบัติธรรม
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Registration;
