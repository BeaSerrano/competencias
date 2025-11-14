const express = require('express')
const cors = require('cors')
const clientesRoutes = require('./routes/clientesRoutes')
const path = require('path')
// process.loadEnvFile()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../cliente'))) // acceso a cliente

// ruta api clientes
app.use('/api/clientes', clientesRoutes)

// rutas generales
app.get('/', (req, res) => res.send(`API clientes 👌`))

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))