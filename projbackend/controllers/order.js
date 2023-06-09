const {Order,ProductCart} = require("../models/order");

exports.getOrderById = (req,res,next,id)=>{
    Order.findById()
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"No Order found in DB"
        })
    }
    req.order = order;
    next();
    })
}

exports.createOrder =(req,res) =>{
    req.body.order.user = req.profile;
    const order = req.body.order;
    order.save((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"failed to save Order in DB"
        })
    }
    res.json(order)

    })
}

exports.getAllOrders = (req,res) => {
    Order.find()
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:"No Orders in db"
        })
    }
    res.json(order)
    })
}

exports.updateOrder =(req,res) =>{
    Order.update(
        {_id:req.body.orderId},
        {$set:{status:req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error:"cannot update Order status"
            })
        }
        res.json(order);
        }
    )

}

exports.getOrderStatus =(req,res) =>{
    res.json(Order.schema.path("status").enumValues);

    
}