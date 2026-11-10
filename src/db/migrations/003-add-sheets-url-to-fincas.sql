-- 003-add-sheets-url-to-fincas.sql
-- Agrega columna `sheets_url` a la tabla `fincas` para recordar el enlace de Google Sheets de la finca.

ALTER TABLE fincas ADD COLUMN IF NOT EXISTS sheets_url TEXT;

