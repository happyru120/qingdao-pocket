type Item = { id: string; label: string };

type Props = {
  items: readonly Item[];
  value: string;
  onChange: (value: string) => void;
  label: string;
};

export function FilterScroller({ items, value, onChange, label }: Props) {
  return (
    <div className="filter-scroller" role="group" aria-label={label}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`filter-chip${value === item.id ? ' is-active' : ''}`}
          onClick={() => onChange(item.id)}
          aria-pressed={value === item.id}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
