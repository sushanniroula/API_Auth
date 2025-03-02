const express = require('express')
const router = express.Router()
const { createProduct } = require('../controllers/Product.controller')

router.post('/', createProduct)


module.exports = router