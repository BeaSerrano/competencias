# 📚 Documentación del Cliente (Frontend)

Parte de cliente construida con **HTML, CSS, Bootstrap y JavaScript Vanilla**, organizada utilizando un patrón MVC adaptado para frontend.

- **HTML5**
- **CSS / Bootstrap**
- **JavaScript**
- **Fetch API**

------------------------------------------------------------------------

## 🏠 Estructura de cliente
```
cliente/
  index.html
  css/
    styles.css
  js/
    modelCliente.js
    serviceApi.js
    appController.js
```

------------------------------------------------------------------------

## Modelo
`modelCliente.js` define la clase `Cliente` con propiedades y getter `nombreCompleto`.

## Servicio API
`serviceApi.js` contiene funciones:
- apiFetchClientes()
- apiCreateCliente()
- apiUpdateCliente()
- apiDeleteCliente()

Todas consumen la API del servidor mediante Fetch.

## Controlador
`appController.js` gestiona:
- Eventos de formularios
- Renderizado de tabla
- Validaciones
- Comunicación con la API
- Estados de carga y alertas

## Vista
`index.html` contiene:
- Formulario de creación
- Tabla dinámica
- Contenedores de mensajes y carga

## Ejecución
El servidor backend sirve también el frontend.  
Acceder desde:

```
http://localhost:8080
```