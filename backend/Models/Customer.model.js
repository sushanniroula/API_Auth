const mongoose = require('mongoose')
const CustomerSchema = new mongoose.Schema({
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    churnRisk: {
        type: String,
        enum: ["high","low","moderate","in-process"],
        default: "in-process"
    },
},
{
    timestamp: true,
})

module.exports = mongoose.model('Customer', CustomerSchema)