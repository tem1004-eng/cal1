import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, ExternalLink } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateStr: string; // YYYY-MM-DD
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, dateStr }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  if (!isOpen) return null;

  const handleGoogleCalendarClick = () => {
    // Format dates for Google Calendar URL (YYYYMMDDTHHmmss)
    const startDateTime = `${dateStr.replace(/-/g, '')}T${startTime.replace(':', '')}00`;
    const endDateTime = `${dateStr.replace(/-/g, '')}T${endTime.replace(':', '')}00`;
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: title || '새로운 일정',
      dates: `${startDateTime}/${endDateTime}`,
      details: description,
    });

    window.open(`https://calendar.google.com/calendar/r/eventedit?${params.toString()}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-serif font-semibold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gold" />
            일정 추가 ({dateStr})
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">일정 제목</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 주일 예배, 가족 모임"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">시작 시간</label>
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">종료 시간</label>
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">메모</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="상세 내용을 입력하세요..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-gold outline-none h-24 resize-none"
            />
          </div>

          <button 
            onClick={handleGoogleCalendarClick}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="GCal" className="w-5 h-5" />
            구글 캘린더에 저장하기
            <ExternalLink className="w-4 h-4 opacity-70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
