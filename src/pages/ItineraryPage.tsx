import { ArrowRight, Coffee, ExternalLink, Footprints, MapPin, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AmapRouteMap, type RouteWaypoint } from '../components/AmapRouteMap';
import { PageHeader } from '../components/PageHeader';
import { itinerary } from '../data/itinerary';
import { createAmapSearchUrl } from '../lib/amap';
import type { MealRecommendation } from '../types';

const firstDayRoute: RouteWaypoint[] = [
  {
    id: 'hotel',
    order: 1,
    title: '호텔 체크인',
    subtitle: '칭다오 에어포트 푸화 호텔 · 홍콩중로',
    time: '16:30',
    keyword: '青岛机场富华酒店 香港中路',
  },
  {
    id: 'night-city',
    order: 2,
    title: '명월산해간불야성',
    subtitle: '18:00–19:30 구경',
    time: '18:00',
    keyword: '山海间不夜城(入口)',
    coordinates: { lat: 36.249256, lng: 120.195272 },
  },
  {
    id: 'haidilao-mixc',
    order: 3,
    title: '하이디라오 MixC 지점',
    subtitle: '20:00 저녁',
    time: '20:00',
    keyword: '海底捞火锅青岛万象城店',
    coordinates: { lat: 36.067518, lng: 120.377039 },
  },
  {
    id: 'may-fourth-square',
    order: 4,
    title: '오사광장 라이트업',
    subtitle: '21:30 짧게 보기',
    time: '21:30',
    keyword: '五四广场五月的风',
    coordinates: { lat: 36.061427, lng: 120.385265 },
  },
  {
    id: 'olympic-sailing',
    order: 5,
    title: '요트경기장 해안 야경',
    subtitle: '21:50 10–15분 산책',
    time: '21:50',
    keyword: '青岛奥帆海洋文化旅游区',
    coordinates: { lat: 36.060278, lng: 120.3905 },
  },
];

function MealDropdown({ meal }: { meal: MealRecommendation }) {
  const isCafe = meal.kind === 'cafe';
  const Icon = isCafe ? Coffee : Utensils;
  const label = isCafe ? '카페 후보 보기' : '식사 후보 보기';
  const metaLabel = isCafe ? '추천 포인트' : '꼭 먹을 메뉴';

  return (
    <details className="meal-dropdown">
      <summary>
        <span><Icon size={15} /> {label}</span>
        <strong>{meal.area}</strong>
      </summary>
      <div className="meal-block">
        <p className="meal-block__must">{metaLabel}: {meal.mustEat.join(' · ')}</p>
        <div className="meal-options">
          {meal.options.map((option) => {
            const content = (
              <>
                <div>
                  <span>{option.rank}</span>
                  <strong>{option.name}</strong>
                  {option.cnName ? <small>{option.cnName}</small> : null}
                </div>
                {option.placeId ? <ArrowRight size={16} /> : <ExternalLink size={16} />}
              </>
            );
            const href = option.placeId ? `/places/${option.placeId}` : createAmapSearchUrl(option.amapKeyword ?? option.cnName ?? option.name);

            return (
              <article className="meal-option" key={`${meal.slot}-${option.name}`}>
                {option.placeId ? (
                  <Link to={href}>{content}</Link>
                ) : (
                  <a href={href} target="_blank" rel="noreferrer">{content}</a>
                )}
                <p>{option.note}</p>
                <span className="meal-option__menu">{option.menu.join(' · ')}</span>
              </article>
            );
          })}
        </div>
      </div>
    </details>
  );
}

export function ItineraryPage() {
  return (
    <div className="page">
      <PageHeader
        eyebrow="DRAFT ROUTE"
        title="일정 초안"
        description="전부 가는 일정이 아니라, 그날 컨디션에 맞춰 고를 수 있는 뼈대야."
      />

      <div className="itinerary-note">
        <Footprints size={20} />
        <p>종아리와 발목 상태를 고려해 하루에 중심 권역 하나만 잡았어.</p>
      </div>

      <section className="first-day-route">
        <div className="first-day-route__header">
          <span>DAY 1 ROUTE</span>
          <h2>도착일 핵심 동선</h2>
          <p>호텔을 1번으로 두고, 불야성 2번, 하이디라오 MixC 3번, 오사광장 4번, 요트경기장 5번으로 찍었어.</p>
        </div>
        <AmapRouteMap waypoints={firstDayRoute} />
      </section>

      <div className="itinerary-days">
        {itinerary.map((day) => (
          <section className="day-card" key={day.day}>
            <header>
              <div className="day-card__number">DAY {day.day}</div>
              <div>
                <span>{day.date} · {day.pace}</span>
                <h2>{day.title}</h2>
              </div>
            </header>
            <ol className="timeline">
              {day.stops.map((stop, index) => {
                const meal = day.meals?.find((candidate) => candidate.slot === stop.title);

                return (
                  <li key={`${day.day}-${stop.time}-${stop.title}`}>
                    <div className="timeline__marker" aria-hidden="true" />
                    <time>{stop.time}</time>
                    <div className="timeline__content">
                      {stop.placeId || stop.to ? (
                        <Link to={stop.to ?? `/places/${stop.placeId}`}>
                          <strong>{stop.title}</strong><ArrowRight size={16} />
                        </Link>
                      ) : <strong>{stop.title}</strong>}
                      <p>{stop.note}</p>
                      {stop.travel ? <span><MapPin size={14} /> {stop.travel}</span> : null}
                      {meal ? <MealDropdown meal={meal} /> : null}
                    </div>
                    {index < day.stops.length - 1 ? <div className="timeline__line" aria-hidden="true" /> : null}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
