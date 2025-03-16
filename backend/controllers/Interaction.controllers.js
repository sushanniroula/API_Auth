const express = require("express");
const Interaction = require("../Models/Interaction.model");
const User = require("../Models/User.model");
const userExists = async (proId) => {
  try {
    return await User.exists({ _id: proId });
  } catch (error) {
    return;
  }
};

exports.createInteraction = async (req, res) => {
  const { proId, customerName, type, date, notes } = req.body;
  try {
    const createInteraction = await Interaction.create({
      customerOf: proId,
      customerName,
      type,
      date,
      notes,
    });
    if (!createInteraction)
      return res.status(500).json({ message: "Couldnot create interaction" });

    res
      .status(201)
      .json({ message: "Interaction Created", interaction: createInteraction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldnot create interaction", error: error.message });
  }
};

exports.getAllInteraction = async (req, res) => {
  const { proId } = req.params;
  try {
    const interactions = await Interaction.find({ customerOf: proId });
    if(interactions.length === 0) return res.status(404).json({message: "Interactions not found"})
    res.status(200).json(interactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to load interactions" });
  }
};

exports.viewInteraction = async (req, res) => {
  const { proId, interactionId } = req.params;
  const exists = await userExists(proId);
  if (!exists) return res.status(400).json({ message: "User not exist" });
  try {
    const interactionDetails = await Interaction.findOne({
      _id: interactionId,
      customerOf: proId,
    });
    if (!interactionDetails)
      return res.status(404).json({ message: "Interaction not found" });

    res.status(200).json(interactionDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrive interaction", error: error.message });
  }
};

exports.deleteInteraction = async (req, res) => {
  const { proId, interactionId } = req.params;
  const exists = await userExists(proId);
  if (!exists) return res.status(400).json({ message: "User not exist" });

  try {
    const deleteInteraction = await Interaction.findOneAndDelete({
      customerOf: proId,
      _id: interactionId,
    });
    if (!deleteInteraction)
      return res.status(404).json({ message: "Interaction not exist" });

    res.status(200).json({ message: "Interaction deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete interaction", error: error.message });
  }
};

exports.editInteraction = async (req, res) => {
  try {
    const { proId, interactionId, customerName, type, date, notes } = req.body;
    const exists = await userExists(proId);
    if (!exists) return res.status(400).json({ message: "User not exist" });

    const editInteraction = await Interaction.findOneAndUpdate(
      { customerOf: proId, _id: interactionId },
      {customerName, type, date, notes},
      {new: true, runValidators: true}
    )
    if(!editInteraction) return res.status(400).json({message: "Interaction could not updated"})
    
    res.status(200).json({message: "Interaction updated"})
  } catch (error) {
    res.status(500).json({message: "Failed to update", error: error.message})
  }
};
