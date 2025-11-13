const db = require('../config/db')

class Cliente {
    constructor({ 
        id = null, 
        nombre, 
        apellidos, 
        email, 
        telefono = null, 
        fecha_alta = null, 
        notas = null 
    })
    
    {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.fecha_alta = fecha_alta;
        this.notas = notas;
    }

    static async encontrarClientes({ busqueda = '' } = {}) {
        let sql = 'SELECT * FROM clientes';
        const params = []

        if (busqueda) {
        sql += ' WHERE nombre LIKE ? OR apellidos LIKE ? OR email LIKE ?';
        const like = `%${busqueda}%`
        params.push(like, like, like)
        }

        const rows = await db.query(sql, params)
        return rows.map(row => new Cliente(row))
    }

    static async encontrarClientePorId(id) {
        const rows = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
        if (rows.length === 0) return null;
        return new Cliente(rows[0])
    }

    static async encontrarClientePorEmail(email) {
        const rows = await db.query('SELECT * FROM clientes WHERE email = ?', [email]);
        if (rows.length === 0) return null;
        return new Cliente(rows[0])
    }

    async guardarCliente() {
        // si tiene id update
        if (this.id) {
        await db.query(
            `UPDATE clientes
            SET nombre = ?, apellidos = ?, email = ?, telefono = ?, notas = ?
            WHERE id = ?`,
            [this.nombre, this.apellidos, this.email, this.telefono, this.notas, this.id]
        )
        return this
        } else { // si no tiene id insert
        const resultado = await db.query(
            `INSERT INTO clientes (nombre, apellidos, email, telefono, notas) VALUES (?, ?, ?, ?, ?)`,
            [this.nombre, this.apellidos, this.email, this.telefono, this.notas]
        );
        this.id = resultado.insertId;
        return this
        }
    }

    async eliminarCliente() {
        if (!this.id) throw new Error('No se puede borrar un cliente sin id');
        await db.query('DELETE FROM clientes WHERE id = ?', [this.id]);
    }
}

module.exports = Cliente