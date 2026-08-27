# Arquitectura del Sistema - Proyecto Invernadero

Este documento describe la arquitectura técnica, flujo de datos y estructura de directorios del "Proyecto Invernadero", una aplicación web enfocada en la simulación 3D y monitoreo de un invernadero.

## 1. Visión General
El proyecto está construido usando **Astro** en modo **SSR** (Server-Side Rendering) a través del adaptador de Node.js. Esto permite tener componentes estáticos extremadamente rápidos en el Frontend combinados con rutas dinámicas y endpoints de API en el Backend, alojados en el mismo proyecto.

- **Frontend:** Astro, Tailwind CSS, Three.js (simulación 3D).
- **Backend:** Astro API Routes (`/api/*`), Middleware de autenticación.
- **Fuentes de Datos (Externas):** Open-Meteo (Clima Global), SIATA (Clima Local Medellín).
- **Autenticación:** Auth.js (via `auth-astro`).

---

## 2. Estructura de Directorios

El patrón arquitectónico utilizado separa la presentación (UI) de la lógica de negocio y las llamadas a red (Servicios y Backend).

```text
/src
├── components/      # UI Reutilizable (Arquitectura de componentes)
│   ├── Dashboard.astro    # Vista principal 3D e instanciación de Three.js
│   ├── navbar.astro       # Navegación y estado de sesión
│   ├── Historial.astro    # Visualización de datos pasados
│   ├── Metrics.astro      # Tarjetas de KPI (Temp, Humedad)
│   └── Settings.astro     # Configuración de usuario
│
├── layouts/         # Plantillas base (HTML Wrapper)
│   └── Layout.astro       # Head, Metadatos, inyección del Navbar
│
├── pages/           # Enrutamiento (File-based routing)
│   ├── index.astro        # Landing / Login
│   ├── dashboard/         # Rutas protegidas (UI Privada)
│   └── api/               # ENDPOINTS BACKEND (SSR)
│       └── siata.ts       # Proxy interno hacia API SIATA
│
├── services/        # Capa de abstracción de datos (Cliente y Servidor)
│   ├── weather.ts         # Integración con Open-Meteo
│   └── siata.ts           # Integración con SIATA (Llama al Proxy interno)
│
└── middleware.ts    # Interceptor global para protección de rutas privadas
```

---

## 3. Flujo de Autenticación y Seguridad (Middleware)
Toda solicitud hacia el servidor de Astro es interceptada por `src/middleware.ts` antes de ser renderizada.
1. El usuario intenta acceder a `/dashboard`.
2. El middleware invoca a `auth-astro` para comprobar si existe una sesión válida (cookie segura).
3. **Denegado:** Si no hay sesión, se redirige forzosamente a `/`.
4. **Autorizado:** La petición continúa, la página se renderiza con SSR devolviendo el HTML compilado.

---

## 4. Integraciones de Datos

### 4.1. Servicio del Clima Global (Open-Meteo)
Se utiliza para obtener temperatura, humedad y predicción de lluvia basándose en coordenadas geográficas.
- **Ubicación:** `src/services/weather.ts`
- **Flujo:** La función `fetchWeatherData()` realiza la petición al API externo, formatea los datos y los retorna limpios a los componentes de Astro.

### 4.2. Servicio de Clima Local (SIATA)
SIATA provee alertas tempranas para el Valle de Aburrá. Para evitar problemas de seguridad del navegador como los bloqueos de **CORS** (Cross-Origin Resource Sharing), se aplica un patrón de Proxy.
- **El Backend (Proxy):** `src/pages/api/siata.ts` realiza la petición a los servidores reales de SIATA y retransmite la respuesta.
- **El Frontend (Cliente):** `src/services/siata.ts` hace peticiones limpias a `/api/siata` asumiendo que provienen del mismo dominio.

---

## 5. Simulación 3D (Three.js)
El corazón del Dashboard (`Dashboard.astro`) consiste en un canvas generado por **Three.js**.
- Utiliza Vanilla JavaScript para evitar la sobrecarga de frameworks como React (React Three Fiber), manteniendo una huella de memoria ligera.
- La órbita del sol (luz direccional) es dinámica, respondiendo al avance del tiempo para proyectar sombras realistas sobre el modelo del invernadero.

---

## 6. Evolución Futura y Persistencia de Datos
Para escalar esta arquitectura y manejar la persistencia de datos del invernadero, se contempla la siguiente estrategia:

### Decisión de Base de Datos
Debido a que el frontend (Astro) y el backend se pueden desplegar en entornos Serverless (ej. Vercel, Netlify) y a la necesidad de visualizar el dashboard remotamente, la estrategia recomendada es usar una **Base de Datos en la Nube (BaaS)**:

- **Supabase (Recomendado para estructuración):** Proporciona una base de datos PostgreSQL en la nube, ideal para almacenar el `Historial` de forma estructurada relacional y realizar gráficas analíticas avanzadas. Soporta actualizaciones en tiempo real.
- **Firebase Realtime Database (Alternativa IoT):** Ideal si el flujo de datos desde los sensores (ej. Arduino) es extremadamente constante y se requiere la mínima latencia para mover indicadores del Dashboard en tiempo real.

*Nota:* Las bases de datos locales (ej. SQLite en un archivo físico) quedan descartadas a menos que el Dashboard se aloje exclusivamente de manera offline en un dispositivo embebido (como una Raspberry Pi) dentro del propio invernadero.

### Otras Consideraciones
- **Estado Global:** En caso de necesitar compartir estado entre "islas" desconectadas (Astro Islands), se implementará **Nano Stores** (Estado atómico de UI).
- **IoT / WebSockets:** Si el invernadero se conecta a hardware real (Arduino / ESP32), se requerirá la apertura de canales bidireccionales (WebSockets o MQTT) para ver la temperatura y controlar actuadores en tiempo real.
