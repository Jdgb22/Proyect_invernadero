# Diagramas de Actividad

## AD-001: Flujo de Login del Usuario

```mermaid
flowchart TD
    A[Usuario navega a login] --> B[Ingresar email y contraseña]
    B --> C{Credenciales válidas?}
    C -- No --> D[Mostrar error "Credenciales inválidas"]
    D --> B
    C -- Sí --> E[Generar token de sesión]
    E --> F[Guardar sesión en cookies]
    F --> G[Redirigir al dashboard]
    G --> H[Mostrar bienvenida usuario]
```

## AD-002: Flujo de Configuración de Umbrales de Alerta

```mermaid
flowchart TD
    A[Usuario accede a configuración] --> B[Ingresar umbrales temperatura]
    B --> C[Ingresar umbrales humedad]
    C --> D[Ingresar umbrales luz]
    D --> E[Validar que min < max]
    E -- No --> F[Mostrar error: "Mínimo debe ser menor que máximo"]
    F --> B
    E -- Sí --> G[Guardar configuración en BD]
    G --> H[Mostrar confirmación "Configuración guardada"]
    H --> I[Sistema comienza monitoreo]
    I --> J[Generar alerta si se supera umbral]
    J --> K[Mostrar notificación push/toast]
```

## AD-003: Flujo de Exportación de Datos

```mermaid
flowchart TD
    A[Usuario selecciona rango de fechas] --> B[Seleccionar tipo de dato (temp/humedad/luz)]
    B --> C{Hacer clic en Exportar}
    C -- No --> [Continuar usando aplicación]
    C -- Sí --> D[Solicitar formato de archivo]
    D -- Excel --> E[Generar archivo .xlsx con ExcelJS]
    D -- CSV --> F[Generar archivo .csv]
    E --> G[Descargar archivo automáticamente]
    F --> G
    G --> H[Mostrar notificación "Descarga completada"]
```

## AD-004: Flujo de Sincronización con Google Sheets

```mermaid
flowchart TD
    A[Usuario accede a página sincronización] --> B[Ingresar ID hoja Google Sheets]
    B --> C[Ingresar credenciales de servicio]
    C --> D[Seleccionar intervalo de sincronización]
    D --> E[Hacer clic en "Iniciar sincronización"]
    E --> F[Validar credenciales y conexión]
    F -- Fallo --> G[Mostrar error "Error de autenticación"]
    G --> A
    F -- Éxito --> H[Obtener datos actuales de PostgreSQL]
    H --> I[Formatear datos según esquema Sheets]
    I --> J[Escribir datos en hoja Google Sheets]
    J --> K[Mostrar confirmación "Sincronización completada"]
    K --> L[Programar próxima sincronización según intervalo]
```