const express = require('express');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const {
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
    downloadInvoice,
    getAdminNotifications,
    markNotificationsSeen,
    getOrderById,
    setDeliverySlot,
    sendPaymentLink,
    sendNotification
} = require('../controllers/orderController');

const router = express.Router();

router.post('/create', authenticate, createOrder);
router.get('/user', authenticate, getUserOrders);
router.get('/all', authenticate, isAdmin, getAllOrders);
router.get('/admin/notifications', authenticate, isAdmin, getAdminNotifications);
router.post('/admin/notifications/mark-seen', authenticate, isAdmin, markNotificationsSeen);
router.get('/admin/all', authenticate, isAdmin, getAllOrders);
router.get('/:id', authenticate, isAdmin, getOrderById);
router.put('/:id/status', authenticate, isAdmin, updateOrderStatus);
router.put('/:id/delivery', authenticate, isAdmin, setDeliverySlot);
router.post('/:id/payment-link', authenticate, isAdmin, sendPaymentLink);
router.post('/:id/notify', authenticate, isAdmin, sendNotification);
router.get('/:id/invoice', authenticate, downloadInvoice);

module.exports = router;