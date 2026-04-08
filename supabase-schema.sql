-- ============================================================
-- MuruganTex Blouse Catalogue — Supabase Schema
-- Run this in your Supabase project's SQL Editor
-- ============================================================

-- 1. BLOUSES TABLE
-- ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blouses (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT          NOT NULL,
  fabric      TEXT          NOT NULL,
  description TEXT          DEFAULT '',
  badge       TEXT          CHECK (badge IN ('NEW', 'BESTSELLER') OR badge IS NULL),
  rating      NUMERIC(3,1)  DEFAULT 4.5,
  reviews     INTEGER       DEFAULT 0,
  sizes       TEXT[]        DEFAULT ARRAY['S','M','L','XL','XXL'],
  wash_care   TEXT          DEFAULT 'Dry clean only',

  -- colors stores an array of objects:
  -- [{ "name": "Red", "hex": "#e11f6b", "images": ["https://..."] }, ...]
  colors      JSONB         DEFAULT '[]'::jsonb,

  created_at  TIMESTAMPTZ   DEFAULT NOW(),
  updated_at  TIMESTAMPTZ   DEFAULT NOW()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER blouses_updated_at
  BEFORE UPDATE ON blouses
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 2. ROW LEVEL SECURITY
-- ---------------------------------------------------------------
ALTER TABLE blouses ENABLE ROW LEVEL SECURITY;

-- Anyone can read blouses (for the public storefront)
CREATE POLICY "Public can read blouses"
  ON blouses FOR SELECT
  USING (true);

-- Only authenticated users (admin) can insert/update/delete
CREATE POLICY "Admin can insert blouses"
  ON blouses FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admin can update blouses"
  ON blouses FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete blouses"
  ON blouses FOR DELETE
  USING (auth.role() = 'authenticated');

-- 3. STORAGE BUCKET
-- ---------------------------------------------------------------
-- Create a public bucket for blouse images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blouse-images', 'blouse-images', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can view images
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blouse-images');

-- Only authenticated users can upload
CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'blouse-images' AND auth.role() = 'authenticated');

-- Only authenticated users can delete
CREATE POLICY "Admin can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'blouse-images' AND auth.role() = 'authenticated');
