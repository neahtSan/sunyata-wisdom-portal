
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ActivityGallery = () => {
  const { activityId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Sample activity data - in real app, this would come from API/database
  const activityData = {
    1: {
      title: 'ปฏิบัติธรรมประจำสัปดาห์',
      date: '20 มกราคม 2024',
      description: 'กิจกรรมปฏิบัติธรรมประจำสัปดาห์ที่ศาลาหลัก มีผู้เข้าร่วม 25 คน',
      images: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        src: `https://images.unsplash.com/photo-${[
          '1544376664-80b17f09d399',
          '1506905925346-21bda4d32df4',
          '1518709268805-4e9042af2176',
          '1545158181-d602ec04fcbb',
          '1558618666-fcd25c85cd64',
          '1507003211169-0a1dd7228f2d',
          '1472396961693-142e6e269027',
          '1433086966358-54859d0ed716',
          '1465146344425-f00d5f5c8f07',
          '1482938289607-e9573fc25ebb',
          '1509316975850-ff9c5deb0cd9',
          '1513836279014-a89f7a76ae86',
          '1518495973542-4542c06a5843',
          '1469474968028-56623f02e42e',
          '1470813740244-df37b8c1edcb'
        ][i % 15]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        caption: `ภาพกิจกรรม ${i + 1}`,
        description: `บรรยากาศการปฏิบัติธรรมภายในงาน ภาพที่ ${i + 1}`
      }))
    },
    2: {
      title: 'อบรมสมาธิเข้มข้น',
      date: '25 มกราคม 2024',
      description: 'โปรแกรมอบรมสมาธิเข้มข้น มีผู้เข้าร่วม 15 คน',
      images: Array.from({ length: 28 }, (_, i) => ({
        id: i + 31,
        src: `https://images.unsplash.com/photo-${[
          '1544376664-80b17f09d399',
          '1506905925346-21bda4d32df4',
          '1518709268805-4e9042af2176',
          '1545158181-d602ec04fcbb',
          '1558618666-fcd25c85cd64'
        ][i % 5]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        caption: `ภาพอบรม ${i + 1}`,
        description: `บรรยากาศการอบรมสมาธิ ภาพที่ ${i + 1}`
      }))
    },
    3: {
      title: 'บรรยายธรรมพิเศษ',
      date: '15 มกราคม 2024',
      description: 'การบรรยายธรรมพิเศษ มีผู้เข้าร่วม 45 คน',
      images: Array.from({ length: 32 }, (_, i) => ({
        id: i + 61,
        src: `https://images.unsplash.com/photo-${[
          '1472396961693-142e6e269027',
          '1433086966358-54859d0ed716',
          '1465146344425-f00d5f5c8f07',
          '1482938289607-e9573fc25ebb'
        ][i % 4]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
        caption: `ภาพบรรยาย ${i + 1}`,
        description: `บรรยากาศการบรรยายธรรม ภาพที่ ${i + 1}`
      }))
    }
  };

  const activity = activityData[activityId as keyof typeof activityData];

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบกิจกรรมที่ต้องการ</h1>
          <Link to="/admin/events">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าจัดการกิจกรรม
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const openPhoto = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return;
    
    const currentIndex = activity.images.findIndex(photo => photo.id === selectedPhoto);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : activity.images.length - 1;
    } else {
      newIndex = currentIndex < activity.images.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(activity.images[newIndex].id);
  };

  const selectedPhotoData = activity.images.find(photo => photo.id === selectedPhoto);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/admin/events">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                กลับไปหน้าจัดการกิจกรรม
              </Button>
            </Link>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">{activity.title}</h1>
              <p className="text-gray-600">{activity.date}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">{activity.description}</p>
            <p className="text-sm text-gray-500 mt-2">รูปภาพทั้งหมด: {activity.images.length} รูป</p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {activity.images.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => openPhoto(photo.id)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-white transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <p className="text-sm font-medium text-center px-2">{photo.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && selectedPhotoData && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closePhoto}
              className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
              aria-label="ปิด"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
              aria-label="ภาพก่อนหน้า"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
              aria-label="ภาพถัดไป"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <img
              src={selectedPhotoData.src}
              alt={selectedPhotoData.caption}
              className="max-w-full max-h-[70vh] object-contain mx-auto"
            />

            {/* Caption */}
            <div className="text-center text-white mt-4">
              <h3 className="text-2xl font-bold mb-2">{selectedPhotoData.caption}</h3>
              <p className="text-lg opacity-90">{selectedPhotoData.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityGallery;
