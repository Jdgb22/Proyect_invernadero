# 🌿 Proyecto Invernadero - Dashboard 3D

[![Astro](https://img.shields.io/badge/Astro-7.2.8-black?style=for-the-badge&logo=astro)](https://astro.build)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-000000?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Auth.js](https://img.shields.io/badge/Auth.js-0.41.3-orange?style=for-the-badge&logo=auth0)](https://authjs.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-8.23.0-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

Plataforma web enfocada en la simulación 3D interactiva y monitoreo en tiempo real de variables climáticas de un invernadero.

**Autores:**
- Nixon Ramirez
- Luis Manuel Florez
- Mateo Herrera
- Juan David Giraldo
- Alejandro Florez
- Luis Angel Mesa

---

## 🚀 Tecnologías Principales

Este proyecto está construido con una arquitectura moderna enfocada en rendimiento y renderizado en el servidor (SSR). Para más detalles, consulta la [Documentación de Arquitectura](./ARCHITECTURE.md).

- **Framework:** [Astro](https://astro.build) (Modo SSR con Node.js)
- **Simulación 3D:** [Three.js](https://threejs.org/) (Vanilla JS para optimización)
- **Estilos:** Tailwind CSS
- **Autenticación:** Auth.js (`auth-astro`)
- **Fuentes de Datos:** API Open-Meteo (Global), API SIATA (Local - Medellín)

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu máquina:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [pnpm](https://pnpm.io/) (Gestor de paquetes utilizado en este proyecto)

---

## 💻 Instalación y Ejecución Local

Sigue estos pasos para levantar el entorno de desarrollo en tu máquina local:

1. **Clona el repositorio e instala las dependencias:**

   ```bash
   pnpm install
   ```

2. **Configuración de Variables de Entorno:**
   Crea un archivo `.env` en la raíz del proyecto basado en las integraciones necesarias. Si utilizas autenticación, asegúrate de generar un secreto:

   ```env
   # Genera un secreto seguro en la terminal con: openssl rand -base64 32
   AUTH_SECRET="tu_secreto_generado"
   AUTH_TRUST_HOST=true
   ```

3. **Inicia el servidor de desarrollo:**
   Para ejecutar el proyecto, puedes usar el comando estándar:

   ```bash
   pnpm dev
   ```

   > **Nota para desarrolladores:** También puedes ejecutar el servidor en segundo plano usando la directiva de Astro: `pnpm astro dev --background`. Si lo haces, puedes administrarlo con `pnpm astro dev stop` o ver los logs con `pnpm astro dev logs`.

4. **Abre la aplicación:**
   Navega a `http://localhost:4321` en tu navegador.

---

## 📦 Comandos Disponibles

| Comando            | Descripción                                                       |
| :----------------- | :---------------------------------------------------------------- |
| `pnpm install`     | Instala todas las dependencias del proyecto.                      |
| `pnpm dev`         | Inicia el servidor de desarrollo local.                           |
| `pnpm build`       | Compila el proyecto para producción en el directorio `./dist/`.   |
| `pnpm preview`     | Previsualiza el proyecto compilado localmente antes de desplegar. |
| `pnpm astro check` | Ejecuta validaciones de tipos en los archivos de Astro.           |

---

## 📚 Documentación Adicional

- [Arquitectura del Sistema](./ARCHITECTURE.md) - Detalle técnico del flujo de datos, middleware y Three.js.
- **Documentación Interna (JSDoc):** El código fuente está fuertemente documentado con JSDoc. Si eres desarrollador, puedes explorar `src/backend/services/` o `src/middleware.ts` en tu editor de código para ver las explicaciones detalladas y ayudas de autocompletado en cada función.
