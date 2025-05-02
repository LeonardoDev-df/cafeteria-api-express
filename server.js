const express = require('express');
const path = require('path');
const ordersRoutes = require('./routes/ordersRoutes'); // Certifique-se de que o nome e caminho estejam corretos

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------
// Middlewares Globais
// ----------------------------

// Middleware para parsing de JSON
app.use(express.json());

// Middleware de log (desenvolvimento)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] [${req.method}] ${req.originalUrl}`);
  next();
});

// ----------------------------
// Rotas
// ----------------------------
app.use('/orders', ordersRoutes); // Rotas de pedidos com prefixo

// ----------------------------
// Middleware de tratamento de erros
// ----------------------------
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err.stack);
  const status = err.status || 500;
  const message = err.message || 'Erro interno no servidor.';
  res.status(status).json({ error: message });
});

// ----------------------------
// Inicialização do servidor
// ----------------------------
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
