import type { ItineraryDay } from '../types';

export const itinerary: ItineraryDay[] = [
  {
    day: 1,
    date: '7월 21일',
    title: '도착 · 숙소 주변 적응',
    pace: '걷기 적음',
    stops: [
      { time: '오후', title: '호텔 체크인', note: '짐 정리 후 다리 상태 확인' },
      { time: '저녁', placeId: 'wanhechun', title: '완허춘 또는 숙소 근처 배달', note: '첫날은 가까운 식사 우선', travel: '디디 또는 배달' },
      { time: '밤', title: '오사광장·해안 야경', note: '컨디션이 괜찮을 때만 짧게' },
    ],
  },
  {
    day: 2,
    date: '7월 22일',
    title: '구시가지 · 중산로',
    pace: '보통',
    stops: [
      { time: '10:30', placeId: 'st-michael', title: '성 미카엘 성당', note: '오전 사진 촬영' },
      { time: '11:30', placeId: 'meidaer-zhongshan', title: '메이다얼', note: '피크 전 점심', travel: '도보권' },
      { time: '13:10', placeId: 'zhongshan-road', title: '중산로', note: '카페를 중간 휴식 지점으로 지정' },
      { time: '15:00', placeId: 'zhanqiao', title: '잔교', note: '바람과 다리 상태에 따라 체류 조절', travel: '도보권' },
      { time: '17:00', placeId: 'wangjie-zhongshan', title: '왕지에 샤오카오', note: '종류별로 조금씩' },
    ],
  },
  {
    day: 3,
    date: '7월 23일',
    title: '대학로 · 소어산 · CCD',
    pace: '보통',
    stops: [
      { time: '10:30', placeId: 'xiaoyushan', title: '소어산', note: '맑은 날 우선. 택시로 최대한 위쪽 진입' },
      { time: '12:00', placeId: 'ccd-shop', title: 'CCD 카메라숍', note: '작동 테스트와 한국 시세 비교', travel: '대학로 도보권' },
      { time: '14:00', title: '대학로 카페', note: '걷기 중간에 충분히 휴식' },
      { time: '저녁', placeId: 'shuangheyuan', title: '쌍허위안', note: '바지락볶음·해물만두·가지튀김 조합' },
    ],
  },
  {
    day: 4,
    date: '7월 24일',
    title: '선택 일정 · 맥주축제 또는 타이동',
    pace: '걷기 적음',
    stops: [
      { time: '낮', title: '컨디션에 따라 쇼핑', note: '완샹청·이온·리췬 중 한 곳' },
      { time: '저녁', title: '맥주축제 또는 타이동 야시장', note: '둘 다 넣지 않고 하나만 선택' },
      { time: '귀가 전', title: '기념품 최종 구매', note: '냉장 제품은 마지막에 구매' },
    ],
  },
];
