export interface CalendarMonth {
  year: number;
  monthIndex: number; // 0-11
  name: string;
  weatherDescription: string;
  defaultVerse: string;
  defaultVerseReference: string;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export interface CalendarEvent {
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  isRed: boolean;
  type?: 'christian' | 'national';
}