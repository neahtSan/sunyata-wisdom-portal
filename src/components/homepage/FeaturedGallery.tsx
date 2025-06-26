
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeaturedGallery = () => {
  // Mock gallery data - in real app, this would come from admin panel with featured flag
  const featuredAlbums = [
    {
      id: 1,
      title: 'ปฏิบัติธรรมเข้าพรรษา 2567',
      coverImage: 'https://images.unsplash.com/photo-1545158181-d602ec04fcbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      photoCount: 24,
      date: '2024-01-10',
      description: 'ภาพบรรยากาศการปฏิบัติธรรมในช่วงเข้าพรรษา',
      featured: true
    },
    {
      id: 2,
      title: 'งานบุญวันวิสาขบูชา',
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      photoCount: 18,
      date: '2024-01-08',
      description: 'พิธีเวียนเทียนและกิจกรรมในวันวิสาขบูชา',
      featured: true
    },
    {
      id: 3,
      title: 'ปันน้ำใจให้ชุมชน',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      photoCount: 32,
      date: '2024-01-05',
      description: 'กิจกรรมการแจกของจำเป็นให้กับชุมชน',
      featured: true
    },
    {
      id: 4,
      title: 'หลักสูตรสมาธิสำหรับผู้เริ่มต้น',
      coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      photoCount: 15,
      date: '2024-01-03',
      description: 'บรรยากาศการเรียนรู้ในหลักสูตรสมาธิ',
      featured: true
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            คลังภาพล่าสุด
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            ชมภาพบรรยากาศและกิจกรรมต่างๆ ของวัดป่าสุญญตา
          </p>
        </div>

        {featuredAlbums.length === 0 ? (
          <div className="text-center py-16">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">ยังไม่มีภาพที่แสดง</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAlbums.map((album) => (
              <Card key={album.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
                    {album.photoCount} ภาพ
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {album.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {album.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {formatDate(album.date)}
                    </span>
                    <Link to={`/gallery?album=${album.id}`}>
                      <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                        ดูทั้งหมด
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/gallery">
            <Button size="lg" className="text-lg px-8 py-4">
              ดูคลังภาพทั้งหมด
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGallery;
