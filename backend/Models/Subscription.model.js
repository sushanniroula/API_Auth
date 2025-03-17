const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  currentPlan: {
    type: String,
    enum: ["Basic", "Pro", "Enterprise"],
    required: true,
  },
  planDurationInDays: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Expired", "Cancelled"],
    required: true,
    default: "Inactive",
  },
  subscribeAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  nextRenewal: {
    type: Date,
  },
  monthlyCost: {
    type: Number,
  },
  logs: [
    {
      date: { type: Date, required: true },
      action: { type: String, required: true },
      details: { type: String, required: true },
    },
  ],
  subscriptionHistory: [
    {
      plan: { type: String, enum: ["Basic", "Pro", "Enterprise"], required: true },
      subscribedAt: { type: Date, required: true },
      expiredAt: { type: Date },
      cancelledAt: { type: Date },
      status: { type: String, enum: ["Expired", "Cancelled"], required: true },
    },
  ],
});

// Pre-save hook to update nextRenewal date
SubscriptionSchema.pre("save", function (next) {
  if (!this.nextRenewal) {
    this.nextRenewal = new Date(this.subscribeAt);
    this.nextRenewal.setUTCDate(
      this.nextRenewal.getUTCDate() + this.planDurationInDays
    );
  }
  next();
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
