const Product = require("../models/product");
const formidable =  require("formidable");
const _ = require("lodash");
const fs = require('fs'); //for file system





//Get product by Id
exports.getProductById = (req,res,next,id) =>{
    Product.findById(id)
    .populate('category') //to get based on particular category
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found in DB"
        })
    }
        req.product=product;
        next();
    })
}

//create product
exports.createProduct= (req,res)=>{

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error:"Problem with image not saved in db"
            })
        }

        //destructure the field
        const {name,description,price,category,stock} = fields;

        if(!name || !description||!price||!category||!stock){
            return res.status(400).json({
                error:"Please include all fields"
            })
        }

        let product = new Product(fields);
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file image size is to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType =file.photo.type;
        }
        // console.log(product);
        //save to db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Not able to save/create the Product"
                })
            }
            res.json(product);
        })

    })

    
    
}
//geting a product
exports.getProduct = (req,res) =>{
    req.product.photo = undefined //due to this data loads first with image
    return res.json(req.product);
}

//middleware
//to get image
exports.getPhoto = (req,res,next) =>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.status(200).send(req.product.photo.data)
    }
    next();
}

//getting all products
exports.getAllProducts = (req,res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy,"asc"]])
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"No Product are found"
            })
        }
        res.json(products);
    })
}

// exports.getAllProducts = (req, res) => {
//     // Set default values for page and limit
//     let page = req.query.page || 1;
//     let limit = req.query.limit || 8;
//     let skip = (page - 1) * limit;
  
//     // Find all products from the database
//     Product.find()
//       .select("-photo")
//       .populate("category")
//       .sort([[sortBy, order]])
//       .skip(skip)
//       .limit(limit)
//       .exec((err, products) => {
//         if (err) {
//           return res.status(400).json({
//             error: "No products found",
//           });
//         }
//         res.json(products);
//       });
//   };
  

//updating the products
exports.updateProduct = (req,res)=>{


    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file) => {
        if(err){
            return res.status(400).json({
                error:"Problem with image not saved in db"
            })
        }
        //updation code
        let product = req.product;
        // product.name = req.body.name;
        product.name = fields.name;
        product = _.extend(product,fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"file image size is to big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType =file.photo.type;
        }
        // console.log(product);
        //save to db
        

    product.save((err,updatedProduct)=>{
        if(err){
            res.status(400).json({
                error:"failed to update the Product"
            })
        }
        res.json(updatedProduct);
    })
})
}

//delete the product

exports.removeProduct = (req,res) =>{
    const product = req.product;
    product.remove((err,deleteProduct)=>{
        if(err || !product){
            return res.status(400).json({
                error:"failed to delete this product"
            })
        }
        res.json({
            message:`Successfully ${deleteProduct.name} deleted`,deleteProduct
        })
    })
}

exports.updateStock = (req,res,next) =>{

    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne:{
                filter:{_id:product._id},
                update:{$inc:{stock:+product.count,sold:+product.count}}
            }
        }
    })

    Product.bulkWrite(myOperations,{},(err,products) =>{
        if(err){
            return req.status(400).json({
                error:"Bulk Operation failed. Not able to update stock"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req,res) =>{
    Product.distinct("category" , {} , (err,category) =>{
        if(err){
            return req.status(401).json({
                error:"No category found"
            })
        }
        res.json({category})
    })
}