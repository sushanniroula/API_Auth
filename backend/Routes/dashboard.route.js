const express = require('express')
const router = express.Router()
const { addData, getData, updateData } = require('../controllers/Dashboard.controller')

router.post('/', addData)
router.get('/:proId', getData)
router.put('/:proId', updateData)

module.exports = router