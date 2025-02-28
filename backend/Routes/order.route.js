const express = require('express')
const router = express.Router()
const { getAllOrders, viewOrder, editOrder, deleteOrder } = require('../controllers/Order.controller')


router.get('/all', getAllOrders)
router.get('/', viewOrder)
router.put('/', editOrder)
router.delete('/', deleteOrder)

module.exports = router