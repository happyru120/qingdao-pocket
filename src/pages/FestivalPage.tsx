import { Beer, CalendarDays, ExternalLink, Info, MapPin, MoonStar, Sparkles, TentTree } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { createAmapSearchUrl } from '../lib/amap';

const tents = [
  { no: 1, ko: '칭시진피 텐트', zh: '青西金啤大篷', note: '서해안 로컬 크래프트 맥주' },
  { no: 2, ko: '진화장 크래프트 텐트', zh: '金花奖精酿大篷', note: '수상작과 대회 중심 크래프트 공간' },
  { no: 3, ko: '칭다오 1903 텐트', zh: '青岛啤酒1903大篷', note: '첫 방문에 가장 먼저 보기 좋은 대표 텐트' },
  { no: 4, ko: 'Warsteiner 텐트', zh: '德国沃斯坦啤酒大篷', note: '독일 수입 맥주와 비어가든' },
  { no: 5, ko: 'Heineken 텐트', zh: '荷兰喜力啤酒大篷', note: '현장 생맥과 글로벌 라거' },
  { no: 6, ko: '칭다오 다파이당 텐트', zh: '青岛啤酒啤酒大排档大篷', note: '칭다오식 야장 분위기와 안주' },
  { no: 7, ko: 'Carlsberg 텐트', zh: '丹麦嘉士伯啤酒大篷', note: '맥주와 음악 공연 중심' },
  { no: 8, ko: '미래 맥주공장 텐트', zh: '未来啤酒工厂大篷', note: '로봇·MR 체험형 공간' },
  { no: 9, ko: '카이정주창 텐트', zh: '开整酒仓大篷', note: '공연과 파티 분위기 중심' },
];

export function FestivalPage() {
  return (
    <div className="page festival-page">
      <PageHeader
        eyebrow="SPECIAL GUIDE"
        title="2026 맥주축제"
        description="공식 발표 내용과 현장 추천을 분리해서 보여줘."
        back
      />

      <section className="festival-hero-card">
        <div>
          <span>제36회</span>
          <h2>칭다오 국제맥주축제</h2>
          <p>金沙滩啤酒城 · 서해안 주 행사장</p>
        </div>
        <Beer size={48} strokeWidth={1.25} />
      </section>

      <section className="festival-facts">
        <div><CalendarDays size={19} /><span>기간</span><strong>2026. 7.17–8.15</strong></div>
        <div><MapPin size={19} /><span>장소</span><strong>진사탄 맥주성</strong></div>
        <div><TentTree size={19} /><span>규모</span><strong>대형 텐트 9개 · 맥주 2,300여 종</strong></div>
      </section>

      <a className="primary-action festival-map-action" href={createAmapSearchUrl('金沙滩啤酒城')} target="_blank" rel="noreferrer">
        <MapPin size={19} /> 고덕지도에서 행사장 열기
      </a>

      <section className="detail-section">
        <h2>9개 대형 텐트</h2>
        <p className="section-intro">번호는 2026년 공개 목록 기준. 실제 위치는 현장 안내도를 우선해.</p>
        <div className="tent-list">
          {tents.map((tent) => (
            <article key={tent.no}>
              <span className="tent-list__number">{tent.no}</span>
              <div>
                <h3>{tent.ko}</h3>
                <p lang="zh-CN">{tent.zh}</p>
                <span>{tent.note}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="festival-route">
        <div className="festival-route__header"><Sparkles size={21} /><h2>첫 방문 추천 순서</h2></div>
        <ol>
          <li><span>18:30</span><strong>입장 후 현장 지도 확인</strong><p>가짜 배치도 대신 공식 안내판 사진부터 저장.</p></li>
          <li><span>19:00</span><strong>3번 칭다오 1903</strong><p>대표 라거와 축제 분위기를 먼저 경험.</p></li>
          <li><span>19:45</span><strong>2번 진화장 크래프트</strong><p>한 잔을 크게 사기보다 소량으로 비교.</p></li>
          <li><span>20:30 이후</span><strong>야간 프로그램</strong><p>당일 공식 공지와 날씨를 다시 확인.</p></li>
        </ol>
      </section>

      <section className="festival-night">
        <MoonStar size={22} />
        <div>
          <h2>야간 프로그램</h2>
          <p>공식 발표상 드론 편대 공연과 해상 불꽃쇼가 예정되어 있으나, 정확한 회차·시간은 날씨와 현장 운영에 따라 달라질 수 있어.</p>
        </div>
      </section>

      <section className="festival-image-note">
        <button type="button" onClick={() => window.open('images/festival-guide.webp', '_blank')}>요약 이미지 크게 보기</button>
        <p><Info size={15} /> 이 이미지는 공식 배치도가 아닌 모바일 요약 시안이야. 위치 확인용으로 사용하지 않아.</p>
      </section>

      <section className="source-note source-note--festival">
        <h2>확인 출처</h2>
        <a href="https://sd.chinadaily.com.cn/a/202607/01/WS6a44f267a310d709c2fbb63e.html" target="_blank" rel="noreferrer">
          행사 기간·규모·야간 프로그램 발표 <ExternalLink size={15} />
        </a>
        <a href="https://qd.bendibao.com/xiuxian/2026716/102123.shtm" target="_blank" rel="noreferrer">
          2026년 9개 텐트 목록 <ExternalLink size={15} />
        </a>
        <p>마지막 확인: 2026-07-20</p>
      </section>
    </div>
  );
}
