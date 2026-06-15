# Countries Dashboard

Aplicación web construida con React que permite explorar información detallada de países alrededor del mundo. Desarrollada como parte del proceso de prácticas en Jelou.

## Demo en vivo

https://dashboardcountries.vercel.app/

## Repositorio

https://github.com/Pamatalo05/Dashboard-React-Countries

---

## Configuración del proyecto

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/Pamatalo05/Dashboard-React-Countries.git
cd Dashboard-React-Countries
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Tecnologías utilizadas

- React 19 con Vite
- CSS puro con variables para soporte de modo oscuro y claro
- API REST Countries v5 mediante Vercel API Routes
- Vitest para pruebas unitarias
- Vercel para el despliegue

---

## Características implementadas

### Funcionalidades principales

- Listado de países en formato de grilla con tarjetas que muestran bandera, nombre, capital, población y región
- Búsqueda en tiempo real por nombre de país, sin distinción de mayúsculas o minúsculas
- Filtrado por región mediante un selector desplegable
- Vista de detalle al hacer clic en una tarjeta, con información extendida como nombre oficial, nombre nativo, idiomas, monedas, dominios de nivel superior y países fronterizos
- Indicador de carga mientras se obtienen los datos
- Mensaje de error con botón de reintento si la solicitud falla

### Funcionalidades adicionales

- Modo oscuro y claro con persistencia de preferencia
- Sistema de países favoritos con almacenamiento en localStorage
- Animación de celebración al marcar un país como favorito
- Visualización de la hora local actual de cada país
- Ordenamiento por nombre, población o área
- Diseño completamente responsive para móvil y escritorio
- Pruebas unitarias con Vitest

---

## Capturas de pantalla

### Vista principal

![Dashboard inicio](screenshots/dashboard%20incio.png)

### Modo oscuro

![Modo oscuro](screenshots/design%20dark.png)

### Búsqueda por nombre

![Filtro por nombre](screenshots/filtro%20por%20nombre.png)

### Ordenamiento por población

![Filtro por población](screenshots/filtro%20por%20pobalcion.png)

### Filtro por región

![Filtro por región](screenshots/filtro%20por%20region.png)

---

## Desafíos enfrentados

El mayor obstáculo del proyecto fue lograr que la API funcionara correctamente. Esto me llevó aproximadamente dos horas y fue el punto más complejo de todo el desarrollo.

La API de países requiere una clave de autorización y no permite solicitudes directas desde el navegador debido a restricciones de CORS y autenticación. Intenté varias aproximaciones antes de encontrar la solución: modificar los headers, probar distintos endpoints y ajustar la configuración del fetch. Ninguna de esas alternativas funcionó de forma directa.

Durante el desarrollo local resolví esto creando un servidor proxy en Node.js. En lugar de que el navegador consulte la API directamente, la aplicación hacía las solicitudes al proxy, y era este quien se comunicaba con la API usando la clave de autorización, eliminando completamente los errores de CORS.

Para el despliegue en Vercel, el proxy local no está disponible. Resolví esto creando una API Route dentro del propio proyecto en `api/countries.js`. Vercel detecta esa carpeta automáticamente y la expone como un endpoint serverless, replicando en producción exactamente lo que el proxy hacía en local. La variable `import.meta.env.PROD` permite apuntar a uno u otro según el entorno sin ningún cambio manual.

---

## Video de demostración

> Pendiente de grabación. Se agregará el enlace de Loom aquí.

---

## Autor

Paulo Tapia Loor
