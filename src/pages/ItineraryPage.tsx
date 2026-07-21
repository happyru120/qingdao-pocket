import { ArrowRight, Footprints, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { itinerary } from '../data/itinerary';

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
              {day.stops.map((stop, index) => (
                <li key={`${day.day}-${stop.time}-${stop.title}`}>
                  <div className="timeline__marker" aria-hidden="true" />
                  <time>{stop.time}</time>
                  <div className="timeline__content">
                    {stop.placeId ? (
                      <Link to={`/places/${stop.placeId}`}>
                        <strong>{stop.title}</strong><ArrowRight size={16} />
                      </Link>
                    ) : <strong>{stop.title}</strong>}
                    <p>{stop.note}</p>
                    {stop.travel ? <span><MapPin size={14} /> {stop.travel}</span> : null}
                  </div>
                  {index < day.stops.length - 1 ? <div className="timeline__line" aria-hidden="true" /> : null}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
