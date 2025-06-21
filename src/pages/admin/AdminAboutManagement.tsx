
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Upload, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminAboutManagement = () => {
  const { toast } = useToast();
  const [templeHistory, setTempleHistory] = useState('วัดป่าสุญญตา ก่อตั้งขึ้นในปี พ.ศ. 2540 โดยพระอาจารย์ที่มีวิสัยทัศน์ในการสร้างสถานที่ปฏิบัติธรรมในท่ามกลางธรรมชาติ...');
  const [philosophy, setPhilosophy] = useState('ปรัชญาของวัดป่าสุญญตาคือการนำหลักธรรมคำสอนของพระพุทธเจ้ามาประยุกต์ใช้ในการดำเนินชีวิต...');
  const [practices, setPractices] = useState('การปฏิบัติธรรมที่วัดป่าสุญญตาเน้นการพัฒนาสติและสมาธิผ่านการนั่งสมาธิ เดินจงกรม และการปฏิบัติในชีวิตประจำวัน...');
  
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'พระอาจารย์สุนทร', title: 'เจ้าอาวาส', description: 'มีประสบการณ์การสอนธรรมมากว่า 20 ปี เชี่ยวชาญด้านวิปัสสนากรรมฐาน', image: '' },
    { id: 2, name: 'พระอาจารย์วิชัย', title: 'รองเจ้าอาวาส', description: 'ผู้เชี่ยวชาญด้านสมถกรรมฐาน และการแนะนำการปฏิบัติสำหรับผู้เริ่มต้น', image: '' },
  ]);

  const [newTeacher, setNewTeacher] = useState({ name: '', title: '', description: '', image: '' });
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);

  const handleSave = (section: string) => {
    toast({
      title: "บันทึกสำเร็จ",
      description: `ข้อมูล${section}ถูกบันทึกแล้ว`,
    });
  };

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.title && newTeacher.description) {
      setTeachers([...teachers, { ...newTeacher, id: Date.now() }]);
      setNewTeacher({ name: '', title: '', description: '', image: '' });
      setIsAddingTeacher(false);
      toast({
        title: "เพิ่มข้อมูลพระอาจารย์สำเร็จ",
        description: "ข้อมูลพระอาจารย์ใหม่ถูกเพิ่มแล้ว",
      });
    }
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    toast({
      title: "ลบข้อมูลสำเร็จ",
      description: "ข้อมูลพระอาจารย์ถูกลบแล้ว",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">จัดการหน้าเกี่ยวกับเรา</h1>
            <p className="text-gray-600">แก้ไขข้อมูลประวัติวัด ปรัชญา และข้อมูลพระอาจารย์</p>
          </div>
          <Button>
            <Eye className="h-4 w-4 mr-2" />
            ดูตัวอย่าง
          </Button>
        </div>

        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">ประวัติวัด</TabsTrigger>
            <TabsTrigger value="philosophy">ปรัชญา</TabsTrigger>
            <TabsTrigger value="practices">การปฏิบัติ</TabsTrigger>
            <TabsTrigger value="teachers">พระอาจารย์</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>ประวัติและความเป็นมาของวัด</CardTitle>
                <CardDescription>แก้ไขข้อมูลประวัติและความเป็นมาของวัดป่าสุญญตา</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="history">ข้อความประวัติวัด</Label>
                  <Textarea
                    id="history"
                    value={templeHistory}
                    onChange={(e) => setTempleHistory(e.target.value)}
                    rows={10}
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSave('ประวัติวัด')}>
                    <Save className="h-4 w-4 mr-2" />
                    บันทึก
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="philosophy">
            <Card>
              <CardHeader>
                <CardTitle>ปรัชญาและแนวคิด</CardTitle>
                <CardDescription>แก้ไขข้อมูลปรัชญาและแนวคิดของวัด</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="philosophy">ข้อความปรัชญา</Label>
                  <Textarea
                    id="philosophy"
                    value={philosophy}
                    onChange={(e) => setPhilosophy(e.target.value)}
                    rows={10}
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSave('ปรัชญา')}>
                    <Save className="h-4 w-4 mr-2" />
                    บันทึก
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practices">
            <Card>
              <CardHeader>
                <CardTitle>การปฏิบัติธรรม</CardTitle>
                <CardDescription>แก้ไขข้อมูลการปฏิบัติธรรมและกิจกรรม</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="practices">ข้อความการปฏิบัติธรรม</Label>
                  <Textarea
                    id="practices"
                    value={practices}
                    onChange={(e) => setPractices(e.target.value)}
                    rows={10}
                    className="mt-2"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSave('การปฏิบัติธรรม')}>
                    <Save className="h-4 w-4 mr-2" />
                    บันทึก
                  </Button>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    ดูตัวอย่าง
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>ข้อมูลพระอาจารย์</CardTitle>
                      <CardDescription>จัดการข้อมูลพระอาจารย์และผู้สอน</CardDescription>
                    </div>
                    <Button onClick={() => setIsAddingTeacher(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      เพิ่มพระอาจารย์
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {teachers.map((teacher) => (
                      <div key={teacher.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{teacher.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{teacher.title}</p>
                            <p className="text-gray-700">{teacher.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteTeacher(teacher.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {isAddingTeacher && (
                <Card>
                  <CardHeader>
                    <CardTitle>เพิ่มข้อมูลพระอาจารย์ใหม่</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="teacher-name">ชื่อพระอาจารย์</Label>
                      <Input
                        id="teacher-name"
                        value={newTeacher.name}
                        onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                        placeholder="เช่น พระอาจารย์สมหมาย"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teacher-title">ตำแหน่ง</Label>
                      <Input
                        id="teacher-title"
                        value={newTeacher.title}
                        onChange={(e) => setNewTeacher({...newTeacher, title: e.target.value})}
                        placeholder="เช่น เจ้าอาวาส, รองเจ้าอาวาส"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teacher-description">รายละเอียด</Label>
                      <Textarea
                        id="teacher-description"
                        value={newTeacher.description}
                        onChange={(e) => setNewTeacher({...newTeacher, description: e.target.value})}
                        rows={4}
                        placeholder="ประวัติ ความเชี่ยวชาญ และประสบการณ์"
                      />
                    </div>
                    <div>
                      <Label htmlFor="teacher-image">รูปภาพ</Label>
                      <div className="flex gap-2 mt-2">
                        <Input
                          id="teacher-image"
                          type="file"
                          accept="image/*"
                          className="flex-1"
                        />
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          อัปโหลด
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddTeacher}>บันทึก</Button>
                      <Button variant="outline" onClick={() => setIsAddingTeacher(false)}>ยกเลิก</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminAboutManagement;
