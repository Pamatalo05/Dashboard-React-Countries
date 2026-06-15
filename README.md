# Dashboard de Países - Entrega

---

## Información del Candidato

- **Nombre:** Paulo Tapia Loor
- **Email:** paulo.tapia03@gmail.com
- **Fecha:** 14 de junio de 2026

---

## Enlaces del Proyecto

| Tipo de Enlace | URL |
|----------------|-----|
| Repositorio de GitHub | https://github.com/Pamatalo05/Dashboard-React-Countries |
| Video de Loom | https://www.loom.com/share/3eae8cc85e8c4a37952236df42c45932 |
| Demo en Vivo | https://dashboardcountries.vercel.app/ |

---

## Instrucciones de Configuración

```bash
git clone https://github.com/Pamatalo05/Dashboard-React-Countries.git
cd Dashboard-React-Countries
npm install
npm run dev
# Abrir en http://localhost:5173
```

---

## Tecnologías Utilizadas

- [x] React 19
- [x] Vite
- [x] CSS puro con variables CSS para temas
- [x] Vitest para pruebas unitarias
- [x] Vercel para el despliegue

---

## Características Implementadas

### Características Principales

| Característica | Estado | Notas |
|----------------|--------|-------|
| Lista de Países |  | Grilla de tarjetas con bandera, nombre, capital, población y región |
| Funcionalidad de Búsqueda |  | Búsqueda en tiempo real, insensible a mayúsculas |
| Filtro por Región |  | Selector desplegable con las 5 regiones |
| Vista Detallada del País |  | Nombre nativo, idiomas, monedas, fronteras, TLD |
| Estados de Carga |  | Spinner animado mientras se obtienen los datos |
| Manejo de Errores |  | Mensaje de error con botón de reintento |

### Características Extra

| Característica | Estado | Notas |
|----------------|--------|-------|
| Diseño Responsivo |  | Adaptado para móvil, tablet y escritorio |
| Modo Oscuro/Claro |  | Toggle con persistencia de preferencia |
| Funcionalidad de Ordenamiento |  | Por nombre, población o área |
| Favoritos (localStorage) |  | Sistema de favoritos con animación de celebración |
| TypeScript |  | |
| Pruebas Unitarias |  | Implementadas con Vitest |
| Despliegue en Vivo |  | https://dashboardcountries.vercel.app/ |

---

## Capturas de Pantalla

### Página Principal

![Dashboard inicio](screenshots/dashboard%20incio.png)
> Vista principal con todos los países cargados en formato de grilla.

### Modo Oscuro

![Modo oscuro](screenshots/design%20dark.png)
> Tema oscuro activado desde el toggle en la barra superior.

### Búsqueda por Nombre

![Filtro por nombre](screenshots/filtro%20por%20nombre.png)
> Búsqueda en tiempo real filtrando países por nombre.

### Ordenamiento por Población

![Filtro por población](screenshots/filtro%20por%20pobalcion.png)
> Países ordenados por población de mayor a menor.

### Filtro por Región

![Filtro por región](screenshots/filtro%20por%20region.png)
> Lista filtrada mostrando únicamente los países de una región seleccionada.

---

## Estructura del Proyecto

```
src/
├── components/
│   ├── CountryCard.jsx
│   ├── CountryList.jsx
│   ├── CountryDetail.jsx
│   ├── SearchBar.jsx
│   ├── RegionFilter.jsx
│   └── LoadingSpinner.jsx
├── hooks/
│   └── useCountries.jsx
├── App.jsx
├── App.css
└── main.jsx
api/
└── countries.js
```

---

## Desafíos Enfrentados

### Desafío 1: Integración con la API

**Problema:** La API de países requiere una clave de autorización y bloquea las solicitudes directas desde el navegador por restricciones de CORS. Intenté varias formas de conectarme directamente pero todas resultaban en errores 403 o de CORS.

**Solución:** Durante el desarrollo local creé un servidor proxy en Node.js que recibía las solicitudes de la app y las redirigía a la API con la clave de autorización incluida. Para producción, reemplacé el proxy con una API Route de Vercel en `api/countries.js`, que funciona como un endpoint serverless y resuelve el problema sin necesidad de infraestructura adicional.

### Desafío 2: Paginación de la API

**Problema:** La API no devuelve todos los países en una sola respuesta sino en páginas de 25 registros, lo que requería hacer múltiples solicitudes para obtener el listado completo.

**Solución:** Implementé una función `fetchAllCountries` que hace solicitudes en bucle incrementando el offset hasta que la API indica que no hay más datos disponibles, acumulando todos los resultados antes de actualizar el estado.

---

## Lo Que Aprendí

- A resolver problemas de CORS en entornos de desarrollo y producción con soluciones distintas según el contexto
- A crear API Routes en Vercel para actuar como proxy serverless
- A normalizar datos de una API con estructura compleja antes de usarlos en los componentes
- A manejar paginación en una API REST desde un custom hook en React

---

## Si Tuviera Más Tiempo

- [ ] Agregar TypeScript para mayor seguridad en los tipos de datos
- [ ] Mejorar la cobertura de pruebas unitarias incluyendo los componentes principales
- [ ] Implementar caché de resultados para evitar solicitudes repetidas al recargar
- [ ] Agregar un mapa interactivo en la vista de detalle de cada país

---

## Auto-Evaluación

| Área | Calificación (1-5) | Comentarios |
|------|-------------------|-------------|
| Funcionalidad |  | Todas las características requeridas y la mayoría de las extra implementadas |
| Calidad del Código |  | Código organizado con separación de responsabilidades y custom hook |
| UI/UX |  | Interfaz limpia, responsive y con soporte de modo oscuro |
| Documentación |  | README completo con instrucciones, capturas y descripción de desafíos |

---

## Notas Adicionales

La integración con la API fue el punto más desafiante del proyecto y el que más tiempo consumió. La solución con Vercel API Routes resultó ser más limpia y mantenible que el proxy local, y es la que quedó implementada en producción.

---
