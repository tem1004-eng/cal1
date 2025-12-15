import { CalendarMonth, Holiday } from './types';

export const MONTHS_DATA: CalendarMonth[] = [
  {
    year: 2026,
    monthIndex: 0,
    name: "1월 (January)",
    weatherDescription: "새하얀 눈이 덮인 고요한 겨울 풍경, 따뜻한 햇살이 비치는 아침",
    defaultVerse: "태초에 하나님이 천지를 창조하시니라",
    defaultVerseReference: "창세기 1:1"
  },
  {
    year: 2026,
    monthIndex: 1,
    name: "2월 (February)",
    weatherDescription: "늦겨울의 차분함, 얼음이 녹기 시작하는 냇가, 희망",
    defaultVerse: "믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니",
    defaultVerseReference: "히브리서 11:1"
  },
  {
    year: 2026,
    monthIndex: 2,
    name: "3월 (March)",
    weatherDescription: "파릇파릇 돋아나는 새싹, 봄의 시작, 따스한 바람",
    defaultVerse: "일어나라 빛을 발하라 이는 네 빛이 이르렀고",
    defaultVerseReference: "이사야 60:1"
  },
  {
    year: 2026,
    monthIndex: 3,
    name: "4월 (April)",
    weatherDescription: "만개한 벚꽃과 화사한 봄꽃들, 부드러운 봄비",
    defaultVerse: "사랑하는 자여 네 영혼이 잘됨 같이 네가 범사에 잘되고",
    defaultVerseReference: "요한3서 1:2"
  },
  {
    year: 2026,
    monthIndex: 4,
    name: "5월 (May)",
    weatherDescription: "푸르른 신록, 맑고 청명한 하늘, 생명력 넘치는 숲",
    defaultVerse: "항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라",
    defaultVerseReference: "데살로니가전서 5:16-18"
  },
  {
    year: 2026,
    monthIndex: 5,
    name: "6월 (June)",
    weatherDescription: "초여름의 싱그러움, 장미 정원, 밝은 햇살",
    defaultVerse: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
    defaultVerseReference: "시편 23:1"
  },
  {
    year: 2026,
    monthIndex: 6,
    name: "7월 (July)",
    weatherDescription: "청량한 바다와 푸른 하늘, 시원한 여름 바람",
    defaultVerse: "두려워하지 말라 내가 너와 함께 함이라",
    defaultVerseReference: "이사야 41:10"
  },
  {
    year: 2026,
    monthIndex: 7,
    name: "8월 (August)",
    weatherDescription: "짙은 녹음, 한여름의 밤하늘과 별, 열정",
    defaultVerse: "오직 성령의 열매는 사랑과 희락과 화평과",
    defaultVerseReference: "갈라디아서 5:22"
  },
  {
    year: 2026,
    monthIndex: 8,
    name: "9월 (September)",
    weatherDescription: "높고 파란 가을 하늘, 코스모스, 선선한 가을 바람",
    defaultVerse: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라",
    defaultVerseReference: "빌립보서 4:13"
  },
  {
    year: 2026,
    monthIndex: 9,
    name: "10월 (October)",
    weatherDescription: "붉게 물든 단풍, 황금 들판, 풍요로움",
    defaultVerse: "수고하고 무거운 짐 진 자들아 다 내게로 오라",
    defaultVerseReference: "마태복음 11:28"
  },
  {
    year: 2026,
    monthIndex: 10,
    name: "11월 (November)",
    weatherDescription: "늦가을의 쓸쓸함과 낭만, 낙엽이 쌓인 길",
    defaultVerse: "너희는 세상의 빛이라 산 위에 있는 동네가 숨겨지지 못할 것이요",
    defaultVerseReference: "마태복음 5:14"
  },
  {
    year: 2026,
    monthIndex: 11,
    name: "12월 (December)",
    weatherDescription: "크리스마스 트리, 눈 내리는 밤, 따뜻한 촛불",
    defaultVerse: "지극히 높은 곳에서는 하나님께 영광이요 땅에서는 기뻐하심을 입은 사람들 중에 평화로다",
    defaultVerseReference: "누가복음 2:14"
  }
];

export const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 2026 Holidays (Korea + Christian Major)
export const HOLIDAYS_2026: Holiday[] = [
  { date: '2026-01-01', name: '신정', isRed: true, type: 'national' },
  { date: '2026-02-17', name: '설날', isRed: true, type: 'national' },
  { date: '2026-02-18', name: '설날', isRed: true, type: 'national' },
  { date: '2026-02-19', name: '설날', isRed: true, type: 'national' },
  { date: '2026-03-01', name: '삼일절', isRed: true, type: 'national' },
  { date: '2026-03-29', name: '종려주일', isRed: true, type: 'christian' }, // Palm Sunday
  { date: '2026-04-03', name: '성금요일', isRed: false, type: 'christian' }, // Good Friday (Not national holiday but Christian observance)
  { date: '2026-04-05', name: '부활절', isRed: true, type: 'christian' }, // Easter
  { date: '2026-05-05', name: '어린이날', isRed: true, type: 'national' },
  { date: '2026-05-24', name: '성령강림절', isRed: true, type: 'christian' }, // Pentecost
  { date: '2026-05-24', name: '부처님오신날', isRed: true, type: 'national' },
  { date: '2026-06-06', name: '현충일', isRed: true, type: 'national' },
  { date: '2026-08-15', name: '광복절', isRed: true, type: 'national' },
  { date: '2026-09-25', name: '추석', isRed: true, type: 'national' },
  { date: '2026-09-26', name: '추석', isRed: true, type: 'national' },
  { date: '2026-09-27', name: '추석', isRed: true, type: 'national' },
  { date: '2026-10-03', name: '개천절', isRed: true, type: 'national' },
  { date: '2026-10-09', name: '한글날', isRed: true, type: 'national' },
  { date: '2026-11-15', name: '추수감사절', isRed: true, type: 'christian' }, // Thanksgiving (Korean Church often observes 3rd Sun of Nov)
  { date: '2026-12-25', name: '성탄절', isRed: true, type: 'christian' },
];
