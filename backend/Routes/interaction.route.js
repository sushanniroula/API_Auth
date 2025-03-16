const express = require("express");
const router = express.Router();
const { createInteraction, getAllInteraction, viewInteraction, deleteInteraction, editInteraction } = require("../controllers/Interaction.controllers");

router.post("/", createInteraction);
router.get("/all/:proId", getAllInteraction);
router.get("/:proId/:interactionId", viewInteraction);
router.delete("/:proId/:interactionId", deleteInteraction);
router.put("/", editInteraction);
module.exports = router;
