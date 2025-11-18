const Cliente = require('../models/Cliente')

// validación email
const validarEmail = (email)  => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(String(email).toLowerCase())
}

// validación teléfono España
const validarTelefono = (telefono) => {
    const regex = /^(\+34)?[\d\s-]{9,15}$/
    return regex.text(String(telefono).toLowerCase())
}

// controlador cliente
class ClientesController {
    static async traerClientes(req, res) {
        try {
            const { busqueda } = req.query
            const clientes = await Cliente.encontrarClientes({ busqueda })
            res.json(clientes)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener los clientes' })
        }
    }

    static async traerClientePorId(req, res) {
        try {
            const { id } = req.params
            const cliente = await Cliente.encontrarClientePorId(id)

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' })
            }

            res.json(cliente)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el cliente' })
        }
    }

    static async crearCliente(req, res) {
        try {
            const { nombre, apellidos, email, telefono, notas } = req.body

            if (!nombre || !apellidos || !email) {
                return res.status(400).json({ error: 'Loos campos nombre, apellidos y email son obligatorios' })
            }

            if (!validarEmail(email)) {
                return res.status(400).json({ error: 'El campo email no es válido' })
            }

            if(!validarTelefono(telefono)) {
                return res.status(400).json({ error: 'El campo teléfono no es válido' })
            }

            const emailExiste = await Cliente.encontrarClientePorEmail(email)
            
            if (emailExiste) {
                return res.status(400).json({ error: 'El email ya existe' })
            }

            const nuevoCliente = new Cliente({ nombre, apellidos, email, telefono, notas })
            const clienteGuardado = await nuevoCliente.guardarCliente()

            res.status(201).json(clienteGuardado)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al crear el cliente' })
        }
    }

    static async modificarCliente(req, res) {
        try {
            const { id } = req.params
            const { nombre, apellidos, email, telefono, notas } = req.body

            const cliente = await Cliente.encontrarClientePorId(id)
            
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' })
            }

            if (!nombre || !apellidos || !email) {
                return res.status(400).json({ error: 'Los campos nombre, apellidos y email son obligatorio' })
            }

            if (!validarEmail(email)) {
                return res.status(400).json({ error: 'El email no es válido' })
            }

            if(!validarTelefono(telefono)) {
                return res.status(400).json({ error: 'El campo teléfono no es válido' })
            }

            const emailExiste = await Cliente.encontrarClientePorEmail(email)

            if (emailExiste && emailExiste.id !== cliente.id) {
                return res.status(400).json({ error: 'Ya existe un cliente con ese email' })
            }

            cliente.nombre = nombre
            cliente.apellidos = apellidos
            cliente.email = email
            cliente.telefono = telefono
            cliente.notas = notas

            const clienteModificado = await cliente.guardarCliente()
            res.json(clienteModificado)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al modificar el cliente' })
        }
    }

    static async eliminarCliente(req, res) {
        try {
            const { id } = req.params
            const cliente = await Cliente.encontrarClientePorId(id)
            
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' })
            }

            await cliente.eliminarCliente();
            res.json({ mensaje: 'Cliente eliminado correctamente' })
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al borrar el cliente' })
        }
    }
}

module.exports = ClientesController;