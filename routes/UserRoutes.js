const express=require('express')
const router=express.Router()
const {authMiddleware,isAdmin}=require('../middlewares/authMiddleware')
const {getallUser,getSingleUser,DeleteUser,updateUser}=require('../controllers/UserCtrl')
router.get('/getAllUsers',authMiddleware,getallUser)
router.get('/:id',authMiddleware,getSingleUser)
router.delete('/:id',authMiddleware,DeleteUser)
router.put('/:id',authMiddleware,updateUser)
module.exports=router