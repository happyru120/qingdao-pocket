import { Bookmark, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { PlaceCard } from '../components/PlaceCard';
import { useAppState } from '../hooks/useAppState';
import { useAllPlaces } from '../hooks/useAllPlaces';
import { shoppingItems } from '../data/shopping';

export function SavedPage() {
  const [tab, setTab] = useState<'places' | 'shopping'>('places');
  const { savedPlaceIds, checkedShoppingIds } = useAppState();
  const { places, isLoadingRuib, ruibError } = useAllPlaces();
  const savedPlaces = places.filter((place) => savedPlaceIds.includes(place.id));
  const checkedItems = shoppingItems.filter((item) => checkedShoppingIds.includes(item.id));

  return (
    <div className="page">
      <PageHeader eyebrow="MY LIST" title="저장" description="현장에서 다시 찾을 후보만 모아 둬." />

      <div className="segmented-control" role="tablist">
        <button role="tab" aria-selected={tab === 'places'} className={tab === 'places' ? 'is-active' : ''} onClick={() => setTab('places')}>
          장소 {savedPlaces.length}
        </button>
        <button role="tab" aria-selected={tab === 'shopping'} className={tab === 'shopping' ? 'is-active' : ''} onClick={() => setTab('shopping')}>
          구매 완료 {checkedItems.length}
        </button>
      </div>

      {tab === 'places' ? (
        savedPlaces.length ? (
          <div className="stack-list">{savedPlaces.map((place) => <PlaceCard key={place.id} place={place} compact />)}</div>
        ) : isLoadingRuib ? (
          <EmptyState icon={Bookmark} title="저장한 장소를 불러오는 중" description="외부에서 가져온 장소 데이터까지 확인하고 있어." />
        ) : ruibError ? (
          <EmptyState icon={Bookmark} title="일부 저장 장소를 불러오지 못했어" description={ruibError} />
        ) : (
          <EmptyState icon={Bookmark} title="저장한 장소가 없어" description="장소 카드의 북마크를 눌러 여행 후보를 모아봐." />
        )
      ) : checkedItems.length ? (
        <div className="checked-shopping-list">
          {checkedItems.map((item) => (
            <article key={item.id}>
              <img src={item.image} alt="" />
              <div><strong>{item.nameKo}</strong><span>{item.nameZh}</span></div>
            </article>
          ))}
          <Link to="/shopping" className="wide-link">전체 쇼핑 목록 보기</Link>
        </div>
      ) : (
        <EmptyState icon={ShoppingBag} title="아직 체크한 상품이 없어" description="마트에서 산 상품을 체크하면 여기에 남아." />
      )}
    </div>
  );
}
