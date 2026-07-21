import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  back?: boolean;
  action?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, back = false, action }: Props) {
  const navigate = useNavigate();

  return (
    <header className="page-header">
      <div className="page-header__row">
        {back ? (
          <button className="icon-button icon-button--plain" onClick={() => navigate(-1)} aria-label="뒤로 가기">
            <ArrowLeft size={22} />
          </button>
        ) : null}
        <div className="page-header__copy">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1>{title}</h1>
        </div>
        {action ? <div className="page-header__action">{action}</div> : null}
      </div>
      {description ? <p className="page-header__description">{description}</p> : null}
    </header>
  );
}
