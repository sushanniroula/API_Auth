const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "in-progress"],
        default: "pending"
    }
});

module.exports = mongoose.model("Order", orderSchema);
