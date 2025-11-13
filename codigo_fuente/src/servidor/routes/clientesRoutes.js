const express = require('express');
const ClientesController = require('../controllers/clientesController');
const router = express.Router();

// GET /api/clientes?busqueda=texto
router.get('/', ClientesController.traerClientes);

// GET /api/clientes/:id
router.get('/:id', ClientesController.traerClientePorId);

// POST /api/clientes
router.post('/', ClientesController.crearCliente);

// PUT /api/clientes/:id
router.put('/:id', ClientesController.modificarCliente);

// DELETE /api/clientes/:id
router.delete('/:id', ClientesController.eliminarCliente);

module.exports = router;