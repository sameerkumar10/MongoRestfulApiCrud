const express = require("express");
const mongoose = require("mongoose");
const bodyparser= require("body-parser");
mongoose.connect("mongodb://localhost:27017/Sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected to the database ");
}).catch((err)=>{
   console.log(err);
})
const app= express();
const port = 4500;
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());
const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const product = new mongoose.model("Product",productSchema);

app.post("/api/v1/product/new",async(req,res)=>{

  //create products
  const Product= await product.create(req.body);
  res.status(200).json({
    success:true,
    Product
  })
})

//Read Products
app.get("/api/v1/productRead", async(req,res)=>{
    const productRead = await product.find();
    res.status(200).json({success:true, productRead});
})

//update Products

app.put("/api/v1/productUp/:id", async(req,res)=>{
    let productUp = await product.findById(req.params.id);
    if(!productUp){
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
      }
    productUp = await product.findByIdAndUpdate(req.params.id,req.body,{
        useFindAndModify:false,
        runValidators:true
    })
res.status(200).json({
    success:true,
    productUp
})

})

//Delete Product
app.delete("/api/v1/productDel/:id",async(req,res)=>{

   const productDel = await product.findById(req.params.id);
  if(!productDel){
    return res.status(500).json({
        success:false,
        message:"Product not found"
    })
  }
  await productDel.deleteOne();
  
    res.status(200).json({
        success:true,
        message:"Products is deleted succesfully"
    })
})









app.listen(port,()=>{
    console.log(`Hence the server is running on the ${port}`);
})