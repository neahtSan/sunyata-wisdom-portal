import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FallbackImage from '@/components/ui/fallback-image';
import { useDotButton } from '@/hooks/use-dot-button';
import { DotButton } from '@/components/ui/embla-dot-button';

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true
  }, [Autoplay({ delay: 5000 })]);
  
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  // Sample hero images - including broken URLs to test fallback
  const heroImages = [
    {
      id: 1,
      src: "https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
      alt: "วิหารสงบ",
      caption: "ความสงบในธรรมชาติ"
    },
    {
      id: 2,
      src: "https://fastly.picsum.photos/id/15/2500/1667.jpg?hmac=Lv03D1Y3AsZ9L2tMMC1KQZekBVaQSDc1waqJ54IHvo4",
      alt: "สวนสมาธิ",
      caption: "สถานที่ปฏิบัติธรรม"
    },
    {
      id: 3,
      src: "https://broken-url-intentionally.com/image1.jpg",
      alt: "รูปเสีย",
      caption: "ทดสอบ Fallback Image"
    },
    {
      id: 4,
      src: "https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE",
      alt: "บรรยากาศวัด",
      caption: "บรรยากาศแห่งการเรียนรู้"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "การปฏิบัติธรรม",
      caption: "ช่วงเวลาแห่งการสงบใจ"
    },
    {
      id: 6,
      src: "https://invalid-domain-test.xyz/broken-image.png",
      alt: "รูปเสีย 2",
      caption: "ทดสอบ Error Handling"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "ธรรมชาติสวยงาม",
      caption: "ธรรมชาติอันงดงาม"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "ป่าไผ่",
      caption: "ป่าไผ่อันร่มรื่น"
    },
    {
      id: 9,
      src: "https://this-will-definitely-fail.com/404.jpg",
      alt: "รูปเสีย 3",
      caption: "ทดสอบ Skeleton Loading"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      alt: "ใบไผ่",
      caption: "ใบไผ่เขียวสดใส"
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative w-full h-[260px] sm:h-[300px] md:h-[390px] overflow-hidden bg-gray-100 rounded-2xl shadow-lg">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex">
            {heroImages.map((image, index) => (
              <div key={image.id} className="embla__slide flex-[0_0_100%] relative">
                <FallbackImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-[260px] sm:h-[300px] md:h-[390px] object-cover rounded-2xl"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  skeletonClassName="rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-2xl"></div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 drop-shadow-lg">
                      วัดป่าสุญญตา
                    </h1>
                    <p className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 drop-shadow-lg">
                      {image.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embla Dot Navigation */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="embla__dots">
            {(() => {
              const totalSlides = scrollSnaps.length;
              const maxVisibleDots = 3;
              
              // If we have 3 or fewer slides, show all dots
              if (totalSlides <= maxVisibleDots) {
                return scrollSnaps.map((_, index) => (
                  <DotButton
                    key={`dot-${index}`}
                    onClick={() => onDotButtonClick(index)}
                    className={`embla__dot ${
                      index === selectedIndex ? 'embla__dot--selected' : ''
                    }`}
                    aria-label={`ไปยังภาพที่ ${index + 1}`}
                  />
                ));
              }
              
              // For more than 3 slides, create a sliding window effect
              const dots = [];
              
              // Calculate the sliding window position
              // Window slides every 3 slides to show dot movement
              const windowStart = Math.floor(selectedIndex / maxVisibleDots) * maxVisibleDots;
              
              // Ensure we don't exceed the bounds
              const finalWindowStart = Math.min(windowStart, totalSlides - maxVisibleDots);
              
              // Add left indicator if there are hidden slides to the left
              if (finalWindowStart > 0) {
                dots.push(
                  <div
                    key="left-more"
                    className="flex items-center justify-center w-[2.6rem] h-[2.6rem]"
                    aria-hidden="true"
                  >
                    <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse" />
                  </div>
                );
              }
              
              // Add the visible dots with stable keys and smooth positioning
              for (let i = 0; i < maxVisibleDots; i++) {
                const slideIndex = finalWindowStart + i;
                if (slideIndex < totalSlides) {
                  dots.push(
                    <DotButton
                      key={`window-dot-${i}`} // Stable key based on position in window
                      onClick={() => onDotButtonClick(slideIndex)}
                      className={`embla__dot ${
                        slideIndex === selectedIndex ? 'embla__dot--selected' : ''
                      }`}
                      aria-label={`ไปยังภาพที่ ${slideIndex + 1} จากทั้งหมด ${totalSlides} ภาพ`}
                    />
                  );
                }
              }
              
              // Add right indicator if there are hidden slides to the right
              if (finalWindowStart + maxVisibleDots < totalSlides) {
                dots.push(
                  <div
                    key="right-more"
                    className="flex items-center justify-center w-[2.6rem] h-[2.6rem]"
                    aria-hidden="true"
                  >
                    <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse" />
                  </div>
                );
              }
              
              return dots;
            })()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
