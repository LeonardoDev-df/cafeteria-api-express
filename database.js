// database.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho absoluto para o arquivo do banco de dados
const dbPath = path.resolve(__dirname, 'db', 'cafeteria.db');

// Conexão com o banco SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Encerra a aplicação se não conectar
  } else {
    console.log('✅ Conectado ao banco SQLite com sucesso!');
  }
});

module.exports = db;
