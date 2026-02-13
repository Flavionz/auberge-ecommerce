const express = require('express');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', authenticate, createOrder);
router.get('/user', authenticate, getUserOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);

module.exports = router;