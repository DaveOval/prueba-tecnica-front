# Prueba Técnica Frontend - ImgBest

Esta es una aplicación web desarrollada como prueba técnica para ImgBest. La aplicación permite a los usuarios subir y gestionar imágenes de manera eficiente.

## Tecnologías Utilizadas

- **Next.js 15.3.2** - Framework de React para desarrollo web
- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Redux Toolkit** - Manejo de estado global
- **Tailwind CSS** - Framework de utilidades CSS
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **Docker** - Contenedorización de la aplicación

## Prerrequisitos

- Node.js 20 o superior
- Docker y Docker Compose
- Git

## Instalación y Ejecución

### Usando Docker 

1. Clona el repositorio:
```bash
git clone https://github.com/DaveOval/prueba-tecnica-front
cd prueba-tecnica-front
```

2. Ejecuta la aplicación con Docker Compose:
```bash
docker-compose up --build
```

La aplicación estará disponible en `http://localhost:3000`

### Desarrollo Local

1. Instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

## Variables de Entorno

La aplicación requiere las siguientes variables de entorno:

- `NEXT_PUBLIC_API_URL`: URL de la API (por defecto: http://localhost:8000/)

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## Características Principales

- Subida de imágenes
- Gestión de estado con Redux
- Validación de formularios
- Manejo de errores
- Optimización de rendimiento


