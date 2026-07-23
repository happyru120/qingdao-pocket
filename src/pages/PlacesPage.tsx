import { ExternalLink, List, Map, Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AmapPlacesMap } from '../components/AmapPlacesMap';
import { EmptyState } from '../components/EmptyState';
import { FilterScroller } from '../components/FilterScroller';
import { PageHeader } from '../components/PageHeader';
import { PlaceCard } from '../components/PlaceCard';
import { placeCategories } from '../data/places';
import { createAmapSearchUrl } from '../lib/amap';
import { getBusinessState } from '../lib/business';
import { useAllPlaces } from '../hooks/useAllPlaces';

export function PlacesPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [category, setCategory] = useState(params.get('category') ?? 'all');
  const [openOnly, setOpenOnly] = useState(params.get('open') === '1');
  const [lowWalking, setLowWalking] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const { places, isLoadingRuib, ruibError } = useAllPlaces();

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
  }, [category, delivery, lowWalking, openOnly, places, query]);

  const reset = () => {
    setQuery('');
    setCategory('all');
    setOpenOnly(false);
    setLowWalking(false);
    setDelivery(false);
    setParams({});
  };

  const selectedPlace = results.find((place) => place.id === selectedPlaceId) ?? results[0];

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
        <div className="result-summary__actions">
          <div className="view-toggle" aria-label="장소 보기 방식">
            <button
              type="button"
              className={viewMode === 'list' ? 'is-active' : ''}
              onClick={() => setViewMode('list')}
            >
              <List size={15} /> 목록
            </button>
            <button
              type="button"
              className={viewMode === 'map' ? 'is-active' : ''}
              onClick={() => setViewMode('map')}
            >
              <Map size={15} /> 지도
            </button>
          </div>
          {(query || category !== 'all' || openOnly || lowWalking || delivery) ? (
            <button type="button" onClick={reset}><SlidersHorizontal size={16} /> 초기화</button>
          ) : null}
        </div>
      </div>

      {isLoadingRuib ? <p className="data-load-status">루이 지도 장소를 불러오는 중</p> : null}
      {ruibError ? <p className="data-load-status data-load-status--error">{ruibError}</p> : null}

      {results.length ? (
        viewMode === 'map' ? (
          <section className="places-map-view" aria-label="등록 장소 지도 보기">
            <div className="places-map-toolbar">
              <span>등록 장소 {results.length}곳</span>
              <p>고덕지도 POI 검색 결과로 핀을 표시해. 검색 결과가 다른 지점이면 데이터 확인이 필요해.</p>
            </div>
            <AmapPlacesMap
              places={results}
              selectedPlaceId={selectedPlace?.id}
              onSelectPlace={setSelectedPlaceId}
            />

            {selectedPlace ? (
              <article className="places-map-selected">
                <div>
                  <span>{selectedPlace.categoryLabel} · {selectedPlace.district}</span>
                  <h2>{selectedPlace.nameKo}</h2>
                  <p>{selectedPlace.nameZh}{selectedPlace.branch ? ` · ${selectedPlace.branch}` : ''}</p>
                </div>
                <div className="places-map-selected__actions">
                  <Link to={`/places/${selectedPlace.id}`}>상세 보기</Link>
                  <a href={selectedPlace.amapLink ?? createAmapSearchUrl(selectedPlace.amapKeyword)} target="_blank" rel="noreferrer">
                    고덕지도 <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ) : null}
          </section>
        ) : (
          <div className="stack-list">
            {results.map((place) => <PlaceCard key={place.id} place={place} />)}
          </div>
        )
      ) : (
        <EmptyState icon={Search} title="조건에 맞는 장소가 없어" description="영업 중 필터를 끄거나 검색어를 짧게 바꿔봐." />
      )}
    </div>
  );
}
