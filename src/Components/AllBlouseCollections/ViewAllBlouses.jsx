import React, { useContext, useMemo, useState } from 'react';
import './ViewAllBlouses.css';
import ColorFilter from './ColorFilter';
import FilterDropdown from './FilterDropdown';
import { SearchContext } from '../../contexts/SearchContext';
import blouse1 from '../../assets/blouse1.jpg';
import blouse2 from '../../assets/blouse2.jpg';
import blouse3 from '../../assets/blouse3.jpg';

const ALL_BLOUSES = [
	{
		id: 1,
		name: 'Georgette Grace',
		dateAdded: '2025-10-01',
		colors: ['Red', 'Maroon', 'Pink'],
		images: { Red: blouse1, Maroon: blouse2, Pink: blouse3 },
	},
	{
		id: 2,
		name: 'Emerald Elegance',
		dateAdded: '2025-10-05',
		colors: ['Green', 'Olive'],
		images: { Green: blouse2, Olive: blouse1 },
	},
	{
		id: 3,
		name: 'Royal Blue Radiance',
		dateAdded: '2025-09-28',
		colors: ['Blue', 'Navy'],
		images: { Blue: blouse3, Navy: blouse2 },
	},
	{
		id: 4,
		name: 'Classic Charm',
		dateAdded: '2025-10-08',
		colors: ['Black', 'Beige'],
		images: { Black: blouse1, Beige: blouse3 },
	},
	{
		id: 5,
		name: 'Silken Serenity',
		dateAdded: '2025-10-12',
		colors: ['Pink', 'Cream'],
		images: { Pink: blouse3, Cream: blouse2 },
	},
];


const ViewAllBlouses = () => {
	// context
	const { query } = useContext(SearchContext || { query: '' });

	// page state
	const [selectedColors, setSelectedColors] = useState([]); // multi-select filter (array)
	const [selectedColorsPerCard, setSelectedColorsPerCard] = useState({}); // per-card selected color
	const [selectedColorSingle, setSelectedColorSingle] = useState('All'); // for small-screen dropdown
	const [toast, setToast] = useState(''); // toast state
	const [showFilterDrawer, setShowFilterDrawer] = useState(false);

	// color map used for swatches (extend as needed)
	const colorMap = {
		Red: '#e11f6b',
		Maroon: '#800000',
		Pink: '#ffc0cb',
		Green: '#2ecc71',
		Olive: '#808000',
		Blue: '#1e90ff',
		Navy: '#001f3f',
		Black: '#000000',
		Beige: '#f5f5dc',
		Cream: '#fffdd0',
	};

	const colorsList = useMemo(() => {
		const set = new Set();
		ALL_BLOUSES.forEach((b) => b.colors.forEach((c) => set.add(c)));
		return Array.from(set);
	}, []);

	// counts per color (and attach small map for swatch hex)
	const colorCounts = useMemo(() => {
		const counts = {};
		const map = {};
		colorsList.forEach((c) => { counts[c] = 0; map[c] = colorMap[c] || null; });
		ALL_BLOUSES.forEach((b) => {
			b.colors.forEach((c) => { counts[c] = (counts[c] || 0) + 1; });
		});
		counts._map = map; // pass hex map for swatch styling
		return counts;
	}, [colorsList]);

	const filtered = useMemo(() => {
		const q = (query || '').trim().toLowerCase();
		let list = ALL_BLOUSES.filter((b) => b.name.toLowerCase().includes(q));
		if (selectedColors && selectedColors.length > 0) {
			list = list.filter((b) => b.colors.some((c) => selectedColors.includes(c)));
		}
		return list;
	}, [query, selectedColors]);

	const handleColorSelectForCard = (cardId, color) => {
		setSelectedColors((prev) => ({ ...prev, [cardId]: color }));
	};

	return (
		<div className="viewall-layout">
			<aside className="filters">
				<div className="filters-top">
					<div className="filter-dropdown-wrap">
						<FilterDropdown
							label="Color"
							options={['All', ...colorsList]}
							value={selectedColorSingle}
							onChange={(val) => {
								setSelectedColorSingle(val);
								setSelectedColors(val === 'All' ? [] : [val]);
							}}
						/>
					</div>
				</div>

				<div className="filter-block color-filter-block">
          <h4>Filter by Color</h4>
          <ColorFilter
            colors={colorsList}
            counts={colorCounts}
            value={selectedColors}
            onChange={setSelectedColors}
          />
        </div>
				{/* existing filter blocks (if any) follow */}
			</aside>

			<main className="products-area">
				<div className="products-topbar">
					<div className="results-count">{filtered.length} results</div>
				</div>

				<div className="product-grid">
					{filtered.map((b) => {
						const currentColor = selectedColors[b.id] || b.colors[0];
						const imageSrc = b.images[currentColor] || Object.values(b.images)[0];
						return (
							<div className="product-card" key={b.id}>
								<div className="product-image-wrap">
									<img src={imageSrc} alt={`${b.name} - ${currentColor}`} className="product-image" />
								</div>

								<div className="product-name">{b.name}</div>

								<div className="product-meta">
									<div className="color-swatches">
										{b.colors.map((c) => (
											<button
												key={c}
												title={c}
												className={`color-swatch ${selectedColors[b.id] === c ? 'selected' : ''}`}
												onClick={() => handleColorSelectForCard(b.id, c)}
												aria-label={`Select ${c} color`}
											>
												<span className="swatch-dot" aria-hidden style={{ background: '#ccc' }} />
											</button>
										))}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</main>

			{/* Mobile bottom bar (only visible on small screens via CSS) */}
			<div className="mobile-bottom-bar" aria-hidden={false}>

        <button
          type="button"
          className="mobile-filter-button"
          onClick={() => setShowFilterDrawer(true)}
          aria-label="Open filters"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span>Filters</span>
        </button>
      </div>

      {/* Filter drawer (slide up) */}
      {showFilterDrawer && (
        <div className="filter-drawer-overlay" onClick={() => setShowFilterDrawer(false)}>
          <div className="filter-drawer" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <button className="drawer-close" onClick={() => setShowFilterDrawer(false)} aria-label="Close filters">Close</button>
              <h3>Filters</h3>
            </div>

            <div className="drawer-content">
              {/* Keep search and dropdown compact at top of drawer */}
              <div className="drawer-top">
                <div className="filter-search-wrap">
                  <input
                    className="filter-search"
                    placeholder="Search blouses..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="filter-dropdown-wrap drawer-dropdown">
                  <FilterDropdown
                    label="Color"
                    options={['All', ...colorsList]}
                    value={selectedColorSingle}
                    onChange={(val) => {
                      setSelectedColorSingle(val);
                      setSelectedColors(val === 'All' ? [] : [val]);
                    }}
                  />
                </div>
              </div>

              {/* Vertical color filter content (same component used in sidebar) */}
              <div className="drawer-filters">
                <div className="filter-block color-filter-block">
                  <h4>Filter by Color</h4>
                  <ColorFilter
                    colors={colorsList}
                    counts={colorCounts}
                    value={selectedColors}
                    onChange={setSelectedColors}
                  />
                </div>
              </div>

              <div className="drawer-actions">
                <button className="apply-btn" onClick={() => setShowFilterDrawer(false)}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
		</div>
	);
};

export default ViewAllBlouses;