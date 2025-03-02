const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true,
        unique: false
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "in-progress"],
        default: "pending"
    },
    customerDetails: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
            required: true
        },
        name: {
            type: String,
            // required: true
        },
        phone: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            // required: true
        }
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Order", orderSchema);
