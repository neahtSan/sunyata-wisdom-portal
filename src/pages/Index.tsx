
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import TempleIntro from '../components/TempleIntro';
import TestimonialVideos from '../components/TestimonialVideos';
import EventsCalendar from '../components/EventsCalendar';
import PhotoGallery from '../components/PhotoGallery';
import FeedbackSection from '../components/FeedbackSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section with Carousel */}
      <HeroSection />
      
      {/* Temple Introduction */}
      <TempleIntro />
      
      {/* Testimonial Videos */}
      <TestimonialVideos />
      
      {/* Events Calendar */}
      <EventsCalendar />
      
      {/* Photo Gallery */}
      <PhotoGallery />
      
      {/* Feedback Section */}
      <FeedbackSection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
