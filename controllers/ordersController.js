const db = require('../database');
const { body, validationResult } = require('express-validator');

// Middleware: validação ao criar pedido
exports.validateOrder = [
  body('cliente').notEmpty().withMessage('O campo cliente é obrigatório.'),
  body('item').notEmpty().withMessage('O campo item é obrigatório.'),
  body('quantidade')
    .isInt({ min: 1 })
    .withMessage('Quantidade deve ser um número inteiro maior que 0.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Middleware: validação ao atualizar status
exports.validateStatusUpdate = [
  body('status')
    .isIn(['Em preparo', 'Pronto', 'Entregue'])
    .withMessage('Status inválido. Use: Em preparo, Pronto ou Entregue.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Handler de erro do banco
const handleDbError = (err, res, next, context) => {
  console.error(`Erro ao ${context}:`, err.message);
  return next({ status: 500, message: `Erro interno ao ${context}.` });
};

// Criar novo pedido
exports.createOrder = (req, res, next) => {
  const { cliente, item, quantidade, observacoes } = req.body;

  const sql = `
    INSERT INTO orders (cliente, item, quantidade, observacoes, status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [cliente, item, quantidade, observacoes || null, 'Em preparo'];

  db.run(sql, params, function (err) {
    if (err) return handleDbError(err, res, next, 'criar pedido');

    res.status(201).json({
      id: this.lastID,
      cliente,
      item,
      quantidade,
      observacoes,
      status: 'Em preparo',
    });
  });
};

// Listar todos os pedidos
exports.getAllOrders = (req, res, next) => {
  db.all(`SELECT * FROM orders`, [], (err, rows) => {
    if (err) return handleDbError(err, res, next, 'listar pedidos');
    res.json(rows);
  });
};

// Buscar por status
const getOrdersByStatus = (status, res, next) => {
  db.all(`SELECT * FROM orders WHERE status = ?`, [status], (err, rows) => {
    if (err) return handleDbError(err, res, next, `buscar pedidos ${status}`);
    res.json(rows);
  });
};

exports.getOrdersInPreparation = (req, res, next) => {
  getOrdersByStatus('Em preparo', res, next);
};

exports.getReadyOrders = (req, res, next) => {
  getOrdersByStatus('Pronto', res, next);
};

exports.getDeliveredOrders = (req, res, next) => {
  getOrdersByStatus('Entregue', res, next);
};

// Atualizar status
exports.updateStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const sql = `UPDATE orders SET status = ? WHERE id = ?`;
  db.run(sql, [status, id], function (err) {
    if (err) return handleDbError(err, res, next, 'atualizar status');

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    res.json({ message: 'Status atualizado com sucesso.' });
  });
};
