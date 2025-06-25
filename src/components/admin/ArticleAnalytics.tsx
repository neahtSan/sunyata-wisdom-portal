
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ThumbsUp, MessageCircle, Share, TrendingUp, Calendar } from 'lucide-react';

interface ArticleAnalyticsProps {
  article: {
    id: number;
    title: string;
    views: number;
    likes?: number;
    comments?: number;
    shares?: number;
    readTime?: number;
    publishDate: string;
    lastUpdated?: string;
    category: string;
    status: string;
  };
}

const ArticleAnalytics = ({ article }: ArticleAnalyticsProps) => {
  const engagementRate = article.views > 0 ? 
    Math.round(((article.likes || 0) + (article.comments || 0)) / article.views * 100) : 0;

  const stats = [
    {
      label: 'ยอดเข้าชม',
      value: article.views.toLocaleString(),
      icon: Eye,
      color: 'text-blue-600'
    },
    {
      label: 'ถูกใจ',
      value: (article.likes || 0).toLocaleString(),
      icon: ThumbsUp,
      color: 'text-green-600'
    },
    {
      label: 'ความคิดเห็น',
      value: (article.comments || 0).toLocaleString(),
      icon: MessageCircle,
      color: 'text-purple-600'
    },
    {
      label: 'แชร์',
      value: (article.shares || 0).toLocaleString(),
      icon: Share,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">สถิติเพิ่มเติม</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">อัตราการมีส่วนร่วม</span>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-semibold">{engagementRate}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">เวลาอ่านโดยเฉลี่ย</span>
            <span className="font-semibold">{article.readTime || 5} นาที</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">วันที่เผยแพร่</span>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="font-semibold">{article.publishDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">สถานะ</span>
            <Badge variant={article.status === 'published' ? 'default' : 'outline'}>
              {article.status === 'published' ? 'เผยแพร่' : 'ร่าง'}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">หมวดหมู่</span>
            <Badge variant="secondary">{article.category}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleAnalytics;
