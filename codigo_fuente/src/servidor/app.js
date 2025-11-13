const express = require('express')
const cors = require('cors')
const clientesRoutes = require('./routes/clientesRoutes')
process.loadEnvFile()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ruta api clientes
app.use('/api/clientes', clientesRoutes)

// ruta prueba
app.get('/', (req, res) => res.send(`API clientes 👌`))

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))