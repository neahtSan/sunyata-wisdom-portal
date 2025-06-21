
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Calendar, ExternalLink } from 'lucide-react';
import FallbackImage from '@/components/ui/fallback-image';

const PhotoGallery = () => {
  const navigate = useNavigate();

  // Sample photo data organized by timeline with activity mapping
  const photoTimeline = [
    {
      year: "2024",
      title: "กิจกรรมล่าสุด",
      photos: [
        {
          id: 1,
          activityId: 1, // Maps to activity 1 (ปฏิบัติธรรมประจำสัปดาห์)
          src: "https://images.unsplash.com/photo-1544376664-80b17f09d399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "ปฏิบัติธรรมกลุ่มใหม่",
          date: "มกราคม 2024"
        },
        {
          id: 2,
          activityId: 2, // Maps to activity 2 (อบรมสมาธิเข้มข้น)
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "งานบุญประจำเดือน",
          date: "กุมภาพันธ์ 2024"
        },
        {
          id: 3,
          activityId: 3, // Maps to activity 3 (บรรยายธรรมพิเศษ)
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
          activityId: 1,
          src: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "พิธีทำบุญใหญ่",
          date: "เมษายน 2023"
        },
        {
          id: 5,
          activityId: 2,
          src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "การเรียนรู้กลุ่มเยาวชน",
          date: "พฤษภาคม 2023"
        },
        {
          id: 6,
          activityId: 3,
          src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "ร่วมปฏิบัติธรรมร่วมกัน",
          date: "มิถุนายน 2023"
        }
      ]
    }
  ];

  const allPhotos = photoTimeline.flatMap(timeline => timeline.photos);

  const navigateToActivityGallery = (activityId: number) => {
    navigate(`/activity/${activityId}`);
  };

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {timeline.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 opacity-0 animate-fade-in bg-white"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationFillMode: 'forwards'
                  }}
                  onClick={() => navigateToActivityGallery(photo.activityId)}
                >
                  <FallbackImage
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-[240px] sm:h-[260px] object-cover group-hover:scale-110 transition-transform duration-500 ease-out rounded-xl"
                    loading="lazy"
                    skeletonClassName="rounded-xl"
                  />
                  
                  {/* Overlay with info and call-to-action */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center pointer-events-none">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center px-4">
                      <h4 className="text-lg font-bold mb-2">{photo.caption}</h4>
                      <p className="text-sm opacity-90 mb-4">{photo.date}</p>
                      <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-2 mx-auto hover:shadow-lg pointer-events-auto">
                        <ExternalLink className="w-4 h-4" />
                        ดูแกลเลอรี่เต็ม
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom info bar (always visible) */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-300">
                    <h4 className="text-white text-base font-bold mb-1 truncate">{photo.caption}</h4>
                    <p className="text-white/90 text-sm">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery;
