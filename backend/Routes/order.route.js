const express = require('express')
const router = express.Router()
const { getAllOrders, viewOrder, editOrder, deleteOrder, createOrder } = require('../controllers/Order.controller')

router.post('/', createOrder)
router.post('/all', getAllOrders)
router.get('/', viewOrder)
router.put('/', editOrder)
router.delete('/', deleteOrder)

module.exports = router