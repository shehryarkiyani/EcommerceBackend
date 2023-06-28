const {default:mongoose}=require('mongoose')

const connectDb=()=>{
    const uri=process.env.MONGODB_URI
    try{
        const conn=mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log("Database Connected")
    }catch(err){
        console.log("database error")
    }
}
return module.exports=connectDb
