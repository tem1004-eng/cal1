import React from 'react';
import { DAYS_OF_WEEK, HOLIDAYS_2026 } from '../constants';
import { CalendarMonth, Holiday, CalendarEvent } from '../types';

interface CalendarViewProps {
  monthData: CalendarMonth;
  events: CalendarEvent[];
  onDateClick: (dateStr: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ monthData, events, onDateClick }) => {
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(monthData.year, monthData.monthIndex);
  const firstDay = getFirstDayOfMonth(monthData.year, monthData.monthIndex);
  
  // Helper to find holiday for a specific date
  const getHoliday = (year: number, month: number, day: number): Holiday | undefined => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return HOLIDAYS_2026.find(h => h.date === dateStr);
  };

  // Helper to get events for a specific date
  const getEventsForDate = (year: number, month: number, day: number): CalendarEvent[] => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.startDate === dateStr);
  };

  const days = [];
  
  // Padding for empty days at start of month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 md:h-32 bg-slate-50/50 border-r border-b border-slate-100" />);
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${monthData.year}-${String(monthData.monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const dayOfWeek = (firstDay + i - 1) % 7;
    const isSunday = dayOfWeek === 0;
    const isSaturday = dayOfWeek === 6;
    
    const holiday = getHoliday(monthData.year, monthData.monthIndex, i);
    const dayEvents = getEventsForDate(monthData.year, monthData.monthIndex, i);
    const isHolidayRed = holiday?.isRed;
    
    // Determine text color: Sunday or Red Holiday -> Red, Saturday (if not holiday) -> Blue, Default -> Black
    let textColorClass = 'text-slate-700';
    if (isSunday || isHolidayRed) {
      textColorClass = 'text-red-500';
    } else if (isSaturday) {
      textColorClass = 'text-blue-500';
    }

    days.push(
      <div 
        key={i} 
        onClick={() => onDateClick(dateStr)}
        className="group relative h-24 md:h-32 bg-white border-r border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors p-1 md:p-2 flex flex-col items-start overflow-hidden"
      >
        <span className={`text-lg font-serif font-medium ${textColorClass} ml-1`}>
          {i}
        </span>

        {/* Holiday Name */}
        {holiday && (
          <div className="mb-1 ml-1">
            <span className={`
              text-[10px] font-medium px-1.5 py-0.5 rounded
              ${holiday.type === 'christian' 
                ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                : 'bg-red-50 text-red-600'}
            `}>
              {holiday.name}
            </span>
          </div>
        )}

        {/* Events List */}
        <div className="flex flex-col gap-0.5 w-full mt-1 overflow-y-auto hide-scrollbar">
          {dayEvents.slice(0, 3).map((evt, idx) => (
            <div key={idx} className="bg-sky-100 border-l-2 border-sky-400 pl-1.5 py-0.5 rounded-r text-[10px] md:text-xs text-sky-900 truncate w-full">
              {evt.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className="text-[10px] text-slate-400 pl-1">+ {dayEvents.length - 3}개 더보기</div>
          )}
        </div>
        
        {/* Placeholder for "Add event" hint on hover */}
        <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] md:text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">+</span>
        </div>
      </div>
    );
  }

  // Padding for end of grid (to make it complete 7 columns)
  const totalSlots = days.length;
  const remainingSlots = 7 - (totalSlots % 7);
  if (remainingSlots < 7) {
    for (let i = 0; i < remainingSlots; i++) {
      days.push(<div key={`empty-end-${i}`} className="h-24 md:h-32 bg-slate-50/50 border-r border-b border-slate-100" />);
    }
  }

  return (
    <div className="w-full bg-white shadow-sm rounded-b-xl overflow-hidden border-l border-t border-slate-100">
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
        {DAYS_OF_WEEK.map((day, idx) => (
          <div 
            key={day} 
            className={`
              py-3 text-center text-sm font-bold tracking-wider
              ${idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-slate-500'}
            `}
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-b border-slate-100">
        {days}
      </div>
    </div>
  );
};

export default CalendarView;
