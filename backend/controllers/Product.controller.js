const express = require("express");
const Product = require("../Models/Product.model");

exports.createProduct = async(req, res)=>{
    const {proId, name, category, description, price } = req.body
    try {
        const createProducts = await Product.create({
            customerOf: proId,
            name,
            category,
            price,
            description
            
        })
        if(!createProducts) return res.status(500).json({message: "Couldnot create product"})
        
        res.status(201).json({message: "Product Created", product: createProducts})
    } catch (error) {
        res.status(500).json({message: "Couldnot create product", error: error.message})
    }
}

