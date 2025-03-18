const express = require("express");
const Order = require("../Models/Order.model");
const Product = require("../Models/Product.model")

exports.getAllOrders = async (req, res) => {
    const { proId } = req.params
    try {
        const orders = await Order.find({customerOf: proId})
        if(orders.length === 0) return res.status(404).json({message: "Orders not found"})
        
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({message: "Failed to retrive orders", error: error.message})
    }
}; 

exports.viewOrder = async (req, res) => {
  const { proId, orderId } = req.body;
  try {
    const orders = await Order.findOne({ customerOf: proId, _id: orderId });
    if (!orders) return res.status(404).json({ message: "Order not found" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrive", error: error.message });
  }
};

exports.editOrder = async (req, res) => {
    const {proId, orderId, customerName, amount, status } = req.body
    try {
        const customer = await Order.findOne({
              _id: orderId,
              customerOf: proId,
            });
            if (!customer) return res.status(404).json({ message: "Unauthorized" });
            const editOrderDetails = await Order.findByIdAndUpdate(
                orderId,
                { 
                    "customerDetails.name": customerName,
                    amount,
                    status
                },
                { new: true, runValidators: true }
            )
    
        res.status(200).json({message: "Order updated"})
    } catch (error) {
        res.status(500).json({message: "Couldnot update", error: error.message})
    }
};

exports.deleteOrder = async (req, res) => {
    const { proId, orderId } = req.body
    try{
        const deleteOrder = await Order.findOneAndDelete({customerOf: proId, orderId: orderId})
        if(!deleteOrder) return res.status(404).json({message: "Order not found"})
        
        res.status(200).json({message: "Order Deleted"})        
    }catch(error){
        res.status(500).json({message: "Couldnot delete order", error: error.message})
    }
};


exports.createOrder = async(req, res)=>{
    const { proId, productId, customerDetails } = req.body
    try {
        const product = await Product.findOne({_id: productId, customerOf: proId})
        
        if(!product) return res.status(404).json({message: "Couldnot find selected product"})
        const createOrders = await Order.create({
            customerOf: proId,
            productId: productId,
            amount: product.price,
            customerDetails: customerDetails,
        })        
        if(!createOrders) return res.status(500).json({message: "Couldnot make order"})
        
        res.status(201).json({message: "Order Created", order: createOrders})
    } catch (error) {
        res.status(500).json({message: "Couldnot make order", error: error.message})
    }
}
