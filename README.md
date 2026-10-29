# Dinobox

Sistema de encomiendas para la Evaluación Formativa 3 de Desarrollo Fullstack II (DSY1104).

- **Backend:** Spring Boot + Spring Data JPA + MySQL + Swagger
- **Frontend:** React + Axios + Bootstrap

## Requisitos

- Java 17 o superior
- Node.js 18 o superior
- MySQL (por ejemplo con XAMPP) encendido

## 1. Base de datos

Encender MySQL. La base de datos `dinobox` y la tabla `encomienda` se crean solas al iniciar el backend.

Por defecto se usa el usuario `root` sin contraseña (como en XAMPP). Si tu MySQL tiene contraseña,
cámbiala en `backend/src/main/resources/application.properties`:

```
spring.datasource.password=tu_clave
```

## 2. Backend

```
cd backend
mvnw.cmd spring-boot:run
```

(En Mac o Linux: `./mvnw spring-boot:run`)

Queda funcionando en http://localhost:8080

Documentación Swagger: http://localhost:8080/swagger-ui.html

## 3. Frontend

En otra terminal:

```
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

## Endpoints

| Método | URL | Descripción |
|---|---|---|
| POST | /api/v1/encomienda | Registrar encomienda (responde con el código de seguimiento) |
| GET | /api/v1/encomienda | Listar encomiendas |
| GET | /api/v1/encomienda/{codigo} | Buscar encomienda por código |
| PUT | /api/v1/encomienda/{codigo} | Actualizar estado y ubicación |
| DELETE | /api/v1/encomienda/{codigo} | Eliminar encomienda |

Ejemplo para crear (POST):

```json
{
  "remitente": "Ana Rojas",
  "destinatario": "Pedro Soto",
  "direccion": "Av. Apoquindo 4500",
  "descripcion": "Libros"
}
```

Ejemplo para actualizar (PUT):

```json
{
  "estado": "En Tránsito",
  "ubicacion": "La Florida"
}
```

Estados posibles: En Recepción, En Despacho, En Tránsito, Entregado.
