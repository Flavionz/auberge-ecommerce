const express = require('express');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    downloadInvoice,
    getAdminNotifications,
    markNotificationsSeen
} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', authenticate, createOrder);
router.get('/user', authenticate, getUserOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);
router.get('/admin/notifications', authenticate, isAdmin, getAdminNotifications);
router.post('/admin/notifications/mark-seen', authenticate, isAdmin, markNotificationsSeen);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);
router.get('/:id/invoice', authenticate, downloadInvoice);

module.exports = router;