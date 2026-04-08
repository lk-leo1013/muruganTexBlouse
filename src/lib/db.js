// Local storage DB — drop-in replacement until a real DB is wired up.
// To switch to Supabase: replace the functions below with supabase.from('blouses')... calls.

const KEY = 'murugan_blouses';

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export async function fetchBlouses({ orderBy = 'created_at', ascending = false, limit } = {}) {
  let data = load();
  data.sort((a, b) => {
    const av = a[orderBy] ?? '';
    const bv = b[orderBy] ?? '';
    return ascending ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });
  if (limit) data = data.slice(0, limit);
  return { data, error: null };
}

export async function insertBlouse(record) {
  const blouses = load();
  const newBlouse = {
    ...record,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  blouses.push(newBlouse);
  save(blouses);
  return { error: null };
}

export async function updateBlouse(id, record) {
  const blouses = load();
  const idx = blouses.findIndex(b => b.id === id);
  if (idx === -1) return { error: 'Not found' };
  blouses[idx] = { ...blouses[idx], ...record, updated_at: new Date().toISOString() };
  save(blouses);
  return { error: null };
}

export async function deleteBlouse(id) {
  save(load().filter(b => b.id !== id));
  return { error: null };
}
