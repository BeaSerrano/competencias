# 📚 Documentación de la API — Gestión de Clientes (Node.js + Express + MySQL)

Este proyecto implementa una API REST para la gestión de clientes, utilizando Node.js, Express, MySQL, POO y arquitectura MVC.  
Incluye despliegue en **Render** y base de datos remota MySQL en **FreeSQLDatabase.com**.

**URL del backend en Render:**  
https://gestion-clientes-ywnc.onrender.com

---

## 🗄️ Conexión a MySQL en producción

Render no ofrece MySQL propio, por lo que se usa FreeSQLDatabase.com:

```
DB_HOST=sqlXXXX.freesqldatabase.com
DB_PORT=3306
DB_USER=sqlXXXX
DB_PASSWORD=*********
DB_NAME=sqlXXXX
```

El backend lee estas variables desde `config/db.js`.

### Adaptación SQL a MySQL 5.5

```sql
fecha_alta TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
```

---

## 🧱 Arquitectura del servidor

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

---

## 🧩 Uso local

### Crear base de datos

```sql
CREATE DATABASE clientesdb;
USE clientesdb;
SOURCE db.sql;
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar servidor

```bash
npm start
```

---

## 🚀 Documentación Postman

https://documenter.getpostman.com/view/48057542/2sB3WvLxt7

---

# 👉 Endpoints

## 📌 Obtener todos los clientes  
**GET** `/api/clientes`

## 📌 Buscar por texto  
**GET** `/api/clientes?search=texto`

## 📌 Obtener un cliente por ID  
**GET** `/api/clientes/:id`

## 📌 Crear un cliente  
**POST** `/api/clientes`

## 📌 Actualizar un cliente  
**PUT** `/api/clientes/:id`

## 📌 Borrar un cliente  
**DELETE** `/api/clientes/:id`

---

# ⭐ Notas finales

- API en MVC completo  
- Backend en Render  
- MySQL remoto en FreeSQLDatabase  
- Frontend compatible con GitHub Pages  