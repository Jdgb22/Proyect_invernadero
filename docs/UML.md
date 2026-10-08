# Diagramas UML — Proyecto Invernadero (Macollo)

> Mermaid, derivado del código (oct-2026). ER detallado en [DATABASE](./DATABASE.md) §4; secuencias/actividades en sus docs.

## 1. Diagrama de clases (dominio agronómico + auth)

```mermaid
classDiagram
    class MetricRecord {
        +string id
        +string fila (t0..t3)
        +string columna (Col 1..5)
        +string plantId (P-01..P-20)
        +string code (T0-P1..)
        +string fecha (YYYY-MM-DD)
        +string hora
        +number phSuelo
        +number|null tempInterna
        +number tempExterna
        +number|null tempSuelo
        +number humedad
        +number|null alturaCm
        +number crecimiento
        +string faseCrecimiento
        +Alta|Media|Baja productividad
        +Excelente|...|Crítica sanidad
        +string responsable
    }
    class PlantMatrixItem {
        +string fila
        +string columna
        +string plantId
        +number plantNumber
        +string code
        +MetricRecord latestMetric
        +MetricRecord[] history
    }
    class MetricsService {
        +resolvePlantCoordinates() coords
        +buildPlantsGridFromRecords() matriz
        +getAllPlantsGrid() matriz
        +getPlantHistory() registros
        +getAllMetrics() registros
    }
    class WeatherService {
        +isValleDeAburra() bool
        +fetchWeatherData() WeatherData
        +getWeatherEmoji() string
    }
    class User {
        +int id
        +string name
        +string email
        +string phone
        +user_role_enum role
        +string password_hash
    }
    PlantMatrixItem *-- MetricRecord : latest + history
    MetricsService ..> PlantMatrixItem : construye
    MetricsService ..> MetricRecord : parsea
    User <.. AuthAPI : autentica
```

## 2. Diagrama de componentes

```mermaid
flowchart TB
    subgraph Client[Navegador]
        Pags[Páginas Astro: index, signin, metrics, historial, settings]
        Comp[Componentes: Dashboard, Metrics, Historial, Settings, navbar]
        T3[Three.js: escena sol/luna + sombras]
        LS[Estado en memoria: plantsState, records Sheets]
        Pags --> Comp
        Comp --> T3
        Comp --> LS
    end
    subgraph Server[Astro SSR en Vercel]
        APIAuth[API auth: register, forgot/reset, Auth.js]
        APIXLS[API export-excel: ExcelJS 3 hojas]
        APISync[API sync-sheets: CSV → records]
        APIProxy[API siata: proxy timeout 3s]
        Svc[Servicios: metricsData, weather, siata, notifications]
        MW[middleware: fix proxy + guarda /dashboard]
    end
    subgraph Ext[Externos]
        PG[(PostgreSQL: auth activo)]
        SHEETS[(Google Sheets CSV público)]
        SIATA[(SIATA :8089)]
        OM[(Open-Meteo)]
        AQI[(waqi.info)]
        SMTP[(SMTP Gmail)]
    end
    Comp -->|fetch JSON / xlsx| APIAuth & APIXLS & APISync & APIProxy
    APIAuth --> PG & SMTP
    APISync --> SHEETS
    APIProxy --> SIATA
    Comp --> OM & AQI
    Svc -.-> APIAuth & APIXLS & APISync
```

## 3. Diagrama de despliegue

```mermaid
flowchart LR
    subgraph Dev[Desarrollo]
        DEV[pnpm dev :4321 + PG local :5432]
    end
    subgraph VercelNube[Vercel + nube]
        CDN[Edge / Functions SSR]
        PGc[(PostgreSQL gestionado)]
        CDN --> PGc
    end
    subgraph Campo[Campo]
        NAV[Navegador operario]
        SHEET[Google Sheets del equipo]
    end
    NAV -->|HTTPS| CDN
    CDN -->|CSV público| SHEET
    CDN --> SIATA & OM & SMTPg
    SIATA[(SIATA)] --- CDN
    OM[(Open-Meteo)] --- CDN
    SMTPg[(SMTP Gmail)] --- CDN
```

## 4. Diagrama de estados (planta)

```mermaid
stateDiagram-v2
    [*] --> SinDatos: buildPlantsGrid sin historial
    SinDatos --> Optimo: sync con sanidad Excelente/Saludable
    SinDatos --> Atencion: sync con sanidad Vulnerable
    SinDatos --> Critico: sync con sanidad Crítica
    Optimo --> Atencion: nueva toma Vulnerable
    Optimo --> Critico: nueva toma Crítica
    Atencion --> Optimo: nueva toma Saludable+
    Atencion --> Critico: nueva toma Crítica
    Critico --> Atencion: nueva toma Vulnerable
    Critico --> Optimo: nueva toma Saludable+
```
