const express = require('express')
const router = express.Router()
const { createProduct, getAllProducts, viewProduct, deleteProduct,  editProduct } = require('../controllers/Product.controller')

router.post('/', createProduct)
router.get('/all/:proId', getAllProducts)
router.get("/:proId/:productId", viewProduct)
router.delete("/:proId/:productId", deleteProduct)
router.put('/', editProduct)

module.exports = router