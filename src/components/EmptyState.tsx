import type { LucideIcon } from 'lucide-react';

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function EmptyState({ icon: Icon, title, description }: Props) {
  return (
    <div className="empty-state">
      <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
