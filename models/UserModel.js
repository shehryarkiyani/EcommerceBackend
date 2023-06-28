const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        requird:true,
        
    },
    lasttname:{
        type:String,
        requird:true,
       
    },
    email:{
        type:String,
        requird:true,
        unique:true, 
    },
    mobile:{
        type:String,
        requird:true,
        unique:true,
    },
    password:{
        type:String,
        requird:true,
    }
})
UserSchema.pre('save',async function(next){
    const salt = bcrypt.genSaltSync(10);  
    this.password=await bcrypt.hash(this.password,salt)
})
UserSchema.methods.isPasswordMatched=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
    
}
module.exports=mongoose.model("User",UserSchema)