import { Bookmark, Clock3, MapPin, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Place } from '../types';
import { getBusinessState } from '../lib/business';
import { useAppState } from '../hooks/useAppState';

export function PlaceCard({ place, compact = false }: { place: Place; compact?: boolean }) {
  const { isPlaceSaved, toggleSavedPlace } = useAppState();
  const saved = isPlaceSaved(place.id);
  const business = getBusinessState(place);

  return (
    <article className={`place-card${compact ? ' place-card--compact' : ''}`}>
      <Link to={`/places/${place.id}`} className="place-card__media" aria-label={`${place.nameKo} 상세 보기`}>
        <img src={place.image} alt="" loading="lazy" />
      </Link>
      <div className="place-card__body">
        <div className="place-card__title-row">
          <Link to={`/places/${place.id}`} className="place-card__title-link">
            <span className="place-card__category">{place.categoryLabel} · {place.district}</span>
            <h2>{place.nameKo}</h2>
            <p className="place-card__zh">{place.nameZh}{place.branch ? ` · ${place.branch}` : ''}</p>
          </Link>
          <button
            type="button"
            className={`save-button${saved ? ' is-saved' : ''}`}
            onClick={() => toggleSavedPlace(place.id)}
            aria-label={saved ? '저장 해제' : '장소 저장'}
            aria-pressed={saved}
          >
            <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {!compact ? <p className="place-card__summary">{place.summary}</p> : null}

        <dl className="place-card__meta">
          <div>
            <Clock3 size={16} aria-hidden="true" />
            <dt className="sr-only">영업 상태</dt>
            <dd className={`business-text business-text--${business.tone}`}>{business.label}</dd>
          </div>
          <div>
            <WalletCards size={16} aria-hidden="true" />
            <dt className="sr-only">예상 비용</dt>
            <dd>{place.priceLabel}</dd>
          </div>
          <div>
            <MapPin size={16} aria-hidden="true" />
            <dt className="sr-only">숙소에서 이동</dt>
            <dd>{place.hotelTravelLabel}</dd>
          </div>
        </dl>

        <div className="place-card__footer">
          <span>{place.recommendationGrounds[0]}</span>
          <Link to={`/places/${place.id}`} className="text-link">상세</Link>
        </div>
      </div>
    </article>
  );
}
