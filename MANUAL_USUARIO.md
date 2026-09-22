# 📖 Manual de Usuario - Proyecto Invernadero

¡Bienvenido al **Proyecto Invernadero**! Esta plataforma te permite monitorear y visualizar en tiempo real las condiciones climáticas de tu invernadero a través de un entorno 3D interactivo.

Este manual te guiará paso a paso sobre cómo utilizar todas las funcionalidades del sistema.

---

## 1. Acceso al Sistema (Inicio de Sesión)

Para proteger la información, el sistema requiere autenticación.

1. Al ingresar a la página principal, verás la pantalla de inicio.
2. Haz clic en el botón de **Iniciar Sesión**.
3. Ingresa tus credenciales o utiliza el proveedor de acceso configurado.
4. Si el inicio de sesión es exitoso, serás redirigido automáticamente a la vista principal: el **Dashboard**.

---

## 2. El Dashboard Principal (Simulación 3D)

El Dashboard es el corazón de la plataforma. Aquí encontrarás la representación virtual de tu invernadero.

### Interactuando con el Modelo 3D
- **Navegación:** Puedes usar tu ratón (o gestos táctiles en móviles) para rotar la vista alrededor del invernadero. Haz clic, mantén presionado y arrastra para cambiar el ángulo.
- **Iluminación Dinámica:** La simulación está sincronizada con el reloj. La posición del sol (y por tanto las sombras generadas dentro y fuera del invernadero) cambiará automáticamente dependiendo de si es de mañana, tarde o noche, dándote una vista realista.

### Panel de Indicadores (Métricas en Tiempo Real)
Junto a la simulación 3D, verás tarjetas flotantes con la información climática actual:
- **Temperatura:** Muestra los grados actuales. Si el invernadero se encuentra en el Valle de Aburrá, esta temperatura se alimenta de la red local **SIATA** para ofrecer la máxima precisión.
- **Humedad Relativa:** El nivel de humedad en el ambiente.
- **Probabilidad de Lluvia:** Te indica qué tan probable es que llueva en la hora actual.
- **Estado Visual:** Un ícono (ej. ☀️, 🌧️, ☁️) que resume la condición del clima general.

---

## 3. Navegación Adicional

Utiliza el menú principal (Navbar) para acceder a otras secciones del sistema:

### 📈 Historial
En esta sección podrás revisar el comportamiento de las métricas (como los picos de temperatura o bajones de humedad) a través del tiempo. Es fundamental para tomar decisiones sobre el riego o la ventilación del cultivo a largo plazo.

### ⚙️ Configuración (Settings)
Aquí puedes gestionar tu perfil de usuario y ajustar tus preferencias personales de visualización del dashboard.

---

## 4. Preguntas Frecuentes

**¿De dónde provienen los datos del clima?**
El sistema es inteligente. Si estás consultando desde el Área Metropolitana de Medellín (Valle de Aburrá), el sistema se conecta automáticamente a los sensores de **SIATA**. Si el invernadero está en otra zona geográfica (o SIATA no está disponible), el sistema cambia automáticamente al servicio global **Open-Meteo**.

**¿Por qué el modelo 3D se ve oscuro?**
La iluminación del modelo 3D refleja la hora del día. Si ingresas a la plataforma en horas de la noche, el sol en la simulación se habrá ocultado.
