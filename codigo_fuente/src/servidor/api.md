# 📚 Documentación de la API -- Gestión de Clientes (Node.js + Express + MySQL)

Este proyecto implementa una API REST para la gestión de clientes, utilizando:

-   **Node.js**
-   **Express**
-   **MySQL**
-   **Programación Orientada a Objetos** (Modelos, Controladores, MVC)
-   **Validaciones básicas** (email, datos obligatorios, emails duplicados)

La API permite realizar operaciones CRUD completas: **leer, buscar, crear, actualizar y eliminar clientes.**

**URL Deploy en Render:** https://gestion-clientes-ywnc.onrender.com

------------------------------------------------------------------------

## 🏠 Estructura del servidor

```
servidor/
  app.js
  config/
    db.js
  models/
    Cliente.js
  controllers/
    clientesController.js
  routes/
    clientesRoutes.js
```

------------------------------------------------------------------------

## 🧩 Requisitos previos

###  Base de datos

Importar `db.sql` en MySQL para crear la base de datos `clientesdb` y la tabla `clientes`.

### Dependencias

En la carpeta `servidor`:

``` bash
npm install
```

### Arranque del servidor

``` bash
npm start
```

Servidor disponible en: http://localhost:3000

------------------------------------------------------------------------

## 🚀 Uso de la API con Postman

[**URL Documentación:**] (https://documenter.getpostman.com/view/48057542/2sB3WvLxt7) Todas las respuestas son en formato **JSON**.

------------------------------------------------------------------------

## 👉 Endpoints

### Leer/traer todos los clientes

**GET** `/api/clientes`

**Ejemplo de uso:**

    GET http://localhost:3000/api/clientes

**Respuesta 200 OK**

``` json
[
  {
    "id": 1,
    "nombre": "Angélica",
    "apellidos": "Serrano López",
    "email": "angelica@example.com",
    "telefono": "600000000",
    "fecha_alta": "2025-11-10T10:00:00.000Z",
    "notas": "Cliente VIP"
  }
]
```

------------------------------------------------------------------------

### Buscar clientes por texto

**GET** `/api/clientes?search=texto`

Busca en nombre, apellidos y email.

**Ejemplo:**

    GET http://localhost:3000/api/clientes?search=bea

**Respuesta 200 OK**

``` json
[
  {
    "id": 2,
    "nombre": "Beatriz",
    "apellidos": "Serrano García",
    "email": "bea@example.com",
    "telefono": "600000001",
    "fecha_alta": "2025-11-11T09:30:00.000Z",
    "notas": null
  }
]
```

------------------------------------------------------------------------

### Leer/traer cliente por ID

**GET** `/api/clientes/:id`

**Ejemplo:**

    GET http://localhost:3000/api/clientes/1

**Respuesta 200 OK**

``` json
{
  "id": 1,
  "nombre": "Angélica",
  "apellidos": "Serrano López",
  "email": "angelica@example.com",
  "telefono": "600000000",
  "fecha_alta": "2025-11-10T10:00:00.000Z",
  "notas": "Cliente VIP"
}
```

**Respuesta 404 Not Found**

``` json
{
  "error": "Cliente no encontrado"
}
```

------------------------------------------------------------------------

### Crear un nuevo cliente

**POST** `/api/clientes`

**Body (JSON):**

``` json
{
  "nombre": "Nuevo",
  "apellidos": "Cliente",
  "email": "nuevo@example.com",
  "telefono": "600000555",
  "notas": "Añadido desde Postman"
}
```

**Respuesta 201 Created**

``` json
{
  "id": 3,
  "nombre": "Nuevo",
  "apellidos": "Cliente",
  "email": "nuevo@example.com",
  "telefono": "600000555",
  "fecha_alta": "2025-11-13T10:15:00.000Z",
  "notas": "Añadido desde Postman"
}
```

**Errores posibles** - Campos obligatorios faltantes:
`json   { "error": "Nombre, apellidos y email son obligatorios" }` -
Email inválido: `json   { "error": "Email inválido" }` - Email ya
registrado: `json   { "error": "Ya existe un cliente con ese email" }`

------------------------------------------------------------------------

### Modificar/actualizar un cliente

**PUT** `/api/clientes/:id`

**Ejemplo:**

    PUT http://localhost:3000/api/clientes/3

**Body:**

``` json
{
  "nombre": "Nuevo",
  "apellidos": "Modificado",
  "email": "nuevo@example.com",
  "telefono": "600000999",
  "notas": "Actualizado"
}
```

**Respuesta 200 OK**

``` json
{
  "id": 3,
  "nombre": "Nuevo",
  "apellidos": "Modificado",
  "email": "nuevo@example.com",
  "telefono": "600000999",
  "fecha_alta": "2025-11-13T10:15:00.000Z",
  "notas": "Actualizado"
}
```

------------------------------------------------------------------------

### Eliminar/borrar un cliente

**DELETE** `/api/clientes/:id`

**Ejemplo:**

    DELETE http://localhost:3000/api/clientes/3

**Respuesta 200 OK**

``` json
{
  "mensaje": "Cliente borrado correctamente"
}
```

**Respuesta 404 Not Found**

``` json
{
  "error": "Cliente no encontrado"
}
```

------------------------------------------------------------------------

## ⭐ Notas finales

-   La API sigue el patrón **MVC**.
-   La clase `Cliente` implementa la lógica del modelo en POO.
-   El controlador gestiona validaciones básicas.
-   Las rutas exponen los endpoints REST.