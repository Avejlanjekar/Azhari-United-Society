const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected`);
    }catch(err){
        console.log(`eror : ${err.message}`);
    }
}

module.exports=connectDB;