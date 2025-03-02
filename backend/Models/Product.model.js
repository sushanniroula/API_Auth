const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamp: true,
})

module.exports = mongoose.model("Product", productSchema);
