const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o banco de dados
const dbPath = path.resolve(__dirname, 'db', 'cafeteria.db');

// Conecta ao banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Encerra o processo se não for possível conectar
  }
});

// Cria a tabela "orders" se não existir
db.serialize(() => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      item TEXT NOT NULL,
      quantidade INTEGER NOT NULL CHECK (quantidade > 0),
      observacoes TEXT,
      status TEXT DEFAULT 'Em preparo' CHECK (status IN ('Em preparo', 'Pronto', 'Entregue')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('❌ Erro ao criar a tabela "orders":', err.message);
    } else {
      console.log('✅ Tabela "orders" criada ou já existente.');
    }

    // Fecha a conexão após a operação
    db.close((err) => {
      if (err) {
        console.error('❌ Erro ao fechar a conexão com o banco:', err.message);
      } else {
        console.log('✅ Conexão com o banco encerrada.');
      }
    });
  });
});
