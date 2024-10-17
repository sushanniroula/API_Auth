const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User.model')
const { authSchema } = require('../helpers/validation_schema')

router.post('/register', async(req, res, next) => {
    try {
        // const { email, password } = req.body
        const result = await authSchema.validateAsync(req.body)

        // if(!email || !password ) throw createError.BadRequest()
        
        const doesExist = await User.findOne({ email: result.email })
        if(doesExist) throw createError.Conflict(`${result.email} is already been registered`)
        const user = new User(result)
        const savedUser = await user.save();
        res.send(savedUser)
    } catch (error) {
        if(error.isJoi == true) error.status = 422
        next(error)
    }
})


router.post('/login', async(req, res, next) => {
    res.send("Login Route")
})


router.post('/refresh-token', async(req, res, next) => {
    res.send("refresh token Route")
})

router.delete('/logout', async(req, res, next) => {
    res.send("Logout Route")
})


module.exports = router;