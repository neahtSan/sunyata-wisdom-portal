
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample hero images - in real implementation, these would come from CMS
  const heroImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "วิหารสงบ",
      caption: "ความสงบในธรรมชาติ"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "สวนสมาधิ",
      caption: "สถานที่ปฏิบัติธรรม"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "บรรยากาศวัด",
      caption: "บรรยากาศแห่งการเรียนรู้"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Image Slides */}
      {heroImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200"
        aria-label="ภาพก่อนหน้า"
      >
        <ChevronLeft className="w-8 h-8 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all duration-200"
        aria-label="ภาพถัดไป"
      >
        <ChevronRight className="w-8 h-8 text-gray-700" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`ไปยังภาพที่ ${index + 1}`}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            วัดป่าสุญญตา
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">
            {heroImages[currentSlide].caption}
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg">
            เข้าสู่ประสบการณ์ธรรมะ
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
