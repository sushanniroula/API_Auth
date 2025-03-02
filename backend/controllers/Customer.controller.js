const mongoose = require("mongoose");
const Customer = require("../Models/Customer.model");
const User = require('../Models/User.model')
const userExists = async (proId) => {
  try {
    return await User.exists({_id: proId})
  } catch (error) {
    return 
    
  }
}
exports.addCustomer = async (req, res) => {
  const { proId, name, email, phone } = req.body;
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})
  try {
    userExists(proId)    
    const newCustomer = await Customer.create({
      customerOf: proId,
      name,
      email,
      phone,
    });

    res
      .status(201)
      .json({ message: "Customer added successfylly", customer: newCustomer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add customer", error: error.message });
  }
};

exports.viewCustomer = async (req, res) => {
  const { proId, customerId } = req.body;
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})
  try {
    const customerDetails = await Customer.findOne({
      _id: customerId,
      customerOf: proId,
    });
    if (!customerDetails)
      return res.status(404).json({ message: "Customer not found" });

    res.status(200).json(customerDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrive customer", error: error.message });
  }
};

exports.getAllCustomer = async(req, res) => {
    const { proId } = req.body
    const exists = await userExists(proId)
    if(!exists) return res.status(400).json({message: "User not exist"})
    try {
        const customers = await Customer.find({customerOf: proId})
        res.status(200).json(customers)
    }
    
    catch (error) {
        res.status(500).json({message: "Failed to load"})
    }
}

exports.editCustomer = async (req, res) => {
  const { proId, customerId, name, email, phone } = req.body;
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})
  try {
    const customer = await Customer.findOne({
      _id: customerId,
      customerOf: proId,
    });
    if (!customer) return res.status(404).json({ message: "Unauthorized" });

    const editCustomerDetails = await Customer.findByIdAndUpdate(
      customerId,
      { name, email, phone },
      { new: true, runValidators: true }
    );
    if (!editCustomerDetails)
      return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({
      message: "Customer details updated",
      details: editCustomerDetails,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update", error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { proId, customerId } = req.body;
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})
  try {
    const customer = await Customer.findOne({
      _id: customerId,
      customerOf: proId,
    });
    if (!customer) return res.status(404).json({ message: "Unauthorized" });

    const deleteCustomerDetails = await Customer.findByIdAndDelete(customerId);
    if (!deleteCustomerDetails)
      return res.status(404).json({ message: "Customer not found" });

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete customer", error: error.message });
  }
};
