export type PackingCategoryId = 'essential' | 'medicine' | 'electronics' | 'clothes' | 'return';

export type PackingItem = {
  id: string;
  label: string;
};

export type PackingCategory = {
  id: PackingCategoryId;
  title: string;
  hint: string;
  items: PackingItem[];
};

export const packingCategories: PackingCategory[] = [
  {
    id: 'essential',
    title: '필수',
    hint: '공항·입국·결제 전에 빠지면 곤란한 것',
    items: [
      { id: 'passport', label: '여권' },
      { id: 'flight-ticket', label: '비행기 티켓' },
      { id: 'hotel-reservation', label: '호텔 예약' },
      { id: 'sim-esim', label: '유심/eSIM' },
      { id: 'didi-installed', label: '디디 설치' },
      { id: 'alipay', label: '알리페이' },
      { id: 'wechat-pay', label: '위챗페이' },
      { id: 'cash-exchange', label: '환전' },
    ],
  },
  {
    id: 'medicine',
    title: '상비약',
    hint: '첫날 컨디션 흔들릴 때 바로 꺼낼 것',
    items: [
      { id: 'painkiller', label: '진통제' },
      { id: 'digestive', label: '소화제' },
      { id: 'bandage', label: '밴드' },
      { id: 'motion-sickness', label: '멀미약' },
      { id: 'personal-medicine', label: '개인약' },
    ],
  },
  {
    id: 'electronics',
    title: '전자기기',
    hint: '지도·번역·결제 배터리 끊기지 않게',
    items: [
      { id: 'charger', label: '충전기' },
      { id: 'power-bank', label: '보조배터리' },
      { id: 'usb-c-cable', label: 'C타입' },
      { id: 'camera', label: '카메라' },
      { id: 'power-strip', label: '멀티탭' },
    ],
  },
  {
    id: 'clothes',
    title: '옷·생활용품',
    hint: '숙소에서 바로 갈아입고 나갈 수 있게',
    items: [
      { id: 'extra-clothes', label: '여벌옷' },
      { id: 'underwear', label: '속옷' },
      { id: 'socks', label: '양말' },
      { id: 'pajamas', label: '잠옷' },
      { id: 'sunglasses', label: '선글라스' },
      { id: 'hat', label: '모자' },
      { id: 'umbrella', label: '우산' },
      { id: 'slippers', label: '슬리퍼' },
    ],
  },
  {
    id: 'return',
    title: '귀국 전',
    hint: '호텔 나오기 전에 마지막으로 훑기',
    items: [
      { id: 'souvenirs', label: '기념품' },
      { id: 'duty-free', label: '면세' },
      { id: 'luggage-weight', label: '캐리어 무게' },
      { id: 'passport-check', label: '여권 확인' },
      { id: 'charger-check', label: '충전기 확인' },
    ],
  },
];
