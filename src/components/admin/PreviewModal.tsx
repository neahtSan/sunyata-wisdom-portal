
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, X, Check } from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const PreviewModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  isLoading = false 
}: PreviewModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-600" />
            ตัวอย่างก่อนเผยแพร่: {title}
          </DialogTitle>
          <DialogDescription>
            ตรวจสอบความถูกต้องของเนื้อหาก่อนเผยแพร่บนเว็บไซต์จริง
          </DialogDescription>
        </DialogHeader>
        
        {/* Preview Content */}
        <div className="flex-1 overflow-auto border rounded-lg bg-gray-50 p-4">
          <div className="bg-white rounded shadow-sm">
            {children}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-600">
            💡 หากต้องการแก้ไขเพิ่มเติม กดปุ่ม "ยกเลิก" เพื่อกลับไปแก้ไข
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              ยกเลิก
            </Button>
            <Button onClick={onConfirm} disabled={isLoading}>
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? 'กำลังเผยแพร่...' : 'ยืนยันและเผยแพร่'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
