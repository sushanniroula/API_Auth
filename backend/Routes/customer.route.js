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
router.get("/", verifyAccessToken, viewCustomer)
router.get("/all", verifyAccessToken, getAllCustomer)
router.put("/:id", verifyAccessToken, editCustomer)
router.delete("/:id", verifyAccessToken, deleteCustomer
)

module.exports = router