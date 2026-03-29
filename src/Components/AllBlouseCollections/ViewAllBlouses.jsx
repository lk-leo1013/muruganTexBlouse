import { useContext, useMemo, useState, useEffect } from 'react';
import './ViewAllBlouses.css';
import { SearchContext } from '../../contexts/SearchContext';

import blouse1 from '../../assets/blouse1.jpg';
import blouse2 from '../../assets/blouse2.jpg';
import blouse3 from '../../assets/blouse3.jpg';
import georgette from '../../assets/georgette.jpg';
import silk from '../../assets/silk.jpg';
import royal from '../../assets/royal.jpg';
import offwhite from '../../assets/offwhite.jpg';
import yellow from '../../assets/yellow.webp';
import blueImg from '../../assets/blue.jpg';
import blackImg from '../../assets/black.webp';
import silk2 from '../../assets/silk2.jpg';
import embellished from '../../assets/embellished.jpg';
import cotton from '../../assets/cotton.jpg';
import chikankari from '../../assets/chikankari.webp';
import ivory from '../../assets/ivory.webp';
import partywear from '../../assets/partywear.avif';
import mirror from '../../assets/mirror.avif';
import silk1 from '../../assets/silk1.jpg';

const ALL_BLOUSES = [
	{
		id: 1, name: 'Georgette Grace', fabric: 'Georgette',
		description: 'Crafted from premium georgette fabric with delicate embroidery work. This versatile blouse pairs beautifully with silk and chiffon sarees. Features a traditional round neckline with intricate thread work and three-quarter sleeves.',
		rating: 4.5, reviewCount: 128, dateAdded: '2025-10-01',
		colors: ['Red', 'Maroon', 'Pink'],
		images: { Red: blouse1, Maroon: blouse2, Pink: blouse3 },
		sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'NEW', washCare: 'Dry clean only',
	},
	{
		id: 2, name: 'Emerald Elegance', fabric: 'Pure Silk',
		description: 'A luxurious silk blouse in rich green tones. Perfect for weddings and festive occasions. The deep neckline and three-quarter sleeves make it a timeless choice. Delicate zari border adds a regal touch.',
		rating: 4.3, reviewCount: 96, dateAdded: '2025-10-05',
		colors: ['Green', 'Olive'],
		images: { Green: georgette, Olive: silk },
		sizes: ['S', 'M', 'L', 'XL'], badge: 'NEW', washCare: 'Hand wash cold',
	},
	{
		id: 3, name: 'Royal Blue Radiance', fabric: 'Kanjivaram Silk',
		description: 'A statement blouse in royal blue with Kanjivaram-inspired weave. Pairs beautifully with Banarasi and Kanchi sarees. Features gold zari border detailing and a boat neckline.',
		rating: 4.7, reviewCount: 215, dateAdded: '2025-09-28',
		colors: ['Blue', 'Navy'],
		images: { Blue: blueImg, Navy: royal },
		sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: null, washCare: 'Dry clean only',
	},
	{
		id: 4, name: 'Classic Charm', fabric: 'Pure Cotton',
		description: 'Everyday elegance in pure cotton. Breathable, comfortable, and stylish. Features hand-block printing and a classic fit. Ideal for cotton and linen sarees for casual and semi-formal occasions.',
		rating: 4.2, reviewCount: 74, dateAdded: '2025-10-08',
		colors: ['Black', 'Beige', 'Ivory'],
		images: { Black: blackImg, Beige: offwhite, Ivory: ivory },
		sizes: ['S', 'M', 'L', 'XL'], badge: 'NEW', washCare: 'Machine wash gentle',
	},
	{
		id: 5, name: 'Silken Serenity', fabric: 'Satin Silk',
		description: 'A flowing satin silk blouse with a subtle sheen. The bishop sleeves and V-neckline give it a modern twist. Perfect for evening events and receptions.',
		rating: 4.6, reviewCount: 183, dateAdded: '2025-10-12',
		colors: ['Pink', 'Cream', 'Yellow'],
		images: { Pink: partywear, Cream: silk2, Yellow: yellow },
		sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: 'NEW', washCare: 'Dry clean recommended',
	},
	{
		id: 6, name: 'Chikankari Charm', fabric: 'Georgette',
		description: 'Handcrafted Lucknowi chikankari embroidery on fine georgette. Each blouse is a work of art with intricate handwork. Shadow work and mughal motifs define this masterpiece.',
		rating: 4.8, reviewCount: 312, dateAdded: '2025-10-15',
		colors: ['White', 'Peach'],
		images: { White: chikankari, Peach: embellished },
		sizes: ['S', 'M', 'L', 'XL'], badge: 'BESTSELLER', washCare: 'Dry clean only',
	},
	{
		id: 7, name: 'Mirror Work Marvel', fabric: 'Chanderi Silk',
		description: "Rajasthani mirror work blouse on fine Chanderi silk. Hand-stitched mirrors and intricate embroidery make this a true collector's piece.",
		rating: 4.4, reviewCount: 151, dateAdded: '2025-10-18',
		colors: ['Mustard', 'Teal'],
		images: { Mustard: mirror, Teal: cotton },
		sizes: ['S', 'M', 'L', 'XL', 'XXL'], badge: null, washCare: 'Dry clean only',
	},
	{
		id: 8, name: 'Silk Heritage', fabric: 'Banarasi Silk',
		description: 'Rich Banarasi silk blouse with traditional brocade weave. Gold and silver zari threads create stunning floral patterns.',
		rating: 4.9, reviewCount: 427, dateAdded: '2025-10-20',
		colors: ['Wine', 'Gold'],
		images: { Wine: silk1, Gold: georgette },
		sizes: ['S', 'M', 'L', 'XL'], badge: 'BESTSELLER', washCare: 'Dry clean only',
	},
];

const colorMap = {
	Red: '#e11f6b', Maroon: '#800000', Pink: '#ffc0cb', Green: '#2ecc71',
	Olive: '#808000', Blue: '#1e90ff', Navy: '#001f3f', Black: '#111111',
	Beige: '#d4b896', Cream: '#ede0c8', Ivory: '#e8e0d0', Yellow: '#f5c518',
	White: '#e8e8e8', Peach: '#ffb385', Mustard: '#d4930a', Teal: '#008080',
	Wine: '#722f37', Gold: '#c9a84c',
};

const renderStars = (rating) =>
	Array.from({ length: 5 }, (_, i) => (
		<span key={i} className={i < Math.round(rating) ? 'star filled' : 'star empty'}>★</span>
	));

// Chevron icon
const Chevron = ({ open }) => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
		style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
		<polyline points="6 9 12 15 18 9" />
	</svg>
);

const ViewAllBlouses = () => {
	const { query } = useContext(SearchContext || { query: '' });

	const [selectedColors, setSelectedColors] = useState([]);
	const [selectedFabrics, setSelectedFabrics] = useState([]);
	const [openSections, setOpenSections] = useState({ color: true, fabric: true });
	const [showFilterDrawer, setShowFilterDrawer] = useState(false);
	const [modalProduct, setModalProduct] = useState(null);
	const [modalColor, setModalColor] = useState('');
	const [modalSize, setModalSize] = useState('');

	const colorsList = useMemo(() => {
		const set = new Set();
		ALL_BLOUSES.forEach(b => b.colors.forEach(c => set.add(c)));
		return Array.from(set);
	}, []);

	const fabricsList = useMemo(() => {
		const set = new Set();
		ALL_BLOUSES.forEach(b => set.add(b.fabric));
		return Array.from(set);
	}, []);

	const fabricCounts = useMemo(() => {
		const counts = {};
		ALL_BLOUSES.forEach(b => { counts[b.fabric] = (counts[b.fabric] || 0) + 1; });
		return counts;
	}, []);

	const colorCounts = useMemo(() => {
		const counts = {};
		ALL_BLOUSES.forEach(b => b.colors.forEach(c => { counts[c] = (counts[c] || 0) + 1; }));
		return counts;
	}, []);

	const filtered = useMemo(() => {
		const q = (query || '').trim().toLowerCase();
		let list = ALL_BLOUSES.filter(b => b.name.toLowerCase().includes(q));
		if (selectedColors.length > 0)
			list = list.filter(b => b.colors.some(c => selectedColors.includes(c)));
		if (selectedFabrics.length > 0)
			list = list.filter(b => selectedFabrics.includes(b.fabric));
		return list;
	}, [query, selectedColors, selectedFabrics]);

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
		document.body.style.overflow = 'hidden';
	};
	const closeModal = () => { setModalProduct(null); document.body.style.overflow = ''; };

	useEffect(() => {
		const onKey = (e) => e.key === 'Escape' && closeModal();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, []);

	// Shared filter panel content (used in sidebar + drawer)
	const FilterPanel = () => (
		<>
			{/* Active chips */}
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

			{/* COLOR section */}
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

			{/* FABRIC section */}
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

	return (
		<div className="viewall-layout">

			{/* ── Sidebar (desktop + tablet) ── */}
			<aside className="filters">
				<div className="filter-header">
					<span className="filter-title">FILTERS</span>
					{totalActive > 0 && (
						<button className="filter-clear-all" onClick={clearAll}>CLEAR ALL</button>
					)}
				</div>
				<FilterPanel />
			</aside>

			{/* ── Products ── */}
			<main className="products-area">
				<div className="products-topbar">
					<div className="results-count">
						<strong>{filtered.length}</strong> blouses found
					</div>
				</div>

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
			</main>

			{/* ── Mobile filter bar ── */}
			<div className="mobile-bottom-bar">
				<button type="button" className="mobile-filter-button" onClick={() => setShowFilterDrawer(true)}>
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
					</svg>
					Filters {totalActive > 0 && <span className="mobile-filter-badge">{totalActive}</span>}
				</button>
			</div>

			{/* ── Mobile drawer ── */}
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

			{/* ── Product Detail Modal ── */}
			{modalProduct && (
				<div className="pd-overlay" onClick={closeModal} role="dialog" aria-modal="true">
					<div className="pd-modal" onClick={e => e.stopPropagation()}>
						<button className="pd-close" onClick={closeModal} aria-label="Close">✕</button>
						<div className="pd-content">
							<div className="pd-gallery">
								<div className="pd-main-img-wrap">
									<img src={modalProduct.images[modalColor] || Object.values(modalProduct.images)[0]}
										alt={`${modalProduct.name} - ${modalColor}`} className="pd-main-img" />
								</div>
								<div className="pd-thumbnails">
									{modalProduct.colors.map(color => (
										<button key={color} className={`pd-thumb ${modalColor === color ? 'active' : ''}`}
											onClick={() => setModalColor(color)} title={color}>
											<img src={modalProduct.images[color]} alt={color} />
											<span className="pd-thumb-label">{color}</span>
										</button>
									))}
								</div>
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
			)}
		</div>
	);
};

export default ViewAllBlouses;
