import type { APIRoute } from 'astro';
import ExcelJS from 'exceljs';
import { getAllPlantsGrid, type PlantMatrixItem, type MetricRecord } from '../../backend/services/metricsData';

// Estilos comunes para ExcelJS
const COLORS = {
  headerBg: 'FF047857', // Emerald 700
  headerText: 'FFFFFFFF',
  titleBg: 'FF065F46', // Emerald 800
  titleSubBg: 'FFD1FAE5', // Emerald 100
  titleSubText: 'FF064E3B', // Emerald 900
  zebraEven: 'FFFFFFFF',
  zebraOdd: 'FFF8FAFC',
  summaryBg: 'FFECFDF5',
  summaryText: 'FF065F46',
  borderColor: 'FFE2E8F0',
  healthExcel: 'FFDCFCE7', // verde claro
  healthExcelText: 'FF166534',
  healthCrit: 'FFFEE2E2', // rojo claro
  healthCritText: 'FF991B1B',
  healthWarn: 'FFFEF9C3', // amarillo claro
  healthWarnText: 'FF854D0E',
  healthBlue: 'FFE0F2FE', // azul claro
  healthBlueText: 'FF075985'
};

const BORDER_THIN: Partial<ExcelJS.Borders> = {
  top: { style: 'thin', color: { argb: COLORS.borderColor } },
  bottom: { style: 'thin', color: { argb: COLORS.borderColor } },
  left: { style: 'thin', color: { argb: COLORS.borderColor } },
  right: { style: 'thin', color: { argb: COLORS.borderColor } }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    let plants: PlantMatrixItem[] = [];
    try {
      const body = await request.json();
      if (body && Array.isArray(body.plants) && body.plants.length > 0) {
        plants = body.plants;
      }
    } catch {
      // Si no se envió cuerpo, usar datos iniciales
    }

    if (plants.length === 0) {
      plants = getAllPlantsGrid();
    }

    const buffer = await generateExcelBuffer(plants);

    const nowStr = new Date().toISOString().slice(0, 10);
    const filename = `AquaSens_Mediciones_Invernadero_${nowStr}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (err: any) {
    console.error('Error al generar Excel:', err);
    return new Response(JSON.stringify({ error: 'Error al exportar Excel', details: err?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    const plants = getAllPlantsGrid();
    const buffer = await generateExcelBuffer(plants);
    const nowStr = new Date().toISOString().slice(0, 10);
    const filename = `AquaSens_Mediciones_Invernadero_${nowStr}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Error al exportar Excel', details: err?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function generateExcelBuffer(plants: PlantMatrixItem[]): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'AquaSens Smart Greenhouse';
  workbook.lastModifiedBy = 'Sistema Automatizado AquaSens';
  workbook.created = new Date();
  workbook.modified = new Date();

  const now = new Date();
  const fechaStr = now.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const horaStr = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });

  // -------------------------------------------------------------
  // HOJA 1: MEDICIONES DE HOY (TABLA DETALLADA)
  // -------------------------------------------------------------
  const wsToday = workbook.addWorksheet('Mediciones de Hoy', {
    views: [{ showGridLines: true }],
    pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1 }
  });

  // Título Principal
  wsToday.mergeCells('A1:P1');
  const titleCell = wsToday.getCell('A1');
  titleCell.value = 'INVERNADERO AQUASENS — REPORTE DE MEDICIONES AGRONÓMICAS';
  titleCell.font = { name: 'Calibri', size: 14, bold: true, color: { argb: COLORS.headerText } };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.titleBg } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  wsToday.getRow(1).height = 32;

  // Subtítulo / Metadatos
  wsToday.mergeCells('A2:P2');
  const subCell = wsToday.getCell('A2');
  subCell.value = `Fecha de reporte: ${fechaStr} ${horaStr}  |  Matriz: 4 Filas (t0 a t3) × 5 Columnas (Col 1 a Col 5)  |  Total Plantas: ${plants.length}  |  Invernadero Único`;
  subCell.font = { name: 'Calibri', size: 10, italic: true, bold: true, color: { argb: COLORS.titleSubText } };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.titleSubBg } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  wsToday.getRow(2).height = 20;

  // Separador
  wsToday.getRow(3).height = 8;

  // Cabeceras de Tabla
  const headers = [
    'Fila',
    'Columna',
    'ID Planta',
    'Fecha',
    'Hora',
    'pH Suelo',
    'Temp. Int (°C)',
    'Temp. Ext (°C)',
    'Temp. Suelo (°C)',
    'Crecimiento (%)',
    'Fase Fenológica',
    'Productividad',
    'Sanidad',
    'Responsable',
    'Cargo',
    'Observaciones Agronómicas'
  ];

  const headerRow = wsToday.getRow(4);
  headers.forEach((h, idx) => {
    const cell = headerRow.getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 11, bold: true, color: { argb: COLORS.headerText } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.headerBg } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.border = BORDER_THIN;
  });
  headerRow.height = 26;

  // Datos
  let rowIndex = 5;
  plants.forEach((p, i) => {
    const m = p.latestMetric;
    const row = wsToday.getRow(rowIndex);
    const isEven = i % 2 === 0;
    const bg = isEven ? COLORS.zebraEven : COLORS.zebraOdd;

    // Valores
    row.getCell(1).value = p.fila;
    row.getCell(2).value = p.columna;
    row.getCell(3).value = p.plantId;
    row.getCell(4).value = m.fecha;
    row.getCell(5).value = m.hora;
    row.getCell(6).value = Number(m.phSuelo);
    row.getCell(7).value = Number(m.tempInterna);
    row.getCell(8).value = Number(m.tempExterna);
    row.getCell(9).value = Number(m.tempSuelo);
    row.getCell(10).value = Number(m.crecimiento);
    row.getCell(11).value = m.faseCrecimiento;
    row.getCell(12).value = m.productividad;
    row.getCell(13).value = m.sanidad;
    row.getCell(14).value = m.responsable;
    row.getCell(15).value = m.responsableRol;
    row.getCell(16).value = m.observaciones || 'Condición óptima de desarrollo.';

    // Formateos y Estilos por celda
    for (let c = 1; c <= 16; c++) {
      const cell = row.getCell(c);
      cell.border = BORDER_THIN;
      cell.font = { name: 'Calibri', size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
    }

    // Alineaciones específicas
    row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(1).font = { name: 'Calibri', size: 10, bold: true };
    row.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(3).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(3).font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF047857' } };
    row.getCell(4).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(5).alignment = { vertical: 'middle', horizontal: 'center' };

    // Números con decimales y formato
    row.getCell(6).numFmt = '0.0';
    row.getCell(6).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(7).numFmt = '0.0" °C"';
    row.getCell(7).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(8).numFmt = '0.0" °C"';
    row.getCell(8).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(9).numFmt = '0.0" °C"';
    row.getCell(9).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(10).numFmt = '0"%"';
    row.getCell(10).alignment = { vertical: 'middle', horizontal: 'center' };

    // Estilos para Sanidad
    const cellHealth = row.getCell(13);
    cellHealth.alignment = { vertical: 'middle', horizontal: 'center' };
    if (m.sanidad === 'Excelente') {
      cellHealth.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.healthExcel } };
      cellHealth.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.healthExcelText } };
    } else if (m.sanidad === 'Saludable') {
      cellHealth.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.healthBlue } };
      cellHealth.font = { name: 'Calibri', size: 10, color: { argb: COLORS.healthBlueText } };
    } else if (m.sanidad === 'Vulnerable') {
      cellHealth.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.healthWarn } };
      cellHealth.font = { name: 'Calibri', size: 10, color: { argb: COLORS.healthWarnText } };
    } else if (m.sanidad === 'Crítica') {
      cellHealth.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.healthCrit } };
      cellHealth.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.healthCritText } };
    }

    // Estilos para Productividad
    const cellProd = row.getCell(12);
    cellProd.alignment = { vertical: 'middle', horizontal: 'center' };
    if (m.productividad === 'Alta') {
      cellProd.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.healthExcelText } };
    } else if (m.productividad === 'Baja') {
      cellProd.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.healthCritText } };
    }

    row.height = 20;
    rowIndex++;
  });

  // Fila de Resumen / Promedios
  const summaryRowIndex = rowIndex;
  wsToday.mergeCells(`A${summaryRowIndex}:E${summaryRowIndex}`);
  const sumLabel = wsToday.getCell(`A${summaryRowIndex}`);
  sumLabel.value = 'PROMEDIO GENERAL DEL CULTIVO';
  sumLabel.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.summaryText } };
  sumLabel.alignment = { vertical: 'middle', horizontal: 'center' };

  // Fórmulas de Excel
  wsToday.getCell(`F${summaryRowIndex}`).value = { formula: `AVERAGE(F5:F${summaryRowIndex - 1})` };
  wsToday.getCell(`F${summaryRowIndex}`).numFmt = '0.0';

  wsToday.getCell(`G${summaryRowIndex}`).value = { formula: `AVERAGE(G5:G${summaryRowIndex - 1})` };
  wsToday.getCell(`G${summaryRowIndex}`).numFmt = '0.0" °C"';

  wsToday.getCell(`H${summaryRowIndex}`).value = { formula: `AVERAGE(H5:H${summaryRowIndex - 1})` };
  wsToday.getCell(`H${summaryRowIndex}`).numFmt = '0.0" °C"';

  wsToday.getCell(`I${summaryRowIndex}`).value = { formula: `AVERAGE(I5:I${summaryRowIndex - 1})` };
  wsToday.getCell(`I${summaryRowIndex}`).numFmt = '0.0" °C"';

  wsToday.getCell(`J${summaryRowIndex}`).value = { formula: `AVERAGE(J5:J${summaryRowIndex - 1})` };
  wsToday.getCell(`J${summaryRowIndex}`).numFmt = '0"%"';

  wsToday.mergeCells(`K${summaryRowIndex}:P${summaryRowIndex}`);
  const sumNotes = wsToday.getCell(`K${summaryRowIndex}`);
  sumNotes.value = `Base de datos consolidada (${plants.length} plantas monitoreadas)`;
  sumNotes.font = { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF64748B' } };
  sumNotes.alignment = { vertical: 'middle', horizontal: 'center' };

  // Estilo fila de resumen
  const sumRow = wsToday.getRow(summaryRowIndex);
  sumRow.height = 24;
  for (let c = 1; c <= 16; c++) {
    const cell = sumRow.getCell(c);
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.summaryBg } };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF059669' } },
      bottom: { style: 'double', color: { argb: 'FF059669' } },
      left: { style: 'thin', color: { argb: COLORS.borderColor } },
      right: { style: 'thin', color: { argb: COLORS.borderColor } }
    };
    if (c >= 6 && c <= 10) {
      cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.summaryText } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    }
  }

  // Activar AutoFiltro
  wsToday.autoFilter = `A4:P${summaryRowIndex - 1}`;

  // Ancho de columnas optimizado
  wsToday.columns = [
    { key: 'fila', width: 9 },
    { key: 'columna', width: 11 },
    { key: 'plantId', width: 12 },
    { key: 'fecha', width: 13 },
    { key: 'hora', width: 11 },
    { key: 'ph', width: 13 },
    { key: 'tin', width: 15 },
    { key: 'tout', width: 15 },
    { key: 'tsoil', width: 16 },
    { key: 'growth', width: 15 },
    { key: 'phase', width: 23 },
    { key: 'prod', width: 15 },
    { key: 'health', width: 15 },
    { key: 'resp', width: 22 },
    { key: 'role', width: 20 },
    { key: 'obs', width: 38 }
  ];

  // -------------------------------------------------------------
  // HOJA 2: HISTORIAL COMPLETO DE MEDICIONES
  // -------------------------------------------------------------
  const wsHistory = workbook.addWorksheet('Historial Completo', {
    views: [{ showGridLines: true }]
  });

  // Título
  wsHistory.mergeCells('A1:N1');
  const hTitle = wsHistory.getCell('A1');
  hTitle.value = 'HISTORIAL AGRONÓMICO CRONOLÓGICO — INVERNADERO AQUASENS';
  hTitle.font = { name: 'Calibri', size: 13, bold: true, color: { argb: COLORS.headerText } };
  hTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.titleBg } };
  hTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  wsHistory.getRow(1).height = 28;

  // Cabeceras de Historial
  const historyHeaders = [
    'ID Registro',
    'ID Planta',
    'Fila',
    'Columna',
    'Fecha',
    'Hora',
    'pH Suelo',
    'Temp. Int (°C)',
    'Temp. Ext (°C)',
    'Temp. Suelo (°C)',
    'Crecimiento (%)',
    'Sanidad',
    'Productividad',
    'Responsable'
  ];

  const hHeaderRow = wsHistory.getRow(3);
  historyHeaders.forEach((h, idx) => {
    const cell = hHeaderRow.getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.headerText } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D9488' } }; // Teal 600
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = BORDER_THIN;
  });
  hHeaderRow.height = 24;

  // Extraer todas las mediciones históricas
  const allHistoryRecords: MetricRecord[] = [];
  plants.forEach(p => {
    if (p.history && p.history.length > 0) {
      allHistoryRecords.push(...p.history);
    } else {
      allHistoryRecords.push(p.latestMetric);
    }
  });

  // Ordenar por fecha y hora
  allHistoryRecords.sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora));

  let hRowIdx = 4;
  allHistoryRecords.forEach((m, idx) => {
    const row = wsHistory.getRow(hRowIdx);
    const bg = idx % 2 === 0 ? COLORS.zebraEven : COLORS.zebraOdd;

    row.getCell(1).value = m.id;
    row.getCell(2).value = m.plantId;
    row.getCell(3).value = m.fila;
    row.getCell(4).value = m.columna;
    row.getCell(5).value = m.fecha;
    row.getCell(6).value = m.hora;
    row.getCell(7).value = Number(m.phSuelo);
    row.getCell(8).value = Number(m.tempInterna);
    row.getCell(9).value = Number(m.tempExterna);
    row.getCell(10).value = Number(m.tempSuelo);
    row.getCell(11).value = Number(m.crecimiento);
    row.getCell(12).value = m.sanidad;
    row.getCell(13).value = m.productividad;
    row.getCell(14).value = m.responsable;

    for (let c = 1; c <= 14; c++) {
      const cell = row.getCell(c);
      cell.border = BORDER_THIN;
      cell.font = { name: 'Calibri', size: 9 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    }

    row.getCell(7).numFmt = '0.0';
    row.getCell(8).numFmt = '0.0" °C"';
    row.getCell(9).numFmt = '0.0" °C"';
    row.getCell(10).numFmt = '0.0" °C"';
    row.getCell(11).numFmt = '0"%"';
    row.getCell(14).alignment = { vertical: 'middle', horizontal: 'left' };

    row.height = 18;
    hRowIdx++;
  });

  wsHistory.autoFilter = `A3:N${hRowIdx - 1}`;
  wsHistory.columns = [
    { width: 22 },
    { width: 12 },
    { width: 9 },
    { width: 11 },
    { width: 13 },
    { width: 11 },
    { width: 12 },
    { width: 14 },
    { width: 14 },
    { width: 15 },
    { width: 15 },
    { width: 14 },
    { width: 14 },
    { width: 22 }
  ];

  // -------------------------------------------------------------
  // HOJA 3: RANGOS Y PARÁMETROS AGRONÓMICOS DE REFERENCIA
  // -------------------------------------------------------------
  const wsRef = workbook.addWorksheet('Rangos Agronómicos', {
    views: [{ showGridLines: true }]
  });

  wsRef.mergeCells('A1:F1');
  const rTitle = wsRef.getCell('A1');
  rTitle.value = 'GUÍA DE PARÁMETROS Y RANGOS ÓPTIMOS DEL INVERNADERO';
  rTitle.font = { name: 'Calibri', size: 12, bold: true, color: { argb: COLORS.headerText } };
  rTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: COLORS.titleBg } };
  rTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  wsRef.getRow(1).height = 28;

  const refHeaders = ['Parámetro', 'Rango Óptimo', 'Rango de Alerta', 'Unidad', 'Frecuencia', 'Acción Recomendada'];
  const refHeadRow = wsRef.getRow(3);
  refHeaders.forEach((h, idx) => {
    const cell = refHeadRow.getCell(idx + 1);
    cell.value = h;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: COLORS.headerText } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF15803D' } }; // Green 700
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = BORDER_THIN;
  });
  refHeadRow.height = 24;

  const refData = [
    ['pH del Suelo', '6.0 a 6.8', '< 5.8 (Ácido) o > 7.2 (Alcalino)', 'Escala pH', 'Diaria', 'Ajustar acidez de solución nutritiva o aplicar enmienda cálcica'],
    ['Temperatura Interna', '22.0°C a 26.0°C', '< 18.0°C (Frío) o > 28.0°C (Calor)', '°C', 'Continua / Diaria', 'Activar extractores o cortinas térmicas según confort ambiental'],
    ['Temperatura Ambiente Ext.', '18.0°C a 24.0°C', '< 14.0°C o > 30.0°C', '°C', 'Diaria', 'Referencia externa; ajustar ventilación según gradiente térmico'],
    ['Temperatura del Suelo', '19.0°C a 22.0°C', '< 16.0°C o > 25.0°C', '°C', 'Diaria', 'Monitorear actividad radicular; regular ciclo de riego matutino'],
    ['Crecimiento Vegetativo', '75% a 100%', '< 60% (Retraso fenológico)', '%', 'Semanal', 'Reforzar fertilización foliar N-P-K y verificar luminosidad'],
    ['Sanidad del Cultivo', 'Excelente / Saludable', 'Vulnerable / Crítica', 'Cualitativo', 'Diaria', 'Aislamiento de planta y aplicación preventiva de bioprotección']
  ];

  refData.forEach((rowVals, idx) => {
    const row = wsRef.getRow(4 + idx);
    const bg = idx % 2 === 0 ? COLORS.zebraEven : COLORS.zebraOdd;
    rowVals.forEach((val, cIdx) => {
      const cell = row.getCell(cIdx + 1);
      cell.value = val;
      cell.border = BORDER_THIN;
      cell.font = { name: 'Calibri', size: 10 };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: bg } };
      cell.alignment = { vertical: 'middle', horizontal: cIdx === 0 || cIdx === 5 ? 'left' : 'center' };
      if (cIdx === 0) cell.font = { name: 'Calibri', size: 10, bold: true };
    });
    row.height = 22;
  });

  wsRef.columns = [
    { width: 26 },
    { width: 18 },
    { width: 34 },
    { width: 14 },
    { width: 18 },
    { width: 55 }
  ];

  // Escribir a buffer binario
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}
