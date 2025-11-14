const API_LOCAL = 'http://localhost:8080/api';
const API_BASE = 'https://gestion-clientes-ywnc.onrender.com/api'

// manejo respuestas
const handleRes = async (res) => {
    let data = null;
    
    try {
        data = await res.json();
    } catch (err) { // si no hay body
        console.error(err)
    }

    if (!res.ok) {
        const message = (data && data.error) || 'Error en la petición al servidor';
        const error = new Error(message);
        error.status = res.status;
        throw error;
    }

    return data;
}

// llamada - clientes y clientes por id - GET
const apiFetchClientes = async (busqueda = '') => {
    const url = busqueda
        ? `${API_BASE}/clientes?busqueda=${encodeURIComponent(busqueda)}`
        : `${API_BASE}/clientes`;

    const res = await fetch(url);
    const data = await handleRes(res);
    return data.map((el) => new window.Cliente(el));
}

// llamada - crear cliente - POST
const apiCreateCliente = async (payload) => {
    const res = await fetch(`${API_BASE}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(payload),
    });

    const data = await handleRes(res);
    return new window.Cliente(data);
}

// llamada - modificar cliente - PUT
const apiUpdateCliente = async (id, payload) => {
    const res = await fetch(`${API_BASE}/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(payload),
    });

    const data = await handleRes(res);
    return new window.Cliente(data);
}

// llamada eliminar cliente - DELTE
const apiDeleteCliente = async (id) => {
    const res = await fetch(`${API_BASE}/clientes/${id}`, {
        method: 'DELETE',
    });

    return handleRes(res);
}


window.apiFetchClientes = apiFetchClientes;
window.apiCreateCliente = apiCreateCliente;
window.apiUpdateCliente = apiUpdateCliente;
window.apiDeleteCliente = apiDeleteCliente;