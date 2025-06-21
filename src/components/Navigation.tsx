
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Calendar, BookOpen, Users, Info } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'หน้าแรก', path: '/', icon: Home },
    { name: 'ธรรมะมีเดีย', path: '/dharma', icon: BookOpen },
    { name: 'ลงทะเบียนปฏิบัติธรรม', path: '/register', icon: Users },
    { name: 'เกี่ยวกับเรา', path: '/about', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">วัด</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">วัดป่าสุญญตา</h1>
                <p className="text-sm text-gray-600">ความสงบในธรรมชาติ</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-lg text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-4 py-4 text-lg font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-6 h-6 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
