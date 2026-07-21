import {
  Bookmark,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  ExternalLink,
  Languages,
  MapPin,
  TriangleAlert,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { VerificationText } from '../components/VerificationText';
import { useAppState } from '../hooks/useAppState';
import { places } from '../data/places';
import { createAmapSearchUrl } from '../lib/amap';
import { getBusinessState } from '../lib/business';

export function PlaceDetailPage() {
  const { placeId } = useParams();
  const place = places.find((item) => item.id === placeId);
  const { isPlaceSaved, toggleSavedPlace } = useAppState();
  const [copied, setCopied] = useState(false);

  if (!place) {
    return <div className="page"><PageHeader title="장소를 찾지 못했어" back /></div>;
  }

  const business = getBusinessState(place);
  const saved = isPlaceSaved(place.id);
  const amapUrl = createAmapSearchUrl(place.amapKeyword);

  const copyName = async () => {
    await navigator.clipboard.writeText(`${place.nameZh}${place.branch ? ` ${place.branch}` : ''}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img src={place.image} alt={`${place.nameKo} 참고 이미지`} />
        <div className="detail-hero__top">
          <PageHeader title="" back />
          <button
            className={`floating-save${saved ? ' is-saved' : ''}`}
            onClick={() => toggleSavedPlace(place.id)}
            aria-label={saved ? '저장 해제' : '장소 저장'}
          >
            <Bookmark size={21} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-title">
          <p>{place.categoryLabel} · {place.district}</p>
          <h1>{place.nameKo}</h1>
          <div className="detail-title__zh">
            <span>{place.nameZh}{place.branch ? ` · ${place.branch}` : ''}</span>
            <button onClick={copyName}>{copied ? <Check size={17} /> : <Copy size={17} />}</button>
          </div>
        </div>

        <div className="detail-status-line">
          <span className={`business-text business-text--${business.tone}`}>{business.label}</span>
          <VerificationText state={place.verification} date={place.verifiedAt} />
        </div>

        <div className="detail-actions">
          <a href={amapUrl} target="_blank" rel="noreferrer" className="primary-action">
            <MapPin size={19} /> 고덕지도 열기
          </a>
          <Link to="/phrases?category=restaurant" className="secondary-action">
            <Languages size={19} /> 중국어
          </Link>
        </div>

        <section className="detail-facts">
          <div><Clock3 size={18} /><span>체류</span><strong>{place.stayLabel}</strong></div>
          <div><WalletCards size={18} /><span>예산</span><strong>{place.priceLabel}</strong></div>
          <div><MapPin size={18} /><span>숙소 기준</span><strong>{place.hotelTravelLabel}</strong></div>
        </section>

        <section className="detail-section">
          <h2>왜 저장했는지</h2>
          <ul className="plain-list">
            {place.recommendationGrounds.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>

        {place.mustOrder?.length ? (
          <section className="detail-section">
            <h2>먼저 볼 메뉴</h2>
            <div className="menu-list">
              {place.mustOrder.map((menu) => (
                <article key={menu.nameKo}>
                  <div>
                    <h3>{menu.nameKo}</h3>
                    {menu.nameZh ? <span>{menu.nameZh}</span> : null}
                  </div>
                  <p>{menu.note}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {place.orderForTwo?.length ? (
          <section className="order-guide">
            <div className="order-guide__title"><UsersRound size={21} /><h2>두 명이면 여기부터</h2></div>
            <ol>
              {place.orderForTwo.map((item) => <li key={item}>{item}</li>)}
            </ol>
            <p>처음 주문량을 줄이고, 부족하면 추가하는 기준으로 적었어.</p>
          </section>
        ) : null}

        <section className="detail-section">
          <h2>실전 팁</h2>
          <ul className="tip-list">
            {place.tips.map((tip) => <li key={tip}><Check size={17} /> <span>{tip}</span></li>)}
          </ul>
        </section>

        {place.warnings?.length ? (
          <section className="warning-block">
            <TriangleAlert size={20} />
            <div>
              <h2>확인할 것</h2>
              {place.warnings.map((warning) => <p key={warning}>{warning}</p>)}
            </div>
          </section>
        ) : null}

        <section className="source-note">
          <h2>정보 상태</h2>
          <p>{place.sourceNote ?? '현재 수집한 후보 정보이며, 정확한 지점·영업시간·가격은 방문 전에 다시 확인할 예정.'}</p>
        </section>

        <a href={amapUrl} target="_blank" rel="noreferrer" className="wide-link">
          고덕지도에서 중국어 상호로 검색 <ExternalLink size={17} />
        </a>

        <Link to="/places" className="back-to-list">장소 목록으로 <ChevronRight size={17} /></Link>
      </div>
    </div>
  );
}
