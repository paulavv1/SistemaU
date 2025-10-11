<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

---

## Sistema Universitario API

API REST modular desarrollada con **NestJS** y **Prisma**, que gestiona un sistema universitario con los siguientes recursos:  

- Carreras  
- Especialidades  
- Docentes  
- Ciclos  
- Materias  
- Estudiantes  
- Inscripciones  

> La API implementa **GET** (listado con paginación y por ID) y **POST** mínimo para crear registros con **DTOs validados**, manejo de errores y buenas prácticas.

---

## Tecnologías
- Node.js / TypeScript  
- NestJS 10+  
- Prisma 5+  
- PostgreSQL  
- class-validator / class-transformer  

---

## Requisitos
- Node.js 18+  
- PostgreSQL  
- npm  

---

## Configuración

1. Clonar el repositorio:  
```bash
git clone <tu-repositorio>
cd my-app
---
## Instalar dependencias
-npm install

---
## Configurar la base de datos en .env:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/NOMBRE_DB?schema=public"
PORT=3000
Ejecutar migraciones de Prisma:

npx prisma migrate dev --name init


Generar cliente Prisma:

npx prisma generate
Ejecutar el proyecto
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod

Ejecutar el proyecto
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod
La API estará disponible en http://localhost:3000.
Endpoints Principales

Todos los endpoints soportan paginación mediante query params: ?page=1&limit=10.

Carreras

GET /carreras → Lista paginada

GET /carreras/:id → Obtener por ID

POST /carreras → Crear nueva carrera

Especialidades

GET /especialidades

GET /especialidades/:id

POST /especialidades

Docentes

GET /docentes

GET /docentes/:id

POST /docentes

Ciclos

GET /ciclos

GET /ciclos/:id

POST /ciclos

Materias

GET /materias

GET /materias/:id

POST /materias

Estudiantes

GET /estudiantes

GET /estudiantes/:id

POST /estudiantes

Inscripciones

GET /inscripciones

GET /inscripciones/:id

POST /inscripciones
Estructura del Proyecto
src/
├─ app.module.ts
├─ main.ts
├─ prisma/
│  ├─ prisma.module.ts
│  └─ prisma.service.ts
├─ carreras/
├─ especialidades/
├─ docentes/
├─ ciclos/
├─ materias/
├─ estudiantes/
└─ inscripciones/
Buenas Prácticas Implementadas

Validación de DTOs con class-validator

Manejo de errores con NotFoundException

Respuesta estandarizada en POST

Paginación en endpoints GET

Estructura modular por recurso

Uso de PrismaService inyectable para acceder a la base de datos
