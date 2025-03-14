const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
    customerOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    criteria: {
        type: String,
        required: true,
    },
},{
    timestamp: true,
})

module.exports = mongoose.model("Cohort", cohortSchema);
