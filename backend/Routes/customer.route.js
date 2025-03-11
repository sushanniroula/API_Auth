const express = require('express')
const router = express.Router()
const { verifyAccessToken } = require('../helpers/jwt_helper')
const{ 
    addCustomer,
    viewCustomer,
    editCustomer,
    deleteCustomer,
    getAllCustomer
} = require('../controllers/Customer.controller')

router.post("/", verifyAccessToken, addCustomer)
router.get("/:proId/:customerId", verifyAccessToken, viewCustomer)
router.get("/:proId", verifyAccessToken, getAllCustomer) //completed
router.put("/", verifyAccessToken, editCustomer)
router.delete("/:id", verifyAccessToken, deleteCustomer
)

module.exports = router