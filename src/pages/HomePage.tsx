import {
  ArrowRight,
  Beer,
  BookOpenText,
  CakeSlice,
  Camera,
  ChevronRight,
  ClipboardCheck,
  Languages,
  MapPin,
  Search,
  ShoppingBag,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { corePlaces } from '../data/places';
import { getTripCountdown } from '../lib/business';
import { PlaceCard } from '../components/PlaceCard';
import { SectionHeading } from '../components/SectionHeading';

const quickActions = [
  { to: '/places', label: '장소 찾기', description: '음식·지역·영업 상태로 검색', icon: Search },
  { to: '/map', label: '동선 지도', description: '숙소 기준 권역 한눈에 보기', icon: MapPin },
  { to: '/phrases', label: '중국어', description: '직원 앞에서 바로 재생', icon: Languages },
  { to: '/shopping', label: '쇼핑 목록', description: '마트에서 체크하며 구매', icon: ShoppingBag },
  { to: '/packing', label: '준비물 체크', description: '출국 전 빠뜨린 것 확인', icon: ClipboardCheck },
] as const;

export function HomePage() {
  const featured = ['meidaer-zhongshan', 'ccd-shop', 'taitong-night-market']
    .map((id) => corePlaces.find((place) => place.id === id))
    .filter(Boolean);

  return (
    <div className="page home-page">
      <header className="home-topbar">
        <div>
          <p className="eyebrow">PRIVATE TRAVEL NOTE</p>
          <h1>칭다오 포켓</h1>
        </div>
        <Link to="/saved" className="topbar-link">저장한 곳</Link>
      </header>

      <section className="trip-hero">
        <img src="images/hero-city.webp" alt="칭다오 해안 야경" />
        <div className="trip-hero__scrim" />
        <div className="trip-hero__content">
          <div className="trip-hero__meta">
            <span>{getTripCountdown('2026-07-21')}</span>
            <span>7.21–7.24</span>
          </div>
          <h2>내일 출발해도<br />당황하지 않게.</h2>
          <p><MapPin size={16} /> 홍콩중로 숙소 기준</p>
          <Link to="/itinerary" className="hero-action">
            일정 초안 보기 <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="quick-action-grid" aria-label="빠른 실행">
        {quickActions.map(({ to, label, description, icon: Icon }) => (
          <Link key={to} to={to} className="quick-action">
            <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
            <strong>{label}</strong>
            <span>{description}</span>
            <ChevronRight size={17} className="quick-action__arrow" aria-hidden="true" />
          </Link>
        ))}
      </section>

      <section className="home-note">
        <BookOpenText size={20} strokeWidth={1.8} aria-hidden="true" />
        <div>
          <strong>확실하지 않은 정보는 확실한 척하지 않기</strong>
          <p>영업시간·가격·지점은 마지막 확인일과 검증 상태를 함께 표시해.</p>
        </div>
      </section>

      <section>
        <SectionHeading
          title="먼저 저장해 둔 곳"
          description="이번 여행에서 실제로 비교해 볼 후보"
          action={<Link to="/places" className="text-link">전체 보기</Link>}
        />
        <div className="stack-list">
          {featured.map((place) => place ? <PlaceCard key={place.id} place={place} compact /> : null)}
        </div>
      </section>

      <section className="feature-strip">
        <div>
          <span className="feature-strip__label">현장 특집</span>
          <h2>2026 칭다오 국제맥주축제</h2>
          <p>서해안 주 행사장 9개 대형 텐트와 추천 순서를 모바일 카드로 정리.</p>
          <Link to="/festival" className="inline-action">축제 공략 열기 <ArrowRight size={17} /></Link>
        </div>
        <Beer size={44} strokeWidth={1.35} aria-hidden="true" />
      </section>

      <section>
        <SectionHeading title="테마별 바로가기" description="필요할 때만 짧게 꺼내 보기" />
        <div className="theme-links">
          <Link to="/places?category=shopping"><Camera size={18} /> CCD·레트로 숍</Link>
          <Link to="/places?category=market"><MapPin size={18} /> 타이동 야시장</Link>
          <Link to="/places?category=cafe&q=디저트"><CakeSlice size={18} /> 디저트 후보</Link>
          <Link to="/map"><MapPin size={18} /> 동선 지도</Link>
          <Link to="/shopping"><ShoppingBag size={18} /> 기념품 체크</Link>
          <Link to="/packing"><ClipboardCheck size={18} /> 준비물 체크</Link>
          <Link to="/phrases?essential=1"><Languages size={18} /> 긴급 회화</Link>
        </div>
      </section>
    </div>
  );
}
