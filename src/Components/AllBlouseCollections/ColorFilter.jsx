import React, { useMemo, useState } from 'react';

const ColorFilter = ({ colors = [], counts = {}, value = [], onChange }) => {
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState(false);
  const visibleLimit = 7;

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return colors.filter((c) => (!qq || c.toLowerCase().includes(qq)));
  }, [colors, q]);

  const visible = expanded ? filtered : filtered.slice(0, visibleLimit);
  const hiddenCount = Math.max(0, filtered.length - visibleLimit);

  const toggle = (color) => {
    if (value.includes(color)) onChange(value.filter((c) => c !== color));
    else onChange([...value, color]);
  };

  return (
    <div className="color-filter-widget">
      <input
        className="color-filter-search"
        placeholder="Search for Color"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search colors"
      />

      <ul className="color-filter-list" role="list">
        {visible.map((c) => (
          <li key={c} className="color-item">
            <label className="color-item-label">
              <input
                type="checkbox"
                checked={value.includes(c)}
                onChange={() => toggle(c)}
                className="color-item-checkbox"
                aria-checked={value.includes(c)}
              />
              <span className="color-item-swatch" style={{ background: (counts._map && counts._map[c])?.hex || counts._map?.[c] || getColorFallback(c) }} aria-hidden />
              <span className="color-item-name">{c}</span>
              <span className="color-item-count">({counts[c] ?? 0})</span>
            </label>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          className="color-show-more"
          onClick={() => setExpanded((s) => !s)}
        >
          {expanded ? 'Show less' : `+ ${hiddenCount} more`}
        </button>
      )}
    </div>
  );
};

// tiny fallback color map for common names, extend if needed
function getColorFallback(name) {
  const map = {
    Blue: '#1e90ff',
    White: '#fff',
    Pink: '#ffc0cb',
    Black: '#000',
    Green: '#2ecc71',
    Yellow: '#ffde59',
    Red: '#e11f6b',
    Beige: '#f5f5dc',
    Maroon: '#800000',
    Olive: '#808000',
  };
  return map[name] || '#ccc';
}

export default ColorFilter;