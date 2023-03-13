// const User = require("../models/user");
// const Order = require("../models/order")
const Category = require("../models/category")

//to get element by id
exports.getCategoryById = (req,res,next,id) =>{

    Category.findById(id).exec((err,category) =>{
        if(err){
            return res.status(400).json({
                error:"Category not found in DB"
            })
        }
        req.category=category;
        next();
    })
}

//creating or saving category
exports.createCategory = (req,res) =>{
    const category = new Category(req.body)

    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save the Category"
            })
        }
        res.json({category});
    })
}

//Getting category Id
exports.getCategory= (req,res)=>{
    return res.json(req.category)

}

//getting all categories
exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error:"No Categories were found"
            })
        }
        res.json(categories)
    })
}

//updating the category
exports.updateCategory = (req,res) =>{

    let category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory)=>{
            if(err || !category){
                return res.status(400).json({
                    error:"failed to Update category"
                })
            }
            
            res.json(updatedCategory)
        })
}

//deleting a category
exports.removeCategory=(req,res)=>{
    const category = req.category;
    

    category.remove((err,category)=>{
            if(err || !category){
                return res.status(400).json({
                    error:"failed to delete this category"
                })
            }
            res.json({
                message:`Successfully ${category.name} deleted`
            })
        })
}