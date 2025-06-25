
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, List, ListOrdered, Quote, Link } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

const RichTextEditor = ({ value, onChange, placeholder, rows = 12 }: RichTextEditorProps) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, label: 'ตัวหนา', action: () => insertText('**', '**') },
    { icon: Italic, label: 'ตัวเอียง', action: () => insertText('_', '_') },
    { icon: Underline, label: 'ขีดเส้นใต้', action: () => insertText('<u>', '</u>') },
    { icon: Quote, label: 'คำอ้างอิง', action: () => insertText('> ') },
    { icon: List, label: 'รายการ', action: () => insertText('- ') },
    { icon: ListOrdered, label: 'รายการเลข', action: () => insertText('1. ') },
    { icon: Link, label: 'ลิงก์', action: () => insertText('[ข้อความ](URL)') },
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 border rounded-t-md bg-gray-50">
        {formatButtons.map((button) => (
          <Button
            key={button.label}
            variant="ghost"
            size="sm"
            onClick={button.action}
            className="h-8 w-8 p-0"
            title={button.label}
            type="button"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="rounded-t-none font-mono text-sm"
      />
      <div className="text-xs text-gray-500 p-2">
        <p>รองรับ Markdown: **ตัวหนา** _ตัวเอียง_ `โค้ด` {'>'} คำอ้างอิง - รายการ</p>
      </div>
    </div>
  );
};

export default RichTextEditor;
