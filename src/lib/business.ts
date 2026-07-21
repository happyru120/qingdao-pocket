import type { Place } from '../types';

export type BusinessState = {
  tone: 'open' | 'closing' | 'closed' | 'unknown';
  label: string;
};

const MINUTE = 60_000;

function getShanghaiParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

function toMinutes(value: string) {
  const [hour, minute] = value.split(':').map(Number);
  return hour * 60 + minute;
}

export function getBusinessState(place: Place, now = new Date()): BusinessState {
  if (!place.hours || place.verification === 'needs-check') {
    return { tone: 'unknown', label: place.openLabel };
  }

  const { hour, minute } = getShanghaiParts(now);
  const current = hour * 60 + minute;
  const open = toMinutes(place.hours.open);
  let close = toMinutes(place.hours.close);

  if (place.hours.overnight && close < open) {
    close += 24 * 60;
  }

  const normalizedCurrent = place.hours.overnight && current < open ? current + 24 * 60 : current;
  const isOpen = normalizedCurrent >= open && normalizedCurrent < close;

  if (!isOpen) {
    return { tone: 'closed', label: `오늘 ${place.hours.open} 오픈` };
  }

  const remaining = close - normalizedCurrent;
  if (remaining <= 60) {
    return { tone: 'closing', label: `${remaining}분 뒤 마감` };
  }

  return { tone: 'open', label: `${place.hours.close}까지 영업` };
}

export function getTripCountdown(startDate: string, now = new Date()) {
  const start = new Date(`${startDate}T00:00:00+09:00`).getTime();
  const diff = Math.ceil((start - now.getTime()) / (24 * 60 * MINUTE));
  if (diff > 0) return `D-${diff}`;
  if (diff === 0) return '출발일';
  return '여행 중';
}
