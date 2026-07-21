import { CircleCheck, CircleHelp, Clock4 } from 'lucide-react';
import type { VerificationState } from '../types';

const copy = {
  verified: { label: '확인됨', icon: CircleCheck },
  likely: { label: '부분 확인', icon: Clock4 },
  'needs-check': { label: '재확인 필요', icon: CircleHelp },
} as const;

export function VerificationText({ state, date }: { state: VerificationState; date?: string }) {
  const item = copy[state];
  const Icon = item.icon;
  return (
    <span className={`verification verification--${state}`}>
      <Icon size={16} aria-hidden="true" />
      {item.label}{date ? ` · ${date}` : ''}
    </span>
  );
}
