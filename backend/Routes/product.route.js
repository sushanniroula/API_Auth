const express = require('express')
const router = express.Router()
const { createProduct, getAllProducts, viewProduct } = require('../controllers/Product.controller')

router.post('/', createProduct)
router.get('/all/:proId', getAllProducts)
router.get("/:proId/:productId", viewProduct)

module.exports = router