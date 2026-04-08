import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import BlouseForm from './BlouseForm';
import './AdminPanel.css';

const AdminPanel = () => {
  const [blouses, setBlouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editBlouse, setEditBlouse] = useState(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const fetchBlouses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blouses')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setBlouses(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchBlouses(); }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await supabase.from('blouses').delete().eq('id', id);
    fetchBlouses();
  };

  const handleEdit = (blouse) => {
    setEditBlouse(blouse);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditBlouse(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditBlouse(null);
    fetchBlouses();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="ap-root">
      <header className="ap-header">
        <div className="ap-header-left">
          <span className="ap-brand">MuruganTex</span>
          <span className="ap-divider">|</span>
          <span className="ap-title">Admin Panel</span>
        </div>
        <div className="ap-header-right">
          <button className="ap-btn-add" onClick={handleAdd}>+ Add Blouse</button>
          <button className="ap-btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="ap-main">
        <div className="ap-section-head">
          <div>
            <h2 className="ap-section-title">Blouse Catalogue</h2>
            <p className="ap-section-sub">Manage your blouse listings</p>
          </div>
          <span className="ap-count">{blouses.length} item{blouses.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div className="ap-loading">
            <div className="ap-spinner" />
            <span>Loading catalogue…</span>
          </div>
        ) : blouses.length === 0 ? (
          <div className="ap-empty">
            <div className="ap-empty-icon">🧵</div>
            <p>No blouses yet.</p>
            <p className="ap-empty-sub">Click "+ Add Blouse" to add your first listing.</p>
          </div>
        ) : (
          <div className="ap-grid">
            {blouses.map(blouse => {
              const firstColor = blouse.colors?.[0];
              const img = firstColor?.images?.[0];
              return (
                <div className="ap-card" key={blouse.id}>
                  <div className="ap-card-img-wrap">
                    {img
                      ? <img src={img} alt={blouse.name} className="ap-card-img" />
                      : <div className="ap-card-no-img">No Image</div>
                    }
                    {blouse.badge && (
                      <span className={`ap-badge ${blouse.badge === 'BESTSELLER' ? 'ap-badge-bs' : 'ap-badge-new'}`}>
                        {blouse.badge}
                      </span>
                    )}
                  </div>
                  <div className="ap-card-body">
                    <p className="ap-card-name">{blouse.name}</p>
                    <p className="ap-card-fabric">{blouse.fabric}</p>
                    <div className="ap-card-colors">
                      {blouse.colors?.map(c => (
                        <span
                          key={c.name}
                          className="ap-color-dot"
                          style={{ background: c.hex }}
                          title={c.name}
                        />
                      ))}
                      {blouse.colors?.length > 0 && (
                        <span className="ap-color-count">
                          {blouse.colors.length} colour{blouse.colors.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ap-card-actions">
                    <button className="ap-btn-edit" onClick={() => handleEdit(blouse)}>Edit</button>
                    <button className="ap-btn-del" onClick={() => handleDelete(blouse.id, blouse.name)}>Delete</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {showForm && (
        <BlouseForm blouse={editBlouse} onClose={handleFormClose} />
      )}
    </div>
  );
};

export default AdminPanel;
