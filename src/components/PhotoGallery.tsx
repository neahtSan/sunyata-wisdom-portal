
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';
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
        },
        {
          id: 4,
          activityId: 4,
          src: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          caption: "พิธีทำบุญใหญ่",
          date: "เมษายน 2024"
        }
      ]
    }
  ];

  // Get the latest 4 activities
  const latestPhotos = photoTimeline[0].photos.slice(0, 4);
  const hasMoreActivities = photoTimeline.flatMap(timeline => timeline.photos).length > 4;

  const navigateToActivityGallery = (activityId: number) => {
    navigate(`/gallery?album=${activityId}`);
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

        <div className="mb-12">
          <div className="flex items-center mb-6">
            <Calendar className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800">กิจกรรมล่าสุด</h3>
              <p className="text-gray-600">4 กิจกรรมล่าสุด</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {latestPhotos.map((photo, index) => (
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

          {/* See More Button */}
          {hasMoreActivities && (
            <div className="text-center mt-8">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-200 hover:shadow-lg"
              >
                ดูเพิ่มเติม
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
