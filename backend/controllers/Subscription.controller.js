const Subscription = require("../Models/Subscription.model");
const User = require("../Models/User.model");
const userExists = async (proId) => {
  try {
    return await User.exists({ _id: proId });
  } catch (error) {
    return;
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const { proId, currentPlan, planDurationInDays, monthlyCost } = req.body;
    const exists = await Subscription.findOne({ adminId: proId });

    if (exists) {
      if (exists.status === "Cancelled") {
        return res
          .status(400)
          .json({
            message:
              "Your subscription is canceled. Please renew or choose a new plan.",
          });
      }
      return res
        .status(400)
        .json({
          message:
            "You already have an active subscription. Please cancel it before subscribing to a new one.",
        });
    }

    const subscribeAt = new Date();
    const nextRenewal = new Date(subscribeAt);
    nextRenewal.setUTCDate(subscribeAt.getUTCDate() + planDurationInDays);

    const newSubscription = await Subscription.create({
      adminId: proId,
      currentPlan,
      planDurationInDays,
      status: "Active",
      subscribeAt,
      nextRenewal,
      monthlyCost,
      logs: [
        {
          date: subscribeAt,
          action: "Subscription Created",
          details: `Subscribed to ${currentPlan} plan.`,
        },
      ],
    });

    res
      .status(201)
      .json({
        message: "Subscription created successfully",
        subscription: newSubscription,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

exports.cancelSubscription = async (req, res) => {
  try {
    const { proId } = req.params;

    // Find the active subscription
    let subscription = await Subscription.findOne({
      adminId: proId,
      status: "Active",
    });

    if (!subscription) {
      return res
        .status(404)
        .json({ message: "No active subscription found to cancel" });
    }

    // Move the current subscription to history
    subscription.subscriptionHistory.push({
      plan: subscription.currentPlan,
      subscribedAt: subscription.subscribeAt,
      expiredAt: new Date(), // Marks the cancellation time
      status: "Cancelled",
    });

    // Only update the status without deleting required fields
    subscription.status = "Cancelled";

    // Log the cancellation
    subscription.logs.push({
      date: new Date(),
      action: "Subscription Cancelled",
      details: `User cancelled the ${subscription.currentPlan} plan.`,
    });

    await subscription.save();

    res
      .status(200)
      .json({ message: "Subscription successfully canceled", subscription });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// for super admin purpose we can use

// exports.getAllSubscription = async (req, res) => {
//   const { proId } = req.params;
//   try {
//     const interactions = await Subscription.find({ customerOf: proId });
//     if(interactions.length === 0) return res.status(404).json({message: "ISubscription not found"})
//     res.status(200).json(interactions);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to load iSubscription" });
//   }
// };

exports.viewSubscription = async (req, res) => {
  const { proId } = req.params;
  const exists = await userExists(proId);
  if (!exists) return res.status(400).json({ message: "User not exist" });
  try {
    const subscriptionDetail = await Interaction.findOne({
      adminId: proId,
    });
    if (!subscriptionDetail)
      return res
        .status(404)
        .json({ message: "You haven't subscribed any plan" });

    res.status(200).json(subscriptionDetail);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrive subscription data",
      error: error.message,
    });
  }
};

//can be used for super admin

// exports.deleteSubscription = async (req, res) => {
//   const { proId, interactionId } = req.params;
//   const exists = await userExists(proId);
//   if (!exists) return res.status(400).json({ message: "User not exist" });

//   try {
//     const deleteInteraction = await Interaction.findOneAndDelete({
//       customerOf: proId,
//       _id: interactionId,
//     });
//     if (!deleteInteraction)
//       return res.status(404).json({ message: "Interaction not exist" });

//     res.status(200).json({ message: "Interaction deleted" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Failed to delete interaction", error: error.message });
//   }
// };

exports.updateSubscription = async (req, res) => {
  try {
    const { proId } = req.params;
    const { currentPlan, planDurationInDays, monthlyCost } = req.body;

    let subscription = await Subscription.findOne({ adminId: proId });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Prevent updates if subscription is still active
    if (subscription.status === "Active") {
      return res
        .status(400)
        .json({ message: "Cancel your current subscription before upgrading" });
    }

    // Update subscription with a new plan
    subscription.currentPlan = currentPlan;
    subscription.planDurationInDays = planDurationInDays;
    subscription.monthlyCost = monthlyCost;
    subscription.subscribeAt = new Date();
    subscription.status = "Active";

    // Set new renewal date
    subscription.nextRenewal = new Date(subscription.subscribeAt);
    subscription.nextRenewal.setUTCDate(
      subscription.nextRenewal.getUTCDate() + planDurationInDays
    );

    // Log the change
    subscription.logs.push({
      date: new Date(),
      action: "Subscription Updated",
      details: `User upgraded to ${currentPlan} plan.`,
    });

    await subscription.save();
    return res
      .status(200)
      .json({ message: "Subscription updated successfully", subscription });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.renewSubscription = async (req, res) => {
  try {
    const { proId } = req.params;
    const { planDurationInDays, monthlyCost } = req.body;

    let subscription = await Subscription.findOne({ adminId: proId });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // If expired, start new subscription from today
    let renewalStartDate =
      subscription.status === "Expired" ? new Date() : subscription.nextRenewal;

    // Update subscription
    subscription.planDurationInDays += planDurationInDays;
    subscription.monthlyCost = monthlyCost;
    subscription.subscribeAt = renewalStartDate;
    subscription.status = "Active";

    // Extend renewal date
    subscription.nextRenewal = new Date(renewalStartDate);
    subscription.nextRenewal.setUTCDate(
      subscription.nextRenewal.getUTCDate() + planDurationInDays
    );

    // Log renewal
    subscription.logs.push({
      date: new Date(),
      action: "Subscription Renewed",
      details: `Subscription extended by ${planDurationInDays} days.`,
    });

    await subscription.save();
    return res.status(200).json({
      message: "Subscription renewed successfully",
      subscription,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
