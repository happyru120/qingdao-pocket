import { Bookmark, CalendarDays, Home, Languages, MapPinned } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: '홈', icon: Home, end: true },
  { to: '/places', label: '장소', icon: MapPinned, end: false },
  { to: '/itinerary', label: '일정', icon: CalendarDays, end: false },
  { to: '/phrases', label: '중국어', icon: Languages, end: false },
  { to: '/saved', label: '저장', icon: Bookmark, end: false },
] as const;

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="주요 메뉴">
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => `bottom-nav__item${isActive ? ' is-active' : ''}`}
        >
          <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
