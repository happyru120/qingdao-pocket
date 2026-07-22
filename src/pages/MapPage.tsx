import { ArrowRight, ExternalLink, MapPinned, Navigation, Route, TrainFront } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { createAmapSearchUrl } from '../lib/amap';

type AreaTone = 'near' | 'middle' | 'far';

type MapArea = {
  id: string;
  name: string;
  nameZh: string;
  district: string;
  travel: string;
  tone: AreaTone;
  routeNote: string;
  bestTime: string;
  placeIds: string[];
  amapKeyword: string;
};

const areas: MapArea[] = [
  {
    id: 'hotel-mixc',
    name: '홍콩중로·완샹청',
    nameZh: '香港中路 / 万象城',
    district: '숙소 생활권',
    travel: '도보·디디 짧음',
    tone: 'near',
    routeNote: '비 오거나 피곤한 날 식사·쇼핑을 처리하기 좋은 구역.',
    bestTime: '첫날 저녁, 늦은 식사',
    placeIds: ['luyu-mixc', 'haidilao-mixc', 'wanhechun'],
    amapKeyword: '青岛香港中路万象城',
  },
  {
    id: 'old-town',
    name: '중산로·잔교·성당',
    nameZh: '中山路 / 栈桥 / 青岛天主教堂',
    district: '구시가지',
    travel: '디디 약 15분',
    tone: 'middle',
    routeNote: '한 번 들어가면 잔교 방향으로 단방향으로 걷는 편이 낫다.',
    bestTime: '오전-오후, 일몰 전',
    placeIds: ['meidaer-zhongshan', 'wangjie-zhongshan', 'zhanqiao', 'st-michael', 'zhongshan-road'],
    amapKeyword: '青岛中山路栈桥',
  },
  {
    id: 'daxuelu',
    name: '대학로·소어산·CCD',
    nameZh: '大学路 / 小鱼山 / 如期而至',
    district: '구시가지 언덕',
    travel: '디디 약 15-20분',
    tone: 'middle',
    routeNote: '사진·카페·중고 카메라를 묶기 좋지만 오르막 부담이 있다.',
    bestTime: '맑은 날 오후',
    placeIds: ['xiaoyushan', 'ccd-shop'],
    amapKeyword: '青岛大学路小鱼山',
  },
  {
    id: 'taidong',
    name: '타이동·맥주박물관',
    nameZh: '台东 / 青岛啤酒博物馆',
    district: '야시장 권역',
    travel: '디디 약 15분',
    tone: 'middle',
    routeNote: '박물관을 먼저 보고 저녁에 야시장으로 넘어가는 흐름이 자연스럽다.',
    bestTime: '오후-저녁',
    placeIds: ['beer-museum', 'taitong-night-market'],
    amapKeyword: '台东步行街青岛啤酒博物馆',
  },
  {
    id: 'xiaomaidao',
    name: '소맥도',
    nameZh: '小麦岛',
    district: '동쪽 해안',
    travel: '디디 약 25분',
    tone: 'far',
    routeNote: '바다 산책과 카페 휴식용. 다른 구시가지 일정과 한 번에 묶기엔 멀다.',
    bestTime: '맑은 날 해질녘',
    placeIds: ['tiki-more'],
    amapKeyword: '青岛小麦岛',
  },
  {
    id: 'west-coast',
    name: '서해안 맥주축제',
    nameZh: '金沙滩啤酒城',
    district: '서해안',
    travel: '하루 후반 몰빵',
    tone: 'far',
    routeNote: '저녁 공연을 보려면 18시대 도착을 목표로 잡는 편이 낫다.',
    bestTime: '저녁-밤',
    placeIds: [],
    amapKeyword: '金沙滩啤酒城',
  },
  {
    id: 'silk-road',
    name: '칭다오 실크로드 천고정',
    nameZh: '青岛丝路千古情景区',
    district: '상합·교주 권역',
    travel: '먼 거리 · 오후 일찍',
    tone: 'far',
    routeNote: '맥주축제와 같은 날 가능하지만 17:30 전후로 빠져야 밤 일정을 살릴 수 있다.',
    bestTime: '오후, 공연 시간 확인 후',
    placeIds: [],
    amapKeyword: '青岛丝路千古情景区',
  },
];

const toneLabel: Record<AreaTone, string> = {
  near: '가까움',
  middle: '보통',
  far: '멀다',
};

export function MapPage() {
  return (
    <div className="page map-page">
      <PageHeader
        eyebrow="ROUTE MAP"
        title="동선 지도"
        description="정확한 지도 대신, 숙소 기준으로 어느 권역을 같은 날 묶을지 빠르게 보는 화면."
        back
      />

      <section className="route-anchor">
        <MapPinned size={24} aria-hidden="true" />
        <div>
          <span>기준점</span>
          <strong>칭다오 에어포트 푸화 호텔 · 홍콩중로</strong>
          <p>이동시간은 수동 추정값이야. 실시간 교통은 고덕지도에서 확인.</p>
        </div>
      </section>

      <section className="route-board" aria-label="칭다오 권역 흐름">
        {areas.map((area, index) => (
          <article className={`route-area route-area--${area.tone}`} key={area.id}>
            <div className="route-area__step">
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="route-area__body">
              <div className="route-area__title">
                <div>
                  <span>{area.district}</span>
                  <h2>{area.name}</h2>
                  <p lang="zh-CN">{area.nameZh}</p>
                </div>
                <strong>{toneLabel[area.tone]}</strong>
              </div>

              <dl className="route-area__meta">
                <div>
                  <Navigation size={16} aria-hidden="true" />
                  <dt>숙소 기준</dt>
                  <dd>{area.travel}</dd>
                </div>
                <div>
                  <Route size={16} aria-hidden="true" />
                  <dt>추천 시간</dt>
                  <dd>{area.bestTime}</dd>
                </div>
              </dl>

              <p className="route-area__note">{area.routeNote}</p>

              <div className="route-area__actions">
                {area.placeIds.length ? (
                  <Link to={`/places?q=${encodeURIComponent(area.name.split('·')[0])}`}>
                    장소 보기 <ArrowRight size={16} />
                  </Link>
                ) : null}
                <a href={createAmapSearchUrl(area.amapKeyword)} target="_blank" rel="noreferrer">
                  고덕지도 <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="route-combo">
        <div className="route-combo__title">
          <TrainFront size={20} aria-hidden="true" />
          <h2>하루 묶기 판단</h2>
        </div>
        <ul>
          <li><strong>구시가지 하루</strong><span>중산로, 잔교, 성당, 대학로, CCD는 한 덩어리로 묶기 좋음.</span></li>
          <li><strong>타이동 저녁</strong><span>맥주박물관 뒤에 야시장으로 넘기면 이동 낭비가 적음.</span></li>
          <li><strong>천고정 + 맥주축제</strong><span>가능하지만 서쪽·북쪽 큰 이동이라 오후 일찍 빠져야 함.</span></li>
        </ul>
      </section>
    </div>
  );
}
