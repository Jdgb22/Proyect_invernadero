# System Architecture

## Overview
AquaSens is a greenhouse monitoring and 3D simulation platform built with **Astro** v7.2.8 in SSR mode, deployed to Vercel. The system integrates sensor data, weather services, and provides visualization capabilities.

## Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Astro v7.2.8 (SSR, `output: 'server'`) |
| **Styling** | Tailwind CSS v4 |
| **3D Graphics** | Three.js (vanilla JS) |
| **Authentication** | Auth.js (auth-astro) |
| **Database** | PostgreSQL (Supabase/Firebase BaaS) |
| **Weather Data** | Open-Meteo (global) + SIATA local (Medellín) |
| **Spreadsheets** | ExcelJS |
| **HTTP** | Native fetch API |
| **Deployment** | Vercel |

## Architecture Components

### 1. Frontend (`src/frontend/`)
- **Components**: Dashboard, Navbar, Metrics, Historial, Settings, Welcome
- **Pages**: index.astro (login), metrics.astro, historial.astro, settings.astro
- **Layouts**: Layout.astro (HTML wrapper)
- **Styles**: Global Tailwind CSS

### 2. Backend Services (`src/backend/services/`)
- **metricsData.ts**: Database operations for sensor data
- **weather.ts**: Open-Meteo API integration
- **siata.ts**: SIATA local weather proxy

### 3. API Routes (`src/pages/api/`)
- **export-excel.ts**: Excel file export endpoint
- **siata.ts**: SIATA proxy endpoint (CORS)
- **sync-sheets.ts**: Google Sheets sync endpoint

### 4. Middleware (`middleware.ts`)
- Authentication protection
- Route guarding for authenticated users

## Data Flow

```
Sensor Data → Backend Services → PostgreSQL → Frontend (Dashboard)
       ↑                         ↓
   SIATA API                 3D Visualization
```

```
User Request → Astro Middleware → Auth Check → Page/Component → Data Fetch → Render
```

## Key Design Decisions

### SSR Mode
- Astro renders pages on the server for initial load
- Enables dynamic data fetching from PostgreSQL
- Better SEO and faster time-to-interactive

### Dual Weather Service Pattern
- **Open-Meteo**: Global weather data, no CORS issues
- **SIATA**: Local Medellín weather, requires CORS proxy pattern
- Proxy endpoint (`/api/siata`) handles cross-origin restrictions

### Authentication (Auth.js)
- Session-based authentication
- Protected routes via middleware
- Social login options configured in `auth.config.ts`

### Database (PostgreSQL)
- Relational data model for users, sensor readings
- ACID transactions for data integrity
- Scalable cloud hosting (Supabase/RDS)