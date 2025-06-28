
import React from 'react';
import Navigation from '../components/Navigation';
import WelcomeMessage from '../components/homepage/WelcomeMessage';
import BenefitsSection from '../components/homepage/BenefitsSection';
import DharmaArticlesSection from '../components/homepage/DharmaArticlesSection';
import NewsSection from '../components/homepage/NewsSection';
import UpcomingEvents from '../components/homepage/UpcomingEvents';
import FeaturedGallery from '../components/homepage/FeaturedGallery';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      {/* สุญญตาสวัสดี - Welcoming message */}
      <WelcomeMessage />
      
      {/* มาวัดแล้วได้อะไร? - Benefits section */}
      <BenefitsSection />
      
      {/* บทความธรรมะล่าสุด - Latest dharma articles */}
      <DharmaArticlesSection />
      
      {/* ข่าวประชาสัมพันธ์ - Latest news */}
      <NewsSection />
      
      {/* กิจกรรมที่จะมาถึง - Upcoming events */}
      <UpcomingEvents />
      
      {/* คลังภาพล่าสุด - Featured gallery */}
      <FeaturedGallery />
      
      {/* Footer with shortcuts and contact */}
      <Footer />
    </div>
  );
};

export default Index;
