import { Check, ClipboardCheck, Pill, Plane, Plug, Shirt, ShoppingBag } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { packingCategories, type PackingCategoryId } from '../data/packing';
import { useAppState } from '../hooks/useAppState';

const categoryIcons: Record<PackingCategoryId, typeof Plane> = {
  essential: Plane,
  medicine: Pill,
  electronics: Plug,
  clothes: Shirt,
  return: ShoppingBag,
};

export function PackingPage() {
  const { checkedPackingIds, isPackingChecked, togglePackingItem } = useAppState();
  const totalCount = packingCategories.reduce((sum, category) => sum + category.items.length, 0);
  const checkedCount = packingCategories.reduce(
    (sum, category) => sum + category.items.filter((item) => isPackingChecked(item.id)).length,
    0,
  );
  const progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="page packing-page">
      <PageHeader
        eyebrow="PACKING"
        title="준비물 체크리스트"
        description="출국 전, 공항 가기 전, 귀국 전까지 빠뜨릴 것만 체크해."
        back
      />

      <section className="packing-summary" aria-label="준비물 체크 진행률">
        <ClipboardCheck size={22} strokeWidth={1.8} />
        <div className="packing-summary__copy">
          <strong>{checkedCount} / {totalCount} 완료</strong>
          <p>{checkedPackingIds.length === totalCount ? '이제 공항 가기 전 여권만 한 번 더 봐.' : '체크한 항목은 이 브라우저에 저장돼.'}</p>
          <div className="packing-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <div className="packing-section-list">
        {packingCategories.map((category) => {
          const Icon = categoryIcons[category.id];
          const checkedInCategory = category.items.filter((item) => isPackingChecked(item.id)).length;

          return (
            <section className="packing-section" key={category.id}>
              <div className="packing-section__header">
                <div className="packing-section__title">
                  <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  <div>
                    <h2>{category.title}</h2>
                    <p>{category.hint}</p>
                  </div>
                </div>
                <span>{checkedInCategory}/{category.items.length}</span>
              </div>

              <div className="packing-list">
                {category.items.map((item) => {
                  const checked = isPackingChecked(item.id);

                  return (
                    <button
                      className={`packing-item${checked ? ' is-checked' : ''}`}
                      key={item.id}
                      onClick={() => togglePackingItem(item.id)}
                      aria-pressed={checked}
                    >
                      <span className="packing-item__box">{checked ? <Check size={16} /> : null}</span>
                      <span className="packing-item__label">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
