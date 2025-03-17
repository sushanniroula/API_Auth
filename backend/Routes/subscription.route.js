const express = require("express");
const router = express.Router();
const {
  createSubscription,
  viewSubscription,
  updateSubscription,
  cancelSubscription,
  renewSubscription,
  
} = require("../controllers/Subscription.controller");

router.post("/", createSubscription);
router.get("/:proId", viewSubscription);
router.put("/:proId", updateSubscription);
router.patch("/cancel/:proId", cancelSubscription)
router.patch("/renew/:proId", renewSubscription )

module.exports = router;
