import React, { useState, useEffect } from 'react';
import { MONTHS_DATA } from './constants';
import { generateCalendarImage, generateMockEvents } from './services/geminiService';
import { CalendarEvent } from './types';
import CalendarView from './components/CalendarView';
import EventModal from './components/EventModal';
import { ChevronLeft, ChevronRight, Loader2, Sparkles, CalendarCheck, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [generatedImages, setGeneratedImages] = useState<Record<number, string>>({});
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const currentMonthData = MONTHS_DATA[currentMonthIndex];

  // Placeholder image URL until one is generated
  const placeholderImage = `https://picsum.photos/seed/${currentMonthIndex + 2026}/1200/900`;
  const currentImage = generatedImages[currentMonthIndex] || placeholderImage;

  // Clear events when month changes? No, let's keep them if we generated for multiple months, 
  // but for simplicity in this demo, let's reset or just keep appending.
  // Actually, filtering happens in CalendarView. Let's keep state simple.

  const handlePrevMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const handleGenerateImage = async () => {
    if (isGeneratingImage) return;
    
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateCalendarImage(currentMonthData);
      setGeneratedImages(prev => ({
        ...prev,
        [currentMonthIndex]: imageUrl
      }));
    } catch (error) {
      alert("이미지 생성에 실패했습니다. API 키를 확인해주세요.");
      console.error(error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSyncGoogleCalendar = async () => {
    if (isLoadingEvents) return;

    const confirmed = window.confirm(
      "보안 정책상 데모 환경에서는 실제 'tem1004@gmail.com' 계정의 비공개 일정에 접근할 수 없습니다.\n\n대신 AI가 생성한 '예시 일정(교회 절기, 예배 등)'을 캘린더에 표시해 드릴까요?"
    );

    if (!confirmed) return;

    setIsLoadingEvents(true);
    try {
      const newEvents = await generateMockEvents(currentMonthData, "tem1004@gmail.com");
      // Append new events, avoiding duplicates roughly (simple concat for demo)
      setEvents(prev => [...prev.filter(e => !e.startDate.startsWith(String(currentMonthData.year))), ...newEvents]);
      alert(`${currentMonthData.name}의 일정 ${newEvents.length}개를 불러왔습니다.`);
    } catch (error) {
      console.error(error);
      alert("일정을 불러오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoadingEvents(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e4dc] py-8 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">2026 Christian Calendar</h1>
            <p className="text-slate-600 italic mt-1">말씀과 컬러풀한 캘리그라피가 있는 2026년</p>
          </div>
          
          <button
            onClick={handleSyncGoogleCalendar}
            disabled={isLoadingEvents}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all text-sm font-sans"
          >
            {isLoadingEvents ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="GCal" className="w-4 h-4" />
            )}
            {isLoadingEvents ? "일정 동기화 중..." : "구글 캘린더 불러오기"}
          </button>
        </header>

        {/* Main Calendar Card */}
        <div className="bg-paper shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5">
          
          {/* Top Image Section */}
          <div className="relative aspect-[4/3] md:aspect-[21/9] w-full bg-slate-200 overflow-hidden group">
            <img 
              src={currentImage} 
              alt={currentMonthData.name} 
              className={`w-full h-full object-cover transition-transform duration-700 ${isGeneratingImage ? 'scale-105 blur-sm' : 'scale-100'}`}
            />
            
            {/* Overlay Gradient for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

            {/* Verse Overlay (Fallback) */}
            {!generatedImages[currentMonthIndex] && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-white drop-shadow-lg">
                 <p className="text-2xl md:text-4xl font-bold mb-4 leading-relaxed font-serif animate-in slide-in-from-bottom-4 fade-in duration-700 text-yellow-100">
                  {currentMonthData.defaultVerse}
                </p>
                <p className="text-sm md:text-lg opacity-90 uppercase tracking-widest border-t border-white/50 pt-2 mt-2">
                  {currentMonthData.defaultVerseReference}
                </p>
              </div>
            )}

            {/* AI Generation Control */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-sans font-medium transition-all flex items-center gap-2 border border-white/30 shadow-lg"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    생성 중...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    {generatedImages[currentMonthIndex] ? '다시 생성' : '캘리그라피 생성'}
                  </>
                )}
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 text-white/60 text-xs font-sans">
               {generatedImages[currentMonthIndex] ? 'Generated by Gemini 3 Pro' : 'Photo source: Picsum'}
            </div>
          </div>

          {/* Navigation & Grid Section */}
          <div className="p-4 md:p-8 bg-white">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold text-ink">{currentMonthData.name}</h2>
                <p className="text-slate-500 text-sm mt-1">{currentMonthData.weatherDescription}</p>
              </div>
              
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>

            <CalendarView 
              monthData={currentMonthData} 
              events={events}
              onDateClick={(date) => setSelectedDate(date)} 
            />
          </div>
        </div>

        <div className="text-center text-slate-500 text-sm font-sans pb-8">
          <p>© 2026 Scripture Calendar Project</p>
          <p className="mt-1">날짜를 클릭하면 개인 구글 캘린더에 일정을 저장할 수 있습니다.</p>
        </div>
      </div>

      <EventModal 
        isOpen={!!selectedDate} 
        onClose={() => setSelectedDate(null)} 
        dateStr={selectedDate || ''} 
      />
    </div>
  );
};

export default App;
