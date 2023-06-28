const UserModel=require('../models/UserModel')
const asyncHandler=require("express-async-handler")

const createUser=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const findUser=await UserModel.find({email:email});
    if(findUser.length==0){
        const newUser=await UserModel.create(req.body);
        res.json(newUser)
    }else{
throw new Error('User Already Exist')
    }
})
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const findUser=await UserModel.find({email:email});
    if(findUser.length==0){
        throw new Error('User donot found')
    }else{
        const foundUser = findUser[0];
        if(await foundUser.isPasswordMatched(password)){
            res.json(foundUser)
        }else{
            throw new Error('Password donot match')
        }
    }
})

module.exports={createUser,loginUser}