
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FallbackImage from '@/components/ui/fallback-image';

const ActivityGallery = () => {
  const { activityId } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
          '1470813740244-df37b8c1edcb',
          '1493225255560-251e4d9af746',
          '1502809737437-974c6494bce7',
          '1571019613454-1cb2f99b2d8b',
          '1573496359142-b8d87734a5a2',
          '1559027615-cd4628902d4a',
          '1516589178581-6cd7833ae3b2',
          '1515787366009-7f4ca9f20851',
          '1573883341598-b4e143734d86',
          '1506905925346-21bda4d32df4',
          '1548199973-03cce0bbc87b',
          '1571813934158-d0efaabea83d',
          '1506905925346-21bda4d32df5',
          '1544551763-46a013bb70d5',
          '1573165231977-d8d24cf204b8',
          '1506905368073-1fb1ebace6b4'
        ][i]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${i}`,
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
          '1470813740244-df37b8c1edcb',
          '1493225255560-251e4d9af746',
          '1502809737437-974c6494bce7',
          '1571019613454-1cb2f99b2d8b',
          '1573496359142-b8d87734a5a2',
          '1559027615-cd4628902d4a',
          '1516589178581-6cd7833ae3b2',
          '1515787366009-7f4ca9f20851',
          '1573883341598-b4e143734d86',
          '1548199973-03cce0bbc87b',
          '1571813934158-d0efaabea83d',
          '1544551763-46a013bb70d5',
          '1573165231977-d8d24cf204b8',
          '1506905368073-1fb1ebace6b4'
        ][i]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${i + 31}`,
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
          '1482938289607-e9573fc25ebb',
          '1509316975850-ff9c5deb0cd9',
          '1513836279014-a89f7a76ae86',
          '1518495973542-4542c06a5843',
          '1469474968028-56623f02e42e',
          '1470813740244-df37b8c1edcb',
          '1493225255560-251e4d9af746',
          '1502809737437-974c6494bce7',
          '1571019613454-1cb2f99b2d8b',
          '1573496359142-b8d87734a5a2',
          '1559027615-cd4628902d4a',
          '1516589178581-6cd7833ae3b2',
          '1515787366009-7f4ca9f20851',
          '1573883341598-b4e143734d86',
          '1548199973-03cce0bbc87b',
          '1571813934158-d0efaabea83d',
          '1544551763-46a013bb70d5',
          '1573165231977-d8d24cf204b8',
          '1506905368073-1fb1ebace6b4',
          '1544376664-80b17f09d399',
          '1506905925346-21bda4d32df4',
          '1518709268805-4e9042af2176',
          '1545158181-d602ec04fcbb',
          '1558618666-fcd25c85cd64',
          '1507003211169-0a1dd7228f2d',
          '1571813934158-d0efaabea83e',
          '1544551763-46a013bb70d6',
          '1573165231977-d8d24cf204b9',
          '1506905368073-1fb1ebace6b5'
        ][i]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&sig=${i + 61}`,
        caption: `ภาพบรรยาย ${i + 1}`,
        description: `บรรยากาศการบรรยายธรรม ภาพที่ ${i + 1}`
      }))
    }
  };

  const activity = activityData[Number(activityId) as keyof typeof activityData];

  const openPhoto = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const handleImageClick = (photoId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    openPhoto(photoId);
  };

  const closePhoto = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const navigatePhoto = useCallback((direction: 'prev' | 'next') => {
    if (selectedPhoto === null || !activity) return;
    
    const currentIndex = activity.images.findIndex(photo => photo.id === selectedPhoto);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : activity.images.length - 1;
    } else {
      newIndex = currentIndex < activity.images.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(activity.images[newIndex].id);
  }, [selectedPhoto, activity]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedPhoto === null) return;
      
      switch (event.key) {
        case 'Escape':
          closePhoto();
          break;
        case 'ArrowLeft':
          navigatePhoto('prev');
          break;
        case 'ArrowRight':
          navigatePhoto('next');
          break;
      }
    };

    if (selectedPhoto !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedPhoto, closePhoto, navigatePhoto]);

  if (!activity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบกิจกรรมที่ต้องการ</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              กลับไปหน้าจัดการกิจกรรม
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedPhotoData = activity.images.find(photo => photo.id === selectedPhoto);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {activity.images.map((photo, index) => (
            <div
              key={photo.id}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <FallbackImage
                src={photo.src}
                alt={photo.caption}
                className="w-full h-[220px] sm:h-[240px] md:h-[260px] object-cover group-hover:scale-110 transition-all duration-500 ease-out rounded-xl"
                loading="lazy"
                skeletonClassName="rounded-xl"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center rounded-xl pointer-events-none">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <p className="text-sm font-medium text-center px-2">{photo.caption}</p>
                </div>
              </div>
              
              {/* Invisible click overlay to ensure clicks work */}
              <div 
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openPhoto(photo.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && selectedPhotoData && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closePhoto}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePhoto}
              className="absolute -top-4 -right-4 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-2 rounded-full transition-all duration-200 z-30 backdrop-blur-sm"
              aria-label="ปิด"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
              aria-label="ภาพก่อนหน้า"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white p-3 rounded-full transition-all duration-200 z-20 backdrop-blur-sm"
              aria-label="ภาพถัดไป"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="aspect-[4/3] w-full">
                <FallbackImage
                  src={selectedPhotoData.src}
                  alt={selectedPhotoData.caption}
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                  loading="eager"
                  skeletonClassName="rounded-lg"
                  showSkeleton={true}
                />
              </div>
            </div>

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
