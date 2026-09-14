// src/pages/api/sync-sheets.ts
// Endpoint para sincronizar mediciones agronómicas directamente desde Google Sheets / Google Docs (publicado como CSV o enlace de exportación)
import type { APIRoute } from 'astro';

interface ParsedRecord {
  id: string;
  invernadero: string;
  fila: 't0' | 't1' | 't2' | 't3';
  columna: 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5';
  plantId: string;
  fecha: string;
  hora: string;
  timestampTexto: string;
  phSuelo: number;
  tempInterna: number;
  tempExterna: number;
  tempSuelo: number;
  crecimiento: number;
  faseCrecimiento: string;
  productividad: 'Alta' | 'Media' | 'Baja';
  sanidad: 'Excelente' | 'Saludable' | 'Vulnerable' | 'Crítica';
  responsable: string;
  responsableRol: string;
  avatarColor: string;
  observaciones?: string;
}

// Convertir enlaces habituales de Google Sheets a la URL de descarga directa CSV
function normalizeGoogleSheetUrl(inputUrl: string): string {
  let url = inputUrl.trim();

  // Si es un enlace estándar de edición de Google Sheets:
  // https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=SHEET_ID
  const sheetMatch = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (sheetMatch && sheetMatch[1]) {
    const sheetId = sheetMatch[1];
    
    // Extraer gid si existe
    let gid = '0';
    const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
    if (gidMatch && gidMatch[1]) {
      gid = gidMatch[1];
    }

    // Si ya es un enlace de exportación o publicación, mantenerlo o ajustarlo
    if (url.includes('/pub') && url.includes('output=csv')) {
      return url;
    }
    if (url.includes('/export') && url.includes('format=csv')) {
      return url;
    }

    return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  }

  return url;
}

// Parser simple y robusto de CSV respetando comillas y delimitadores (coma o punto y coma)
function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const rawLines = cleanText.split('\n').filter(l => l.trim().length > 0);

  if (rawLines.length === 0) return [];

  // Detectar delimitador (coma o punto y coma) según la primera línea
  const firstLine = rawLines[0];
  const commaCount = (firstLine.match(/,/g) || []).length;
  const semiCount = (firstLine.match(/;/g) || []).length;
  const delimiter = semiCount > commaCount ? ';' : ',';

  for (const line of rawLines) {
    const row: string[] = [];
    let inQuotes = false;
    let currentToken = '';

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          currentToken += '"';
          i++; // escapar comilla doble
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        row.push(currentToken.trim());
        currentToken = '';
      } else {
        currentToken += char;
      }
    }
    row.push(currentToken.trim());
    lines.push(row);
  }

  return lines;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Debe ingresar una URL válida de Google Sheets o archivo CSV.' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const targetUrl = normalizeGoogleSheetUrl(url);

    // Petición al recurso externo desde el servidor (sin bloqueos de CORS de navegador)
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'AquaSens-Greenhouse-Sync/1.0',
        'Accept': 'text/csv,text/plain,*/*'
      }
    });

    if (!response.ok) {
      return new Response(JSON.stringify({
        success: false,
        error: `No se pudo acceder al documento en Google Sheets. Código HTTP: ${response.status}. Verifique que el enlace tenga permisos de lectura 'Cualquier persona con el enlace puede ver' o esté 'Publicado en la web'.`
      }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return new Response(JSON.stringify({
        success: false,
        error: 'El documento descargado está vacío o no contiene suficientes filas de datos.'
      }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Normalizar cabeceras a minúsculas sin acentos
    const headers = rows[0].map(h => 
      h.toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')
       .trim()
    );

    // Mapeo inteligente de columnas
    const findIndex = (keywords: string[]) => {
      return headers.findIndex(h => keywords.some(k => h.includes(k)));
    };

    const idxPlanta = findIndex(['plant', 'codigo', 'id']);
    const idxFila = findIndex(['fila']);
    const idxCol = findIndex(['columna', 'col']);
    const idxFecha = findIndex(['fecha', 'date']);
    const idxHora = findIndex(['hora', 'time']);
    const idxPh = findIndex(['ph']);
    const idxTin = findIndex(['temp_int', 'tin', 'temp interna', 'temperatura interna']);
    const idxTout = findIndex(['temp_ext', 'tout', 'temp externa', 'temperatura externa']);
    const idxTsoil = findIndex(['temp_suelo', 'tsoil', 'temperatura suelo', 'suelo temp']);
    const idxCrec = findIndex(['crecimiento', 'avance', 'growth', '%']);
    const idxFase = findIndex(['fase', 'etapa']);
    const idxProd = findIndex(['productividad', 'prod']);
    const idxSanidad = findIndex(['sanidad', 'salud', 'fitosanitario', 'estado']);
    const idxResp = findIndex(['responsable', 'operario', 'tecnico', 'registrado']);
    const idxObs = findIndex(['observacion', 'notas', 'comentario', 'obs']);

    const validFilas = ['t0', 't1', 't2', 't3'];
    const validCols = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5'];

    const parsedRecords: ParsedRecord[] = [];
    const todayISO = new Date().toISOString().slice(0, 10);

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length === 0 || row.every(c => !c)) continue;

      let plantId = idxPlanta >= 0 && row[idxPlanta] ? row[idxPlanta].toUpperCase() : '';
      let filaStr = idxFila >= 0 && row[idxFila] ? row[idxFila].toLowerCase().trim() : '';
      let colStr = idxCol >= 0 && row[idxCol] ? row[idxCol].trim() : '';

      // Si plantId viene como '1' o 'P01' o 'P-01'
      if (plantId && !plantId.startsWith('P-')) {
        const num = parseInt(plantId.replace(/\D/g, ''), 10);
        if (!isNaN(num) && num >= 1 && num <= 20) {
          plantId = `P-${num < 10 ? '0' + num : num}`;
        }
      }

      // Si falta la fila o columna pero tenemos el número de planta (1 a 20)
      if ((!filaStr || !colStr) && plantId) {
        const plantNum = parseInt(plantId.replace(/\D/g, ''), 10);
        if (!isNaN(plantNum) && plantNum >= 1 && plantNum <= 20) {
          const rowIdx = Math.floor((plantNum - 1) / 5);
          const colIdx = (plantNum - 1) % 5;
          filaStr = validFilas[rowIdx] || 't0';
          colStr = validCols[colIdx] || 'Col 1';
        }
      }

      // Validar fila
      const fila = (validFilas.includes(filaStr) ? filaStr : 't0') as 't0' | 't1' | 't2' | 't3';
      
      // Validar columna
      let colFinal: 'Col 1' | 'Col 2' | 'Col 3' | 'Col 4' | 'Col 5' = 'Col 1';
      if (colStr.toLowerCase().includes('1')) colFinal = 'Col 1';
      else if (colStr.toLowerCase().includes('2')) colFinal = 'Col 2';
      else if (colStr.toLowerCase().includes('3')) colFinal = 'Col 3';
      else if (colStr.toLowerCase().includes('4')) colFinal = 'Col 4';
      else if (colStr.toLowerCase().includes('5')) colFinal = 'Col 5';

      if (!plantId) {
        // Asignar según fila y columna
        const fIdx = validFilas.indexOf(fila);
        const cIdx = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5'].indexOf(colFinal);
        const num = (fIdx * 5) + cIdx + 1;
        plantId = `P-${num < 10 ? '0' + num : num}`;
      }

      // Fecha
      let fecha = idxFecha >= 0 && row[idxFecha] ? row[idxFecha].trim() : todayISO;
      // Normalizar DD/MM/YYYY a YYYY-MM-DD si es necesario
      if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha)) {
        const [d, m, y] = fecha.split('/');
        fecha = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        fecha = todayISO;
      }

      const hora = idxHora >= 0 && row[idxHora] ? row[idxHora].trim() : '09:00 AM';

      // Métricas numéricas con saneamiento de comas decimales
      const parseNum = (val: string | undefined, fallback: number) => {
        if (!val) return fallback;
        const cleaned = val.replace(',', '.').replace(/[^0-9.-]/g, '');
        const n = parseFloat(cleaned);
        return isNaN(n) ? fallback : n;
      };

      const phSuelo = Math.min(14, Math.max(0, parseNum(idxPh >= 0 ? row[idxPh] : undefined, 6.4)));
      const tempInterna = parseNum(idxTin >= 0 ? row[idxTin] : undefined, 24.5);
      const tempExterna = parseNum(idxTout >= 0 ? row[idxTout] : undefined, 20.2);
      const tempSuelo = parseNum(idxTsoil >= 0 ? row[idxTsoil] : undefined, 20.5);
      const crecimiento = Math.min(100, Math.max(0, Math.round(parseNum(idxCrec >= 0 ? row[idxCrec] : undefined, 75))));

      // Fase
      const faseCrecimiento = idxFase >= 0 && row[idxFase] ? row[idxFase].trim() : 'Desarrollo Vegetativo';

      // Productividad
      let productividad: 'Alta' | 'Media' | 'Baja' = 'Alta';
      const prodRaw = idxProd >= 0 && row[idxProd] ? row[idxProd].toLowerCase() : '';
      if (prodRaw.includes('baja') || prodRaw.includes('low')) productividad = 'Baja';
      else if (prodRaw.includes('med') || prodRaw.includes('mid')) productividad = 'Media';

      // Sanidad
      let sanidad: 'Excelente' | 'Saludable' | 'Vulnerable' | 'Crítica' = 'Saludable';
      const sanRaw = idxSanidad >= 0 && row[idxSanidad] ? row[idxSanidad].toLowerCase() : '';
      if (sanRaw.includes('crit') || sanRaw.includes('mala') || sanRaw.includes('enferma')) sanidad = 'Crítica';
      else if (sanRaw.includes('vuln') || sanRaw.includes('aten') || sanRaw.includes('regular')) sanidad = 'Vulnerable';
      else if (sanRaw.includes('excel') || sanRaw.includes('opt')) sanidad = 'Excelente';

      // Responsable
      const responsable = idxResp >= 0 && row[idxResp] ? row[idxResp].trim() : 'Equipo de Campo';
      const observaciones = idxObs >= 0 && row[idxObs] ? row[idxObs].trim() : 'Registro importado desde Google Sheets.';

      parsedRecords.push({
        id: `MET-GS-${fila}-${colFinal.replace(' ', '')}-${fecha}-${r}`,
        invernadero: 'Invernadero AquaSens',
        fila,
        columna: colFinal,
        plantId,
        fecha,
        hora,
        timestampTexto: `${fecha}, ${hora}`,
        phSuelo: +phSuelo.toFixed(2),
        tempInterna: +tempInterna.toFixed(1),
        tempExterna: +tempExterna.toFixed(1),
        tempSuelo: +tempSuelo.toFixed(1),
        crecimiento,
        faseCrecimiento,
        productividad,
        sanidad,
        responsable,
        responsableRol: 'Registro Google Sheets',
        avatarColor: 'bg-emerald-600',
        observaciones
      });
    }

    return new Response(JSON.stringify({
      success: true,
      count: parsedRecords.length,
      records: parsedRecords,
      message: `Se importaron exitosamente ${parsedRecords.length} registros desde Google Sheets.`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Ocurrió un error inesperado al procesar la sincronización.',
      details: err.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
