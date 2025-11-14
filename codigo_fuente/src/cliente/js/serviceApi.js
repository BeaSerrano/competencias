const API_BASE = 'http://localhost:3000/api';

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

const apiFetchClientes = async (busqueda = '') => {
    const url = busqueda
        ? `${API_BASE}/clientes?busqueda=${encodeURIComponent(busqueda)}`
        : `${API_BASE}/clientes`;

    const res = await fetch(url);
    const data = await handleRes(res);
    return data.map((el) => new window.Client(el));
}

const apiCreateCliente = async (payload) => {
    const res = await fetch(`${API_BASE}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(payload),
    });

    const data = await handleRes(res);
    return new window.Cliente(data);
}

const apiUpdateCliente = async (id, payload) => {
    const res = await fetch(`${API_BASE}/clientes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(payload),
    });

    const data = await handleRes(res);
    return new window.Cliente(data);
}

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