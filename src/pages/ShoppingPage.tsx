import { Check, Copy, ExternalLink, Refrigerator, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAppState } from '../hooks/useAppState';
import { shoppingItems } from '../data/shopping';
import { createAmapSearchUrl } from '../lib/amap';

const bringHomeCopy = {
  good: '한국에 가져오기 편함',
  caution: '보관·반입 조건 확인',
  no: '여행 중 먹기 추천',
} as const;

export function ShoppingPage() {
  const { isShoppingChecked, toggleShoppingItem } = useAppState();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyName = async (id: string, name: string) => {
    await navigator.clipboard.writeText(name);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1400);
  };

  return (
    <div className="page shopping-page">
      <PageHeader
        eyebrow="SHOPPING"
        title="기념품 체크"
        description="상품명을 복사해 직원에게 보여주고, 마트에서는 체크하면서 담아."
        back
      />

      <div className="shopping-summary">
        <ShoppingBag size={21} />
        <div>
          <strong>{shoppingItems.filter((item) => isShoppingChecked(item.id)).length} / {shoppingItems.length} 구매</strong>
          <p>냉장 제품은 일정 마지막에 사는 편이 안전해.</p>
        </div>
      </div>

      <div className="shopping-list">
        {shoppingItems.map((item) => {
          const checked = isShoppingChecked(item.id);
          return (
            <article className={`shopping-card${checked ? ' is-checked' : ''}`} key={item.id}>
              <button className="shopping-card__check" onClick={() => toggleShoppingItem(item.id)} aria-pressed={checked}>
                <span>{checked ? <Check size={18} /> : null}</span>
                {checked ? '구매 완료' : '구매 체크'}
              </button>
              <img src={item.image} alt={`${item.nameKo} 제품 참고`} loading="lazy" />
              <div className="shopping-card__body">
                <h2>{item.nameKo}</h2>
                <div className="shopping-card__zh">
                  <span lang="zh-CN">{item.nameZh}</span>
                  <button onClick={() => copyName(item.id, item.nameZh)} aria-label="중국어 상품명 복사">
                    {copiedId === item.id ? <Check size={17} /> : <Copy size={17} />}
                  </button>
                </div>
                <p>{item.note}</p>
                <dl>
                  <div><dt>보관</dt><dd><Refrigerator size={15} /> {item.storage}</dd></div>
                  <div><dt>구매량</dt><dd>{item.quantityTip}</dd></div>
                  <div><dt>한국 반입</dt><dd>{bringHomeCopy[item.bringHome]}</dd></div>
                </dl>
                <div className="shopping-card__where">
                  <strong>판매 가능성이 높은 곳</strong>
                  <ul>{item.where.map((place) => <li key={place}>{place}</li>)}</ul>
                </div>
                <a href={createAmapSearchUrl('大型超市')} target="_blank" rel="noreferrer">
                  근처 대형마트 찾기 <ExternalLink size={16} />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
