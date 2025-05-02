const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const { body, validationResult } = require('express-validator');

// Middleware: validação ao criar pedido
const validateCreateOrder = [
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
const validateUpdateStatus = [
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

// ----------------------
// Rotas para Pedidos
// ----------------------

// Criar um novo pedido com validação
router.post('/', validateCreateOrder, ordersController.createOrder);

// Obter todos os pedidos
router.get('/', ordersController.getAllOrders);

// Obter pedidos por status fixo
router.get('/status/em-preparo', ordersController.getOrdersInPreparation);
router.get('/status/pronto', ordersController.getReadyOrders);
router.get('/status/entregue', ordersController.getDeliveredOrders);

// Atualizar o status de um pedido específico com validação
router.put('/:id/status', validateUpdateStatus, ordersController.updateStatus);

// Exporta as rotas para serem usadas no app principal
module.exports = router;
