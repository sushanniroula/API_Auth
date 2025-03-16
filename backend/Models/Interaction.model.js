const mongoose = require('mongoose')
const interactionSchema = new mongoose.Schema({
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    notes: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Interaction', interactionSchema)