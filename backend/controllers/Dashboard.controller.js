const mongoose = require("mongoose");
const Dashboard = require("../Models/Dashboard.model");
const User = require("../Models/User.model");
const userExists = async (proId) => {
  try {
    return await User.exists({ _id: proId });
  } catch (error) {
    return;
  }
};
exports.addData = async (req, res) => {
  const {
    proId,
    customerSatisfaction,
    retentionRate,
    churnRate,
    recentActivities,
    chartData,
  } = req.body;
  console.log(proId);
  
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})

  try {
    const addData = await Dashboard.create({
      adminId: proId,
      customerSatisfaction,
      retentionRate,
      churnRate,
      recentActivities,
      chartData,
    });
    if(!addData) return res.status(500).json({message: "Couldnot add data"})
    
    res.status(200).json({message: "Data added", data: addData})
  } catch (error) {
    res.status(500).json({message: "Error occured", error: error.message})
  }
};

exports.getData = async (req, res) => {
  const { proId } = req.params
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})
  try {
    const dashboardData = await Dashboard.findOne({adminId: proId})
    if(dashboardData.length === 0) return res.status(404).json({message: "No any data found"})

    res.status(200).json({data: dashboardData})
  } catch (error) {
    res.status(500).json({message: "Failed to retrive data", error: error.message})
  }
};

exports.updateData = async (req, res) => {
  const { proId } = req.params
  const {
    customerSatisfaction,
    retentionRate,
    churnRate,
    recentActivities,
    chartData,
  } = req.body;

  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})

  try {
    const editData = await Dashboard.findOneAndUpdate(
      {adminId: proId},
      {customerSatisfaction,
      retentionRate,
      churnRate,
      recentActivities,
      chartData},
      {new: true, runValidators: true}
    );
    if(!editData) return res.status(500).json({message: "Couldnot update data"})
    
    res.status(200).json({message: "Data updated"})
  } catch (error) {
    res.status(500).json({message: "Error occured", error: error.message})
  } 
};
