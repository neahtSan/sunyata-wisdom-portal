
import React from 'react';
import { Play, Heart } from 'lucide-react';

const TestimonialVideos = () => {
  // Sample video data - in real implementation, these would come from CMS
  const testimonialVideos = [
    {
      id: 1,
      title: "ประสบการณ์ปฏิบัติธรรม - คุณสมศรี",
      youtubeId: "dQw4w9WgXcQ", // Sample YouTube ID
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "การเปลี่ยนแปลงชีวิตจากการปฏิบัติธรรม"
    },
    {
      id: 2,
      title: "ความสงบใจที่พบ - คุณวิชัย",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "ธรรมะที่ใช้ในชีวิตประจำวัน"
    },
    {
      id: 3,
      title: "การปฏิบัติธรรมครอบครัว - ครอบครัวสมหวัง",
      youtubeId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      description: "ธรรมะที่เชื่อมโยงครอบครัว"
    }
  ];

  const handleVideoClick = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            เสียงจากใจของผู้ปฏิบัติ
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ฟังประสบการณ์จริงจากผู้ที่ได้รับประโยชน์จากการปฏิบัติธรรมที่วัดป่าสุญญตา
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => handleVideoClick(video.youtubeId)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60 transition-all duration-200 group"
                  aria-label={`เล่นวิดีโอ ${video.title}`}
                >
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {video.description}
                </p>
                <button
                  onClick={() => handleVideoClick(video.youtubeId)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  ดูเต็ม
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialVideos;
