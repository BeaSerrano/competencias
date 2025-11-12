const express = require('express')
const mysql = require('mysql2/promise')

const app = express()
process.loadEnvFile()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const dbConfig = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const dbConnection = async () => {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
}

app.get('/', (req, res) => res.send(`Prueba en puerto: ${PORT}`))

app.get('/clientes', async (req, res) => {
    try {
        const db = await dbConnection();
        const [filas_clientes] = await db.execute('SELECT * FROM clientes');
        res.json(filas_clientes);
    } catch (error) {
        res.status(500).send('Error al obtener usuarios');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})