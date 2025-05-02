// middleware/errorHandler.js

module.exports = (err, req, res, next) => {
  // Log detalhado do erro no console (útil em desenvolvimento)
  console.error('[ERRO INTERNO]:', {
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  // Envia resposta genérica para o cliente
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno no servidor',
  });
};
