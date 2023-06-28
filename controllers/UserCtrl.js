const { generateToken } = require('../config/jwtToken');
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
            res.json({
                _id:foundUser?._id,
                firstname:foundUser?.firstname,
                lastname:foundUser?.lastname,
                email:foundUser?.email,
                mobile:foundUser?.markModified,
                token:generateToken(foundUser?._id)
            })
        }else{
            throw new Error('Password donot match')
        }
    }
})

const getallUser=asyncHandler(async(req,res)=>{
    try{
const getUsers=await UserModel.find()
res.json(getUsers)

    }catch(err){
        throw new Error(err)
    }
})
const getSingleUser=asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params
        const getUser=await UserModel.findById(id)
res.json(getUser)
    }catch(err){
        throw new Error(err)
    }
})
const DeleteUser=asyncHandler(async(req,res)=>{
    try{
        const {id}=req.params
        const getUser=await UserModel.findByIdAndDelete(id)
        if(getUser==null){
          return  res.json({msg:"User donot found"})
        }
return res.json(getUser)
    }catch(err){
        throw new Error(err)
    }
})
const updateUser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    try{
        const updateFields = req.body;
        const updateUser=await UserModel.findByIdAndUpdate(id,
            updateFields,{new:true}
            )
            res.json(updateUser)
    }catch(err){
        throw new Error(err)
    }
})
const blockUser=asyncHandler(async(req,res)=>{
const {id}=req.params
try{
const block=UserModel.findByIdAndUpdate(id,{isBlocked:true},{new:true})
res.json(block)
}catch(err){
    throw new Error(err)
}

})
const UnblockUser=asyncHandler(async(req,res)=>{
    const {id}=req.params
    try{
        const block=UserModel.findByIdAndUpdate(id,{isBlocked:false},{new:true})
        res.json(block)
    }catch(err){
        throw new Error(err)
    }
})
module.exports={
    createUser,
    loginUser,
    getallUser,
    getSingleUser,
    DeleteUser,
    updateUser,
    blockUser,
    UnblockUser
}