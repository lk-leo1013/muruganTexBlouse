import { useContext, useMemo, useState, useEffect } from 'react';
import './ViewAllBlouses.css';
import { SearchContext } from '../../contexts/SearchContext';
import { supabase } from '../../lib/supabase';

// Transform a raw Supabase row into the shape the UI expects
function transformBlouse(row) {
  const colorNames = (row.colors || []).map(c => c.name);
  const images = {};
  const colorHexes = {};
  (row.colors || []).forEach(c => {
    images[c.name] = c.images?.[0] || '';
    colorHexes[c.name] = c.hex || '#ccc';
  });
  return {
    id: row.id,
    name: row.name,
    fabric: row.fabric,
    description: row.description || '',
    badge: row.badge || null,
    rating: parseFloat(row.rating) || 4.5,
    reviewCount: row.reviews || 0,
    dateAdded: row.created_at?.split('T')[0] || '',
    colors: colorNames,
    images,
    colorHexes,
    // All images per color for gallery
    allImages: Object.fromEntries(
      (row.colors || []).map(c => [c.name, c.images || []])
    ),
    sizes: row.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
    washCare: row.wash_care || '',
  };
}

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.round(rating) ? 'star filled' : 'star empty'}>★</span>
  ));

const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ViewAllBlouses = () => {
  const { query } = useContext(SearchContext || { query: '' });

  const [blouses, setBlouses] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [dbError, setDbError] = useState('');

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [openSections, setOpenSections] = useState({ color: true, fabric: true });
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalColor, setModalColor] = useState('');
  const [modalSize, setModalSize] = useState('');
  const [modalImgIdx, setModalImgIdx] = useState(0);

  useEffect(() => {
    const fetchBlouses = async () => {
      setDbLoading(true);
      const { data, error } = await supabase
        .from('blouses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setDbError('Failed to load blouses. Please try again.');
      } else {
        setBlouses((data || []).map(transformBlouse));
      }
      setDbLoading(false);
    };
    fetchBlouses();
  }, []);

  // Build colorMap dynamically from fetched blouses
  const colorMap = useMemo(() => {
    const map = {};
    blouses.forEach(b => {
      b.colors.forEach(name => {
        if (b.colorHexes[name] && !map[name]) map[name] = b.colorHexes[name];
      });
    });
    return map;
  }, [blouses]);

  const colorsList = useMemo(() => {
    const set = new Set();
    blouses.forEach(b => b.colors.forEach(c => set.add(c)));
    return Array.from(set);
  }, [blouses]);

  const fabricsList = useMemo(() => {
    const set = new Set();
    blouses.forEach(b => set.add(b.fabric));
    return Array.from(set);
  }, [blouses]);

  const fabricCounts = useMemo(() => {
    const counts = {};
    blouses.forEach(b => { counts[b.fabric] = (counts[b.fabric] || 0) + 1; });
    return counts;
  }, [blouses]);

  const colorCounts = useMemo(() => {
    const counts = {};
    blouses.forEach(b => b.colors.forEach(c => { counts[c] = (counts[c] || 0) + 1; }));
    return counts;
  }, [blouses]);

  const filtered = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    let list = blouses.filter(b => b.name.toLowerCase().includes(q));
    if (selectedColors.length > 0)
      list = list.filter(b => b.colors.some(c => selectedColors.includes(c)));
    if (selectedFabrics.length > 0)
      list = list.filter(b => selectedFabrics.includes(b.fabric));
    return list;
  }, [blouses, query, selectedColors, selectedFabrics]);

  const totalActive = selectedColors.length + selectedFabrics.length;

  const toggleColor = (color) =>
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);

  const toggleFabric = (fabric) =>
    setSelectedFabrics(prev => prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]);

  const toggleSection = (key) =>
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));

  const clearAll = () => { setSelectedColors([]); setSelectedFabrics([]); };

  const openModal = (product) => {
    setModalProduct(product);
    setModalColor(product.colors[0]);
    setModalSize('');
    setModalImgIdx(0);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => { setModalProduct(null); document.body.style.overflow = ''; };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Reset image index when color changes in modal
  useEffect(() => { setModalImgIdx(0); }, [modalColor]);

  const FilterPanel = () => (
    <>
      {totalActive > 0 && (
        <div className="filter-chips">
          {selectedColors.map(c => (
            <span key={c} className="filter-chip">
              <span className="chip-swatch" style={{ background: colorMap[c] || '#ccc' }} />
              {c}
              <button className="chip-remove" onClick={() => toggleColor(c)} aria-label={`Remove ${c}`}>×</button>
            </span>
          ))}
          {selectedFabrics.map(f => (
            <span key={f} className="filter-chip">
              {f}
              <button className="chip-remove" onClick={() => toggleFabric(f)} aria-label={`Remove ${f}`}>×</button>
            </span>
          ))}
        </div>
      )}

      <div className="filter-section">
        <button className="filter-section-hdr" onClick={() => toggleSection('color')}>
          <span>COLOR</span>
          <Chevron open={openSections.color} />
        </button>
        {openSections.color && (
          <div className="filter-section-body">
            <div className="color-swatch-grid">
              {colorsList.map(color => {
                const active = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    className={`fswatch-btn ${active ? 'active' : ''}`}
                    onClick={() => toggleColor(color)}
                    title={color}
                  >
                    <span className="fswatch-circle" style={{ background: colorMap[color] || '#ccc' }}>
                      {active && <span className="fswatch-tick">✓</span>}
                    </span>
                    <span className="fswatch-name">{color}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button className="filter-section-hdr" onClick={() => toggleSection('fabric')}>
          <span>FABRIC</span>
          <Chevron open={openSections.fabric} />
        </button>
        {openSections.fabric && (
          <div className="filter-section-body">
            {fabricsList.map(fabric => (
              <label key={fabric} className="filter-cb-row">
                <input
                  type="checkbox"
                  className="filter-cb"
                  checked={selectedFabrics.includes(fabric)}
                  onChange={() => toggleFabric(fabric)}
                />
                <span className="filter-cb-label">{fabric}</span>
                <span className="filter-cb-count">({fabricCounts[fabric]})</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (dbLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#888', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #e8e8e8', borderTopColor: '#8b1a1a', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      Loading blouses…
    </div>
  );

  if (dbError) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#c0392b' }}>
      {dbError}
    </div>
  );

  return (
    <div className="viewall-layout">

      {/* Sidebar */}
      <aside className="filters">
        <div className="filter-header">
          <span className="filter-title">FILTERS</span>
          {totalActive > 0 && (
            <button className="filter-clear-all" onClick={clearAll}>CLEAR ALL</button>
          )}
        </div>
        <FilterPanel />
      </aside>

      {/* Products */}
      <main className="products-area">
        <div className="products-topbar">
          <div className="results-count">
            <strong>{filtered.length}</strong> blouses found
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#aaa' }}>
            No blouses match your filters.
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map(b => {
              const cardImg = b.images[b.colors[0]] || Object.values(b.images)[0];
              return (
                <div className="product-card" key={b.id}
                  onClick={() => openModal(b)}
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openModal(b)}
                  aria-label={`View details for ${b.name}`}
                >
                  <div className="product-image-wrap">
                    <img src={cardImg} alt={b.name} className="product-image" />
                    {b.badge && (
                      <span className={`product-badge ${b.badge === 'BESTSELLER' ? 'badge-bestseller' : 'badge-new'}`}>
                        {b.badge}
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <div className="product-name">{b.name}</div>
                    <div className="product-fabric">{b.fabric}</div>
                    <div className="product-rating">
                      <span className="stars-wrap">{renderStars(b.rating)}</span>
                      <span className="rating-text">{b.rating} ({b.reviewCount})</span>
                    </div>
                    <div className="color-swatches">
                      {b.colors.map(c => (
                        <span key={c} className="swatch-dot" title={c} style={{ background: colorMap[c] || '#ccc' }} />
                      ))}
                      <span className="swatch-count">{b.colors.length} colours</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Mobile filter bar */}
      <div className="mobile-bottom-bar">
        <button type="button" className="mobile-filter-button" onClick={() => setShowFilterDrawer(true)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          Filters {totalActive > 0 && <span className="mobile-filter-badge">{totalActive}</span>}
        </button>
      </div>

      {/* Mobile drawer */}
      {showFilterDrawer && (
        <div className="filter-drawer-overlay" onClick={() => setShowFilterDrawer(false)}>
          <div className="filter-drawer" role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="filter-title">FILTERS</span>
              <button className="drawer-close" onClick={() => setShowFilterDrawer(false)} aria-label="Close">✕</button>
            </div>
            <div className="drawer-body">
              <FilterPanel />
            </div>
            <div className="drawer-footer">
              <button className="drawer-clear-btn" onClick={() => { clearAll(); setShowFilterDrawer(false); }}>CLEAR ALL</button>
              <button className="drawer-apply-btn" onClick={() => setShowFilterDrawer(false)}>
                APPLY {totalActive > 0 && `(${totalActive})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {modalProduct && (() => {
        const galleryImgs = modalProduct.allImages?.[modalColor] || [modalProduct.images[modalColor]].filter(Boolean);
        const mainImg = galleryImgs[modalImgIdx] || galleryImgs[0] || modalProduct.images[modalColor];
        return (
          <div className="pd-overlay" onClick={closeModal} role="dialog" aria-modal="true">
            <div className="pd-modal" onClick={e => e.stopPropagation()}>
              <button className="pd-close" onClick={closeModal} aria-label="Close">✕</button>
              <div className="pd-content">
                <div className="pd-gallery">
                  <div className="pd-main-img-wrap">
                    <img src={mainImg} alt={`${modalProduct.name} - ${modalColor}`} className="pd-main-img" />
                  </div>
                  <div className="pd-thumbnails">
                    {/* Color thumbnails */}
                    {modalProduct.colors.map(color => (
                      <button key={color} className={`pd-thumb ${modalColor === color ? 'active' : ''}`}
                        onClick={() => setModalColor(color)} title={color}>
                        <img src={modalProduct.images[color]} alt={color} />
                        <span className="pd-thumb-label">{color}</span>
                      </button>
                    ))}
                  </div>
                  {/* Multi-image gallery for selected color */}
                  {galleryImgs.length > 1 && (
                    <div className="pd-gallery-strip">
                      {galleryImgs.map((url, i) => (
                        <button
                          key={i}
                          className={`pd-gallery-dot ${modalImgIdx === i ? 'active' : ''}`}
                          onClick={() => setModalImgIdx(i)}
                        >
                          <img src={url} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="pd-details">
                  {modalProduct.badge && (
                    <span className={`pd-badge ${modalProduct.badge === 'BESTSELLER' ? 'badge-bestseller' : 'badge-new'}`}>
                      {modalProduct.badge}
                    </span>
                  )}
                  <h2 className="pd-name">{modalProduct.name}</h2>
                  <div className="pd-fabric-tag">{modalProduct.fabric}</div>
                  <div className="pd-rating-row">
                    <span className="stars-wrap">{renderStars(modalProduct.rating)}</span>
                    <span className="pd-rating-num">{modalProduct.rating}</span>
                    <span className="pd-review-count">{modalProduct.reviewCount} ratings</span>
                  </div>
                  <hr className="pd-divider" />
                  <div className="pd-section">
                    <div className="pd-section-label">Color: <strong>{modalColor}</strong></div>
                    <div className="pd-color-row">
                      {modalProduct.colors.map(color => (
                        <button key={color}
                          className={`pd-color-swatch ${modalColor === color ? 'active' : ''}`}
                          onClick={() => setModalColor(color)} title={color}
                          style={{ background: colorMap[color] || '#ccc' }} />
                      ))}
                    </div>
                  </div>
                  <div className="pd-section">
                    <div className="pd-section-label">
                      Size{modalSize && <span className="pd-selected-size">: {modalSize}</span>}
                    </div>
                    <div className="pd-sizes">
                      {modalProduct.sizes.map(sz => (
                        <button key={sz} className={`pd-size-btn ${modalSize === sz ? 'active' : ''}`}
                          onClick={() => setModalSize(sz === modalSize ? '' : sz)}>{sz}</button>
                      ))}
                    </div>
                    <p className="pd-size-note">Size guide available on request</p>
                  </div>
                  <hr className="pd-divider" />
                  <div className="pd-section">
                    <div className="pd-section-label">Product Description</div>
                    <p className="pd-description">{modalProduct.description}</p>
                  </div>
                  <div className="pd-details-grid">
                    <div className="pd-detail-row"><span className="pd-detail-label">Fabric</span><span className="pd-detail-value">{modalProduct.fabric}</span></div>
                    <div className="pd-detail-row"><span className="pd-detail-label">Wash Care</span><span className="pd-detail-value">{modalProduct.washCare}</span></div>
                    <div className="pd-detail-row"><span className="pd-detail-label">Available Sizes</span><span className="pd-detail-value">{modalProduct.sizes.join(', ')}</span></div>
                  </div>
                  <div className="pd-cta-row">
                    <a
                      href={`https://wa.me/919360997797?text=${encodeURIComponent(
                        `Hi, I'm interested in *${modalProduct.name}* (${modalProduct.fabric})` +
                        `\nColour: ${modalColor}` +
                        (modalSize ? `\nSize: ${modalSize}` : '') +
                        `\nProduct link: ${window.location.href}`
                      )}`}
                      target="_blank" rel="noopener noreferrer" className="pd-cta-btn"
                      onClick={e => e.stopPropagation()}>
                      Contact to Order
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default ViewAllBlouses;
