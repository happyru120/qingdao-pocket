import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { FilterScroller } from '../components/FilterScroller';
import { PageHeader } from '../components/PageHeader';
import { PlaceCard } from '../components/PlaceCard';
import { placeCategories, places } from '../data/places';
import { getBusinessState } from '../lib/business';

export function PlacesPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [category, setCategory] = useState(params.get('category') ?? 'all');
  const [openOnly, setOpenOnly] = useState(params.get('open') === '1');
  const [lowWalking, setLowWalking] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return places.filter((place) => {
      const haystack = [place.nameKo, place.nameZh, place.branch, place.district, ...place.tags]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const categoryMatch = category === 'all' || place.category === category;
      const queryMatch = !normalized || haystack.includes(normalized);
      const business = getBusinessState(place);
      const openMatch = !openOnly || business.tone === 'open' || business.tone === 'closing';
      const walkingMatch = !lowWalking || place.walkingLoad === 'low';
      const deliveryMatch = !delivery || place.deliveryCandidate;
      return categoryMatch && queryMatch && openMatch && walkingMatch && deliveryMatch;
    });
  }, [category, delivery, lowWalking, openOnly, query]);

  const reset = () => {
    setQuery('');
    setCategory('all');
    setOpenOnly(false);
    setLowWalking(false);
    setDelivery(false);
    setParams({});
  };

  return (
    <div className="page">
      <PageHeader
        eyebrow="PLACES"
        title="장소"
        description="정확한 중국어 이름, 주문량, 영업 상태를 한 번에 확인해."
      />

      <div className="search-field">
        <Search size={19} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="가지튀김, CCD, 중산로…"
          aria-label="장소 검색"
        />
        {query ? (
          <button type="button" onClick={() => setQuery('')} aria-label="검색어 지우기">
            <X size={18} />
          </button>
        ) : null}
      </div>

      <FilterScroller items={placeCategories} value={category} onChange={setCategory} label="장소 카테고리" />

      <div className="secondary-filters" aria-label="추가 필터">
        <button className={openOnly ? 'is-active' : ''} onClick={() => setOpenOnly((value) => !value)}>
          지금 영업 중
        </button>
        <button className={lowWalking ? 'is-active' : ''} onClick={() => setLowWalking((value) => !value)}>
          걷기 적음
        </button>
        <button className={delivery ? 'is-active' : ''} onClick={() => setDelivery((value) => !value)}>
          배달 후보
        </button>
      </div>

      <div className="result-summary">
        <span>{results.length}곳</span>
        {(query || category !== 'all' || openOnly || lowWalking || delivery) ? (
          <button type="button" onClick={reset}><SlidersHorizontal size={16} /> 필터 초기화</button>
        ) : null}
      </div>

      {results.length ? (
        <div className="stack-list">
          {results.map((place) => <PlaceCard key={place.id} place={place} />)}
        </div>
      ) : (
        <EmptyState icon={Search} title="조건에 맞는 장소가 없어" description="영업 중 필터를 끄거나 검색어를 짧게 바꿔봐." />
      )}
    </div>
  );
}
