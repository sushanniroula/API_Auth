const express = require("express");
const Cohort = require("../Models/Cohort.model");
const User = require("../Models/User.model");
const userExists = async (proId) => {
  try {
    return await User.exists({ _id: proId });
  } catch (error) {
    return;
  }
};

exports.createCohort = async (req, res) => {
  const { proId, name, criteria } = req.body;
  if (!userExists(proId))
    return res.status(404).json({ message: "User not found" });
  try {
    const createCohort = await Cohort.create({
      customerOf: proId,
      name,
      criteria,
    });
    if (!createCohort)
      return res.status(500).json({ message: "Couldnot create cohort" });

    res.status(201).json({ message: "Cohort Created", cohort: createCohort });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldnot create cohort", error: error.message });
  }
};

// getAllCohort,
//   createCohort,
//   viewCohort,
//   updateCohort,
//   deleteCohort,

exports.getAllCohort = async (req, res) => {
  const { proId } = req.params;
  try {
    const cohorts = await Cohort.find({ customerOf: proId });
    if (cohorts.length === 0)
      return res.status(404).json({ message: "Cohorts not found" });
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Failed to load" });
  }
};

exports.viewCohort = async (req, res) => {
  const { proId, cohortId } = req.params;
  try {
    const cohorts = await Cohort.findOne({ customerOf: proId, _id: cohortId });
    if (!cohorts) return res.status(404).json({ message: "Cohort not found" });

    res.status(200).json(cohorts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrive", error: error.message });
  }
};

exports.updateCohort = async (req, res) => {
  try {
    const { proId, cohortId } = req.params;
    const { name, criteria } = req.body;
    const exists = await userExists(proId);
    if (!exists) return res.status(400).json({ message: "User not exist" });

    const editCohort = await Cohort.findOneAndUpdate(
      { customerOf: proId, _id: cohortId },
      { name, criteria },
      { new: true, runValidators: true }
    );
    if (!editCohort)
      return res.status(400).json({ message: "Cohort could not updated" });

    res.status(200).json({ message: "Cohort updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error: error.message });
  }
};

exports.deleteCohort = async (req, res) => {
  const { proId, cohortId } = req.params;
  const exists = await userExists(proId);
  if (!exists) return res.status(400).json({ message: "User not exist" });

  try {
    const deleteCohort = await Cohort.findOneAndDelete({
      customerOf: proId,
      _id: cohortId,
    });
    if (!deleteCohort)
      return res.status(404).json({ message: "Cohort not exist" });

    res.status(200).json({ message: "Cohort deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete cohort", error: error.message });
  }
};
