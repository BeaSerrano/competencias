document.addEventListener('DOMContentLoaded', () => {
  const formBuscar = document.getElementById('form-buscar')
  const inputBuscar = document.getElementById('input-buscar')
  const formCrear = document.getElementById('form-crear')
  const bodyTablaClientes = document.getElementById('tabla-body-clientes')
  const mensajeVacio = document.getElementById('mensaje-vacio')
  const indicadorCarga = document.getElementById('indicador-carga')
  const alerta = document.getElementById('alerta')

  // modal
  const modalEditarElemento = document.getElementById('modal-editar')
  const editarModal = new bootstrap.Modal(modalEditarElemento)
  const editarForm = document.getElementById('form-editar')
  const editarInput = document.getElementById('editar-id')
  const editarNombreInput = document.getElementById('editar-nombre')
  const editarApellidosInput = document.getElementById('editar-apellidos')
  const editarEmailInput = document.getElementById('editar-email')
  const editarTelefonoInput = document.getElementById('editar-telefono')
  const editarNotasInput = document.getElementById('editar-notas')

  // general
  let clientes = []
  let busquedaActual = ''

  // carga
  const setCarga = (cargando) => {
    if (cargando) {
      indicadorCarga.classList.remove('d-none')
    } else {
      indicadorCarga.classList.add('d-none')
    }
  }

  const mostrarAlerta = (tipo, message) => {
    // dos tipos: success o danger
    const divAlerta = document.createElement('div')
    divAlerta.className = `alert alert-${tipo} alert-dismissible fade show`
    divAlerta.role = 'alert'
    divAlerta.textContent = message

    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = 'btn-close'
    btn.setAttribute('data-bs-dismiss', 'alert')
    btn.setAttribute('aria-label', 'Cerrar')

    divAlerta.appendChild(btn)
    alerta.appendChild(divAlerta)

    setTimeout(() => { // alerta desaparece
      if (divAlerta && divAlerta.parentNode) {
        divAlerta.parentNode.removeChild(divAlerta)
      }
    }, 4000)
  }

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(String(email).toLowerCase())
  }

  const validarTelefono = (telefono) => {
    const regex = /^(\+34)?[\d\s-]{9,15}$/
    return regex.text(String(telefono).toLowerCase())
  }

  // tabla clientes
  const mostrarTablaClientes = () => {
    bodyTablaClientes.innerHTML = ''

    if (!clientes.length) {
      mensajeVacio.classList.remove('d-none')
      return
    }

    mensajeVacio.classList.add('d-none')

    clientes.forEach((cliente) => {
      const filaTabla = document.createElement('tr')

      filaTabla.innerHTML = `
        <td>
          <strong>${cliente.nombreCompleto || '(Sin nombre)'}</strong>
        </td>
        <td>${cliente.email || '<span class="text-muted">Sin email</span>'}</td>
        <td class="d-none d-md-table-cell">
          ${cliente.telefono || '<span class="text-muted">—</span>'}
        </td>
        <td class="d-none d-md-table-cell">
          <span class="d-inline-block text-truncate" style="max-width: 260px;">
            ${cliente.notas || '<span class="text-muted">Sin notas</span>'}
          </span>
        </td>
        <td class="text-end">
          <button
            type="button"
            class="btn btn-sm btn-outline-primary me-2 btn-edit"
            data-id="${cliente.id}"
          >
            Editar
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-danger btn-delete"
            data-id="${cliente.id}"
          >
            Borrar
          </button>
        </td>
      `;

      bodyTablaClientes.appendChild(filaTabla)
    })
  }

  // cargar clientes
  const cargarClientes = async (busqueda = '') => {
    try {
      setCarga(true)
      const data = await window.apiFetchClientes(busqueda)
      clientes = data
      mostrarTablaClientes()
    } catch (err) {
      console.error(err);
      mostrarAlerta('danger', err.message || 'Error al cargar los clientes')
    } finally {
      setCarga(false)
    }
  }

  // crear cliente
  formCrear.addEventListener('submit', async (event) => {
    event.preventDefault();

    // validaciión
    const nombreInput = document.getElementById('nombre')
    const apellidosInput = document.getElementById('apellidos')
    const emailInput = document.getElementById('email')
    const telefonoInput = document.getElementById('telefono')
    const notasInput = document.getElementById('notas')

    let valid = true

    if (!nombreInput.value.trim()) {
      nombreInput.classList.add('is-invalid')
      valid = false
    } else {
      nombreInput.classList.remove('is-invalid')
    }

    if (!apellidosInput.value.trim()) {
      apellidosInput.classList.add('is-invalid')
      valid = false
    } else {
      apellidosInput.classList.remove('is-invalid')
    }

    if (!emailInput.value.trim() || !validarEmail(emailInput.value)) {
      emailInput.classList.add('is-invalid')
      valid = false
    } else {
      emailInput.classList.remove('is-invalid')
    }

    if (!telefonoInput.value.trim() || !validarTelefono(telefonoInput.value)) {
      telefonoInput.classList.add('is-invalid')
      valid = false
    } else {
      telefonoInput.classList.remove('is-invalid')
    }

    if (!valid) return

    const payload = {
      nombre: nombreInput.value.trim(),
      apellidos: apellidosInput.value.trim(),
      email: emailInput.value.trim(),
      telefono: telefonoInput.value.trim(),
      notas: notasInput.value.trim(),
    }

    try {
      setCarga(true)
      const nuevoCliente = await window.apiCreateCliente(payload)
      clientes.push(nuevoCliente)
      mostrarTablaClientes()
      mostrarAlerta('success', 'Cliente creado correctamente')

      // limpieza forulario
      formCrear.reset()
      nombreInput.classList.remove('is-invalid')
      apellidosInput.classList.remove('is-invalid')
      emailInput.classList.remove('is-invalid')
    } catch (err) {
      console.error(err);
      mostrarAlerta('danger', err.message || 'Error al crear el cliente')
    } finally {
      setCarga(false)
    }
  })

  // buscar cliente
  formBuscar.addEventListener('submit', (event) => {
    event.preventDefault();
    busquedaActual = inputBuscar.value.trim()
    cargarClientes(busquedaActual)
  })

  // editar / borrar
  bodyTablaClientes.addEventListener('click', async (event) => {
    const editarBoton = event.target.closest('.btn-edit')
    const borrarBoton = event.target.closest('.btn-delete')

    if (editarBoton) {
      const id = Number(editarBoton.dataset.id)
      const cliente = clientes.find((c) => c.id === id)
      if (!cliente) return

      // Rellenar modal
      editarInput.value = cliente.id
      editarNombreInput.value = cliente.nombre || ''
      editarApellidosInput.value = cliente.apellidos || ''
      editarEmailInput.value = cliente.email || ''
      editarTelefonoInput.value = cliente.telefono || ''
      editarNotasInput.value = cliente.notas || ''

      // Limpiar errores visuales
      [editarNombreInput, editarApellidosInput, editarEmailInput].forEach((input) =>
        input.classList.remove('is-invalid')
      )

      editarModal.show()
    }

    if (borrarBoton) {
      const id = Number(borrarBoton.dataset.id)
      const cliente = clientes.find((c) => c.id === id)
      if (!cliente) return

      if (!confirm(`¿Seguro que quieres borrar a "${cliente.fullName}"?`)) {
        return
      }

      try {
        setCarga(true)
        await window.apiDeleteCliente(id)
        clientes = clientes.filter((cliente) => cliente.id !== id)
        mostrarTablaClientes()
        mostrarAlerta('success', 'Clientee borrado correctamente')
      } catch (err) {
        console.error(err);
        mostrarAlerta('danger', err.message || 'Error al borrar el cliente')
      } finally {
        setCarga(false)
      }
    }
  })

  // guardar cliente modificado
  editarForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    let valid = true

    if (!editarNombreInput.value.trim()) {
      editarNombreInput.classList.add('is-invalid')
      valid = false
    } else {
      editarNombreInput.classList.remove('is-invalid')
    }

    if (!editarApellidosInput.value.trim()) {
      editarApellidosInput.classList.add('is-invalid')
      valid = false
    } else {
      editarApellidosInput.classList.remove('is-invalid')
    }

    if (
      !editarEmailInput.value.trim() ||
      !validarEmail(editarEmailInput.value.trim())
    ) {
      editarEmailInput.classList.add('is-invalid')
      valid = false
    } else {
      editarEmailInput.classList.remove('is-invalid')
    }

    if (!telefonoInput.value.trim() || !validarTelefono(telefonoInput.value)) {
      telefonoInput.classList.add('is-invalid')
      valid = false
    } else {
      telefonoInput.classList.remove('is-invalid')
    }

    if (!valid) return

    const id = Number(editarInput.value)

    const payload = {
      nombre: editarNombreInput.value.trim(),
      apellidos: editarApellidosInput.value.trim(),
      email: editarEmailInput.value.trim(),
      telefono: editarTelefonoInput.value.trim(),
      notas: editarNotasInput.value.trim(),
    }

    try {
      setCarga(true)
      const clienteActualizado = await window.apiUpdateCliente(id, payload)
      clientes = clientes.map((cliente) => (cliente.id === clienteActualizado.id ? clienteActualizado : cliente))
      mostrarTablaClientes()
      mostrarAlerta('success', 'Cliente modificado correctamente')
      editarModal.hide()
    } catch (err) {
      console.error(err);
      mostrarAlerta('danger', err.message || 'Error al modificar el cliente')
    } finally {
      setCarga(false)
    }
  })

  cargarClientes()
})