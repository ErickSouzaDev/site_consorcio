const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./consorcio.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

// Rota para criar um novo consórcio
app.post('/consorcio', (req, res) => {
    const { valorCota, numParticipantes, dataVencimento, ordemContemplados } = req.body;
    const sql = 'INSERT INTO consorcios (valor_cota, num_participantes, data_vencimento, ordem_contemplados) VALUES (?, ?, ?, ?)';
    db.run(sql, [valorCota, numParticipantes, dataVencimento, ordemContemplados], function(err) {
        if (err) {
            return console.error(err.message);