class Cliente {
    constructor({
        id = null,
        nombre = '',
        apellidos = '',
        email = '',
        telefono = '',
        fecha_alta = null,
        notas = '',
    } = {}) 
    
    {
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.telefono = telefono;
        this.fecha_alta = fecha_alta;
        this.notas = notas;
    }

    get nombreCompleto() {
        return `${this.nombre} ${this.apellidos}`.trim();
    }
}


window.Cliente = Cliente;