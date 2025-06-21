
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Sample photo data organized by timeline
  const photoTimeline = [
    {
      year: "2024",
      title: "กิจกรรมล่าสุด",
      photos: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "ปฏิบัติธรรมกลุ่มใหม่",
          date: "มกราคม 2024"
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "งานบุญประจำเดือน",
          date: "กุมภาพันธ์ 2024"
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "การปฏิบัติกลางแจ้ง",
          date: "มีนาคม 2024"
        }
      ]
    },
    {
      year: "2023",
      title: "ประจำปี 2566",
      photos: [
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "พิธีทำบุญใหญ่",
          date: "เมษายน 2023"
        },
        {
          id: 5,
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "การเรียนรู้กลุ่มเยาวชน",
          date: "พฤษภาคม 2023"
        },
        {
          id: 6,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "ร่วมปฏิบัติธรรมร่วมกัน",
          date: "มิถุนายน 2023"
        }
      ]
    }
  ];

  const allPhotos = photoTimeline.flatMap(timeline => timeline.photos);

  const openPhoto = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return;
    
    const currentIndex = allPhotos.findIndex(photo => photo.id === selectedPhoto);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
    } else {
      newIndex = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(allPhotos[newIndex].id);
  };

  const selectedPhotoData = allPhotos.find(photo => photo.id === selectedPhoto);

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ภาพบรรยากาศกิจกรรม
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ชมภาพบรรยากาศของกิจกรรมต่างๆ และชีวิตภายในวัด
          </p>
        </div>

        {photoTimeline.map((timeline) => (
          <div key={timeline.year} className="mb-12">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-green-600 mr-3" />
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{timeline.title}</h3>
                <p className="text-gray-600">{timeline.year}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {timeline.photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => openPhoto(photo.id)}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h4 className="text-lg font-bold mb-1">{photo.caption}</h4>
                      <p className="text-sm opacity-90">{photo.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

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
                <p className="text-lg opacity-90">{selectedPhotoData.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
