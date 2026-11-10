-- 002-add-responsable-to-lecturas.sql
-- Agrega columna `responsable` como texto para almacenar el nombre del responsable tal cual aparece en el Drive / Google Sheets.

ALTER TABLE lecturas ADD COLUMN IF NOT EXISTS responsable TEXT;

