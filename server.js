const express =  require("express");
const mongoose = require("mongoose");
const BrandName = require("./ApiSchema");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://chandasusanka:nanidimpu3111@cluster0.kimae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("DB Connected")
}).catch(err => console.log(err))



app.post("/addbrands",async (req,res)=>{
    const {brandname} = req.body;
    try{
        const newData = new BrandName({brandname});
        await newData.save();
        return res.send(await BrandName.find())
    }  
    catch (err){

        console.log(err.message)
    }
})

app.get("/getbrands", async (req,res)=>{
    try{
        const allData = await BrandName.find()
        return res.json(allData)
    }
    catch(err){
        console.log(err.message)
    }
})

app.get("/getbrands/:id", async (req,res)=>{
    try{
        const Data = await BrandName.findById(req.params.id)
        return res.json(Data)

    }
    catch(err){

        console.log(err.message)
    }
})

app.delete("/deletebrand/:id", async (req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id)
        return res.json(await BrandName.find());

    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(5000,()=>{
    console.log("Server Connected");
})