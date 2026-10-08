# Plan de Pruebas — Proyecto Invernadero (Macollo)

> Estado: **sin suite automatizada** (`*.test.*` inexistente, oct-2026). Este plan cubre regresión manual por release + setup propuesto para automatizar. Requisitos en [REQUIREMENTS](./REQUIREMENTS.md).

## 1. Estrategia

| Nivel             | Qué                                                                                               | Cómo hoy    | Objetivo                   |
| :---------------- | :------------------------------------------------------------------------------------------------ | :---------- | :------------------------- |
| Unitario          | `resolvePlantCoordinates`, `parseCSV`, validadores registro, `isValleDeAburra`, `getWeatherEmoji` | Manual      | Vitest (propuesto §4)      |
| Integración       | Endpoints con `curl` + PG de pruebas                                                              | Manual (§3) | Automatizar con DB efímera |
| E2E manual        | Flujos RF-01→RF-18 en navegador                                                                   | Manual (§2) | Playwright a futuro        |
| Regresión release | Checklist §5                                                                                      | Manual      | —                          |

## 2. Casos E2E manuales (navegador)

| ID      | RF           | Pasos                                                                  | Esperado                                                                                  |
| :------ | :----------- | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| TEST-01 | RF-01        | `/signin` → Registrarse: nombre + email nuevo + clave 8 → Crear Cuenta | `¡Cuenta creada…!` y vuelve a login con email precargado                                  |
| TEST-02 | RF-01        | Registrar el mismo email dos veces                                     | `Este correo electrónico ya está registrado.` (400)                                       |
| TEST-03 | RF-02        | Login correcto / incorrecto                                            | Entra a `/` / `Credenciales incorrectas…`                                                 |
| TEST-04 | RF-03        | Continuar con Google                                                   | Sesión creada y entra a `/`                                                               |
| TEST-05 | RF-05        | Forgot con email válido → código → reset + login nuevo                 | Código 15 min, destino enmascarado, login OK, token invalidado (reúso falla)              |
| TEST-06 | RF-06/07     | Dashboard: contar tarjetas, clic en `T0-C1`                            | 20 tarjetas; modal con pH, temps, crecimiento, productividad, sanidad; cierra con X/fuera |
| TEST-07 | RF-06        | Importar CSV maestro en Historial → volver a `/`                       | 0 tarjetas grises; semáforo coherente (pH <5.2/>7.8 ⇒ rojo)                               |
| TEST-08 | RF-08/09     | 3D + clima: rotar/zoom; denegar geolocalización                        | Escena sol/luna según hora; `Clima (Medellín)` + AQI visible                              |
| TEST-09 | RF-10        | `/metrics`: promedios y badges                                         | pH 6.0–6.8 verde; fila peor identificable; modal por planta                               |
| TEST-10 | RF-11/13     | `/historial`: cambiar fecha; pegar URL Sheets pública/privada          | Tabla del día; pública ⇒ conteo importado / privada ⇒ error 422 guiado                    |
| TEST-11 | RF-14        | Exportar desde Métricas e Historial                                    | `.xlsx` 3 hojas con promedios; abre en Excel/Sheets                                       |
| TEST-12 | RF-15–18     | Settings: cambiar nombre/tema/frecuencia; provocar toast               | Persiste nombre; tema aplica; toast visible                                               |
| TEST-13 | RF-04/RNF-04 | Sin sesión abrir `/metrics`, `/historial`, `/settings`                 | No muestra datos (Welcome/redirect)                                                       |
| TEST-14 | RNF-05       | Bloquear `api.open-meteo.com` (devtools) y recargar                    | Widget con valores offline (22 °C/60 %), sin error visible                                |

## 3. Casos de API (`curl` contra staging)

```bash
# Registro duplicado → 400
curl -s -o /dev/null -w '%{http_code}\n' -X POST $BASE/api/auth/register \
  -H 'Content-Type: application/json' -d '{"name":"A","email":"dup@x.co","password":"12345678"}'
# Forgot usuario inexistente → 404 | Reset código malo → 400
# Sheets sin URL → 400 | Sheets privada → 422 | SIATA tiempo ≤3s:
curl -s -o /dev/null -w '%{http_code} %{time_total}s\n' $BASE/api/siata
# Export GET → binario xlsx:
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' $BASE/api/export-excel
```

## 4. Automatización propuesta (Vitest)

1. `pnpm add -D vitest` + script `"test": "vitest run"`.
2. Requisito previo de código: exportar `parseCSV`, `normalizeGoogleSheetUrl` y `extractDateAndHour` desde `sync-sheets.ts` (hoy privadas) y los validadores de `register.ts`.
3. Ejemplo inicial (`src/backend/services/metricsData.test.ts`):

```ts
import { describe, expect, it } from "vitest";
import { resolvePlantCoordinates, isValleDeAburra } from "./metricsData";
import { getWeatherEmoji } from "./weather";

describe("resolvePlantCoordinates", () => {
  it("acepta TO-P2 (letra O) como t0 col 2", () => {
    expect(resolvePlantCoordinates("TO-P2")).toMatchObject({
      fila: "t0",
      columna: "Col 2",
      plantId: "P-02",
    });
  });
  it("mapea P-20 global a t3 Col 5", () => {
    expect(resolvePlantCoordinates("P-20")).toMatchObject({
      fila: "t3",
      columna: "Col 5",
    });
  });
});
```

4. Casos semilla: IDs compuestos/separados/globales, pH clamp 0–14, fechas DD/MM/YYYY y serial Excel, bbox Valle (6.2442,-75.5812 ∈ / 4.71,-74.07 ∉), WMO 0→☀️/95+→⛈️, email/teléfono duplicados (con PG de test).

## 5. Checklist de release

- [ ] TEST-01→TEST-14 en verde en URL de preview.
- [ ] `curl` §3 con códigos esperados.
- [ ] `pnpm build` verde; sin secretos en `git diff` (`AUTH_SECRET`, `SMTP_PASS`, tokens).
- [ ] Docs tocados actualizados (docs vs `src/` sin deriva) + ADR si hubo decisión.
