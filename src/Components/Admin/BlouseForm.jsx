import { useState } from 'react';
import { insertBlouse, updateBlouse } from '../../lib/db';
import './BlouseForm.css';

const FABRIC_OPTIONS = [
  'Georgette', 'Pure Silk', 'Kanjivaram Silk', 'Pure Cotton',
  'Satin Silk', 'Chanderi Silk', 'Banarasi Silk', 'Net',
  'Chiffon', 'Linen', 'Other',
];

const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', 'XXL'];

const defaultColor = () => ({ name: '', hex: '#8b1a1a', images: [], urlInput: '' });

const defaultForm = {
  name: '',
  fabric: '',
  description: '',
  badge: '',
  rating: 4.5,
  reviews: 0,
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  wash_care: 'Dry clean only',
  colors: [defaultColor()],
};

const BlouseForm = ({ blouse, onClose }) => {
  const isEdit = !!blouse;

  const [form, setForm] = useState(() => {
    if (!isEdit) return defaultForm;
    return {
      name: blouse.name,
      fabric: blouse.fabric,
      description: blouse.description || '',
      badge: blouse.badge || '',
      rating: blouse.rating,
      reviews: blouse.reviews,
      sizes: blouse.sizes || ['S', 'M', 'L', 'XL', 'XXL'],
      wash_care: blouse.wash_care || 'Dry clean only',
      colors: (blouse.colors || []).map(c => ({
        name: c.name,
        hex: c.hex,
        images: c.images || [],
        urlInput: '',
      })),
    };
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleSize = (sz) =>
    setForm(f => ({
      ...f,
      sizes: f.sizes.includes(sz) ? f.sizes.filter(s => s !== sz) : [...f.sizes, sz],
    }));

  const addColor = () =>
    setForm(f => ({ ...f, colors: [...f.colors, defaultColor()] }));

  const removeColor = (idx) =>
    setForm(f => ({ ...f, colors: f.colors.filter((_, i) => i !== idx) }));

  const setColorField = (idx, key, val) =>
    setForm(f => ({
      ...f,
      colors: f.colors.map((c, i) => i === idx ? { ...c, [key]: val } : c),
    }));

  const addImageUrl = (idx) => {
    const url = form.colors[idx].urlInput.trim();
    if (!url) return;
    setForm(f => ({
      ...f,
      colors: f.colors.map((c, i) =>
        i === idx ? { ...c, images: [...c.images, url], urlInput: '' } : c
      ),
    }));
  };

  const removeImage = (colorIdx, imgIdx) =>
    setForm(f => ({
      ...f,
      colors: f.colors.map((c, i) =>
        i === colorIdx ? { ...c, images: c.images.filter((_, j) => j !== imgIdx) } : c
      ),
    }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.fabric.trim()) {
      setError('Name and fabric are required.');
      return;
    }
    if (form.colors.length === 0) {
      setError('Add at least one colour.');
      return;
    }
    if (form.colors.some(c => !c.name.trim())) {
      setError('All colours must have a name.');
      return;
    }

    setSaving(true);
    setError('');

    const payload = {
      name: form.name.trim(),
      fabric: form.fabric.trim(),
      description: form.description.trim(),
      badge: form.badge || null,
      rating: parseFloat(form.rating),
      reviews: parseInt(form.reviews, 10),
      sizes: form.sizes,
      wash_care: form.wash_care.trim(),
      colors: form.colors.map(c => ({
        name: c.name.trim(),
        hex: c.hex,
        images: c.images,
      })),
    };

    const { error: saveErr } = isEdit
      ? await updateBlouse(blouse.id, payload)
      : await insertBlouse(payload);

    setSaving(false);
    if (saveErr) { setError(saveErr); return; }
    onClose();
  };

  return (
    <div className="bf-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bf-modal" role="dialog" aria-modal="true">
        <div className="bf-modal-header">
          <h2 className="bf-modal-title">
            {isEdit ? `Edit: ${blouse.name}` : 'Add New Blouse'}
          </h2>
          <button className="bf-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="bf-body" onSubmit={handleSave}>
          <div className="bf-row two">
            <div className="bf-group">
              <label className="bf-label">Blouse Name *</label>
              <input className="bf-input" value={form.name}
                onChange={e => setField('name', e.target.value)}
                placeholder="e.g. Georgette Grace" required />
            </div>
            <div className="bf-group">
              <label className="bf-label">Fabric *</label>
              <select className="bf-input" value={form.fabric}
                onChange={e => setField('fabric', e.target.value)} required>
                <option value="">Select fabric…</option>
                {FABRIC_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          </div>

          <div className="bf-group">
            <label className="bf-label">Description</label>
            <textarea className="bf-input bf-textarea" value={form.description}
              onChange={e => setField('description', e.target.value)}
              rows={3} placeholder="Describe the blouse…" />
          </div>

          <div className="bf-row three">
            <div className="bf-group">
              <label className="bf-label">Badge</label>
              <select className="bf-input" value={form.badge} onChange={e => setField('badge', e.target.value)}>
                <option value="">None</option>
                <option value="NEW">NEW</option>
                <option value="BESTSELLER">BESTSELLER</option>
              </select>
            </div>
            <div className="bf-group">
              <label className="bf-label">Rating (0–5)</label>
              <input className="bf-input" type="number" min="0" max="5" step="0.1"
                value={form.rating} onChange={e => setField('rating', e.target.value)} />
            </div>
            <div className="bf-group">
              <label className="bf-label">Review Count</label>
              <input className="bf-input" type="number" min="0"
                value={form.reviews} onChange={e => setField('reviews', e.target.value)} />
            </div>
          </div>

          <div className="bf-row two">
            <div className="bf-group">
              <label className="bf-label">Available Sizes</label>
              <div className="bf-sizes">
                {SIZE_OPTIONS.map(sz => (
                  <label key={sz} className={`bf-size-pill ${form.sizes.includes(sz) ? 'active' : ''}`}>
                    <input type="checkbox" checked={form.sizes.includes(sz)}
                      onChange={() => toggleSize(sz)} hidden />
                    {sz}
                  </label>
                ))}
              </div>
            </div>
            <div className="bf-group">
              <label className="bf-label">Wash Care</label>
              <input className="bf-input" value={form.wash_care}
                onChange={e => setField('wash_care', e.target.value)}
                placeholder="e.g. Dry clean only" />
            </div>
          </div>

          {/* Colours */}
          <div className="bf-colors-section">
            <div className="bf-colors-hdr">
              <span className="bf-label">Colours &amp; Images</span>
              <button type="button" className="bf-add-color-btn" onClick={addColor}>
                + Add Colour
              </button>
            </div>

            {form.colors.map((color, idx) => (
              <div className="bf-color-block" key={idx}>
                <div className="bf-color-block-hdr">
                  <span className="bf-color-num">
                    <span className="bf-color-preview" style={{ background: color.hex }} />
                    Colour {idx + 1}{color.name && <strong> — {color.name}</strong>}
                  </span>
                  {form.colors.length > 1 && (
                    <button type="button" className="bf-remove-color" onClick={() => removeColor(idx)}>
                      Remove
                    </button>
                  )}
                </div>

                <div className="bf-row two">
                  <div className="bf-group">
                    <label className="bf-label">Colour Name</label>
                    <input className="bf-input" value={color.name}
                      onChange={e => setColorField(idx, 'name', e.target.value)}
                      placeholder="e.g. Red, Navy, Ivory" />
                  </div>
                  <div className="bf-group">
                    <label className="bf-label">Colour Hex</label>
                    <div className="bf-hex-row">
                      <input type="color" value={color.hex}
                        onChange={e => setColorField(idx, 'hex', e.target.value)}
                        className="bf-color-picker" />
                      <input className="bf-input bf-hex-text" value={color.hex}
                        onChange={e => setColorField(idx, 'hex', e.target.value)}
                        placeholder="#000000" />
                    </div>
                  </div>
                </div>

                <div className="bf-group">
                  <label className="bf-label">
                    Image URLs
                    <span className="bf-label-hint"> (paste a URL and click Add)</span>
                  </label>

                  {/* Existing images */}
                  {color.images.length > 0 && (
                    <div className="bf-images-row">
                      {color.images.map((url, imgIdx) => (
                        <div key={imgIdx} className="bf-img-thumb">
                          <img src={url} alt="" onError={e => { e.target.style.display = 'none'; }} />
                          <button type="button" className="bf-img-remove"
                            onClick={() => removeImage(idx, imgIdx)} aria-label="Remove">✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* URL input */}
                  <div className="bf-url-row">
                    <input
                      className="bf-input"
                      value={color.urlInput}
                      onChange={e => setColorField(idx, 'urlInput', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImageUrl(idx))}
                    />
                    <button type="button" className="bf-url-add-btn" onClick={() => addImageUrl(idx)}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {error && <p className="bf-error">{error}</p>}

          <div className="bf-footer">
            <button type="button" className="bf-btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="bf-btn-save" disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Blouse'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlouseForm;
