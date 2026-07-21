import { Check, Copy, Maximize2, Search, Volume2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterScroller } from '../components/FilterScroller';
import { PageHeader } from '../components/PageHeader';
import { phraseCategories, phrases } from '../data/phrases';

export function PhrasesPage() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [category, setCategory] = useState(params.get('category') ?? 'all');
  const [essentialOnly, setEssentialOnly] = useState(params.get('essential') === '1');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return phrases.filter((phrase) => {
      const haystack = [phrase.korean, phrase.chinese, phrase.pinyin, ...phrase.aliases]
        .join(' ')
        .toLowerCase();
      return (category === 'all' || phrase.category === category)
        && (!normalized || haystack.includes(normalized))
        && (!essentialOnly || phrase.essential);
    });
  }, [category, essentialOnly, query]);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const copy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1400);
  };

  const focused = phrases.find((phrase) => phrase.id === focusId);

  return (
    <div className="page phrases-page">
      <PageHeader
        eyebrow="CHINESE"
        title="중국어"
        description="한국어로 검색하고, 카드 전체를 눌러 중국어를 바로 들려줘."
      />

      <div className="search-field">
        <Search size={19} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="고수, 양 많아, 기사, 화장실…"
          aria-label="중국어 문장 검색"
        />
        {query ? <button onClick={() => setQuery('')} aria-label="검색어 지우기"><X size={18} /></button> : null}
      </div>

      <FilterScroller items={phraseCategories} value={category} onChange={setCategory} label="회화 카테고리" />

      <div className="phrase-toolbar">
        <button className={essentialOnly ? 'is-active' : ''} onClick={() => setEssentialOnly((value) => !value)}>
          필수 문장만
        </button>
        <span>{results.length}개</span>
      </div>

      <div className="phrase-list">
        {results.map((phrase) => (
          <article className="phrase-card" key={phrase.id}>
            <button className="phrase-card__main" onClick={() => speak(phrase.chinese)}>
              <span className="phrase-card__category">{phrase.categoryLabel}</span>
              <h2>{phrase.korean}</h2>
              <p className="phrase-card__chinese" lang="zh-CN">{phrase.chinese}</p>
              <p className="phrase-card__pinyin">{phrase.pinyin}</p>
              <span className="phrase-card__listen"><Volume2 size={16} /> 눌러서 듣기</span>
            </button>
            <div className="phrase-card__actions">
              <button onClick={() => copy(phrase.id, phrase.chinese)}>
                {copiedId === phrase.id ? <Check size={18} /> : <Copy size={18} />}
                {copiedId === phrase.id ? '복사됨' : '복사'}
              </button>
              <button onClick={() => setFocusId(phrase.id)}><Maximize2 size={18} /> 크게 보기</button>
            </div>
          </article>
        ))}
      </div>

      {focused ? (
        <div className="phrase-focus" role="dialog" aria-modal="true" aria-label="중국어 크게 보기">
          <button className="phrase-focus__close" onClick={() => setFocusId(null)} aria-label="닫기"><X size={24} /></button>
          <div>
            <span>{focused.categoryLabel}</span>
            <p className="phrase-focus__ko">{focused.korean}</p>
            <p className="phrase-focus__zh" lang="zh-CN">{focused.chinese}</p>
            <p className="phrase-focus__pinyin">{focused.pinyin}</p>
          </div>
          <button className="phrase-focus__speak" onClick={() => speak(focused.chinese)}>
            <Volume2 size={24} /> 중국어 재생
          </button>
        </div>
      ) : null}
    </div>
  );
}
