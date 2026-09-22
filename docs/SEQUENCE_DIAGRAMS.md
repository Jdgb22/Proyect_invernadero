# Diagramas de Secuencia

## SD-001: Flujo de Autenticación

```mermaid
sequenceDiagram
    participant User as Usuario
    participant Front as Frontend (Astro)
    participant Auth as Auth.js
    participant DB as PostgreSQL
    participant API as API Routes

    %% Login flow
    User->>Front: Navega a login
    Front->>Auth: Intenta autenticar credenciales
    Auth->>DB: Valida email y contraseña
    DB-->>Auth: Usuario encontrado/contraseña válida
    Auth-->>Front: Token de sesión válido
    Front->>User: Redirige al dashboard
    
    %% Failed login
    alt Credenciales inválidas
        Auth-->>Front: Error de autenticación
        Front-->>User: Mostrar mensaje "Credenciales inválidas"
    end
```

## SD-002: Flujo de Obtención de Datos en Tiempo Real

```mermaid
sequenceDiagram
    participant User as Usuario/Dashboard
    participant Front as Componente Frontend
    participant Service as Servicios Backend (metricsData.ts, weather.ts)
    participant DB as PostgreSQL
    participant API as Endpoints API

    User->>Front: Accede al dashboard
    Front->>API: GET /api/metrics (ultimas lecturas)
    API->>DB: Consultar lecturas recientes
    DB-->>API: Datos de sensores (temp, humedad, luz)
    API-->>Front: JSON con datos de métricas
    Front->>Front: Actualizar UI (cards, gráficos)
    Note over Front: Actualización cada 30s
    Front-->>User: Dashboard actualizado
```

## SD-003: Flujo de Exportación a Excel

```mermaid
sequenceDiagram
    participant User as Usuario
    participant Front as Página Historial
    participant Service as Servicio Exportación
    participant DB as PostgreSQL

    User->>Front: Selecciona rango fechas + tipo dato
    Front->>Service: Solicitar exportación datos
    Service->>DB: Consultar datos por rango y tipo
    DB-->>Service: Datos históricos estructurados
    Service->>Front: Recibir datos formateados
    Front->>User: Descargar archivo .xlsx
    Note over Front: ExcelJS genera hoja por métrica
```

## SD-004: Flujo de Sincronización Google Sheets

```mermaid
sequenceDiagram
    participant User as Usuario (Admin)
    participant Front as Página Sync Sheets
    participant Service as Servicio Sync Sheets (sync-sheets.ts)
    participant Google as Google Sheets API
    participant DB as PostgreSQL

    User->>Front: Ingresa ID hoja + credenciales
    Front->>Service: Solicitar sincronización
    Service->>DB: Obtener datos actuales
    DB-->>Service: Datos estructurados
    Service->>Google: Escribir datos en hoja
    Google-->>Service: Confirmación éxito
    Service-->>Front: Confirmación al usuario
    Front-->>User: Mostrar estado sincronización
```