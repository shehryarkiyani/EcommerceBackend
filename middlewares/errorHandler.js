
const notFound=(req,res,next)=>{
    const error=new Error(`not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
}
const errorHandler=(err,req,res,next)=>{
const statuscode=res.statusCode==200 ? 500:res.statusCode;
res.status(statuscode)
res.json({
    message:err?.message,
    status:err.stack
})
}
module.exports={errorHandler,notFound}