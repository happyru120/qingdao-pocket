import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeading({ title, description, action }: Props) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
